import axios from 'axios'

// import { useEffect, useState, Dispatch, SetStateAction } from 'react'

export const Axios = () =>
  axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: {
      'Content-type': 'application/json'
    }
  })

export const AxiosWithJwt = (jwtToken: string) =>
  axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: {
      'Content-type': 'application/json',
      'authorization': `Bearer ${jwtToken}`
    }
  })

// export interface IResponse {
//   isLoading: boolean
//   isError: boolean
//   errorMessage: string
//   data: any
//   setData: Dispatch<SetStateAction<{}>>
// }

// export const requestHttpWithHook = (fetchApi: any, params: object, refetch: Array<any> = []): IResponse => {
//   const [data, setData] = useState({})
//   const [isLoading, setIsLoading] = useState(false)
//   const [isError, setIsError] = useState(false)
//   const [errorMessage, setErrorMessage] = useState('')

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsError(false)
//       setIsLoading(true)

//       try {
//         const result = await fetchApi(params)
//         setData(result.data)
//       } catch (error) {
//         setIsError(true)
//         setErrorMessage(error.message)
//       }

//       setIsLoading(false)
//     }

//     fetchData()
//   }, [fetchApi, params])

//   return { data, isLoading, isError, errorMessage, setData }
// }
