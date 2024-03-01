import { toast } from 'react-toastify'
import { auth } from '@/endpoints/api'
import { api } from '@/utils/api'
import { isEmail } from '@/utils/regex'
import {
  getAuthAdmin,
  getAuthRefreshToken,
  getAuthToken,
  getAuthUser,
  removeAuthData,
  saveAuthData
} from './token-service'


const addUsername = (username, data) => {
  const indEmail = isEmail(username)

  if (indEmail) {
    data.email = username
  } else {
    data.phone_number = username
  }

  return data
}

export const login = async ({ username, password }) => {
  let data = addUsername(username, {
    password
  })

  try {
    const res = await api.post(auth.login, data)

    if (res?.data?.tokens) {
      saveAuthData(res.data)

      return res.data.user.initial_steps
    }

    return null
  } catch {
    return null
  }
}

export const loginAdmin = async (data) => {
  try {
    const res = await api.post(auth.loginAdmin, data)

    console.log(res);

    if (res?.data?.tokens) {
      saveAuthData(res.data)

      return true
    }

    return null
  } catch {
    return null
  }
}

export const register = async ({ username, password }) => {
  let data = addUsername(username, {
    password
  })

  try {
    const res = await api.post(auth.register, data)
    return res?.data
  } catch {
    return null
  }
}

export const registerConfirm = async ({ username, code }) => {
  let data = addUsername(username, {
    code
  })

  try {
    const res = await api.post(auth.verifyAccount, data)
    toast.success('Se confirmó su registro satisfactoriamente.')
    return res.data.user.initial_steps
  } catch {
    return null
  }
}

export const loginGoogle = async ({ code }) => {
  let data = {
    code
  }

  try {
    const res = await api.post(auth.loginGoogle, data)

    saveAuthData(res.data)

    toast.success('Login successfully')

    return res.data.user.initial_steps
  } catch {
    return null
  }
}

export const loginFacebook = async ({ access_token }) => {
  let data = {
    access_token
  }

  try {
    const res = await api.post(auth.loginFacebook, data)

    saveAuthData(res.data)

    toast.success('Login successfully')

    return res.data.user.initial_steps
  } catch {
    return null
  }
}

export const logout = () => removeAuthData()

export const getAuthenticatedUser = () => {
  const user = getAuthUser()
  const access_token = getAuthToken()
  const refresh_token = getAuthRefreshToken()

  if (!!user && !!access_token && !!refresh_token) {
    // authorized
    // http.setJwt(access_token)
    return user
  }

  // not authorized
  const error = new Error('Not authorized!')
  error.status = 403
  throw error
}

export const getAuthenticatedAdmin = () => {
  const admin = getAuthAdmin()
  const access_token = getAuthToken()
  const refresh_token = getAuthRefreshToken()

  if (!!admin && !!access_token && !!refresh_token) {
    // authorized
    // http.setJwt(access_token)
    return admin
  }

  // not authorized
  const error = new Error('Not authorized!')
  error.status = 403
  throw error
}

export const resetPasswordCode = async ({ username }) => {
  let data = addUsername(username, {})

  try {
    const res = await api.post(auth.resetPasswordCode, data)
    return res?.status === 200
  } catch {
    return null
  }
}

export const resetPasswordVerify = async ({ username, code }) => {
  let data = addUsername(username, { code })

  try {
    const res = await api.post(auth.resetPasswordVerify, data)
    return res?.status === 200
  } catch {
    return null
  }
}

export const resetPassword = async ({ username, password, confirmPwd }) => {
  let data = addUsername(username, { password, confirm_password: confirmPwd })

  try {
    const res = await api.post(auth.resetPassword, data)
    return res?.status === 200
  } catch {
    return null
  }
}