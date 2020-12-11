"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductRating.belongsTo(models.Product, {
        foreignKey: "productId"
      });
      ProductRating.belongsTo(models.User, {
        foreignKey: "userId"
      });
      ProductRating.hasMany(models.RatingImage, {
        foreignKey: "ratingId"
      });
    }
  }
  ProductRating.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: "ProductRating",
  });
  return ProductRating;
};