import axios from '../utils/http-with-credential-util'

export const postUserVotes = (voteId: string, placeIds: string[]) => {
  return axios.post(`/user-votes/${voteId}`, { placeIds })
}
