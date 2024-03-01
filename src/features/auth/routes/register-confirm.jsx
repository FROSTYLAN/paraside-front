import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RegisterConfirmForm } from '../components/register-confirm-form'

export const RegisterConfirm = () => {
  let location = useLocation()
  let navigate = useNavigate()

  if (!location?.state?.user) {
    navigate('/login')
  }

  return <RegisterConfirmForm user={location?.state?.user} />
}
