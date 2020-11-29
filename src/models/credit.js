"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Credit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Credit.belongsTo(models.User, {
        foreignKey: "userId"
      });
    }
  }
  Credit.init({
    userId: DataTypes.INTEGER,
    saldo: DataTypes.BIGINT,
    topUp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Credit",
  });
  return Credit;
};