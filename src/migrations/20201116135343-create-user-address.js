'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserAddresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      recipientName: {
        type: Sequelize.STRING
      },
      recipientTlp: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.TEXT
      },
      region: {
        type: Sequelize.TEXT
      },
      postalCode: {
        type: Sequelize.INTEGER
      },
      isPrimary: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserAddresses');
  }
};