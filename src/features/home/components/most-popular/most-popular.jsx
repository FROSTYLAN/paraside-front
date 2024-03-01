import React from 'react'
import { Link } from 'react-router-dom'
import { Loader, Panel } from 'rsuite'
import { Text } from '@/components/elements'
import { useGetUserProfilesPopular } from '@/api/user-profile'

import styles from './most-popular.module.scss'
import clsx from 'clsx'

export const MostPopular = () => {
  const {
    data: users,
    isLoading,
    hasNextPage,
    fetchNextPage
  } = useGetUserProfilesPopular()
  // const { data: users, isLoading } = useGetUserProfilesPopular()

  const onImageError = (event) => {
    event.currentTarget.src = '/assets/images/users/user_fallback.webp'
  }

  return (
    <Panel bordered
      header={
        <Text tag='h2' size={20} weight='black' style={{ lineHeight: '2' }}>
          Favoritos
        </Text>
      }
    >
      {isLoading ? (
        <Loader center size='md' />
      ) : (
        <div className={styles.popularList}>
          {users?.map((user, i) => (
            <Link
              to={`/plus/user/${user.user_id}`}
              key={i}
              className={styles.popularUser}
            >
              <span className={styles.popularUserImg}>
                <img
                  src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${user.name}&backgroundColor=ffdfbf`}
                  alt=''
                  onError={onImageError}
                />
              </span>
              <div
                className={clsx(styles.userStatus, {
                  [styles.online]: user.status === 'online'
                })}
              ></div>
            </Link>
          ))}
          {hasNextPage && (
            <button className={styles.loadMore} onClick={() => fetchNextPage()}>
              Cargar más
            </button>
          )}
        </div>
      )}
    </Panel>
  )
}
