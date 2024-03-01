import React, { useState } from 'react'
import { Button, Loader, Message } from 'rsuite'
import { FormField } from '@/components/elements'
import { useForm } from 'react-hook-form'
import { linkEmail, linkPhone } from '@/api/link-account'
import { CONFIRM_CODE_SCHEMAS } from '@/utils/yup/schemas'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

export const VerifyCode = ({ accountType, accountValue, fieldLabel, refetch }) => {
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm(CONFIRM_CODE_SCHEMAS)

  const handleLinkAccount = async (data) => {
    setLoading(true)
    try {
      const newData = {
        code: data.confirmCode,
        [accountType]: accountValue
      }
      let response = null

      if (accountType === 'email') {
        response = await linkEmail(newData)
      } else {
        response = await linkPhone(newData)
      }

      if (response.status === 200) {
        toast.success('Vinculación exitosa')
        refetch()
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading && <Loader backdrop content='Enviando código' />}
      <Message type='info' className='mt-16 mb-16'>
        Por favor ingresa el codigo que te hemos enviado a tu {fieldLabel}
      </Message>
      <form
        onSubmit={handleSubmit(handleLinkAccount)}
        style={{ display: 'flex', gap: '0.8rem' }}
      >
        <FormField
          type='text'
          name='confirmCode'
          control={control}
          error={errors['confirmCode']?.message}
          placeholder='Ingresa el código'
        />
        <div>
          <Button type='submit' appearance='primary' size='md'>
            Vincular
          </Button>
        </div>
      </form>
    </div>
  )
}

VerifyCode.propTypes = {
  accountType: PropTypes.string.isRequired,
  accountValue: PropTypes.string.isRequired,
  fieldLabel: PropTypes.string.isRequired,
  refetch: PropTypes.func
}
