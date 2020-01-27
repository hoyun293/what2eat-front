const faker = require('faker/locale/ko')
const _ = require('lodash')
faker.seed(5)

const createRooms = count =>
  _.times(count, num => ({
    vote_room_key: faker.random.number(),
    vote_room_title: faker.random.words(),
    vote_room_status: faker.random.boolean(),
    is_private_status: faker.random.boolean()
  }))

module.exports = {
  rooms: createRooms(20)
}
