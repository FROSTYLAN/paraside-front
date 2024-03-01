import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Divider, FlexboxGrid, MaskedInput, Message } from 'rsuite'
import Button from 'rsuite/Button'
import { Text } from '@/components/elements'
import { useAuth } from '../api/use-auth'
import { CODE_MASK, CODE_PLACEHOLDER } from '@/utils/constants/code-format'

import styles from './register-confirm-form.module.scss'

export const RegisterConfirmForm = ({ user }) => {
  const { registerConfirm, loading } = useAuth()
  const [code, setCode] = useState('')
  const codeToSend = code.replaceAll(' ', '')
  const disableButton = isNaN(codeToSend) || codeToSend.length != 8

  const sendVerificationCode = (e) => {
    e.preventDefault()
    if (loading) {
      return
    }

    registerConfirm({
      username: user.email || user.phone_number,
      code: codeToSend,
    })
  }

  return (
    <FlexboxGrid justify='start' align='middle' className={styles.container}>
      <img
        className={styles.logoImg}
        src={'/assets/images/paradise/paradise_plus.png'}
        alt=''
      />
      <Text tag='h1' size={20} weight='bold'>
        Confirmación de registro
      </Text>
      <form onSubmit={sendVerificationCode} className={styles.form}>
        <Divider style={{ margin: '0', padding: '0', width: '100%' }} />
        <Message type='info' style={{ textAlign: 'center' }}>
          Por favor ingresa el codigo que te hemos enviado a{' '}
          <strong>{user.email || user.phone_number}.</strong>
        </Message>
        <MaskedInput
          value={code}
          mask={CODE_MASK}
          placeholder={CODE_PLACEHOLDER}
          placeholderChar='_'
          guide={true}
          onChange={setCode}
          className={styles.inputCode}
          autoFocus
          disabled={loading}
        />
        <Button
          type='submit'
          appearance='primary'
          block
          size='lg'
          loading={loading}
          disabled={disableButton}
        >
          Confirmar
        </Button>
      </form>
    </FlexboxGrid>
  )
}

RegisterConfirmForm.propTypes = {
  user: PropTypes.any,
}
