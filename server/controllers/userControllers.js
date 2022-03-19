const imagekit = require("../helpers/imagekit");
const sendEmail = require("../helpers/sendEmail");
const uploadFile = require("../helpers/uploadFile");
const { Item, Image, User, RoomBarter, sequelize } = require("../models");
const { Op } = require("sequelize");
const { signToken } = require("../helpers/jwt");

class userControllers {

  static async loginGoogle(req, res, next) {
    try {
      const payload = req.body;
      const user = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          password: "rahasia" + Math.random() * 10,
          role: "Customer",
          username: payload.givenName,
          address: "-",
          photoUrl: payload.photoUrl
        },
      });
      let tokenServer = signToken({
        id: user[0].dataValues.id,
        email: user[0].dataValues.email,
      });
      console.log(tokenServer)
      res.status(200).json({
        access_token: tokenServer,
        id: String(user[0].dataValues.id),
        username: user[0].dataValues.username,
      });
    } catch (err) {
      console.log(err);
      // next(err);
    }
  }

  static async postItems(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const userId = req.userLogin.id;
      const { files } = req;
      console.log(files)
      const {
        title,
        category,
        description,
        brand,
        yearOfPurchase
      } = req.body;
      console.log(req.body)
      const createItems = await Item.create(
        {
          title,
          category,
          description,
          brand,
          yearOfPurchase,
          statusPost: "Reviewed",
          statusBarter: 'Not bartered yet',
          userId,
        },
        { transaction: t }
      );

      const mappedArray = await Promise.all(
        files.map((file) => {
          return uploadFile(file).then((data) => {
            let tags = [];
            if (data.AITags) {
              data.AITags.forEach((e) => {
                tags.push(e.name);
              });
            }
            let temp = {
              imageUrl: data.url,
              itemId: createItems.id,
              tag: tags.join(", "),
            };
            return temp;
          });
        })
      );

      let newImage = await Image.bulkCreate(mappedArray, {
        returning: true,
        transaction: t,
      });
      await sendEmail({ email: req.userLogin.email })
      await t.commit();
      res.status(201).send({ ...createItems.dataValues, Images: newImage });
    } catch (error) {
      console.log(error, "<<<<<<");
      await t.rollback();
      next(error);
    }
  }

  static async getItems(req, res, next) {
    try {
      let items = await Item.findAll({
        include: [Image],
        where: {
          statusPost: "Approve",
        },
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

  static async deleteItem(req, res, next) {
    try {
      let { id } = req.params;
      let item = await Item.findByPk(+id);
      if (!item) {
        throw new Error("NOT_FOUND");
      }
      await Item.destroy({ where: { id } });
      res.status(200).json({ message: "Item has been deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async dataForHome(req, res, next) {
    try {
      let items = await Item.findAll({
        order: [["updatedAt", "DESC"]],
        limit: 10,
      });
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  static async getMyAds(req, res, next) {
    try {
      let items = await Item.findAll({
        Where: {
          [Op.and]: [
            {
              status: {
                [Op.ne]: "Review",
              },
              userId: req.userLogin.id,
            },
          ],
        },
      });
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }
  
  static async dataForBarter(req, res, next) {
    try {
      let items = await Item.findAll({
        Where: {
          [Op.and]: [
            {
              status: {
                [Op.eq]: "Approve",
              },
              userId: req.userLogin.id,
            },
          ],
        },
      });
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  static async postRoomBarter(req, res, next) {
    try {
      const UserId = req.userLogin.id;
      console.log(req.body)
      const { user2, item1, item2 } = req.body;
      const batch = {
        user1: UserId,
        user2,
        item1,
        item2,
        status1: false,
        status2: false
      };
      const response = await RoomBarter.create(batch);
      res.status(201).json(response);
     } catch (error) {
       next(error);
    }
  }  

  static async patchRoomBarter(req, res, next) {
    try {
      let { id } = req.params;
      // let { status } = req.body;
      let userId = req.userLogin.id;

      let roomBarter = await RoomBarter.findByPk(+id, {
        include: [Item],
      });

      if (!roomBarter) {
        throw new Error("ROOM_NOT_FOUND");
      }

      if (roomBarter.user1 === userId) {
        await RoomBarter.update({ status1: true });
      } else if (roomBarter.user2 === userId) {
        await RoomBarter.update({ status2: true });
      }

      if (roomBarter.status1 && roomBarter.status2) {
        await RoomBarter.destroy({ where: { id } });
        await Item.destroy({ where: { id: roomBarter.item1 } });
        await Item.destroy({ where: { id: roomBarter.item2 } });
        res.status(200).json({ message: "Item terbarter" });
      } else {
        res.status(200).json({ message: "Wait for another user to confirm" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getRoomBarter(req, res, next) {
    try {
      const UserId = req.userLogin.id;
      const response1 = await RoomBarter.findAll({
        where: {
           [Op.or]: [{user1: UserId}, {user2: UserId}]
        }
      })
      res.status(200).json(response1)
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = userControllers;
