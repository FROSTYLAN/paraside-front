import React from 'react'
import { Rate as RateRS } from 'rsuite'
// import { BsStarFill } from 'react-icons/bs'
import PropTypes from 'prop-types'

export const Rate = ({ value, size = 'md', className }) => {
  // const renderCharacter = () => (
  //   <BsStarFill style={{ color: 'var(--color-primary)' }} />
  // )

  return (
    <RateRS
      size={size}
      readOnly
      allowHalf
      defaultValue={value}
      style={{ color: 'var(--color-primary)' }}
      className={className}
      // renderCharacter={renderCharacter}
    />
  )
}

Rate.PropTypes = {
  value: PropTypes.number,
  size: PropTypes.string,
  className: PropTypes.string
}
