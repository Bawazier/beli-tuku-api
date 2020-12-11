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
        name: "Women's Clothing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Women's Shoes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Women's Accessories",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Women's Bags & HandBags",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Men's Clothing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Men's Shoes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Men's Accessories",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kid's Accessories",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jewelry",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Watches, Parts & Accessories",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kid's Accessories",
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
