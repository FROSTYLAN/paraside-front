import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import './text.scss'

export const Text = ({
  tag = 'p',
  family = 'primary',
  size = 16,
  weight = 'normal',
  align = 'left',
  upper,
  underline,
  italic,
  className,
  style,
  children,
}) => {
  const Component = `${tag}`
  return (
    <Component
      className={clsx(
        `font-${family}`,
        `size-${size}`,
        `align-${align}`,
        `weight-${weight}`,
        {
          ['upper']: upper,
          ['underline']: underline,
          ['italic']: italic,
        },
        className
      )}
      style={style}
    >
      {children}
    </Component>
  )
}

Text.propTypes = {
  tag: PropTypes.oneOf(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  family: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf([4, 8, 12, 16, 20, 24, 28, 32, 36, 40]),
  weight: PropTypes.oneOf(['light', 'normal', 'bold', 'black']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  upper: PropTypes.bool,
  underline: PropTypes.bool,
  italic: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.any,
  children: PropTypes.any,
}
