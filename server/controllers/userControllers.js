const imagekit = require("../helpers/imagekit");
const uploadFile = require("../helpers/uploadFile");
const { Item, Image, User, sequelize } = require("../models");

class userControllers {
  static async postItems(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const imageData = []
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
                imageId } = req.body

            const createItems = await Item.create({
                title,
                category,
                description,
                brand,
                yearOfPurchase,
                dateExpired,
                statusPost,
                myAdsId,
                UserId,
                imageId
            }, { transaction: t })

            files.forEach(async (file) => {
                uploadFile(file)
                    .then(data => {
                        let tags = []
                        if (data.AITags) {
                            data.AITags.forEach(e => {
                                tags.push(e.name)
                            })
                        }
                        imageData.push({
                            imageUrl: data.url,
                            itemId: createItems.id,
                            tag: tags.join(', ')
                        })
                    })
            })
            await t.commit();
            res.status(201).send(createItems)
        } catch (error) {
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
