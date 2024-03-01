import React, { useState } from 'react'
import {
  Button,
  Col,
  Divider,
  FlexboxGrid,
  Grid,
  Message,
  Panel,
  Row,
  useToaster
} from 'rsuite'
import { Uploader } from '@/components/elements'
import PropTypes from 'prop-types'
import Pose1 from '@/assets/photos/pose1.webp'

import styles from './verification-by-photo.module.scss'
import { saveVerificationPose } from '../../../../../../../../api/verification'

export const VerificationByPhoto = ({ setStep }) => {
  const toaster = useToaster()
  const [files, setFiles] = useState({
    image_01: null,
    image_02: null
  })
  const [loading, setLoading] = useState(false)

  const sendVerification = async () => {
    try {
      if (loading) return
      setLoading(true)
      const response = await saveVerificationPose({
        image_01: files.image_01.blobFile,
        image_02: files.image_02.blobFile
      })
      console.log(response)
      if (response.status === 200) {
        toaster.push(
          <Message showIcon type='success'>Datos enviados correctamente</Message>,
          {
            duration: 5000
          }
        )
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <Grid style={{ width: '100%' }}>
      <Row>
        <Col xs={24}>
          <FlexboxGrid justify='space-between'>
            <FlexboxGrid.Item colspan={12}>
              <h2>Verificación por fotografía</h2>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12} style={{ textAlign: 'right' }}>
              <Button onClick={() => setStep('profile')} appearance='primary'>
                {'< Regresar a mi perfil'}
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider className='mt-16 mb-16' />
          <Message type='info' className='mb-16'>
            Debe procurar imitar lo mejor posible la postura referenciada en
            cada imagen
          </Message>
        </Col>
      </Row>
      <Row>
        <Col xs={24} className={styles.files}>
          <Panel header={<h3>Pose 1</h3>} bordered>
            <div className={styles.photo} style={{display: 'flex', alignItems: 'center'}}>
              <img src={Pose1} alt='' height='180px'/>
              <Uploader
                verificationPhoto={true}
                selectedFile={files.image_01}
                onSelectFile={(f) => setFiles({ ...files, image_01: f })}
              />
            </div>
          </Panel>
          <Panel header={<h3>Pose 2</h3>} bordered>
            <div className={styles.photo} style={{display: 'flex', alignItems: 'center'}}>
              <img src={Pose1} alt='' height='180px'/>
              <Uploader
                verificationPhoto={true}
                selectedFile={files.image_02}
                onSelectFile={(f) => setFiles({ ...files, image_02: f })}
              />
            </div>
          </Panel>
        </Col>
      </Row>
      <Row>
        <Col xs={24} className='mt-16' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Button
            className='mt-16'
            appearance='primary'
            onClick={sendVerification}
            loading={loading}
          >
            Enviar datos para verificación
          </Button>
        </Col>
      </Row>
    </Grid>
  )
}

VerificationByPhoto.propTypes = {
  setStep: PropTypes.func.isRequired
}
