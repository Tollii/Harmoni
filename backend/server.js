global.__basedir = __dirname;

const express = require("express");
const app = express();
require("dotenv").config();

// cors
const cors = require("cors");
app.use(cors());

// bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sequelize
const sequelize = require("./database/connection");
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// Swagger
const expressSwagger = require("express-swagger-generator")(app);
let options = {
  swaggerDefinition: {
    info: {
      description: "Server API for Harmony",
      title: "Harmony API",
      version: "1.0.0"
    },
    produces: ["application/json", "application/xml"],
    schemes: ["http", "https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: ""
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ["./router/*.js"] //Path to the API handle folder
};
expressSwagger(options);

// Endpoints
require("./router/index")(app, sequelize);

module.exports = app;
