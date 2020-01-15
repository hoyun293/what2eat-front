import axios from '../utils/http-util'

export const getExampleNewsApi = () => {
  return axios.get('https://api.hnpwa.com/v0/news/1.json')
}
