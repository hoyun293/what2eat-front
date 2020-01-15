import axios from 'axios'
import config from '../config'

const apiKey = config.GOOGLE_API_KEY

// GOOGLE PLACE API는 SERVER에서 호출되게끔 제작된 API로서, CORS를 허용하지 않는다.
// 프론트에서 API를 호출하기 위해서는 아래와 같은 방법으로 PROXY 서버를 통해, CORS 허용 헤더를 붙여 RESPONSE시킨다.
// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const googlePlaceAddr =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?language=ko&type=restaurant'

interface IGetPlaceList {
  radius: number
  latitude: number
  longitude: number
  sortBy: 'prominence' | 'distance' | 'favorite'
  nextPageToken?: string
}

// rankby : prominence or distance
let places: any = []
let count = 0
export const getPlaceList = async ({
  radius,
  longitude,
  latitude,
  sortBy,
  nextPageToken = ''
}: IGetPlaceList) => {
  console.log(`${latitude},${longitude}`)

  const { data } = await axios.get(proxyUrl + googlePlaceAddr, {
    params: {
      key: apiKey,
      location: `${longitude},${latitude}`,
      radius,
      rankby: sortBy,
      pagetoken: nextPageToken
    }
  })
  console.log(data)

  places = places.concat(data.results)
  console.log(data.next_page_token)
  count++
  if (!data.next_page_token || count > 3) return places
  setTimeout(
    () => getPlaceList({ radius, longitude, latitude, sortBy, nextPageToken: data.next_page_token }),
    1200
  )
}

//   let restaurantList = []

//   //음식점 사진
//   let restaurantPhotosUrl = commonGooglePlaceAddr + '/photo?maxwidth=400&photoreference='

//   //음식점 상세정보
//   let restaurantDetail = commonGooglePlaceAddr + '/details/json?'
//   let restaurantDetailFields = restaurantDetail + 'fields=name,photo,vicinity,geometry,'
//   restaurantDetailFields += 'address_component,formatted_address,adr_address,opening_hours,'
//   restaurantDetailFields +=
//     'rating,formatted_phone_number,price_level,reviews,user_ratings_total,permanently_closed&place_id='

//   await axios.get(nearBySearch).then(res => {
//     let results = res.data.results
//     for (let i = 0; i < results.length; i++) {
//       if (results[i].photos == undefined)
//         //사진 미제공 음식점 예외 처리
//         continue

//       let photoUrl = restaurantPhotosUrl + results[i].photos[0].photo_reference + '&key=' + apiKey
//       let restaurantDetailUrl = restaurantDetailFields + results[i].place_id + '&key=' + apiKey

//       let obj = new Object()
//       obj.name = results[i].name
//       obj.photo_url = photoUrl
//       obj.detail_url = restaurantDetailUrl

//       restaurantList.push(obj)
//     }
//   })

//   return {
//     result: restaurantList
//   }
// })
