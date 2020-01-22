const faker = require('faker/locale/ko')
const _ = require('lodash')

const createNews = count =>
  _.times(count, num => ({ title: faker.lorem.words(), user: faker.internet.userName() }))

module.exports = {
  news: createNews(100)
}
