import React, { useState } from 'react'
import { Button, Checkbox, Col, FlexboxGrid, Grid, Row } from 'rsuite'
import { Uploader, Tooltip } from '@/components/elements'
import { BsInfoCircle } from 'react-icons/bs'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './profile-verification.module.scss'

export const ProfileVerification = ({ setStep }) => {
  const [onDelantera, setDelantera] = useState('')
  const [onTrasera, setTrasera] = useState('')
 
  const setError = (e) => {
    console.log(e);
  }

  const onSubmit = () => {
    console.log(onDelantera);
    console.log(onTrasera);
    setStep('profile')
  }

  return (
    <Grid style={{ width: '100%'} }>
      <Row>
        <Col xs={24}>
          <FlexboxGrid justify='space-between'>
            <FlexboxGrid.Item colspan={12}>
              <h2>Verificación de identidad</h2>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12} style={{ textAlign: 'right' }}>
              <Button onClick={() => setStep('profile')} appearance='primary'>
                {'< Regresar a mi perfil'}
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Col>
      </Row>
      <Row>
        <Col xs={24} className='mt-16'>
          <h3>Cargar una foto de su documento de identidad (ID Card)</h3>
          <div className={styles.example}>
            <div className={styles.images}>
              <div className={styles.item}>
                <div className={styles.image}>
                  <img
                    src='/assets/images/users/identity_document.png'
                    alt=''
                  />
                </div>
                <p style={{ marginTop: '8px' }}>Correcto</p>
              </div>
              <div className={styles.item}>
                <div className={clsx(styles.image, styles.cutted)}>
                  <img
                    src='/assets/images/users/identity_document.png'
                    alt=''
                  />
                </div>
                <p style={{ marginTop: '8px' }}>No Cortado</p>
              </div>
              <div className={styles.item}>
                <div className={clsx(styles.image, styles.blurred)}>
                  <img
                    src='/assets/images/users/identity_document.png'
                    alt=''
                  />
                </div>
                <p style={{ marginTop: '8px' }}>No Borroso</p>
              </div>
              <div className={styles.item}>
                <div className={clsx(styles.image, styles.shiny)}>
                  <img
                    src='/assets/images/users/identity_document.png'
                    alt=''
                  />
                </div>
                <p style={{ marginTop: '8px' }}>No Brillo</p>
              </div>
            </div>
            <Tooltip
              message={
                <ul>
                  <li>Emitido por el gobierno de su país.</li>
                  <li>Documento original de tamaño completo y sin editar.</li>
                  <li>
                    Coloque los documentos sobre un fondo de un solocolor.
                  </li>
                  <li>Imágenes coloreadas legibles y bien iluminadas.</li>
                  <li>No imágenes en blanco y negro.</li>
                  <li>No documentos editados o vencidos</li>
                </ul>
              }
              icon={<BsInfoCircle style={{ fontSize: '24px' }} />}
              placement='right'
            />
          </div>
          <h3>
            El tamaño del archivo debe estar entre 10KB y 5120KB, en formato
            JPG/JPEG/PNG
          </h3>
        </Col>
      </Row>
      <Row>
        <Col xs={24} className='mt-16' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div className={styles.files}>  
            <div className={styles.front}>
              <Uploader
                onSelectFile={setDelantera} 
                setError={setError} 
              />
              <p>Parte delantera</p>
            </div>
            <div className={styles.back}>
              <Uploader 
                onSelectFile={setTrasera} 
                setError={setError} 
              />
              <p>Parte trasera</p>
            </div>
          </div>
          <Checkbox className='mt-32'>
            <h4>
              Esta información se usa solo para verificación personal, se
              mantiene privada y confidencial para Paradise
            </h4>
          </Checkbox>
          <Button className='mt-16 mb-16' appearance='primary' onClick={onSubmit}>
            Enviar datos para verificación
          </Button>
        </Col>
      </Row>
    </Grid>
  )
}

ProfileVerification.propTypes = {
  setStep: PropTypes.func.isRequired
}
