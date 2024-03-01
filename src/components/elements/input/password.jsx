import React, { forwardRef, useState } from 'react'
import { Input, InputGroup } from 'rsuite'
import PropTypes from 'prop-types'
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri'
import clsx from 'clsx'

import styles from './text-button-input.module.scss'

export const Password = forwardRef(
  ({ id, label, disabled, className, error, onChange }, ref) => {
    const [visible, setVisible] = useState(false)

    const handleChange = () => {
      setVisible((prev) => !prev)
    }

    return (
      <div className={clsx(styles.formGroup, { [styles.formError]: error })}>
        <label htmlFor={id} className={styles.formLabel}>
          {label}
        </label>
        <InputGroup inside className={clsx({ [styles.inputError]: error })}>
          <Input
            id={id}
            disabled={disabled}
            className={className}
            inputRef={ref}
            type={visible ? 'text' : 'password'}
            onChange={e => onChange(e)}
          />
          <InputGroup.Button onClick={handleChange}>
            {visible ? <RiEyeFill /> : <RiEyeCloseFill />}
          </InputGroup.Button>
        </InputGroup>
        {error && <p className={styles.errorLabel}>{error}</p>}
      </div>
    )
  }
)

Password.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  rest: PropTypes.any,
}
