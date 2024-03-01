import { Button } from 'rsuite'
import PropTypes from 'prop-types'
import styles from './step-four.module.scss'
import backgroundImageUrl from '/assets/images/apps/paradise_255.png'
import { useForm } from 'react-hook-form'
import { ROL_SCHEMAS } from '@/utils/yup/schemas'
import { FormField } from '@/components/elements'

export const StepFour = ({ submit, formData }) => {
  const { control, handleSubmit } = useForm({
    ...ROL_SCHEMAS,
    defaultValues: {
      role: 'suscriptor'
    }
  })

  const handleSubmitForm = (data) => {
    submit({...formData, role: data.role})
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles.stepContainer}>
          <div className={styles.stepContent}>
            <h2 className={styles.stepHeading}>¿Dentro de Paradise serás?</h2>
            <FormField
            className={styles.formField}
              control={control}
              type='radioButton'
              name='role'
              options={[
                {
                  label:'Creador',
                  value:'creator'
                },
                {
                  label: 'Suscriptor',
                  value: 'suscriptor'
                }
              ]}
            />
            <Button
              type='submit'
              appearance='primary'
              size='md'
              block
              className={styles.stepButton}
            >
              Continuar
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
}

StepFour.propTypes = {
  formData: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired
}
