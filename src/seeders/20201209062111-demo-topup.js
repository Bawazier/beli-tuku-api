'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert("Topups", [
      {
        charge: 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        charge: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        charge: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        charge: 200000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        charge: 250000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        charge: 300000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        charge: 350000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        charge: 450000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        charge: 500000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
