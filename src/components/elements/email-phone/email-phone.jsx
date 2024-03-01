import React, { forwardRef } from 'react'
import { Input, SelectPicker } from 'rsuite'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { COUNTRY_CODES } from '@/utils/constants/globals'

import styles from './email-phone.module.scss'

export const EmailPhone = forwardRef(
  (
    {
      id,
      label,
      disabled,
      className,
      error,
      onChange,
      value,
      as,
      onFocus,
      onBlur,
      autoFocus,
      onlyPhone,
      onlyEmail
    },
    ref
  ) => {
    const showCountryCode = !onlyEmail && (!isNaN(value) || onlyPhone)

    const selectedCountryCode =
      value && showCountryCode ? value.substring(0, 2) : '51'
    const valueAux = () => {
      if (!showCountryCode) return value
      return value?.length > 2 ? value?.substring(2) : ''
    }

    const handleSelectChange = (e) =>
      !!onChange && onChange((e || '51') + valueAux())

    const handleInputChange = (e) => {
      let newValue = !isNaN(e) ? selectedCountryCode + e : e

      if (onlyPhone && !e.match(/^[0-9]*$/)) return
      if (onlyEmail) {
        newValue = e
      }

      !!onChange && onChange(newValue)
    }

    const maxLength = showCountryCode ? 10 : 50

    return (
      <div className={clsx(styles.formGroup, { [styles.formError]: error })}>
        {label && (
          <label htmlFor={id} className={styles.formLabel}>
            {label}
          </label>
        )}
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'nowrap' }}>
          {showCountryCode && (
            <SelectPicker
              name={`country_code_${id}`}
              disabled={disabled}
              className={className}
              onChange={handleSelectChange}
              value={selectedCountryCode}
              data={COUNTRY_CODES}
              size='md'
              block
              cleanable={false}
              renderValue={(_, item) => {
                return item?.labelAux
              }}
            />
          )}
          <Input
            id={id}
            disabled={disabled}
            className={className}
            inputRef={ref}
            onChange={handleInputChange}
            value={valueAux()}
            maxLength={maxLength}
            as={as}
            autoComplete='off'
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus={autoFocus}
          />
        </div>
        {error && <p className={styles.errorLabel}>{error}</p>}
      </div>
    )
  }
)

EmailPhone.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.any,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  maxLength: PropTypes.number,
  as: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  autoFocus: PropTypes.bool,
  onlyPhone: PropTypes.bool,
  onlyEmail: PropTypes.bool
}
