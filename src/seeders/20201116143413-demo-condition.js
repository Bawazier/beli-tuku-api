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
   return queryInterface.bulkInsert("Conditions", [
     {
       status: "New",
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       status: "Second",
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       status: "Used",
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
