import React from 'react'
import { IconCheckFilled } from '@/assets/icons'
import { Button, Col, FlexboxGrid, Progress as ProgressRS, Row } from 'rsuite'
import PropTypes from 'prop-types'

export const Progress = ({
  name,
  age,
  verifiedPhoto,
  percent,
  setStep
}) => {
  const status = percent === 100 ? 'success' : null
  const color = percent === 100 ? '#52c41a' : '#3385ff'

  return (
    <Row>
      <Col xs={24}>
        <FlexboxGrid align='bottom'>
          <FlexboxGrid.Item colspan={12}>
            <div
              style={{ display: 'flex', gap: '1.6rem', alignItems: 'center' }}
            >
              <h2>
                {name}, {age}
              </h2>
              {verifiedPhoto ? (
                <h4 style={{ color: 'var(--color-primary)' }}>
                  Perfil verificado con foto <IconCheckFilled />
                </h4>
              ) : (
                <Button
                  onClick={() => setStep('verificationByPhoto')}
                  appearance='link'
                >
                  Verificar perfil
                </Button>
              )}
            </div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12}>
            <h3>Completa tu perfil</h3>
            <ProgressRS.Line
              style={{ padding: '0' }}
              percent={percent}
              strokeColor={color}
              status={status}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Col>
    </Row>
  )
}

Progress.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  verifiedPhoto: PropTypes.bool.isRequired,
  percent: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired
}
