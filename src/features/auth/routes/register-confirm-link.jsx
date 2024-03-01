import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Divider, Loader, Message } from 'rsuite'
import { useRegisterConfirmLink } from '../api/auth'

export const RegisterConfirmLink = () => {
  const { token } = useParams()
  const { isLoading, isSuccess } = useRegisterConfirmLink({ token })

  let navigate = useNavigate()

  const message = isSuccess
    ? 'Se confirmo satisfactoriamente'
    : 'Error al confirmar, por favor valida el token'

  const LoadingContent = () => (
    <div>
      <h2>Estamos verificando tu registro</h2>
      <p>Por favor no cierres esta ventana</p>
    </div>
  )

  return (
    <div
      className='mt-24'
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <div style={{ minWidth: '30rem', maxWidth: '40rem' }}>
        <h1>Confirmación de Registro</h1>
        <Divider />
        {isLoading ? (
          <Loader content={<LoadingContent />} size='md' vertical />
        ) : (
          <Message showIcon type={isSuccess ? 'success' : 'error'}>
            {message}
          </Message>
        )}
        <Button
          appearance='primary'
          size='lg'
          className='mt-24'
          block
          disabled={isLoading}
          onClick={() => navigate(isSuccess ? '/login' : '/register')}
        >
          Regresar
        </Button>
      </div>
    </div>
  )
}
