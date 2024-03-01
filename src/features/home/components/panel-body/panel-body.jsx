import React from 'react'
import { Loader } from 'rsuite';
import { useUser } from '@/hooks/use-user';
import { useGetUserProfilesByFilter } from '@/api/user-profile';
import { useGetUserPreferences } from '@/api/user-preferences';
import { useGetUserContacts, useGetUserRequests } from '@/api/user-match';
import styles from './panel-body.module.scss';
import { UserCard } from '../user-card/user-card';

export const PanelBody = ({ role, show }) => {

  const onImageError = (event) => {
    event.currentTarget.src = '/assets/images/users/user_fallback.webp';
  };

  const renderUserCards = (users, type) => {
    if (!users?.data || users?.data.length === 0) {
      return (
        <p style={{ textAlign: "center" }}>
          {type === 'contact' && "Aún no tienes ningún contacto."}
          {type === 'request' && "No hay solicitudes pendientes."}
          {type === 'creator' && "No hay creadores para mostrar"}
        </p>
      );
    }

    return (
      <section className={styles.results}>
        {users.data.map((user, i) => (
          <UserCard key={i} type={type} user={user} onImageError={onImageError} />
        ))}
      </section>
    );
  };

  if (role === 'suscriptor') {
    const { user } = useUser();
    const { data: filters } = useGetUserPreferences({ id: user.id });
    const { data: users, isLoading: isLoadingUsers } = useGetUserProfilesByFilter({});

    return (
      <>
        {isLoadingUsers ? (
          <Loader center size="md" />
        ) : renderUserCards(users, 'creator')
        }
      </>
    )
  }

  if (role === 'creator') {
    const { data: requests, isLoading: isLoadingRequests } = useGetUserRequests({});
    const { data: contacts, isLoading: isLoadingContacts } = useGetUserContacts({});

    return (
      <section style={{ padding: "4rem" }}>
        {show ? (
          isLoadingContacts ? (
            <Loader center size='md' />
          ) : renderUserCards(contacts, 'contact')
        ) : (
          isLoadingRequests ? (
            <Loader center size='md' />
          ) : renderUserCards(requests, 'request')
        )}
      </section>
    )
  }

  return null
}
