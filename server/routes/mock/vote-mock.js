const faker = require('faker/locale/ko')
const _ = require('lodash')
faker.seed(5)

const createPlaces = count =>
  _.times(count, num => ({
    placeId: faker.random.uuid(),
    rating: faker.random.number(),
    name: faker.lorem.words(),
    photoUrl: faker.image.imageUrl(),
    latitude: faker.address.latitude(),
    latutidue: faker.address.longitude()
  }))

module.exports = {
  places: createPlaces(20)
}
