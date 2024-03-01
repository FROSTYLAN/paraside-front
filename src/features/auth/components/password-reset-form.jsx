import React, { useState } from 'react'
import { FlexboxGrid } from 'rsuite'
import { Text } from '@/components/elements'
import {
  StepSendCode,
  StepVerifyCode,
  StepResetPassword,
  StepSuccess,
} from './password-reset-steps'

import styles from './password-reset-form.module.scss'

export const PasswordResetForm = () => {
  const [step, setStep] = useState('sendCode')
  const [username, setUsername] = useState(null)

  const steps = {
    sendCode: <StepSendCode setStep={setStep} setUsername={setUsername} />,
    verifyCode: <StepVerifyCode setStep={setStep} username={username} />,
    resetPassword: <StepResetPassword setStep={setStep} username={username} />,
    success: <StepSuccess />,
  }

  return (
    <FlexboxGrid justify='start' align='middle' className={styles.container}>
      <img
        className={styles.logoImg}
        src={'/assets/images/paradise/paradise_plus.png'}
        alt=''
      />
      <Text tag='h1' size={20} weight='bold'>
        Reseteo de contraseña
      </Text>
      {steps[step] || 'Step not found'}
    </FlexboxGrid>
  )
}
