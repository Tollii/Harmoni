'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define('Permissions', {
    description: DataTypes.TEXT
  }, {});
  Permissions.associate = function(models) {
    Permissions.belongsToMany(models.roles, { as: 'Permissions', through: 'Permissions_per_role', foreignKey: 'permissionID'});
  };
  return Permissions;
};
