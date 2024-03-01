import React, { useState } from 'react'
import { ProfileInfo } from './components/profile-info'
import { ProfileVerification } from './components/profile-verification'
import { VerificationByPhoto } from './components/verification-by-photo/verification-by-photo'

export const MyProfile = () => {
  const [step, setStep] = useState('profile')

  const steps = {
    profile: <ProfileInfo setStep={setStep} />,
    verification: <ProfileVerification setStep={setStep} />,
    verificationByPhoto: <VerificationByPhoto setStep={setStep} />
  }

  return steps[step]
}
