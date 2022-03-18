const imagekit = require("../helpers/imagekit");
const sendEmail = require("../helpers/sendEmail");
const uploadFile = require("../helpers/uploadFile");
const { Item, Image, User, sequelize } = require("../models");
const { Op } = require("sequelize");
const { OAuth2Client } = require("google-auth-library");
const { signToken } = require("../helpers/jwt");

class userControllers {
  static async postItems(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { files } = req;
      const {
        title,
        category,
        description,
        brand,
        yearOfPurchase,
        dateExpired,
        userId,
      } = req.body;

      const createItems = await Item.create(
        {
          title,
          category,
          description,
          brand,
          yearOfPurchase,
          dateExpired,
          statusPost: "Review",
          userId,
        },
        { transaction: t }
      );
      console.log(files);
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

      await sendEmail({ email: "aryaadhm@gmail.com" });

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
      // console.log(error);
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

  // static async putItem(req, res, next) {
  //   const t = await sequelize.transaction();
  //   try {
  //     let { id } = req.params;
  //     const { files } = req;
  //     const {
  //       title,
  //       category,
  //       description,
  //       brand,
  //       yearOfPurchase,
  //       dateExpired,
  //     } = req.body;
  //     const item = await Item.findByPk(+id);

  //     if (item.statusPost !== "Approve") {
  //       throw new Error("CANNOT_EDIT");
  //     }

  //     await Item.update(
  //       {
  //         title,
  //         category,
  //         description,
  //         brand,
  //         yearOfPurchase,
  //         dateExpired,
  //       },
  //       { where: { id }, transaction: t }
  //     );

  //     const mappedArray = await Promise.all(
  //       files.map((file) => {
  //         return uploadFile(file).then((data) => {
  //           let tags = [];
  //           if (data.AITags) {
  //             data.AITags.forEach((e) => {
  //               tags.push(e.name);
  //             });
  //           }
  //           let temp = {
  //             imageUrl: data.url,
  //             itemId: createItems.id,
  //             tag: tags.join(", "),
  //           };
  //           return temp;
  //         });
  //       })
  //     );

  //     await Image.destroy({ where: { itemId: req.userLogin.id } });

  //     await Image.bulkCreate(mappedArray, {
  //       returning: true,
  //       transaction: t,
  //     });

  //     await sendEmail({ email: "aryaadhm@gmail.com" });

  //     await t.commit();
  //     res.status(200).json({ message: "Item successfully updated" });
  //   } catch (error) {
  //     await t.rollback();
  //     next(error);
  //   }
  // }

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
      console.log(error);
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const CLIENT_ID = process.env.CLIENT_ID;
      const client = OAuth2Client(CLIENT_ID);
      const { token } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const [user] = await User.findOrCreate({
        where: { email: payload.email },
        default: {
          role: "Customer",
          password: `${payload.email}-${new Date()}`,
        },
      });
      const payloadFromServer = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      res.status(200).json({ access_token: payloadFromServer });
    } catch (error) {
      next(error);
    }
  }

  // static async getRequest(req, res, next) {
  //   try {
  //     const UserId = req.currentUser.id;
  //     const userItems = Item.findAll({ where: { UserId, status: "Reviewed" } });
  //     let userRequests = [];
  //     let topush = {};
  //     userItems.forEach((el) => {
  //       topush = await Request.findOne({
  //         where: { [Op.or]: [{ ItemId: el.id }, { ItemId2: el.id }] },
  //         include: {
  //           model: Item,
  //         },
  //       });
  //       if (topush) {
  //         userRequests.push(topush);
  //       }
  //     });
  //     res.send(200).json({ userRequests });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async postRequest(req, res, next) {
  //   try {
  //     const { ItemId2, ItemId } = req.body;
  //     const batch = {
  //       ItemId,
  //       ItemId2,
  //     };
  //     const resu = await Request.create(batch);
  //     res.send(200).json({ message: "Request" });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async sendEmail(req, res, next) {
  //   try {
  //     let email = req.userLogin.email;
  //     let transporter = nodemailer.createTransport({
  //       service: "Gmail",
  //       auth: {
  //         user: process.env.EMAIL, // generated ethereal user
  //         pass: process.env.PASSWORD, // generated ethereal password
  //       },
  //       tls: {
  //         rejectUnauthorized: false,
  //       },
  //     });
  //     let mailOptions = {
  //       from: process.env.EMAIL,
  //       to: "admin@mail.com",
  //       subject: "Asking for approvement",
  //       text: ``,
  //     };
  //     let info = await transporter.sendMail(mailOptions);
  //     res.status(200).json({ mesage: "Item has been deleted" });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = userControllers;
