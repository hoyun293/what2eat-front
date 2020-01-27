const example = require('./example-route')
const vote = require('./vote-route')
const vote_room = require('./vote-room-route')
module.exports = function(app) {
  app.use('/api', example)
  app.use('/api', vote)
  app.use('/api', vote_room)
}
