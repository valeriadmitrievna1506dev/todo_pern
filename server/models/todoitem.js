'use strict';
const sequelize = require('./../../database')
const { DataTypes } = require('sequelize');

const TodoItem = sequelize.define('TodoItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  done: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  bodyText: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '',
  }
});

module.exports = TodoItem;
