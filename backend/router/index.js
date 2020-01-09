module.exports = (app) => {

  const models = require('../models')

  require('./users')(app, models.Users, '/user')
  require('./event')(app, models.Events, '/event')
  require('./tickets')(app, models.Tickets, '/ticket')


}
