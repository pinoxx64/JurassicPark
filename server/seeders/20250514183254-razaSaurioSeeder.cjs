'use strict';
const { razaSaurio } = require('../factories/RazaSaurioFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const razasSaurio = await razaSaurio()
    await queryInterface.bulkInsert('razasaurios', razasSaurio, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('razasaurios', null, {})
  }
};
