'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define('Permissions', {
    description: DataTypes.TEXT
  }, {});
  Permissions.associate = function(models) {

  };
  return Permissions;
};