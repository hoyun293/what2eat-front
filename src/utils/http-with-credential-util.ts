import axios from 'axios'
import config from '../config'

const _axios = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a response interceptor
_axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log(error)
    if (error.status === 403) {
      localStorage.removeItem('token')
      window.location.reload()
    }

    // Do something with response error
    return Promise.reject(error)
  }
)

export const setAuthoriation = (token: string) => {
  _axios.defaults.headers.common['Authorization'] = token
}

export default _axios
