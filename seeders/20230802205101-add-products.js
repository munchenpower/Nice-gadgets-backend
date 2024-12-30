'use strict';

/** @type {import('sequelize-cli').Migration} */

const products = require('./20230802205101-add-products.json');

products.forEach(product => {
  delete product.id;
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', products);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', {
      name: products.map(({ name }) => name),
    });
  },
};
