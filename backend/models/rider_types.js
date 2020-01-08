'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rider_Types = sequelize.define('Rider_Types', {
    description: DataTypes.TEXT
  }, {});
  Rider_Types.associate = function(models) {
    // associations can be defined here
  };
  return Rider_Types;
};