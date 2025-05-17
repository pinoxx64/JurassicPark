'use strict';

import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'

class RazaSaurio extends Model {
  static associate(models) { }
}
RazaSaurio.init({
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
  timestamps: true,
  paranoid: true,
  modelName: 'RazaSaurio',
  tableName: 'RazaSaurios',
});

export default RazaSaurio