"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailProduct.belongsTo(models.Product, {
        foreignKey: "productId"
      });
      DetailProduct.belongsTo(models.ProductColor, {
        foreignKey: "productColorId"
      });
      DetailProduct.belongsTo(models.ProductImage, {
        foreignKey: "productImageId"
      });
      DetailProduct.belongsTo(models.ProductSize, {
        foreignKey: "productSizeId"
      });
      DetailProduct.hasOne(models.Cart, {
        foreignKey: "detailProductId"
      });
    }
  }
  DetailProduct.init({
    productId: DataTypes.INTEGER,
    productColorId: DataTypes.INTEGER,
    productImageId: DataTypes.INTEGER,
    productSizeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "DetailProduct",
  });
  return DetailProduct;
};