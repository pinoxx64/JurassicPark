'use strict';

import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'

  class alimentacion extends Model {
    static associate(models) {}
  }
  alimentacion.init({
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
    modelName: 'alimentacion',
    tableName: 'alimentacions',
    timestamps: true,
    paranoid: true
  });

  export default alimentacion;