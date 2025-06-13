'use strict';
const { usuarios } = require('../factories/UserFactory.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const userModel = await import('../models/user.js')
    const user = userModel.default

    const rolModel = await import('../models/rol.js')
    const rol = rolModel.default

    const userRolModel = await import('../models/userrol.js')
    const userRol = userRolModel.default

    const defaultUsers = await usuarios()

    for ( const usuario of defaultUsers ) {
      const usuarioCreado = await user.create(usuario, {})

      if (usuario.roles) {
        const roles = await rol.findAll({where: { name: usuario.roles }})

        for (const rol of roles) {
          await userRol.create({ userId: usuarioCreado.dataValues.id, rolId: rol.dataValues.id })
        }
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
};
