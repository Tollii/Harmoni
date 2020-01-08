"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event_name: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.BLOB
      },
      event_start: {
        type: Sequelize.DATE
      },
      event_end: {
        type: Sequelize.DATE
      },
      personnel: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      archived: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Events");
  }
};
