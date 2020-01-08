'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contracts = sequelize.define('Contracts', {
    contract: DataTypes.TEXT,
    userID: DataTypes.INTEGER,
    eventID: DataTypes.INTEGER
  }, {});
  Contracts.associate = function(models) {
    // associations can be defined here
  };
  return Contracts;
};