const router = require('express').Router()
const { news } = require('./mock/example-mock')

router.get('/news', function(req, res) {
  res.send({
    result: {
      news
    }
  })
})

module.exports = router
