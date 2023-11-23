'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.belongsToMany(models.Group, { through: 'UserGroup', foreignKey: 'userId' });
    User.hasMany(models.Task, { foreignKey: 'userId' });
  };

  return User;
};