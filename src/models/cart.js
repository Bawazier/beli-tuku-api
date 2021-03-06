"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {
        foreignKey: "userId"
      });
      Cart.belongsTo(models.DetailProduct, {
        foreignKey: "detailProductId"
      });
    }
  }
  Cart.init({
    userId: DataTypes.INTEGER,
    detailProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    isCheck: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    noOrder: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Cart",
  });
  return Cart;
};