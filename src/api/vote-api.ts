import { IGetVotePlaces, IPostVote } from './../redux/vote/vote-payloads'
import axios from '../utils/http-with-credential-util'

export const getVotePlaces = (p: IGetVotePlaces) => {
  return axios.get('/restaurants', { params: p })
}

export const postVote = (p: IPostVote) => {
  return axios.post('/votes', p)
}
