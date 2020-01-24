import axios from 'axios'
import config from '../config'
import * as _ from 'lodash'

const apiKey = config.GOOGLE_API_KEY

// GOOGLE PLACE API는 SERVER에서 호출되게끔 제작된 API로서, CORS를 허용하지 않는다.
// 프론트에서 API를 호출하기 위해서는 아래와 같은 방법으로 PROXY 서버를 통해, CORS 허용 헤더를 붙여 RESPONSE시킨다.
// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const commonGooglePlaceAddr = 'https://maps.googleapis.com/maps/api/place'
// const googlePlaceNearByAddr = `${commonGooglePlaceAddr}/nearbysearch/json?language=ko&type=restaurant`
// const googlePlaceDetailAddr = `${commonGooglePlaceAddr}/nearbysearch/json?language=ko&type=restaurant`
const googlePlacePhotoAddr = `${commonGooglePlaceAddr}/photo?maxwidth=400&photoreference=`
const googleGeocodeAddr = `https://maps.googleapis.com/maps/api/geocode/json?key=${config.GOOGLE_GEO_KEY}`

interface IGetPlaceList {
  radius: number
  latitude: number
  longitude: number
  sortBy: 'prominence' | 'distance' | 'favorite'
  nextPageToken?: string
}

export const getAddressByCoordinate = async (lat: number, lng: number) => {
  return axios.get(proxyUrl + googleGeocodeAddr, {
    params: {
      latlng: `${lat},${lng}`
    }
  })
}

export const getPhotoUrl = async (photoReference: string) => {
  // console.log(proxyUrl + googlePlacePhotoAddr + photoReference)

  return axios.get(proxyUrl + googlePlacePhotoAddr + photoReference, {
    params: {
      key: apiKey
    }
  })
}

export const getPlaceList = async ({
  radius,
  longitude,
  latitude,
  sortBy,
  nextPageToken = ''
}: IGetPlaceList) => {
  console.log(`${latitude},${longitude}`)

  // const { data } = await axios.get(proxyUrl + googlePlaceNearByAddr, {
  //   params: {
  //     key: apiKey,
  //     location: `${longitude},${latitude}`,
  //     radius,
  //     rankby: sortBy,
  //     pagetoken: nextPageToken
  //   }
  // })
  // console.log(data)

  // const photoReferences = _.map(data.results, v => _.get(v, 'photos[0].photo_reference'))
  // console.log(photoReferences)

  const x: any = await getPhotoUrl(
    'CmRaAAAA-f_6wF9QLBN5hJTQY9Bg9xDS2iosXJoTWo0NGQxr0QNM8VURKSQF4nHxdfpj2_fsCHAo7y03-qcP9erjNfWdYNEyyUyaYso17vatTccOOmMwLE3IndYG0lAIY34codK-EhCvDPT55VkEsrnAe96aUbRaGhQuVslWtqwNS6BuSnr36SQgev6-bg'
  )
  // console.log(x.data)
  // console.log(photoReference)
  // console.log(photoReferences)
  // const res = await Promise.all(_.map(photoReferences, v => (v ? getPhotoUrl(v) : new Promise(r => r))))
  // const res = await Promise.all(_.map(photoReferences, v => v && getPhotoUrl(v)))
  // console.log(res)

  // places = places.concat(data.results)
  // console.log(data.next_page_token)
  // count++
  // if (!data.next_page_token || count > 3) return places
  // getPlaceList({ radius, longitude, latitude, sortBy, nextPageToken: data.next_page_token })
  // setTimeout(
  //   () => getPlaceList({ radius, longitude, latitude, sortBy, nextPageToken: data.next_page_token }),
  //   1200
  // )
  // setTimeout(
  //   () => getPlaceList({ radius, longitude, latitude, sortBy, nextPageToken: data.next_page_token }),
  //   2000
  // )
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
