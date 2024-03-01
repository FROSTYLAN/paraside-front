import React, { Suspense } from 'react'
import { Divider, Grid, Loader } from 'rsuite'
import { Progress } from '../progress'
import { Photos } from '../photos/photos'
import { Verifications } from '../verifications'
import { useUser } from '@/hooks/use-user'
import { useGetUserProfile } from '@/api/user-profile'
import PropTypes from 'prop-types'

export const  ProfileInfo = ({ setStep }) => {
  const { user } = useUser()
  const { isLoading, isFetching, data } = useGetUserProfile({
    id: user.id
  })

  const { verified_photo } = data || {}
  const { name, age } = data?.profile || {}
  const percent = (100 * (1 / 15)).toFixed(0)

  return (
    <Suspense fallback={<>Loading</>}>
      {(isLoading || isFetching) && <Loader backdrop content='Loading...' />}
      <Grid style={{ width: '100%' }}>
        <Progress
          name={name}
          age={age}
          verifiedPhoto={verified_photo}
          percent={percent}
          setStep={setStep}
        />
        <Divider />
        <Photos />
        <Divider />
        <Verifications setStep={setStep}/>
      </Grid>
    </Suspense>
  )
}

ProfileInfo.propTypes = {
  setStep: PropTypes.func.isRequired
}
