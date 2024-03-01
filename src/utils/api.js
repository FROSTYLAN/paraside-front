import axios from 'axios'
import { handleError } from '../services/error-service'

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('access_token')}`
})

const httpAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

httpAxios.defaults.timeout = 20000 // 20s
httpAxios.defaults.retry = 1
httpAxios.defaults.retryDelay = 1000

httpAxios.interceptors.response.use(undefined, (err) => {
  const { config, message } = err
  if (!config || !config.retry) {
    return handleError(err)
  }

  // retry while Network timeout or Network Error
  if (!(message.includes('timeout') || message.includes('Network Error'))) {
    return handleError(err)
  }

  config.retry -= 1
  const delayRetryRequest = new Promise((resolve) => {
    setTimeout(() => {
      console.log('retry the request', config.url)
      resolve()
    }, config.retryDelay || 1000)
  })
  return delayRetryRequest.then(() => httpAxios(config))
})

export const api = {
  get: (url, params) =>
    httpAxios.get(url, {
      headers: getAuthHeader(),
      ...params
    }),
  post: (url, data) =>
    httpAxios.post(url, data, {
      headers: getAuthHeader()
    }),
  patch: (url, data) =>
    httpAxios.patch(url, data, {
      headers: getAuthHeader()
    }),
  put: (url, data) =>
    httpAxios.put(url, data, {
      headers: getAuthHeader()
    }),
  delete: (url) =>
    httpAxios.delete(url, {
      headers: getAuthHeader()
    })
}
