"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserAddress.belongsTo(models.User, {
        foreignKey: "userId"
      });
    }
  }
  
  UserAddress.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    recipientName: DataTypes.STRING,
    recipientTlp: DataTypes.INTEGER,
    address: DataTypes.TEXT,
    region: DataTypes.TEXT,
    postalCode: DataTypes.INTEGER,
    isPrimary: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: "UserAddress",
  });
  return UserAddress;
};