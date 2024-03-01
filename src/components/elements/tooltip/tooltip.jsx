import React from 'react'
import { IconButton, Whisper, Tooltip as TooltipRS } from 'rsuite'
import PropTypes from 'prop-types'
//<BsInfoCircle />
//La ubicación se utilizará para la búsqueda de usuarios cerca de ti
export const Tooltip = ({ icon, message, children, placement }) => {
  const tooltip = <TooltipRS>{message}</TooltipRS>

  return (
    <Whisper
      placement={placement}
      controlId='control-id-hover'
      trigger='hover'
      speaker={tooltip}
    >
      {icon ? (
        <IconButton appearance='subtle' icon={icon} circle size='xs' />
      ) : (
        children
      )}
    </Whisper>
  )
}

Tooltip.propTypes = {
  icon: PropTypes.node,
  message: PropTypes.string,
  children: PropTypes.node,
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
}

Tooltip.defaultProps = {
  icon: null,
  message: '',
  children: null,
  placement: 'top'
}
