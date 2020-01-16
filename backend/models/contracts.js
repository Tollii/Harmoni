'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contracts = sequelize.define('Contracts', {
    contract: DataTypes.STRING,
    userID: DataTypes.INTEGER,
    eventID: DataTypes.INTEGER
  }, {});
  Contracts.associate = function(models) {
  };
  return Contracts;
};