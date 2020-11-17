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
      User.belongsTo(models.Roles, {
        foreignKey: "rolesId"
      });
      User.hasMany(models.Product);
      User.hasMany(models.ProductRating);
      User.hasMany(models.UserAddress);
      User.hasMany(models.Cart);
    }
  };
  User.init({
    rolesId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: "User",
  });
  return User;
};