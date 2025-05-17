'use strict';

import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'

class nivelPeligrosidad extends Model {
  static associate(models) { }
}
nivelPeligrosidad.init({
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
  modelName: 'nivelPeligrosidad',
  tableName: 'nivelPeligrosidads',
  timestamps: true,
  paranoid: true
});

export default nivelPeligrosidad;