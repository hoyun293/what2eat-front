import axios from '../utils/http-with-credential-util'

export const getRestaurantDetail = (p: string) => {
  return axios.get(`/restaurant-detail/${p}`)
}

//export const postVote = (p: IPostVote) => {
// return axios.post('/votes', p)
//}
