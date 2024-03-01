import React from 'react'
import { Col, Row } from 'rsuite'
import { IconUploadPhoto } from '@/assets/icons'

import styles from './photos.module.scss'

export const Photos = () => {
  return (
    <Row>
      <Col xs={24}>
        <div className={styles.photos}>
          <div className={styles.photos__upload}>
            <IconUploadPhoto />
          </div>
          <div className={styles.photos__container}>
            <div className={styles.photos__item}>
              <img
                src='https://api.dicebear.com/5.x/avataaars/svg?seed=pRUEBA&backgroundColor=ffdfbf'
                alt='photo'
              />
            </div>
            <div className={styles.photos__item}>
              <img
                src='https://api.dicebear.com/5.x/avataaars/svg?seed=pRUEBA&backgroundColor=ffdfbf'
                alt='photo'
              />
            </div>
            <div className={styles.photos__item}>
              <img
                src='https://api.dicebear.com/5.x/avataaars/svg?seed=pRUEBA&backgroundColor=ffdfbf'
                alt='photo'
              />
            </div>
            <div className={styles.photos__item}>
              <img
                src='https://api.dicebear.com/5.x/avataaars/svg?seed=pRUEBA&backgroundColor=ffdfbf'
                alt='photo'
              />
            </div>
            <div className={styles.photos__item}>
              <img
                src='https://api.dicebear.com/5.x/avataaars/svg?seed=pRUEBA&backgroundColor=ffdfbf'
                alt='photo'
              />
            </div>
            <div className={styles.photos__item}>
              <img
                src='https://api.dicebear.com/5.x/avataaars/svg?seed=pRUEBA&backgroundColor=ffdfbf'
                alt='photo'
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}
