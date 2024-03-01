import React, { forwardRef } from 'react'
import { Radio, RadioGroup } from 'rsuite'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import styles from './radio-button.module.scss'

export const RadioButton = forwardRef(
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
      <RadioGroup
        // inline
        ref={ref}
        name={id}
        disabled={disabled}
        className={className}
        onChange={onChange}
        value={value}
      >
        {options.map(({ value, label }, i) => (
          <Radio key={i} value={value}>
            {label}
          </Radio>
        ))}
      </RadioGroup>
      {error && <p className={styles.errorLabel}>{error}</p>}
    </div>
  )
)

RadioButton.propTypes = {
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
  )
}

RadioButton.defaultProps = {
  options: [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' }
  ]
}
