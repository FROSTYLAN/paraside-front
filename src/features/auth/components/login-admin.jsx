import React from 'react'
import PropTypes from 'prop-types'
import { Text, FormField } from '@/components/elements'
import Button from 'rsuite/Button'
import { FlexboxGrid } from 'rsuite'

import { useForm } from 'react-hook-form'
import { useAuth } from '../api/use-auth'

import { ADMIN_FIELDS } from '@/utils/constants/form-fields'
import { LOGIN_SCHEMAS } from '@/utils/yup/schemas'


export const LoginAdmin = ({ title, buttonText }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { loginAdmin, loading } = useAuth()

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
      <form onSubmit={handleSubmit(loginAdmin)}>
        <FlexboxGrid style={{ flexDirection: 'column', gap: '1.6rem' }}>
          {ADMIN_FIELDS.map((field, i) => (
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
        </FlexboxGrid>
      </form>
    </>
  )
}

LoginAdmin.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.any,
  buttonText: PropTypes.string
}
