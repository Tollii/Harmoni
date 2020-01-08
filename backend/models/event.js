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
    // associations can be defined here
  };
  return Event;
};
