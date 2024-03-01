import React, { useState, forwardRef } from 'react'
import { Button, Modal, SelectPicker } from 'rsuite'
import { FaPencilAlt } from 'react-icons/fa'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { GoogleLocations } from '../../google-locations'
import { Tooltip } from '@/components/elements'

import styles from './google-location-select.module.scss'

export const GoogleLocationSelect = forwardRef(
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
      loading,
      tooltip
    },
    ref
  ) => {
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)

    return (
      <>
        <div
          className={clsx(
            styles.formGroup,
            { ['form-error']: error },
            className
          )}
        >
          {label && (
            <label htmlFor={id} className={styles.formLabel}>
              {label}{' '}
              {tooltip && (
                <Tooltip icon={tooltip.icon} message={tooltip.message} />
              )}
            </label>
          )}
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <SelectPicker
              ref={ref}
              name={id}
              disabled={disabled}
              onChange={onChange}
              value={value}
              data={options}
              loading={loading}
              size='md'
              block
              style={{ width: '100%' }}
            />
            <Tooltip message='Agregar o quitar ubicaciones'>
              <Button
                style={{ display: 'flex', alignItems: 'center' }}
                appearance='primary'
                onClick={handleOpen}
              >
                <FaPencilAlt />
              </Button>
            </Tooltip>
          </div>
          {error && <p className={styles.errorLabel}>{error}</p>}
        </div>
        <Modal
          backdrop='static'
          size='md'
          keyboard={false}
          open={open}
          onClose={handleClose}
        >
          <Modal.Header>
            <Modal.Title style={{ fontSize: '2rem', fontWeight: '700' }}>
              Mantenedor de ubicaciones
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ overflow: 'unset' }}>
            <GoogleLocations onClose={handleClose} />
          </Modal.Body>
        </Modal>
      </>
    )
  }
)

GoogleLocationSelect.propTypes = {
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
  loading: PropTypes.bool,
  tooltip: PropTypes.shape({
    icon: PropTypes.node,
    message: PropTypes.string
  })
}

GoogleLocationSelect.defaultProps = {
  options: [
    { value: 1, label: 'Location 1' },
    { value: 2, label: 'Location 2' }
  ]
}
