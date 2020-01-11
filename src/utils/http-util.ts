import axios from 'axios'
import config from '../config'

const _axios = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default _axios
