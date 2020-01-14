'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    role_name: DataTypes.STRING
  }, {});
  Roles.associate = function(models) {
    Roles.hasMany(models.Users, {foreignKey: 'roleID', sourceKey: 'id'});
  };
  return Roles;
};
