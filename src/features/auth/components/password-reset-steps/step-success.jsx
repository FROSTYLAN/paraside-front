import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Message } from 'rsuite'

import styles from './password-reset-steps.module.scss'

export const StepSuccess = () => {
  return (
    <div className={styles.resetForm}>
      <Message type='success' style={{ textAlign: 'center' }}>
        Actualizaste tu contraseña satisfactoriamente
      </Message>
      <Link to={'/login'}>
        <Button type='submit' appearance='primary' block size='lg'>
          Ir al login
        </Button>
      </Link>
    </div>
  )
}
