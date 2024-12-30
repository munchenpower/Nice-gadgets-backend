'use strict';

/** @type {import('sequelize-cli').Migration} */

const tablets = require('./20230808060442-add-tablets.json');

const TABLE_NAME = 'tablets';

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
      tablets.map((tablet) => ({
        ...tablet,
        description: JSON.stringify(tablet.description),
      })),
      {},
    );

    for (const { oldName, newName } of columnsToRename) {
      await queryInterface.renameColumn(TABLE_NAME, oldName, newName);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tablets', {
      name: tablets.map(({ name }) => name),
    });
  }
};
