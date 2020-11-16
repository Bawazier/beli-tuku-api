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
   return queryInterface.bulkInsert("Categories", [
     {
       name: "Accessories",
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       name: "Formal suit",
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       name: "T-Shirt",
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       name: "Jacket",
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       name: "Pants",
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       name: "Shoes",
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
