import React, { forwardRef } from 'react'
import { CheckPicker as CheckPickerRS } from 'rsuite'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import styles from './check-picker.module.scss'

export const CheckPicker = forwardRef(
  (
    { id, label, disabled, className, error, onChange, value, options },
    ref
  ) => (
    <div className={clsx(styles.formGroup, { ['form-error']: error })}>
      {label && (
        <label htmlFor={id} className={styles.formLabel}>
          {label}
        </label>
      )}
      <CheckPickerRS
        ref={ref}
        name={id}
        disabled={disabled}
        className={className}
        onChange={onChange}
        value={value}
        data={options}
        size='md'
        block
      />
      {error && <p className={styles.errorLabel}>{error}</p>}
    </div>
  )
)

CheckPicker.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.array,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      text: PropTypes.string
    })
  )
}

CheckPicker.defaultProps = {
  options: [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' }
  ]
}
