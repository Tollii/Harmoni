'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    role_name: DataTypes.STRING
  }, {});
  Roles.associate = function(models) {
    Roles.belongsToMany(models.permissions, { as: 'Roles', through: 'Permissions_per_role', foreignKey: 'roleID'} )
  };
  return Roles;
};
