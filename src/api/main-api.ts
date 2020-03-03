import axios from '../utils/http-with-credential-util'

export const mainVotesApi = () => {
  return axios.post('/votes')
}
