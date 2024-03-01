import React, { forwardRef } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { DatePicker as DatePickerAux } from 'rsuite'

import styles from './date-picker.module.scss'
import './date-picker.scss'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'

export const DatePicker = forwardRef(
  ({ id, label, disabled, className, error, onChange, value, minDate, maxDate }, ref) => {
    const disableDate = (date) => {
      return isBefore(date, minDate) || isAfter(date, maxDate)
    }

    return (
      <div className={clsx(styles.formGroup, { ['form-error']: error })}>
        <label htmlFor={id} className={styles.formLabel}>
          {label}
        </label>
        <DatePickerAux
          ref={ref}
          id={id}
          disabled={disabled}
          className={className}
          size='md'
          format='dd/MM/yyyy'
          placeholder='dd/mm/yyyy'
          onChange={(e) => onChange(e)}
          value={value}
          block
          oneTap
          disabledDate={(date) => disableDate(date)}
        />
        {error && <p className={styles.errorLabel}>{error}</p>}
      </div>
    )
  }
)

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date)
}
