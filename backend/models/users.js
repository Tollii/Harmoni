'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hash: DataTypes.STRING,
    salt: DataTypes.STRING,
    phone: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    Users.belongsToMany(models.Event, {as: 'event', through: 'Contracts', foreignKey: 'userID', otherKey: 'eventID'});
    Users.belongsToMany(models.Event, {as: 'event', through: 'Riders', foreignKey: 'userID', otherKey: 'eventID', otherKey: 'rider_typeID'});
    Users.belongsToMany(models.Rider_Types, {as: 'rider_types', through: 'Riders', foreignKey: 'userID', otherKey: 'eventID', otherKey: 'rider_typeID'});
  };
  return Users;
};
