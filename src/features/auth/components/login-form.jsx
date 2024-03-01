import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Text, FormField } from '@/components/elements'
import Button from 'rsuite/Button'
import { FlexboxGrid } from 'rsuite'

import { useForm } from 'react-hook-form'
import { useAuth } from '../api/use-auth'

import { LOGIN_FIELDS } from '@/utils/constants/form-fields'
import { LOGIN_SCHEMAS } from '@/utils/yup/schemas'


export const LoginForm = ({ title, subtitle, buttonText, isRegister }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(LOGIN_SCHEMAS)

  const { login, register, loading } = useAuth()

  return (
    <>
      <Text
        family='secondary'
        tag='h2'
        size={28}
        weight='black'
        className='mb-12'
      >
        {title}
      </Text>
      <Text className='mb-20 text-gray'>{subtitle}</Text>
      <form onSubmit={handleSubmit(isRegister ? register : login)}>
        <FlexboxGrid style={{ flexDirection: 'column', gap: '1.6rem' }}>
          {LOGIN_FIELDS.map((field, i) => (
            <FormField
              key={i}
              control={control}
              
              disabled={loading}
              error={errors[field.name]?.message}
              {...field}
            />
          ))}
          <Button
            type='submit'
            appearance='primary'
            block
            size='lg'
            loading={loading}
          >
            {buttonText}
          </Button>
          {!isRegister && (
            <Link
              to={'/password-reset'}
              style={{ display: 'block', textAlign: 'center', width: '100%' }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          )}
        </FlexboxGrid>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.any,
  buttonText: PropTypes.string,
  isRegister: PropTypes.bool
}
