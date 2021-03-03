'use strict';
const sequelize = require('./../../database');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const TodoItem = require('./todoitem');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue(
        'password',
        bcrypt.hashSync(value, bcrypt.genSaltSync(8), null)
      );
    },
  },
});

User.hasMany(TodoItem, { onDelete: 'CASCADE' });
TodoItem.belongsTo(User);

module.exports = User;
