"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart, {
        foreignKey: "productId"
      });
      Product.hasMany(models.ProductColor, {
        foreignKey: "productId",
      });
      Product.hasMany(models.ProductImage, {
        foreignKey: "productId",
      });
      Product.hasMany(models.ProductRating, {
        foreignKey: "productId",
      });

      Product.belongsTo(models.User, {
        foreignKey: "userId"
      });
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId"
      });
      Product.belongsTo(models.Condition, {
        foreignKey: "conditionId",
      });
    }
  }

  Product.init({
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    conditionId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: "Product",
  });
  return Product;
};