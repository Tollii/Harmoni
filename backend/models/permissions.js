'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define('Permissions', {
    description: DataTypes.TEXT
  }, {});
  Permissions.associate = function(models) {
    Permissions.belongsToMany(models.Roles, { as: 'roles', through: 'Permissions_per_role', foreignKey: 'permissionID', otherKey: 'roleID'});
  };
  return Permissions;
};
