import React from 'react'
import PropTypes from 'prop-types'

import styles from './verify-item.module.scss'

export const VerifyItem = ({ icon, label }) => {
  return (
    <div className={styles.verifyItem}>
      <div className={styles.verifyItemIcon}>{icon}</div>
      <div className={styles.verifyItemLabel}>{label}</div>
    </div>
  )
}

VerifyItem.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string
}
