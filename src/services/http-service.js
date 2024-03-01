import axios from 'axios'
import { handleError } from './error-service'

const httpAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
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

function setJwt(jwt) {
  httpAxios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
}

const request = ({ method = 'get', url, data }) => {
  let requestParams = {
    method,
    url,
  }

  if (method == 'get') {
    requestParams.params = data
  } else {
    requestParams.data = data
  }

  return httpAxios.request(requestParams)
}

const httpService = {
  request,
  setJwt,
}

export default httpService
