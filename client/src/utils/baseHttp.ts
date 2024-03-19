import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const token = localStorage.getItem('access_token')

declare module 'axios' {
  export interface AxiosRequestConfig {}
}

export const $authApi = axios.create({
  baseURL: `${API_URL}/auth`
})

export const $api = axios.create({
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
})
