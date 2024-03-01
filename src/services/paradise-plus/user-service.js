import http from '../http-service'
import { POPULAR_USERS } from './constants'

export const getUser = async () => {
  const user = {
    username: 'Usuario3000',
    name: 'Cornelio Delgado',
    roles: ['user']
  }

  const prom = new Promise((resolve) => {
    setTimeout(() => {
      resolve(user)
    }, 2000)
  })

  return await prom.then((rpta) => rpta)
}

export const getPopularUsers = async () => {
  const users = POPULAR_USERS
  const prom = new Promise((resolve) => {
    setTimeout(() => {
      resolve(users)
    }, 2000)
  })
  return await prom.then((rpta) => rpta)
}

export const fetchUserProfilesByFilter = async (_, { arg }) => {
  const params = {
    method: 'get',
    url: '/user-profile',
    data: arg
  }

  return await http
    .request(params)
    .then((response) => {
      return response?.data
    })
    .catch(() => null)
}
