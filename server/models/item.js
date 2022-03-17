"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasMany(models.Image, { foreignKey: "itemId" });
      Item.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Item.init(
    {
      title: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.STRING,
      brand: DataTypes.STRING,
      yearOfPurchase: DataTypes.STRING,
      dateExpired: DataTypes.STRING,
      statusPost: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
