import { api } from '@/utils/api'
import {
  userLinkEmail,
  userLinkPhone,
  userUnlinkEmail,
  userUnlinkPhone
} from '@/endpoints'

export const linkEmail = (data) => {
  return api.put(userLinkEmail, data)
}

export const linkPhone = (data) => {
  return api.put(userLinkPhone, data)
}

export const unlinkEmail = (data) => {
  return api.put(userUnlinkEmail, data)
}

export const unlinkPhone = (data) => {
  return api.put(userUnlinkPhone, data)
}
