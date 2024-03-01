import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'rsuite'
import Button from 'rsuite/Button'
import { FormField } from '@/components/elements'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../api/use-auth'

import { RESET_FIELDS } from '@/utils/constants/form-fields'
import { RESET_SCHEMAS } from '@/utils/yup/schemas'

import styles from './password-reset-steps.module.scss'

export const StepResetPassword = ({ setStep, username }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(RESET_SCHEMAS)

  const { resetPassword, loading } = useAuth()

  const submitResetPassword = async (data) => {
    data.username = username
    const response = await resetPassword(data)
    if (response) {
      setStep('success')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitResetPassword)}
      className={styles.resetForm}
    >
      <Divider style={{ margin: '0', padding: '0' }} />
      {RESET_FIELDS.map((field, i) => (
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
        Actualizar contraseña
      </Button>
    </form>
  )
}

StepResetPassword.propTypes = {
  setStep: PropTypes.func,
  username: PropTypes.string,
}
