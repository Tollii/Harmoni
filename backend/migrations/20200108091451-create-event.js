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
        type: Sequelize.STRING
      },
      event_start: {
        type: Sequelize.DATE
      },
      event_end: {
        type: Sequelize.DATE
      },
      personnel: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      volunteers: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      event_image: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      archived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      event_typeID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Event_Types",
          key: "id"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Events");
  }
};
