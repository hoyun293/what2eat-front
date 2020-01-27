const example = require('./example-route')
const vote = require('./vote-route')

module.exports = function(app) {
  app.use('/api', example)
  app.use('/api', vote)
}
