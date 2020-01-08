"use strict";
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      eventName: DataTypes.STRING,
      location: DataTypes.BLOB,
      eventStart: DataTypes.DATE,
      eventEnd: DataTypes.DATE,
      personnel: DataTypes.TEXT,
      description: DataTypes.TEXT,
      archived: DataTypes.BOOLEAN
    },
    {}
  );
  Event.associate = function(models) {
    Event.belongsToMany(models.Users, { as: 'users', through: 'Contracts', foreignKey: 'eventID', otherKey: 'userID'});
    Event.belongsToMany(models.Users, { as: 'users', through: 'Riders', foreignKey: 'eventID', otherKey: 'userID', otherKey: 'rider_typeID'});
    Event.belongsToMany(models.Rider_Types, { as: 'rider_types', through: 'Riders', foreignKey: 'eventID', otherKey: 'userID', otherKey: 'rider_typeID'});
    Event.hasMany(models.Tickets, {foreignKey: 'eventID', sourceKey: 'id'});
  };
  return Event;
};
