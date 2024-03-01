import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Message } from 'rsuite'
import Button from 'rsuite/Button'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../api/use-auth'
import { FormField } from '@/components/elements'
import { getSchemasOptions } from '@/utils/yup/schemas'

import styles from './password-reset-steps.module.scss'

export const StepVerifyCode = ({ setStep, username }) => {
  const formOptions = getSchemasOptions(['confirmCode'])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions)

  const { resetPasswordVerify, loading } = useAuth()

  const submitVerifyCode = async (data) => {
    const newData = {
      code: data.confirmCode,
      username,
    }
    const response = await resetPasswordVerify(newData)
    if (response) {
      setStep('resetPassword')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitVerifyCode)}
      className={styles.resetForm}
    >
      <Divider style={{ margin: '0', padding: '0' }} />
      <Message type='info' style={{ textAlign: 'center' }}>
        Por favor ingresa el codigo que te hemos enviado a{' '}
        <strong>{username}.</strong>
      </Message>
      <FormField
        type='text'
        control={control}
        name='confirmCode'
        label='Codigo'
        disabled={loading}
        error={errors['confirmCode']?.message}
        maxLength={8}
      />
      <Button
        type='submit'
        appearance='primary'
        block
        size='lg'
        loading={loading}
      >
        Verificar codigo
      </Button>
    </form>
  )
}

StepVerifyCode.propTypes = {
  setStep: PropTypes.func,
  username: PropTypes.string,
}
