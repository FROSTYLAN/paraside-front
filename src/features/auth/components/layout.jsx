import React from 'react'
import PropTypes from 'prop-types'
import {
  Divider,
  FlexboxGrid,
} from 'rsuite'
import { LoginForm } from './login-form'
import { LoginAlt } from './login-alt'

export const Layout = (props) => {
  return (
    <FlexboxGrid justify='center' align='middle' style={{ height: '100vh', gap:'3.2rem' }}>
      <FlexboxGrid.Item style={{maxWidth: '45rem'}}>
        <LoginForm {...props} />
        <Divider>Ó</Divider>
        <LoginAlt />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <img
          className='login-image'
          src='/assets/images/paradise/paradise.png'
          alt=''
          style={{maxWidth: '60rem', width: '100%'}}
        />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}

Layout.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.any,
  buttonText: PropTypes.string,
  showForgot: PropTypes.bool,
}
