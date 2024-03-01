/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { FormField } from '@/components/elements'
import { Button } from 'rsuite'
import styles from './step-one.module.scss'
import backgroundImageUrl from '/assets/images/apps/paradise_255.png'
import { ALIAS_FIELDS } from '@/utils/constants/form-fields'
import { ALIAS_SCHEMAS } from '@/utils/yup/schemas'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/features/auth/api/use-auth'

export const StepOne = ({ setCurrentStep, setFormData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm(ALIAS_SCHEMAS)

  const { loading } = useAuth()

  const handleSubmitForm = (data) => {
    setFormData(data)
    setCurrentStep(2)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <div className={styles.stepContainer}>
          <div className={styles.stepContent}>
            <h2 className={styles.stepHeading}>¡Bienvenido!</h2>
            <p className={styles.stepText}>
              Empecemos con un nombre o alias para mostrar en tu perfil.
            </p>

            {ALIAS_FIELDS.map((field, i) => (
              <FormField
                key={i}
                control={control}
                disabled={loading}
                placeholder='Nombre o alias'x
                error={errors[field.name]?.message}
                {...field}
                label=''
              />
            ))}

            <Button
              type='submit'
              appearance='primary'
              size='md'
              block
              className={styles.stepButton}
              loading={loading}
            >
              SIGUIENTE
            </Button>
            <img
              src={backgroundImageUrl}
              alt='Paradise'
              className={styles.image}
            />
          </div>
        </div>
      </form>
    </>
  )

  /*const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleContinue = () => {

    if(name.trim()==''){
      setError('Necesita ingresar un alias para continuar')
    }else{
      setError('')
      setData({ name })
      setCurrentStep(2)
    }
   
  }

  const handleNameChange = (event) => {
    
    setName(event)
  }

  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepContent}>
        <h2 className={styles.stepHeading}>¡Bienvenido!</h2>
        <p className={styles.stepText}>
          Empecemos con un nombre o alias para mostrar en tu perfil
        </p>
        <TextInput
          id='name'
          label='Nombre'
          className={styles.stepInput}
          value={name}
          error={error}
          onChange={handleNameChange}
        />

        <Button
          appearance='primary'
          size='md'
          block
          onClick={handleContinue}
          className={styles.stepButton}
        >
          Continuar
        </Button>
      </div>
      <img
        src={backgroundImageUrl}
        alt='Paradise'
        className={styles.image}
      />
    </div>
  )*/
}
