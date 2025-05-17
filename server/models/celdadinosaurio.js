'use strict';

import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'

  class celdaDinosaurio extends Model {
    static associate(models) {}
  }
  celdaDinosaurio.init({
    celdaId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'celdas',
        key: 'id'
      }
    },
    dinosaurioId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'dinosaurios',
        key: 'id'
      }
    }
  }, {
    sequelize: db,
    modelName: 'celdaDinosaurio',
    tableName: 'celdaDinosaurios',
    timestamps: true
  });

  export default celdaDinosaurio