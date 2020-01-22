const example = require('./example-route')

module.exports = function(app) {
  app.use('/api', example)
}
