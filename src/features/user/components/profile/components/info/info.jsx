import React from 'react'
import { Button, Col, Grid, Loader, Row } from 'rsuite'
import { IconCheckFilled } from '@/assets/icons'
import { useLanguage } from '@/api/language'
import { useGender } from '@/api/gender'
import { SMOKER_OPTIONS, LOOKING_FOR_OPTIONS } from '@/utils/constants/globals'
import {
  IconSpain,
  IconEngland,
  IconPortugal,
  IconCigarrete,
  IconFriends,
  IconOneNight,
  IconRelationship
} from '../../../../../../assets/icons'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
import { cancelUserMatch, saveUserMatch } from '../../../../../../api/user-match'

const languagesIcons = {
  1: <IconSpain />,
  2: <IconEngland />,
  6: <IconPortugal />
}

const lookingForIcons = {
  1: <IconOneNight />,
  2: <IconRelationship />,
  3: <IconFriends />,
  4: <IconFriends />
}

export const Info = ({ userProfile }) => {
  const { user_id, language, smoker, about_me, verified_photo, gender_id, looking_for } =
    userProfile || {}

  const { isLoading: isLoadingLanguages, data: languages } = useLanguage()
  const { data: genders } = useGender()

  const Languages = () => {
    const languagesToUse = languages?.filter((x) => language?.includes(x.value))

    if (!languagesToUse || languagesToUse.length === 0) return null

    return (
      <div className='mt-32'>
        <h3>Idiomas</h3>
        <div className='mt-16' style={{ display: 'flex', gap: '0.8rem' }}>
          {languagesToUse?.map((x) => (
            <div key={x.value} title={x.label} style={{ width: '2.4rem' }}>
              {languagesIcons[x.value]}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const LookingFor = () => {
    const lookingForToUse = LOOKING_FOR_OPTIONS.filter((x) =>
      looking_for?.includes(x.value)
    )

    if (!lookingForToUse || lookingForToUse.length === 0) return null

    return (
      <div className='mt-32'>
        <h3>En busca de</h3>
        <div
          className='mt-16'
          style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
        >
          {lookingForToUse?.map((x) => (
            <div key={x.value} style={{ display: 'flex', gap: '0.8rem' }}>
              <div style={{ width: '2.4rem' }}>{lookingForIcons[x.value]}</div>
              <div>{x.label}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const smokerObj = SMOKER_OPTIONS.find((x) => x.value === smoker)
  const genderObj = genders?.find((x) => x.value === gender_id)

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get('type');

  
  const navigate = useNavigate()

  const submitMatch = async () => {
    try {
      const response = await saveUserMatch({user_id})
      if (response.status === 200) {
        navigate('/plus/home')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const submitCancel = async () => {
    try {
      const response = await cancelUserMatch({user_id})
      if (response.status === 200) {
        navigate('/plus/home')
      }
    } catch (error) {
      console.log(error)
    }
  }
 
  return (
    <Grid fluid>
      {(isLoadingLanguages || !userProfile) && (
        <Loader backdrop center content='loading' size='md' />
      )}
      <Row gutter={32}>
        <Col xs={24}>
          <div>
            <h2>
              {userProfile?.name}, {userProfile?.age}{' '}
              {verified_photo && (
                <IconCheckFilled style={{ color: 'var(--color-primary)' }} />
              )}
            </h2>
            <small>Ubicación: Laredo, Trujillo, 40 Km de tí</small>
          </div>
          {about_me && (
            <div className='mt-32'>
              <h3>Sobre mí</h3>
              <p className='mt-16'>{about_me}</p>
            </div>
          )}
          {genderObj && (
            <div className='mt-32'>
              <h3>Género</h3>
              <p className='mt-16'>{genderObj?.label}</p>
            </div>
          )}
          <Languages />
          {smokerObj && (
            <div className='mt-32'>
              <h3>Fumador</h3>
              <div className='mt-16' style={{ display: 'flex', gap: '0.8rem' }}>
                <div style={{ width: '2.4rem' }}>
                  <IconCigarrete />
                </div>
                {smokerObj?.label}
              </div>
            </div>
          )}
          <LookingFor />
        </Col>
        <Col xs={24} style={{ textAlign: 'center', padding: "0 16px" }}>
          {
            type === 'contact' && 
            <>
              <Button appearance='primary' size='lg' className='mt-32 mr-8' style={{ "width": "calc(50% - 8px)" }}>
                Ir a conversación
              </Button>
              <Button appearance='primary' size='lg' className='mt-32 ml-8' style={{ "width": "calc(50% - 8px)" }}>
                Bloquear contacto
              </Button>
            </>
          }
          {
            type === 'request' && 
            <>
              <Button appearance='primary' size='lg' className='mt-32 mr-8' style={{ "width": "calc(50% - 8px)" }} onClick={submitMatch}>
                Aceptar solicitud
              </Button>
              <Button appearance='primary' size='lg' className='mt-32 ml-8' style={{ "width": "calc(50% - 8px)" }} onClick={submitCancel}>
                Rechazar solicitud
              </Button>
            </>
          }
          {
            type === 'creator' && 
            <>
              <Button appearance='primary' size='lg' className='mt-32' style={{ "width": "100%" }} onClick={submitMatch}>
                Quiero conocerte
              </Button>
            </>
          }
        </Col>
      </Row>
    </Grid>
  )
}

Info.propTypes = {
  userProfile: PropTypes.object
}