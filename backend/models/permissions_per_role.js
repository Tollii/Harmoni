'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permissions_per_role = sequelize.define('Permissions_per_role', {
    roleID: DataTypes.UUID,
    permissionID: DataTypes.UUID
  }, {});
  Permissions_per_role.associate = function(models) {
    // associations can be defined here
  };
  return Permissions_per_role;
};