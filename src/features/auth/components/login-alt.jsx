import React from 'react'
import { Button } from 'rsuite'
import { useGoogleLogin } from '@react-oauth/google'
import { useLogin } from 'react-facebook'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../api/use-auth'
import { IconFaGoogle, IconFaFacebook, IconFaApple} from '@/assets/icons'

import styles from './login-alt.module.scss'

export const LoginAlt = () => {
  const { loginGoogle, loginFacebook, loading } = useAuth()
  const { login, isLoading } = useLogin()

  const navigate = useNavigate()

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      await loginGoogle({ code })
    },
    flow: 'auth-code'
  })

  const facebookLogin = async () => {
    try {
      const response = await login({
        scope: 'email'
      })

      const access_token = response?.authResponse?.accessToken

      await loginFacebook({ access_token })
    } catch (error) {
      console.log('facebookLogin error', error)
    }
  }

  return (
    <div className={styles.loginAlt}>
      <Button
        className={styles.btnSocial}
        block
        size='lg'
        onClick={() => googleLogin()}
        loading={loading}
      >
        <IconFaGoogle />
        <span>Inicia sesión con Google</span>
      </Button>
      <Button
        className={styles.btnSocial}
        block
        size='lg'
        onClick={() => facebookLogin()}
        disabled={isLoading || loading}
      >
        <IconFaFacebook />
        <span>Inicia sesión con Facebook</span>
      </Button>
      <Button className={styles.btnSocial} block size='lg'>
        <IconFaApple />
        <span>Inicia sesión con Apple</span>
      </Button>
    </div>
  )
}
