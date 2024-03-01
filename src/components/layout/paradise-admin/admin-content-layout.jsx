import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './admin-content-layout.module.scss'
import { Col, Grid, Row } from 'rsuite'
import { Link } from 'react-router-dom'

export const AdminContentLayout = ({ children }) => {
  const [activeLink, setActiveLink] = useState('photo');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className={styles.contentLayout}>
      <Grid fluid style={{ marginTop: '3.2rem' }}>
        <Row gutter={32}>
          <Col xs={6} className={styles.contentOptions}>
            <Link 
              to="/admin/receipt/verification-photo" 
              className={`${styles.activeLink} ${activeLink === 'photo' ? styles.selectedLink : ''}`}
              onClick={() => handleLinkClick('photo')}   
            >
              <p className={styles.navText}
              >
                Verificación de fotos
              </p>
            </Link>
            <Link 
              to="/admin/receipt/verification-id" 
              className={`${styles.activeLink} ${activeLink === 'id' ? styles.selectedLink : ''}`}
              onClick={() => handleLinkClick('id')}    
            >
              <p className={styles.navText}
              >
                Verificación de ID
              </p>
            </Link>
            <Link 
              to="/admin/receipt/report" 
              className={`${styles.activeLink} ${activeLink === 'report' ? styles.selectedLink : ''}`}
              onClick={() => handleLinkClick('report')}  
            >
              <p className={styles.navText}
              >
                Reportes de usuarios
              </p>
            </Link>
          </Col>
          <Col xs={18}>{children}</Col>
        </Row>
      </Grid>
    </div>
  )
}

AdminContentLayout.propTypes = {
  children: PropTypes.any
}
