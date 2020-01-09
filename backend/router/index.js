module.exports = (app) => {

  const models = require('../models')

  require('./users')(app, models, '/user')
  require('./event')(app, models, '/event')
  require('./tickets')(app, models, '/ticket')
  require('./contracts')(app, models, '/contract')
  require('./rider_types')(app, models, '/rider_type')

}
