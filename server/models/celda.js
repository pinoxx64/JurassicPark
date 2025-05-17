'use strict';

import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'

class celda extends Model {
  static associate(models) {}
}
celda.init({
    id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  nivelPeligrosidadId: {
    type: DataTypes.BIGINT,
    references: {
      model: 'nivelPeligrosidads',
      key: 'id'
    }
  },
  CantAlimento: {
    type: DataTypes.INTEGER
  },
  Averias: {
    type: DataTypes.INTEGER
  },
  NivelSeguridad: {
    type: DataTypes.INTEGER
  } 
}, {
  sequelize: db,
  modelName: 'celda',
  tableName: 'celdas',
  timestamps: true,
  paranoid: true
});

export default celda