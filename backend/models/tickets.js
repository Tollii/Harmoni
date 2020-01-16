'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tickets = sequelize.define('Tickets', {
    ticket_name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    ticket_amount: DataTypes.INTEGER,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE
  }, {});
  Tickets.associate = function(models) {
    // associations can be defined here
  };
  return Tickets;
};
