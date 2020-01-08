const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_DATABASE, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql'
});

console.log(`Connected to ${process.env.DATABASE_DATABASE}`);

module.exports = sequelize;
global.sequelize = sequelize;