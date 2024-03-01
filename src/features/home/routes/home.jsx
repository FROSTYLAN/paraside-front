import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Panel } from 'rsuite'
import { PlusContentLayout } from '@/components/layout'
import { useUser } from '@/hooks/use-user'
import { useGetUserProfile } from '@/api/user-profile'

import { PanelBody } from '../components/panel-body/panel-body'
import { PanelHeader } from '../components/panel-header/panel-header'

export const Home = () => {
  const [show, setShow] = useState(true);
  const onToggleButtons = (value) => setShow(value);

  const { user } = useUser()
  const { isLoading, data: { profile: userProfile } } = useGetUserProfile({ id: user.id })
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && (!userProfile || Object.keys(userProfile).length === 0)) {
      navigate('/plus/user/settings/my-info')
    }
  }, [userProfile, isLoading])

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <PlusContentLayout>
      <Panel bordered>
        <PanelHeader
          role={userProfile.role} 
          onToggleButtons={onToggleButtons}
          show={show}
        />
        <PanelBody
          role={userProfile.role} 
          show={show}
        />
      </Panel>
    </PlusContentLayout>
  )
}
