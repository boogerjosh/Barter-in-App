const imagekit = require("../helpers/imagekit");
const sendEmail = require("../helpers/sendEmail");
const uploadFile = require("../helpers/uploadFile");
const { Item, Image, User, sequelize, RoomBarter } = require("../models");
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
          photoUrl: payload.photoUrl,
        },
      });
      let tokenServer = signToken({
        id: user[0].dataValues.id,
        email: user[0].dataValues.email,
      });
      res.status(200).json({
        access_token: tokenServer,
        id: String(user[0].dataValues.id),
        username: user[0].dataValues.username,
      });
    } catch (err) {
      next(err);
    }
  }

  static async postItems(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const userLogin = req.userLogin;
      const { files } = req;
      const {
        title,
        category,
        description,
        brand,
        yearOfPurchase,
        dateExpired,
      } = req.body;
      const userId = userLogin.id;

      const createItems = await Item.create(
        {
          title,
          category,
          description,
          brand,
          yearOfPurchase,
          dateExpired,
          statusPost: "Reviewed",
          userId,
        },
        { transaction: t }
      );

      // const mappedArray = await Promise.all(
      //   files.map((file) => {
      //     return uploadFile(file).then((data) => {
      //       let tags = [];
      //       if (data.AITags) {
      //         data.AITags.forEach((e) => {
      //           tags.push(e.name);
      //         });
      //       }
      //       let temp = {
      //         imageUrl: data.url,
      //         itemId: createItems.id,
      //         tag: tags.join(", "),
      //       };
      //       return temp;
      //     });
      //   })
      // );

      const mappedArray = new Promise((resolve) => {
        resolve(() => {
          files.map((file) => {
            return uploadFile(file).then((data) => {
              let tags = [];
              if (data.AITags) {
                data.AITags.forEach((e) => {
                  tags.push(e.name);
                });
              }
              console.log(data);
              let temp = {
                imageUrl: data.url,
                itemId: createItems.id,
                tag: tags.join(", "),
              };
              return temp;
            });
          });
        });
      });

      await Image.bulkCreate(mappedArray, {
        returning: true,
        transaction: t,
      });
      await sendEmail({ email: req.userLogin.email });
      await t.commit();
      res.status(201).send({ message: "Item has been created" });
    } catch (error) {
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
        console.log(">>>>");
        res.status(200).json({ message: "Item terbarter" });
      } else {
        console.log("<<<<,");
        res.status(200).json({ message: "Wait for another user to confirm" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //   static async googleLogin(req, res, next) {
  //     try {
  //       const CLIENT_ID = process.env.CLIENT_ID;
  //       const client = OAuth2Client(CLIENT_ID);
  //       const { token } = req.body;
  //       const ticket = await client.verifyIdToken({
  //         idToken: token,
  //         audience: CLIENT_ID,
  //       });
  //       const payload = ticket.getPayload();
  //       const [user] = await User.findOrCreate({
  //         where: { email: payload.email },
  //         default: {
  //           role: "Customer",
  //           password: `${payload.email}-${new Date()}`,
  //         },
  //       });
  //       const payloadFromServer = signToken({
  //         id: user.id,
  //         email: user.email,
  //         role: user.role,
  //       });
  //       res.status(200).json({ access_token: payloadFromServer });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  // static async getRequest(req, res, next) {
  //   try {
  //     const UserId = req.userLogin.id;
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
}

module.exports = userControllers;
