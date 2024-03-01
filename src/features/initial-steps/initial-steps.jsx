import React, { useState } from 'react'
import { FlexboxGrid, Loader } from 'rsuite'
import { StepOne } from './step-one'
import { StepTwo } from './step-two'
import { StepThree } from './step-three'
import { StepFour } from './step-four'
import { useNavigate } from 'react-router-dom'
import { saveUserProfile } from '@/api/user-profile'

export const InitialSteps = () => {
  const [currentStep, setCurrentStep] = useState(1)
  
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (newData) => {
    
    try {
      setIsLoading(true)
      console.log(newData);
      // const response = await saveUserProfile(newData)
      // if (response.status === 200) {
      //   navigate('/plus/home')
      // }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const steps = {
    1: <StepOne setCurrentStep={setCurrentStep} setFormData={setFormData} />,
    2: <StepTwo setCurrentStep={setCurrentStep} setFormData={setFormData} alias={formData.nickname}/>,
    3: <StepThree setCurrentStep={setCurrentStep} setFormData={setFormData} alias={formData.nickname}/>,
    4: <StepFour submit={submit} formData={formData} />
  }

  return (
    <FlexboxGrid justify='center' align='middle' style={{ height: '100vh' }}>
      {isLoading && (
        <Loader backdrop content='Cargando...' vertical size='md' />
      )}
      <div style={{ minWidth: '320px', padding: '0 16px' }}>
        {steps[currentStep]}
        
      </div>
    </FlexboxGrid>
  )
}
