import axios from 'axios'
import config from '../config'

interface IAxiosResponse {
  data: IResponse
}

interface IResponse {
  result: any
  errorMessage: string
}

const _axios = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
  transformResponse: (r: IAxiosResponse) => r,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a response interceptor
_axios.interceptors.response.use(
  response => {
    return JSON.parse(response.data)
  },
  error => {
    console.log(error)
    if (error.status === 401) {
      // TODO: alert 메세지 추가 필요
      // TODO: 앱 재활성화, 브라우저 active시 재로그인 로직 추가
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
