'use strict';

import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'

class UserRol extends Model {
  static associate(models) {

  }
}

UserRol.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.BIGINT,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  rolId: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Rol',
      key: 'id'
    }
  }
}, {
  sequelize: db,
  modelName: 'UserRol',
  tableName: 'userRols',
  timestamps: true
})

export default UserRol;