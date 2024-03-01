import React from 'react'
import {
  IconCheckFilled,
  IconSmartPhone,
  IconFacebook,
  IconInstagram
} from '@/assets/icons'
import PropTypes from 'prop-types'

export const Verifications = ({ userProfile }) => {
  const {
    verified_email,
    verified_fb,
    verified_gm,
    verified_ig,
    verified_phone,
    verified_photo
  } = userProfile || {}

  const verifications = [
    {
      icon: <IconCheckFilled />,
      verified: verified_photo
    },
    {
      icon: <IconSmartPhone />,
      verified: verified_phone
    },
    {
      icon: <IconFacebook />,
      verified: verified_fb
    },
    {
      icon: <IconInstagram />,
      verified: verified_ig
    }
  ]

  return (
    <ul style={{ display: 'inline-flex', gap: '1.2rem', fontSize: '2.4rem' }}>
      {verifications.map((verification, index) => (
        <li key={index}>{verification.verified && verification.icon}</li>
      ))}
    </ul>
  )
}

Verifications.propTypes = {
  userProfile: PropTypes.object
}
