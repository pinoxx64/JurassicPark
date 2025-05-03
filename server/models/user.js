'use strict';

import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'
import UserRols from "./userrol.js";
import Rol from "./rol.js"
import bcrypt from "bcrypt";

class User extends Model {
  static associate(models) { }
}

User.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 10))
    }
  }
}, {
  hooks: {
    afterCreate: async (user, options) => {
      const rol = await Rol.findOne({ where: { name: 'Usuario' } })
      if (rol) {
        await UserRols.create({ userId: user.id, rolId: rol.id })
      }
      return Promise.resolve()
    },
    afterBulkCreate: async (users, options) => {
      const rol = await Rol.findOne({ where: { name: 'Usuario' }} )
      if (rol) {
        for (const user of users) {
          await UserRols.create({ userId: user.id, rolId: rol.id })
        }
      }
      return Promise.resolve()
    }
  },
  sequelize: db,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  paranoid: true
});

export default User