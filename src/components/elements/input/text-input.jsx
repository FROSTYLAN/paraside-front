import React, { forwardRef } from 'react';
import { Input } from 'rsuite';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './text-input.module.scss';

export const TextInput = forwardRef(
  (
    {
      id,
      label,
      disabled,
      className,
      error,
      onChange,
      value,
      maxLength,
      as,
      onFocus,
      onBlur,
      autoFocus,
      placeholder,
    },
    ref
  ) => {
    return (
      <div className={clsx(styles.formGroup, { [styles.formError]: error })}>
        {label && (
          <label htmlFor={id} className={styles.formLabel}>
            {label}
          </label>
        )}
        <Input
          id={id}
          disabled={disabled}
          className={className}
          inputRef={ref}
          onChange={(e) => !!onChange && onChange(e)}
          value={value}
          maxLength={maxLength}
          as={as}
          autoComplete='off'
          onFocus={onFocus}
          onBlur={onBlur}
          autoFocus={autoFocus}
          placeholder={placeholder}
        />
        {error && <p className={styles.errorLabel}>{error}</p>}
      </div>
    );
  }
);

TextInput.propTypes = {
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
  placeholder: PropTypes.string, // Añadimos el tipo del atributo placeholder
};
