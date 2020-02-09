import { IGetVotePlaces } from './../redux/vote/vote-payloads'
import axios from '../utils/http-with-credential-util'

export const getVotePlaces = (p: IGetVotePlaces) => {
  return axios.get('/places', { params: p })
}

export const postVote = (p: any) => {
  return axios.post('/vote', p)
}
