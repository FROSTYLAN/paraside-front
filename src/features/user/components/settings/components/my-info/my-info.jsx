import React, { Suspense, useEffect } from 'react'
import { Button, Col, Divider, Grid, Loader, Row } from 'rsuite'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { BsInfoCircle } from 'react-icons/bs'
import { FormField } from '@/components/elements'

import { PROFILE_FIELDS } from '@/utils/constants/form-fields'
import { PROFILE_SCHEMAS } from '@/utils/yup/schemas'
import { useUser } from '@/hooks/use-user'
import { useGender } from '@/api/gender'
import { useLanguage } from '@/api/language'
import { useGetUserProfile, useSaveUserProfile } from '@/api/user-profile'
import { useGetUserLocations } from '@/api/user-location'
import { SMOKER_OPTIONS, LOOKING_FOR_OPTIONS } from '@/utils/constants/globals'

export const MyInfo = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const { isLoading: isLoadingGenders, data: genders } = useGender()
  const { isLoading: isLoadingLanguages, data: languages } = useLanguage()

  const { isLoading: isLoadingLocations, data: userLocations } =
    useGetUserLocations({
      id: user.id
    })

  const {
    isLoading: isLoadingGet,
    isFetching,
    data: { profile: userProfile }
  } = useGetUserProfile({
    id: user.id
  })

  const mutationSave = useSaveUserProfile(
    (oldData, newData) => ({
      ...oldData,
      ...newData
    }),
    `/${user.id}`
  )

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ ...PROFILE_SCHEMAS, defaultValues: userProfile })

  const fieldsOptions = {
    gender_id: genders,
    smoker: SMOKER_OPTIONS,
    looking_for: LOOKING_FOR_OPTIONS,
    language: languages,
    location_id: userLocations
  }

  const fieldsLoading = {
    gender_id: isLoadingGenders,
    language: isLoadingLanguages,
    location_id: isLoadingLocations
  }

  const fieldsTooltips = {
    location_id: {
      icon: <BsInfoCircle />,
      message:
        'La ubicación se utilizará para la búsqueda de usuarios cerca de ti. Puedes registrar hasta 10 ubicaciones y seleccionarlas al momento de buscar usuarios.'
    }
  }

  const handleSaveProfile = async (data) => {
    let newData = {
      ...data,
      user_id: user.id
    }
    const res = await mutationSave.mutateAsync(newData)
    if (res) {
      setTimeout(() => {
        navigate('/plus/home')
      }, 1000)
    }
  }

  const defaultLocation = userLocations?.find((l) => l.current)?.location

  useEffect(() => {
    if (defaultLocation && userProfile) {
      userProfile.location_id = defaultLocation.id
      userProfile.location = defaultLocation
    }
    
    reset(userProfile)
  }, [isLoadingGet, isFetching, defaultLocation])

  return (
    <Suspense fallback={<>Loading</>}>
      {(isLoadingGet || isFetching || mutationSave.isLoading) && (
        <Loader backdrop center content='loading' size='md' />
      )}
      <form
        onSubmit={handleSubmit(handleSaveProfile)}
        style={{ maxWidth: '48rem' }}
      >
        <Grid fluid>
          <Row gutter={16}>
            {PROFILE_FIELDS.map((field, i) => (
              <Col key={i} xs={field.xs || 24} className='mb-24'>
                <FormField
                  {...field}
                  control={control}
                  error={errors[field.name]?.message}
                  options={fieldsOptions[field.name]}
                  disabled={mutationSave.isLoading}
                  loading={fieldsLoading[field.name]}
                  tooltip={fieldsTooltips[field.name]}
                />
              </Col>
            ))}
            <Col xs={24} style={{ textAlign: 'right' }}>
              <Divider className='mt-0' />
              <Button
                type='submit'
                appearance='primary'
                size='lg'
                loading={mutationSave.isLoading}
              >
                Guardar
              </Button>
            </Col>
          </Row>
        </Grid>
      </form>
    </Suspense>
  )
}
