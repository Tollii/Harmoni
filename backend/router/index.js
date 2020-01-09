module.exports = (app) => {

  const models = require('../models')

  require('./users')(app, models, '/user')

}