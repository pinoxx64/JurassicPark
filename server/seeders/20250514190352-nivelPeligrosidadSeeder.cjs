'use strict';
const { nivelPeligrosidad } = require('../factories/NivelPeligrosidadFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const nivelPeligrosidadDefault = await nivelPeligrosidad()
    await queryInterface.bulkInsert('nivelpeligrosidads', nivelPeligrosidadDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('nivelpeligrosidads', null, {})
  }
};
