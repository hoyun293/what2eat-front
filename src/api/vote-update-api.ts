import axios from '../utils/http-with-credential-util'
import { IPostVote } from '../redux/vote-insert/vote-insert-payloads'

export const postVoteUpdate = (p: IPostVote, voteUrl: string) => {
  return axios.put(`/votes/${voteUrl}`, p)
}
