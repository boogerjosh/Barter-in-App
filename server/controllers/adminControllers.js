const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class adminControllers {
  static async register(req, res, next) {
    const { name, email, password, role, address } = req.body;
    const response = await User.create({
      name,
      email,
      password,
      role,
      address,
    });
    res.status(201).send(response);
  }

  //   static async login(req, res, next) {
  //     const { email, password } = req.body;
  //     let user = await User.findOne({ where: { email } });
  //     if (!user) {
  //       throw new Error("INVALID_USER");
  //     }
  //     let isValid = comparePassword(password, user.password);
  //     if (isValid) {
  //       throw new Error("INVALID_USER");
  //     }
  //     let payload = {
  //       id: user.id,
  //       email: user.email,
  //       role: user.role,
  //     };
  //     res.status(201).send({ access_token: signToken(payload) });
  //   }
}

module.exports = adminControllers;