import React, { useEffect } from 'react'
import { Button, Divider, FlexboxGrid } from 'rsuite'
import { subscribe } from '@/api/subscription'
import { useLocation, useNavigate } from 'react-router-dom'

export const Checkout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!location.state?.price) {
      navigate('/plus/pricing')
    }
  }, [location, navigate])

  const processPayment = async () => {
    const { price } = location.state
    const pricing_id = price.id
    const response = await subscribe({ pricing_id })
    if (response.status === 200) {
      navigate('/plus/user/settings/my-subscriptions')
    }
  }

  return (
    <FlexboxGrid
      justify='center'
      style={{ height: 'calc(100vh - 20rem', alignItems: 'center' }}
    >
      <FlexboxGrid.Item>
        <h1>Pasarela de pagos</h1>
        <Divider className='mt-32 mb-32' />
        <Button appearance='primary' block onClick={processPayment}>
          PROCESAR PAGO
        </Button>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}
