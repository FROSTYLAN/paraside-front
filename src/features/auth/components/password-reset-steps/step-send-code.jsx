import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'rsuite'
import Button from 'rsuite/Button'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../api/use-auth'
import { FormField } from '@/components/elements'
import { getSchemasOptions } from '@/utils/yup/schemas'

import styles from './password-reset-steps.module.scss'

export const StepSendCode = ({ setStep, setUsername }) => {
  const formOptions = getSchemasOptions(['username'])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions)

  const { resetPasswordCode, loading } = useAuth()

  const submitSendCode = async (data) => {
    const response = await resetPasswordCode(data)
    if (response) {
      setUsername(data.username)
      setStep('verifyCode')
    }
  }

  return (
    <form onSubmit={handleSubmit(submitSendCode)} className={styles.resetForm}>
      <Divider style={{ margin: '0', padding: '0' }} />
      <FormField
        type='text'
        control={control}
        name='username'
        label='Email o número de teléfono'
        disabled={loading}
        error={errors['username']?.message}
      />
      <Button
        type='submit'
        appearance='primary'
        block
        size='lg'
        loading={loading}
      >
        Enviar codigo
      </Button>
    </form>
  )
}

StepSendCode.propTypes = {
  setStep: PropTypes.func,
  setUsername: PropTypes.func,
}
