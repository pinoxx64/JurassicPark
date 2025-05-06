'use strict';
import {roles} from '../factories/RolFactory.cjs'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const rolesDefault = await roles()
    await queryInterface.bulkInsert('roles', rolesDefault, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {})
  }
};
