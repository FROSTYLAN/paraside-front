import React from 'react'
import { FlexboxGrid } from 'rsuite'
import {
  IconCheckFilled,
  IconSmartPhone,
  IconFacebook,
  IconInstagram
} from '@/assets/icons'
import { VerifyItem } from './components/verify-item'
import { IconId } from '@/assets/icons'

export const Verifications = ({ setStep }) => {
  return (
    <FlexboxGrid justify='start' style={{ gap: '3.2rem' }}>
      <FlexboxGrid.Item>
        <VerifyItem icon={<IconCheckFilled />} label='Foto no verificada' />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <VerifyItem icon={<IconSmartPhone />} label='Numero no verificado' />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <VerifyItem icon={<IconFacebook />} label='Facebook no conectado' />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <VerifyItem icon={<IconInstagram />} label='Instagram no conectado' />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item
        onClick={() => setStep('verification')}
        style={{ cursor: 'pointer' }}
      >
        <VerifyItem icon={<IconId />} label='ID no verificado' />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}
