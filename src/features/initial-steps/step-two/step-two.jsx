import React from 'react'
import { Button } from 'rsuite'
import PropTypes from 'prop-types'

import { ORIENTATION_SCHEMAS } from '@/utils/yup/schemas'
import styles from './step-two.module.scss'
import backgroundImageUrl from '/assets/images/apps/paradise_255.png'
import { useForm } from 'react-hook-form'
import { FormField } from '@/components/elements'

export const StepTwo = ({ setCurrentStep, setFormData, alias }) => {
  const { control, handleSubmit } = useForm({
    ...ORIENTATION_SCHEMAS,
    defaultValues: {
      orientation: 'male'
    }
  })

  const submitData = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }))
    setCurrentStep(3)
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitData)}>
        <div className={styles.stepContainer}>
          <div className={styles.stepContent}>
            <h2 className={styles.stepHeading}>Orientación sexual</h2>
            <p className={styles.stepText}>{alias}, dinos como te identificas.</p>
            <FormField
              className={styles.formField}
              control={control}
              type='radioButton'
              name='orientation'
              options={[
                {
                  label: 'Hombre',
                  value: 'male'
                },
                {
                  label: 'Mujer',
                  value: 'female'
                },
                {
                  label: 'LGTBIQ +',
                  value: 'other'
                }
              ]}
            />
            <Button
              type='submit'
              appearance='primary'
              size='lg'
              block
              className={styles.stepButton}
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
  /*return (
    <>
      <div className={styles.stepContainer}>
        <div className={styles.stepContent}>
          <h2 className={styles.stepHeading}>Orientación sexual</h2>
          <p className={styles.stepText}>Selecciona cómo te identificas</p>
          <RadioGroup
            name='role'
            className={styles.stepRadioGroup}
            value={orientation}
            onChange={(value) => setOrientation(value)}
          >
            <Radio value='male'>Hombre</Radio>
            <Radio value='female'>Mujer</Radio>
            <Radio value='other'>LGTBIQ +</Radio>
          </RadioGroup>
          <Button
            appearance='primary'
            size='lg'
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
    </>
  )*/
}

StepTwo.propTypes = {
  setCurrentStep: PropTypes.func,
  setFormData: PropTypes.func
}
