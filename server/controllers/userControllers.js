const imagekit = require("../helpers/imagekit");
const { Item, Image, User } = require("../models");

class userControllers {
  static async postItems(req, res, next) {
    try {
      const { files } = req;
      const {
        title,
        category,
        description,
        brand,
        yearOfPurchase,
        dateExpired,
        statusPost,
        myAdsId,
      } = req.body;
      const userId = req.userLogin.id;

      const createItems = await Item.create({
        title,
        category,
        description,
        brand,
        yearOfPurchase,
        dateExpired,
        statusPost,
        myAdsId,
        userId,
      });

      files.forEach((file) => {
        imagekit
          .upload({
            file: file.buffer,
            fileName: `my_file_name.jpg`,
            extensions: [
              {
                name: "google-auto-tagging",
                maxTags: 5,
                minConfidence: 95,
              },
            ],
          })
          .then((data) => {
            // console.log(data);
            if (data.AITags === null) {
              Image.create({
                imageUrl: data.url,
                itemId: createItems.id,
                tag: "",
              });
            } else {
              let tags = [];
              data.AITags.forEach((e) => {
                tags.push(e.name);
              });
              Image.create({
                imageUrl: data.url,
                itemId: createItems.id,
                tag: tags.join(", "),
              });
            }
          });
      });
      res.status(201).json({ message: "Item has been created" });
    } catch (error) {
      next(error);
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
