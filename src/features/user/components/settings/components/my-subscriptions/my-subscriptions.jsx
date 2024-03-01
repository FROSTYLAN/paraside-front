import React from 'react'
import { Button, Divider } from 'rsuite'
import { NavLink } from '@/components/elements'
import { useSubscription } from '@/api/subscription'
import { useUser } from '@/hooks/use-user'

export const MySubscriptions = () => {
  const { user } = useUser()
  const { data } = useSubscription({ user_id: user.id })

  const hasActiveSubscriptions = data?.state === 1

  const NoActiveSubscriptions = () => (
    <>
      <p className='mb-16'>No tienes ninguna suscripción activa.</p>
      <Button as={NavLink} href='/plus/pricing' appearance='primary'>
        Suscribirse
      </Button>
    </>
  )

  const ActiveSubscriptions = () => (
    <>
      <p className='mb-16'>
        Tus suscripciones activas se muestran a continuación. Puedes cancelarlas
        cuando quieras.
      </p>
      <p>
        Fecha de inicio: {Intl.DateTimeFormat('es-ES').format(new Date(data?.start_date))}
      </p>
      <p>Fecha de fin: {Intl.DateTimeFormat('es-ES').format(new Date(data?.end_date))}</p>
      <Button appearance='primary' className='mt-16'>Cancelar suscripción</Button>
    </>
  )

  return (
    <div>
      <h1>Mis suscripciones</h1>
      <Divider className='mt-16 mb-16' />
      {hasActiveSubscriptions ? (
        <ActiveSubscriptions />
      ) : (
        <NoActiveSubscriptions />
      )}
    </div>
  )
}
