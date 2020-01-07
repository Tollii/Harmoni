const express = require( "express" );
const app = express();
const port = 8080; // default port to listen
const sequelize = require('./database/connection');
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

require('./router/index')(app, sequelize)

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
