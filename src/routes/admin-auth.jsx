import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { useAdmin } from '@/hooks/use-admin'

export const AdminAuth = ({ children }) => {
  const location = useLocation() 
  const { admin } = useAdmin()

  if (!admin) {
    return <Navigate to='/admin-login' state={{ from: location.pathname }} />
  }

  return children
}

AdminAuth.propTypes = {
  children: PropTypes.any,
}
