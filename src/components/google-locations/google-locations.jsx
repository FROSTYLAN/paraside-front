import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Nav } from 'rsuite'
import { GoogleLocationsNew } from './google-locations-new'
import { GoogleLocationsDelete } from './google-locations-delete'

import './google-locations.scss'
import { FaMinus, FaPlus } from 'react-icons/fa'

export const GoogleLocations = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('new')

  const tabs = {
    new: <GoogleLocationsNew onClose={onClose} />,
    delete: <GoogleLocationsDelete onClose={onClose} />
  }

  return (
    <>
      <Nav
        appearance='tabs'
        activeKey={activeTab}
        onSelect={setActiveTab}
        className='mb-16'
        justified
      >
        <Nav.Item eventKey='new'>
          <span
            style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}
          >
            <FaPlus /> Nueva ubicación
          </span>
        </Nav.Item>
        <Nav.Item eventKey='delete'>
          <span
            style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}
          >
            <FaMinus /> Eliminar ubicación
          </span>
        </Nav.Item>
      </Nav>
      {tabs[activeTab]}
    </>
  )
}

GoogleLocations.propTypes = {
  onClose: PropTypes.func
}
