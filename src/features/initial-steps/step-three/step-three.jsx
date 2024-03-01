/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button } from 'rsuite'
import { Uploader } from '@/components/elements'
import styles from './step-three.module.scss'
import backgroundImageUrl from '/assets/images/apps/paradise_255.png'
import { useAuth } from '@/features/auth/api/use-auth'
import { uploadFile } from '@/firebase/config'


export const StepThree = ({ setCurrentStep, setFormData, alias }) => {
  const [photo1, setPhoto1] = useState(null)
  const [photo2, setPhoto2] = useState(null)
  const [photo3, setPhoto3] = useState(null)

  const [error, setError] = useState(null)

  const required = photo1 && photo2 && photo3 ? false : true

  const { loading } = useAuth()

  const submit = async (e) => {
    e.preventDefault()
    if (required || error) {
      setError('Es necesario que suba tres fotos.');
      return
    }

    const urlPhoto1 = await uploadFile(photo1)
    const urlPhoto2 = await uploadFile(photo2)
    const urlPhoto3 = await uploadFile(photo3)

    setFormData((prevFormData) => ({
      ...prevFormData,
      photos: { urlPhoto1, urlPhoto2, urlPhoto3 }
    }))
    setCurrentStep(4)

  }

  return (
    <form onSubmit={submit}>
      <div className={styles.stepThree}>
        <div className={styles.stepContent}>
          <h2 className={styles.stepTitle}>Sube tus fotos</h2>
          <div className={styles.uploaderContainer}>
            <Uploader selectedFile={photo1} onSelectFile={setPhoto1} setError={setError} />
            <Uploader selectedFile={photo2} onSelectFile={setPhoto2} setError={setError} />
            <Uploader selectedFile={photo3} onSelectFile={setPhoto3} setError={setError} />
          </div>
          {error && <p className={styles.errorText}>{error}</p>}
          <p className={styles.verificationText}>
            {/* {required && ( */}
              <span>{alias}, subir las 3 fotos es necesario para verificar que eres una persona real.</span>
            {/* )} */}
          </p>
          <Button
            type='submit'
            appearance='primary'
            size='md'
            block
            className={styles.continueButton}
            loading={loading}
          >
            Continuar
          </Button>
          <img src={backgroundImageUrl} alt='Paradise' className={styles.image} />
        </div>
      </div>
    </form>
  )
}
