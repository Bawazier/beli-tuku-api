"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
      });
      User.hasOne(models.Store, {
        foreignKey: "userId"
      });
      User.hasOne(models.Credit, {
        foreignKey: "userId"
      });
      User.hasMany(models.Address, {
        foreignKey: "userId"
      });
      User.hasMany(models.Cart, {
        foreignKey: "userId"
      });
      User.hasMany(models.Order, {
        foreignKey: "userId"
      });
      User.hasMany(models.ProductRating, {
        foreignKey: "userId"
      });
    }
  }
  User.init({
    roleId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: "User",
  });
  return User;
};