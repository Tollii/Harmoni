'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hash: DataTypes.STRING,
    phone: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    Users.belongsToMany(models.Events, {as: 'event_contract', through: 'Contracts', foreignKey: 'userID', otherKey: 'eventID'});
    Users.belongsToMany(models.Events, {as: 'event_riders', through: 'Riders', foreignKey: 'userID', otherKey: 'eventID', otherKey: 'rider_typeID'});
    Users.belongsToMany(models.Rider_Types, {as: 'rider_types', through: 'Riders', foreignKey: 'userID', otherKey: 'eventID', otherKey: 'rider_typeID'});
    Users.hasMany(models.Contracts, { foreignKey: "userID", sourceKey: "id", onDelete: 'cascade' });
    Users.hasMany(models.Riders, { foreignKey: "userID", sourceKey: "id",  onDelete: 'cascade' });

  };
  return Users;
};
