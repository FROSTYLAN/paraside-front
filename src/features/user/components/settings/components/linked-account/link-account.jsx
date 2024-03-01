import React, { useState } from 'react'
import { Button, Loader } from 'rsuite'
import { useForm } from 'react-hook-form'
import { FormField } from '@/components/elements'
import { sendEmailCode, sendPhoneCode } from '@/api/verification-code'
import { IconLink } from '@/assets/icons'
import { LINK_EMAIL_SCHEMAS, LINK_PHONE_SCHEMAS } from '@/utils/yup/schemas'
import PropTypes from 'prop-types'
import { VerifyCode } from './verify-code'

export const LinkAccount = ({ accountType, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [accountValue, setAccountValue] = useState('')

  const schema =
    accountType === 'email' ? LINK_EMAIL_SCHEMAS : LINK_PHONE_SCHEMAS

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm(schema)

  const fieldLabel =
    accountType === 'email' ? 'correo electrónico' : 'número de teléfono'

  const handleSendCode = async (data) => {
    setLoading(true)
    try {
      let response = null
      if (accountType === 'email') {
        response = await sendEmailCode(data)
      } else {
        response = await sendPhoneCode(data)
      }
      console.log('response', response)
      if (response?.status === 200) {
        setAccountValue(data[accountType])
        setCodeSent(true)
      }
      setLoading(false)
    } catch (error) {
      setCodeSent(false)
      setLoading(false)
    }
  }

  return isOpen ? (
    <>
      <form
        onSubmit={handleSubmit(handleSendCode)}
        style={{ display: 'flex', gap: '0.8rem' }}
      >
        {loading && <Loader backdrop content='Enviando código' />}
        <FormField
          type='emailPhone'
          name={accountType}
          control={control}
          error={errors[accountType]?.message}
          placeholder={`Ingresa tu ${fieldLabel}`}
          onlyPhone={accountType === 'phone_number'}
          onlyEmail={accountType === 'email'}
          disabled={loading || codeSent}
        />
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-end' }}>
          <Button
            type='submit'
            appearance='primary'
            size='md'
            disabled={loading || codeSent}
          >
            Enviar código
          </Button>
          <Button
            appearance='default'
            onClick={() => setIsOpen(false)}
            size='md'
            disabled={loading || codeSent}
          >
            Cancelar
          </Button>
        </div>
      </form>
      {codeSent && (
        <VerifyCode
          accountType={accountType}
          accountValue={accountValue}
          fieldLabel={fieldLabel}
          refetch={refetch}
        />
      )}
    </>
  ) : (
    <div>
      <span>
        No tienes vinculado {fieldLabel}
        <Button
          appearance='link'
          onClick={() => setIsOpen(true)}
          className='m-0 p-0 ml-16'
        >
          <IconLink /> Vincular
        </Button>
      </span>
    </div>
  )
}

LinkAccount.propTypes = {
  accountType: PropTypes.oneOf(['email', 'phone_number']).isRequired,
  refetch: PropTypes.func
}
