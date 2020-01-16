'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rider_Types = sequelize.define('Rider_Types', {
    description: DataTypes.TEXT
  }, {});
  Rider_Types.associate = function(models) {
    Rider_Types.belongsToMany(models.Users, { as: 'users', through: 'Riders', foreignKey: 'rider_typeID', otherKey: 'eventID', otherKey: 'userID'});
    Rider_Types.belongsToMany(models.Events, { as: 'events', through: 'Riders', foreignKey: 'rider_typeID', otherKey: 'eventID', otherKey: 'userID'});
  };
  return Rider_Types;
};
