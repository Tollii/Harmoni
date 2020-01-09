module.exports = app => {
  
  const models = require('../models')
    require("./event_types")(app, models, "/event_types");
  require('./users')(app, models, '/user')
  require('./event')(app, models, '/event')
  require('./tickets')(app, models, '/ticket')
  require('./contracts')(app, models, '/contract')
  require('./rider_types')(app, models, '/rider_type')
  require('./roles')(app, models, '/role')

};


