import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import type { instanceObject } from '~/composables/format'
import { formatJsonToUrlParams } from '~/composables/format'
import { useAuthStore } from '~/stores/auth'

const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT

// config.headers.common.Authorization = `Bearer ${token}`

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000 * 30,
  headers: {
    'Content-Type': 'application/json',
    'enl-token': import.meta.env.VITE_MODULE_TOKEN,
  },
})

const axiosFileInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  responseType: 'blob',
  timeout: 1000 * 30,
  headers: {
  },
})

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const useAuth = useAuthStore()
    if (useAuth.isAuthenticated)
      config.headers.common.Authorization = `Bearer ${useAuth.jwt}`
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200)
      return response

    return response
  },
  (error: AxiosError) => {
    const { response } = error
    if (response) {
      if (response.status === 401) {
        const useAuth = useAuthStore()
        useAuth.logout()
      }

      return Promise.reject(response.data)
    }

    return Promise.reject(error)
  },
)
const service = {
  get: (url: string, data?: object) => axiosInstance.get(url, { params: data }),
  getFile: (url: string, data?: object) => axiosFileInstance.get(url, { params: data }),
  post: (url: string, data?: object) => axiosInstance.post(url, data),
  put: (url: string, data?: object) => axiosInstance.put(url, data),
  delete: (url: string, data?: object) => axiosInstance.delete(url, data),
  upload: (url: string, file: File) =>
    axiosInstance.post(url, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  download: (url: string, data: instanceObject) => {
    const downloadUrl = `${url}?${formatJsonToUrlParams(data)}`
    window.location.href = downloadUrl
  },
}

export default service
