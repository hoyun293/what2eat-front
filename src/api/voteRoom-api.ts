import axios from '../utils/http-with-credential-util'

export const getMyVoteRooms = (p: any) => {
  return axios.post('/rooms', { params: p })
}

//export const postVote = (p: any) => {
//  return axios.post('/vote', p)
//}
