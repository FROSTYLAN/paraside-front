import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  login as loginService,
  loginAdmin as loginAdminService,
  register as registerService,
  logout as logoutService,
  registerConfirm as registerConfirmService,
  loginGoogle as loginGoogleService,
  loginFacebook as loginFacebookService,
  resetPasswordCode as resetPasswordCodeService,
  resetPasswordVerify as resetPasswordVerifyService,
  resetPassword as resetPasswordService
} from '@/services/auth-service'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const login = async ({ username, password }) => {
    setLoading(true)
    const isNewUser = await loginService({ username, password })
   
    setLoading(false)
    if (isNewUser) {
      return navigate('/initial-steps')
    } else {
      return navigate('/plus/home')
    }
  }

  const loginAdmin = async (data) => {
    setLoading(true)
    const admin = await loginAdminService({ 
      username: data.admin, 
      password: data.password
    })

    if (admin) {
      navigate('/admin')
    }

    setLoading(false)
  }

  const register = async ({ username, password }) => {
    setLoading(true)
    const user = await registerService({ username, password })
    if (user) {
      return navigate('/register/confirm', { state: { user } })
    }
    setLoading(false)
  }

  const registerConfirm = async ({ username, code }) => {
    setLoading(true)
    const isNewUser = await registerConfirmService({ username, code })
    
    setLoading(false)
    if (isNewUser) {
      return navigate('/initial-steps')
    } else {
      return navigate('/plus/home')
    }
  }

  const loginGoogle = async ({ code }) => {
    setLoading(true)
    console.log(code)
    const isNewUser = await loginGoogleService({ code })
    setLoading(false)
    if (isNewUser) {
      return navigate('/initial-steps')
    } else {
      return navigate('/plus/home')
    }
  }

  const loginFacebook = async ({ access_token }) => {
    setLoading(true)
    const isNewUser = await loginFacebookService({ access_token })
    setLoading(false)
    if (isNewUser) {
      return navigate('/initial-steps')
    } else {
      return navigate('/plus/home')
    }
  }

  const resetPasswordCode = async ({ username }) => {
    setLoading(true)
    const response = await resetPasswordCodeService({ username })
    setLoading(false)
    return response
  }

  const resetPasswordVerify = async ({ username, code }) => {
    setLoading(true)
    const response = await resetPasswordVerifyService({ username, code })
    setLoading(false)
    return response
  }

  const resetPassword = async ({ username, password, confirmPwd }) => {
    setLoading(true)
    const response = await resetPasswordService({ username, password, confirmPwd })
    setLoading(false)
    return response
  }

  const logout = () => {
    setLoading(true)
    logoutService()
    setLoading(false)
  }

  return {
    login,
    loginAdmin,
    register,
    registerConfirm,
    loginGoogle,
    loginFacebook,
    resetPasswordCode,
    resetPasswordVerify,
    resetPassword,
    logout,
    loading,
  }
}
