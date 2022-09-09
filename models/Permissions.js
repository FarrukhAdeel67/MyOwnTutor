"use strict";
const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "permission",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      deleted_at: {
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );
};
