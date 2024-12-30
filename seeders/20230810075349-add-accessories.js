'use strict';

/** @type {import('sequelize-cli').Migration} */
const accessories = require('./20230810075349-add-accessories.json');


const TABLE_NAME = 'accessories';

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
      accessories.map((accessory) => ({
        ...accessory,
        description: JSON.stringify(accessory.description),
      })),
      {},
    );

    for (const { oldName, newName } of columnsToRename) {
      await queryInterface.renameColumn(TABLE_NAME, oldName, newName);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tablets', {
      name: accessories.map(({ name }) => name),
    });
  }
};
