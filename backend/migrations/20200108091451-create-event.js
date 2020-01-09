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
      },
      event_typeID: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
