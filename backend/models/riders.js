'use strict';
module.exports = (sequelize, DataTypes) => {
  const Riders = sequelize.define('Riders', {
    additions: DataTypes.TEXT,
    rider_typeID: DataTypes.INTEGER,
    eventID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER
  }, {});
  Riders.associate = function(models) {
    // associations can be defined here
  };
  return Riders;
};
