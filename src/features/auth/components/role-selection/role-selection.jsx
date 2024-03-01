import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, FlexboxGrid, Radio, RadioGroup } from 'rsuite'

export const RoleSelection = () => {
  const navigate = useNavigate()

  return (
    <FlexboxGrid justify='center' align='middle' style={{ marginTop: '10%' }}>
      <div>
        <h1>Selecciona tu rol</h1>
        <RadioGroup name='role' defaultValue='suscriptor' className='mt-32'>
          <Radio value='suscriptor'>Suscriptor</Radio>
          <Radio value='creador'>Creador</Radio>
        </RadioGroup>
        <Button
          appearance='primary'
          size='md'
          block
          className='mt-32'
          onClick={() => navigate('/plus/home')}
        >
          Continuar
        </Button>
      </div>
    </FlexboxGrid>
  )
}
