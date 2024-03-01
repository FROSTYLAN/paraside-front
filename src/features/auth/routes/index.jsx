import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useUser } from '@/hooks/use-user'

import { Login } from './login'
import { Register } from './register'
import { RegisterConfirm } from './register-confirm'
import { RegisterConfirmLink } from './register-confirm-link'
import { PasswordReset } from './password-reset'
import { AdminLogin } from './admin-login'

export const AuthRoutes = () => {
  const { user } = useUser()

  const location = useLocation()
  const pathName = location.state?.from || '/initial-steps'

  return user ? (
    <Navigate to={pathName} />
  ) : (
    <Routes>
      <Route path='/' element={<Navigate replace to={'/login'} />} />
      <Route path='/admin-login' element={<AdminLogin />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/register/confirm' element={<RegisterConfirm />} />
      <Route path='/register/confirm/link/:token' element={<RegisterConfirmLink />} />
      <Route path='/password-reset' element={<PasswordReset />} />
      <Route path='/*' element={<>Not Found</>} />
    </Routes>
  )
}
