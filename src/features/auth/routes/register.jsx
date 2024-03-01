import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../components/layout'

export const Register = () => {
  return (
    <Layout
      title='Crea una cuenta nueva'
      subtitle={
        <>
          Por favor, introduce los datos solicitados.{' '}
          <Link to={'/login'}>Ya tengo una cuenta</Link>.
        </>
      }
      buttonText='Únete ahora'
      isRegister
    />
  )
}
