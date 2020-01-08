'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event_Types = sequelize.define('Event_Types', {
    event_type: DataTypes.STRING
  }, {});
  Event_Types.associate = function(models) {
    // associations can be defined here
  };
  return Event_Types;
};