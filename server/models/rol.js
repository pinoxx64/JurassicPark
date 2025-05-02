'use strict';

import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'

class Rol extends Model {
  static associate(models) { }
}

Rol.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
  sequelize: db,
  modelName: 'Rol',
  tableName: 'Rols',
  timestamps: true,
  paranoid: true
});

export default Rol;