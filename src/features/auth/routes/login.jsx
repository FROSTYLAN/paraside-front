import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../components/layout'

export const Login = () => {
  return (
    <Layout
      title='Entra al paraíso'
      subtitle={
        <>
          Por favor, introduce tus datos de acceso.{' '}
          <Link to={'/register'}>Regístrate aquí</Link> si aún no lo has hecho.
        </>
      }
      buttonText='Entra'
    />
  )
}
