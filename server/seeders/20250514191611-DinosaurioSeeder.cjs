'use strict';
const { dinosaurios } = require('../factories/DinosaurioFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dinosaurioDefault = await dinosaurios()
    await queryInterface.bulkInsert('dinosaurios', dinosaurioDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dinosaurios', null, {})
  }
};
