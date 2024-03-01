import React, { useState } from 'react'
import { Button, Loader, Message } from 'rsuite'
import { useForm } from 'react-hook-form'
import { sendEmailCode, sendPhoneCode } from '@/api/verification-code'
import { FormField } from '@/components/elements'
import { unlinkEmail, unlinkPhone } from '@/api/link-account'
import { IconUnlink } from '@/assets/icons'
import { CONFIRM_CODE_SCHEMAS } from '@/utils/yup/schemas'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

export const UnlinkAccount = ({ accountType, account, disabled, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm(CONFIRM_CODE_SCHEMAS)

  const sendCode = async () => {
    if (disabled) return
    setLoading(true)
    try {
      let response = null
      if (accountType === 'email') {
        response = await sendEmailCode({
          email: account
        })
      } else {
        response = await sendPhoneCode({
          phone_number: account
        })
      }
      console.log('response', response)
      if (response) {
        setIsOpen(true)
      }
      setLoading(false)
    } catch (error) {
      setIsOpen(false)
      setLoading(false)
    }
  }

  const handleUnlinkAccount = async (data) => {
    setLoading(true)
    try {
      const newData = {
        code: data.confirmCode
      }
      let response = null
      if (accountType === 'email') {
        response = await unlinkEmail(newData)
      } else {
        response = await unlinkPhone(newData)
      }
      console.log('response', response)
      if (response.status === 200) {
        setIsOpen(false)
        toast.success('Devinculación exitosa')
        refetch()
      }
      setLoading(false)
    } catch (error) {
      setIsOpen(false)
      setLoading(false)
    }
  }

  return (
    <div>
      {loading && <Loader backdrop content='Loading' />}
      <span>{account}</span>
      <Button appearance='link' onClick={sendCode} disabled={disabled}>
        <IconUnlink /> Desvincular
      </Button>
      {isOpen && (
        <>
          <Message type='info' className='mt-16 mb-16'>
            Por favor ingresa el codigo que te hemos enviado a {account}
          </Message>
          <form
            onSubmit={handleSubmit(handleUnlinkAccount)}
            style={{ display: 'flex', gap: '0.8rem' }}
          >
            <FormField
              type='text'
              name='confirmCode'
              control={control}
              error={errors['confirmCode']?.message}
              placeholder='Ingresa el código'
            />
            <Button type='submit' appearance='primary' size='md'>
              Desvincular
            </Button>
          </form>
        </>
      )}
    </div>
  )
}

UnlinkAccount.propTypes = {
  accountType: PropTypes.oneOf(['email', 'phone_number']).isRequired,
  account: PropTypes.string,
  disabled: PropTypes.bool,
  refetch: PropTypes.func
}
