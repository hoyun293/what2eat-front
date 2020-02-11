import axios from '../utils/http-with-credential-util'

export const getMyVoteRooms = (limit: number, orderby: boolean) => {
  return axios.get('/votes')
}

//export const postVote = (p: any) => {
//  return axios.post('/vote', p)
//}
