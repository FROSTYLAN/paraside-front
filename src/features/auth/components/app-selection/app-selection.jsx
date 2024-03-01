import React from 'react'
import { Link } from 'react-router-dom'
import { FlexboxGrid } from 'rsuite'

import styles from './app-selection.module.scss'

export const AppSelection = () => {
  return (
    <FlexboxGrid justify='start' align='middle' className={styles.container}>
      <h1>Selecciona tu plataforma</h1>
      <FlexboxGrid className={styles.apps}>
        <Link to='/paradise' className={styles.app}>
          <img src='/assets/images/apps/paradise_255.png' alt='' />
        </Link>
        <Link to='/plus' className={styles.app}>
          <img src='/assets/images/apps/paradise_plus_white_255.png' alt='' />
        </Link>
      </FlexboxGrid>
    </FlexboxGrid>
  )
}
