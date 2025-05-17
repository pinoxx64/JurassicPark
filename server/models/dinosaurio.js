'use strict';

import { DataTypes, Model } from "sequelize";
import db from '../database/Connection.js'

  class dinosaurio extends Model {
    static associate(models) {}
  }
  dinosaurio.init({
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
    },  
    razaId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'razasaurios',
        key: 'id'
      }
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nivelPeligrosidadId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'nivelPeligrosidads',
        key: 'id'
      }
    },
    alimentacionId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'alimentacions',
        key: 'id'
      }
    }
  }, {
    sequelize: db,
    modelName: 'dinosaurio',
    tableName: 'dinosaurios',
    timestamps: true,
    paranoid: true
  });
  
  export default dinosaurio;