import axios from 'axios' // eslint-disable-line

interface IResponse {
  result: any
  errorMessage: string
}

declare module 'axios' {
  export interface AxiosInstance {
    request<T = IResponse>(config: AxiosRequestConfig): Promise<T>
    request<T = IResponse>(config: AxiosRequestConfig): Promise<T>
    get<T = IResponse>(url: string, config?: AxiosRequestConfig): Promise<T>
    delete<T = IResponse>(url: string, config?: AxiosRequestConfig): Promise<T>
    head<T = IResponse>(url: string, config?: AxiosRequestConfig): Promise<T>
    post<T = IResponse>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
    put<T = IResponseny>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
    patch<T = IResponse>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  }
}
