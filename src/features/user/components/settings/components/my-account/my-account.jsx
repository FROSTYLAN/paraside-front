import React from 'react'
import { Button, Col, Grid, Loader, Row } from 'rsuite'
import { useUser } from '@/hooks/use-user'
import { useGetUserProfile } from '@/api/user-profile'
import PropTypes from 'prop-types'
import { IconPrivacyPolicy, IconTermsConditions } from '@/assets/icons'
import { LinkedAccount } from '../linked-account'

export const MyAccount = () => {
  const { user } = useUser()
  const { isLoading, isFetching, data, refetch } = useGetUserProfile({
    id: user.id
  })

  const { email, phone_number } = data || {}

  const jusOneLinkedAccount = () => {
    if (email && phone_number) {
      return false
    }
    return true
  }

  return (
    <Grid>
      {(isLoading || isFetching) && (
        <Loader backdrop center content='loading' size='md' />
      )}
      <Row gutter={32}>
        <Col xs={24}>
          <div className='mt-32'>
            <h3>Email</h3>
            <div className='mt-16'>
              <LinkedAccount
                accountType='email'
                account={email}
                disabled={jusOneLinkedAccount()}
                refetch={refetch}
              />
            </div>
          </div>
          <div className='mt-32'>
            <h3>Numero de telefono</h3>
            <div className='mt-16'>
              <LinkedAccount
                accountType='phone_number'
                account={phone_number}
                disabled={jusOneLinkedAccount()}
                refetch={refetch}
              />
            </div>
          </div>
        </Col>
        <Col xs={24}>
          <Button appearance='primary' size='lg' className='mt-32'>
            Eliminar Cuenta
          </Button>
        </Col>
        <Col xs={24}>
          <a
            // to={'/password-reset'}
            className='mt-32'
            style={{ display: 'block' }}
            target='_blank'
            href='/assets/policy/privacy-policy.pdf'
          >
            <IconPrivacyPolicy /> Politicas de privacidad
          </a>
          <a
            // to={'/password-reset'}
            className='mt-32'
            style={{ display: 'block' }}
            target='_blank'
            href='/assets/policy/terms-and-conditions.pdf'
          >
            <IconTermsConditions /> Terminos y condiciones
          </a>
        </Col>
      </Row>
    </Grid>
  )
}

MyAccount.propTypes = {
  userProfile: PropTypes.object
}
