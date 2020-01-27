const faker = require('faker/locale/ko')
const _ = require('lodash')
faker.seed(5)

const placeNames = ['얌샘김밥', '중앙회장', '표표 마라탕', '유류식당', '스시오']
const imageUrls = [
  '/assets/img/food-1.jpeg',
  '/assets/img/food-2.jpeg',
  '/assets/img/food-3.jpeg',
  '/assets/img/food-4.jpeg'
]

const createPlaces = count =>
  _.times(count, num => ({
    placeId: faker.random.uuid(),
    rating: (Math.random() * 5).toFixed(1),
    ratingCount: faker.random.number() % 50,
    name: placeNames[faker.random.number() % placeNames.length],
    imageUrl: imageUrls[faker.random.number() % imageUrls.length],
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude()
  }))

module.exports = {
  places: createPlaces(20)
}
