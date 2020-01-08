'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event_Types = sequelize.define('Event_Types', {
    event_type: DataTypes.STRING
  }, {});
  Event_Types.associate = function(models) {
    Event_Types.hasMany(models.Events, { foreignKey: 'event_typeID', sourceKey: 'id'});
  };
  return Event_Types;
};
