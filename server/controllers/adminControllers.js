const { comparePassword } = require("../helpers/bcrypt");
const deleteItem = require("../helpers/cron");
const { signToken } = require("../helpers/jwt");
const { User, Item, Image } = require("../models");

class adminControllers {

  static async register(req, res, next) {
    const { username, email, password, address } = req.body;
    try {   
      const response = await User.create({
        username,
        email,
        password,
        role: 'Admin',
        photoUrl: '',
        address,
      });
      res.status(201).send({ email: response.email});
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("INVALID_USER");
      }
      let isValid = comparePassword(password, user.password);
      if (!isValid) {
        throw new Error("INVALID_USER");
      }
      let payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      res.status(201).send({ access_token: signToken(payload) });
    } catch (error) {
      next(error)
    }
  }

  static async getItems(req, res, next) {
    try {
      const items = await Item.findAll({
        include: [Image],
        where: {
          statusPost: "Reviewed",
        },
      });
      res.status(200).json(items);
    } catch (error) {
      next(error)
    }
  }
  
  static async patchItem(req, res, next) {
    try {
      let { id } = req.params;
      let { status } = req.body;
      if (status === "Approve") {
        deleteItem(+id);
      }
      await Item.update({ status }, { where: { id } });
      res.status(200).json({ message: "Item status successfully updated" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = adminControllers;
