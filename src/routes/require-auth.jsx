import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { useUser } from '@/hooks/use-user'

export const RequireAuth = ({ children }) => {
  const location = useLocation()
  const { user } = useUser()

  if (!user) {
    return <Navigate to='/login' state={{ from: location.pathname }} />
  }

  return children
}

RequireAuth.propTypes = {
  children: PropTypes.any,
}
