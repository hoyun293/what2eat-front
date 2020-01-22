import axios from '../utils/http-util'

export const getExampleNewsApi = () => {
  return axios.get('http://localhost:5050/api/news')
}
