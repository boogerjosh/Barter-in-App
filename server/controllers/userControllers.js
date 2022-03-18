const imagekit = require("../helpers/imagekit");
const uploadFile = require("../helpers/uploadFile");
const { Item, Image, User, sequelize } = require("../models");
const { signToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH2_CLIENT);

class userControllers {

   static async loginGoogle(req, res, next) {
    try {
      var pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$";
      var pwdLen = 8;
      var randPassword = Array(pwdLen).fill(pwdChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
      
      const {token} = req.body
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.AUDIENCE
      });
    
      const payload = ticket.getPayload();
      console.log(payload)
    
      const user = await User.findOrCreate({
        where: {
          email: payload.email
        },
        defaults: {
          password: randPassword,
          role: 'Customer',
          username: payload.given_name,
          phoneNumber: '08XXXXXXXXX',
          address: 'XXXXX'
        },
      })

      let tokenServer = signToken({
        id: user[0].dataValues.id,
        email: user[0].dataValues.email
      })

      console.log(tokenServer)
      res.status(200).json({access_token: tokenServer});
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async postItems(req, res, next) {
        const t = await sequelize.transaction();
        try {
          let imageData = []
          const { files } = req
            const {
                title,
                category,
                description,
                brand,
                yearOfPurchase,
                dateExpired,
                statusPost,
                myAdsId,
                UserId,
                } = req.body

            const createItems = await Item.create({
                title,
                category,
                description,
                brand,
                yearOfPurchase,
                dateExpired,
                statusPost,
                myAdsId,
                UserId
            }, { 
              returning: true,
              transaction: t
            })

          const mappedArray = await Promise.all(
            files.map((file) => {
              return uploadFile(file).then((data) => {
                let tags = []
                if (data.AITags) {
                  data.AITags.forEach(e => {
                    tags.push(e.name)
                  })
                }
                let temp = {
                  imageUrl: data.url,
                  itemId: createItems.id,
                  tag: tags.join(', ')
                }
                return temp
              });
            })
          );
          
           await Image.bulkCreate(mappedArray, {
                returning: true,
                transaction: t,
           })
          
            await t.commit();
            res.status(201).send(createItems)
        } catch (error) {
            console.log(error)
            await t.rollback();
            next(error)
        }
  }

  static async getItems(req, res, next) {
    try {
      let items = await Item.findAll({
        include: [Image],
      });

      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  static async getItem(req, res, next) {
    try {
      let { id } = req.params;
      let item = await Item.findByPk(+id, {
        include: [
          {
            model: User,
            attributes: ["id", "email"],
          },
          Image,
        ],
      });
      if (!item) {
        throw new Error("NOT_FOUND");
      }
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  static async putItem(req, res, next) {
    try {
      let { id } = req.params;
      let { title, category, description, brand, yearOfPurchase, dateExpired } =
        req.body;
      await Item.update(
        {
          title,
          category,
          description,
          brand,
          yearOfPurchase,
          dateExpired,
        },
        { where: { id } }
      );
      res.status(200).json({ message: "Item successfully updated" });
    } catch (error) {
      next(error);
    }
  }

  static async patchItem(req, res, next) {
    try {
      let { id } = req.params;
      let { status } = req.body;
      await Item.update({ status }, { where: { id } });
      res.status(200).json({ message: "Item status successfully updated" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteItem(req, res, next) {
    try {
      let { id } = req.params;
      let item = await Item.findByPk(+id);
      if (!item) {
        throw new Error("NOT_FOUND");
      }
      res.status(200).json({ mesage: "Item has been deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userControllers;
