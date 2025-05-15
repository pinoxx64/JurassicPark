'use strict';
const { celdaDinosaurios } = require('../factories/CeldaDinosaurioFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const celdaDinosauriosDefault = await celdaDinosaurios()
    await queryInterface.bulkInsert('celdadinosaurios', celdaDinosauriosDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('celdadinosaurios', null, {})
  }
};
