module.exports = app => {

  const models = require("../models");
  const auth = require("../dao/authentication")(models);
  require("./event_types")(app, models, "/event_types", auth);
  require("./users")(app, models, "/user", auth);
  require("./events")(app, models, "/event", auth);
  require("./tickets")(app, models, "/ticket", auth);
  require("./contracts")(app, models, "/contract", auth);
  require("./rider_types")(app, models, "/rider_type", auth);
  require("./roles")(app, models, "/role", auth);
  require('./riders')(app, models, '/rider', auth);
  require('./authentication')(app, models, auth);
  require('./files')(app, models, auth);
  require('./mailer')(app, models, "/mailer", auth);

};
