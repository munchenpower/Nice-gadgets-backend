'use strict';

/** @type {import('sequelize-cli').Migration} */

const phones = require('./20230807143202-add-phones.json');

const TABLE_NAME = 'phones';

const columnsToRename = [
  {
    oldName: 'namespaceId',
    newName: 'namespace_id',
  },
  {
    oldName: 'capacityAvailable',
    newName: 'capacity_available',
  },
  {
    oldName: 'priceRegular',
    newName: 'price_regular',
  },
  {
    oldName: 'priceDiscount',
    newName: 'price_discount',
  },
  {
    oldName: 'colorsAvailable',
    newName: 'colors_available',
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      phones.map((phone) => ({
        ...phone,
        description: JSON.stringify(phone.description),
      })),
      {},
    );

    for (const { oldName, newName } of columnsToRename) {
      await queryInterface.renameColumn(TABLE_NAME, oldName, newName);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('phones', {
      name: phones.map(({ name }) => name),
    });
  }
};
