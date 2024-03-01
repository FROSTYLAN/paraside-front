import React from 'react'
import { useParams } from 'react-router-dom'
import { Col, Grid, Panel, Row } from 'rsuite'
import { useGetUserProfile } from '@/api/user-profile'
import { PlusContentLayout } from '@/components/layout'
import { PhotosSlider } from './components/photos-slider'
import { Info } from './components/info'
// import { Rate } from '@/components/elements'
import { Verifications } from './components/verifications'

export const Profile = () => {
  const { userId } = useParams()
  const {
    isLoading,
    data: { profile: userProfile, rating },
    refetch
  } = useGetUserProfile({ id: userId })
  return (
    <PlusContentLayout>
      <Panel bordered>
        <Grid fluid>
          <Row gutter={32}>
            <Col xs={10}>
              <PhotosSlider
                userId={userId}
                rating={Number(rating)}
                refetch={refetch}
              />
              <div
                className='mt-16'
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: 'var(--color-primary)'
                }}
              >
                {/* <Rate value={3.5} /> */}
                <Verifications userProfile={userProfile} />
              </div>
            </Col>
            <Col xs={14}>
              <Info userProfile={userProfile} />
            </Col>
          </Row>
        </Grid>
      </Panel>
    </PlusContentLayout>
  )
}
