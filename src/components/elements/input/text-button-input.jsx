import React, { forwardRef } from 'react'
import { Input, InputGroup } from 'rsuite'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import styles from './text-button-input.module.scss'

export const TextButtonInput = forwardRef(
  (
    {
      id,
      label,
      disabled,
      className,
      error,
      onChange,
      buttonChildren,
      onButtonClick,
      buttonDisabled,
      maxLength,
    },
    ref
  ) => {
    return (
      <div className={clsx(styles.formGroup, { [styles.formError]: error })}>
        <label htmlFor={id} className={styles.formLabel}>
          {label}
        </label>
        <InputGroup className={clsx({ [styles.inputError]: error })}>
          <Input
            id={id}
            disabled={disabled}
            className={className}
            inputRef={ref}
            type='text'
            onChange={(e) => onChange(e)}
            maxLength={maxLength}
          />
          <InputGroup.Button
            type={onButtonClick ? 'button' : 'submit'}
            onClick={onButtonClick}
            disabled={buttonDisabled}
          >
            {buttonChildren}
          </InputGroup.Button>
        </InputGroup>
        {error && <p className={styles.errorLabel}>{error}</p>}
      </div>
    )
  }
)

TextButtonInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  buttonChildren: PropTypes.any,
  onButtonClick: PropTypes.func,
  buttonDisabled: PropTypes.bool,
  maxLength: PropTypes.number,
}
