import { api } from '@/utils/api'
import { verificationCodeEmail, verificationCodePhone } from '@/endpoints'

export const sendEmailCode = (data) => {
  return api.put(verificationCodeEmail, data)
}

export const sendPhoneCode = (data) => {
  return api.put(verificationCodePhone, data)
}
