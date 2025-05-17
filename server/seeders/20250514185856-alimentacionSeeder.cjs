'use strict';
const { alimentacion } = require('../factories/AlimentacionFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const alimentacionDefault = await alimentacion()
    await queryInterface.bulkInsert('alimentacions', alimentacionDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alimentacions', null, {})
  }
};
