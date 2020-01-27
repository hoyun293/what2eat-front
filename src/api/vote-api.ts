import axios from '../utils/http-with-credential-util'

export const getVotePlaces = (p: any) => {
  return axios.get('/places', { params: p })
}

export const postVote = (p: any) => {
  return axios.post('/vote', p)
}
