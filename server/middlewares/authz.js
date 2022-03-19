const { Item } = require("../models");
const Authorization = async (req, res, next) => {
  try {
    let { id } = req.params;
    let item = await Item.findByPk(+id);

    if (!item) {
      throw new Error("NOT_FOUND");
    }
    if (req.userLogin.role !== "Admin") {
      throw new Error("FORBIDDEN");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Authorization;
