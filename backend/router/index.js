module.exports = app => {
  const models = require("../models");

  require("./users")(app, models, "/user");
  require("./events")(app, models, "/event");
  require("./event_types")(app, models, "/event_types");
  require("./permissions")(app, models, "/permissions");
};
