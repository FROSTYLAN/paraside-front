import React, { forwardRef } from 'react'
import { Checkbox, CheckboxGroup } from 'rsuite'
import clsx from 'clsx'
import { PropTypes } from 'prop-types'

import styles from './check-group.module.scss'

export const CheckGroup = forwardRef(
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
      <CheckboxGroup
        ref={ref}
        name={id}
        disabled={disabled}
        className={className}
        value={value}
        onChange={onChange}
        size='md'
      >
        {options.map((option) => (
          <Checkbox key={option.value} value={option.value}>
            {option.label}
          </Checkbox>
        ))}
      </CheckboxGroup>
      {error && <p className={styles.errorLabel}>{error}</p>}
    </div>
  )
)

CheckGroup.propTypes = {
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

CheckGroup.defaultProps = {
  options: [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' }
  ]
}
