'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  });

  Group.associate = (models) => {
    Group.belongsToMany(models.User, { through: 'UserGroup', foreignKey: 'groupId' });
  };

  return Group;
};