"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RatingImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RatingImage.belongsTo(models.RatingImage, {
        foreignKey: "ratingId"
      });
    }
  }
  RatingImage.init({
    ratingId: DataTypes.INTEGER,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: "RatingImage",
  });
  return RatingImage;
};