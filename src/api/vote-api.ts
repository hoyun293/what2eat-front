import { IGetVotePlaces, IPostVote } from './../redux/vote-insert/vote-insert-payloads'
import axios from '../utils/http-with-credential-util'

export const getVotePlaces = (p: IGetVotePlaces) => {
  return axios.get('/restaurants', { params: p })
}

export const postVote = (p: IPostVote) => {
  return axios.post('/votes', p)
}

export const getVote = (voteUrl: string) => {
  return axios.get(`/votes/${voteUrl}`)
}
