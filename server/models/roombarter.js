"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomBarter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RoomBarter.belongsTo(models.User, { foreignKey: "user1" });
      RoomBarter.belongsTo(models.User, { foreignKey: "user2" });
      RoomBarter.belongsTo(models.Item, { foreignKey: "item1" });
      RoomBarter.belongsTo(models.Item, { foreignKey: "item2" });
    }
  }
  RoomBarter.init(
    {
      user1: DataTypes.INTEGER,
      user2: DataTypes.INTEGER,
      item1: DataTypes.INTEGER,
      item2: DataTypes.INTEGER,
      status1: DataTypes.BOOLEAN,
      status2: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "RoomBarter",
    }
  );
  return RoomBarter;
};
