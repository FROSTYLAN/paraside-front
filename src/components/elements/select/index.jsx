import React, { forwardRef } from 'react'
import { SelectPicker } from 'rsuite'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import styles from './select.module.scss'

export const Select = forwardRef(
  (
    {
      id,
      label,
      disabled,
      className,
      error,
      onChange,
      value,
      options,
      loading
    },
    ref
  ) => (
    <div className={clsx(styles.formGroup, { ['form-error']: error })}>
      {label && (
        <label htmlFor={id} className={styles.formLabel}>
          {label}
        </label>
      )}
      <SelectPicker
        ref={ref}
        name={id}
        disabled={disabled}
        className={className}
        onChange={onChange}
        value={value}
        data={options}
        loading={loading}
        size='md'
        block
      />
      {error && <p className={styles.errorLabel}>{error}</p>}
    </div>
  )
)

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      text: PropTypes.string
    })
  ),
  loading: PropTypes.bool
}

Select.defaultProps = {
  options: [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' }
  ]
}
