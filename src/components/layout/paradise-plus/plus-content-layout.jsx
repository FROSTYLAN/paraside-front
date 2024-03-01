import React from 'react'
import PropTypes from 'prop-types'

import styles from './plus-content-layout.module.scss'
import { Col, Grid, Row } from 'rsuite'
import { MostPopular } from '@/features/home/components/most-popular/most-popular'

export const PlusContentLayout = ({ children }) => {
  return (
    <div className={styles.contentLayout}>
      <Grid fluid style={{ marginTop: '3.2rem' }}>
        <Row gutter={32}>
          <Col xs={6}>
            <MostPopular />
          </Col>
          <Col xs={18}>{children}</Col>
        </Row>
      </Grid>
    </div>
  )
}

PlusContentLayout.propTypes = {
  children: PropTypes.any
}
