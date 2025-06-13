'use strict';
const { celda } = require('../factories/CeldaFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const celdasDefault = await celda()
    await queryInterface.bulkInsert('celdas', celdasDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('celdas', null, {})
  }
};
