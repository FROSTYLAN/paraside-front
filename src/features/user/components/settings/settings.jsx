import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Col, FlexboxGrid, Nav } from 'rsuite'
import { NavLink } from '@/components/elements'

const navItems = [
  {
    label: 'Datos personales',
    href: '/plus/user/settings/my-info'
  },
  {
    label: 'Mi perfil',
    href: '/plus/user/settings/my-profile'
  },
  {
    label: 'Mis suscripciones',
    href: '/plus/user/settings/my-subscriptions'
  },
  {
    label: 'Mi cuenta',
    href: '/plus/user/settings/my-account'
  }
]

export const SettingsLayout = () => {
  const { pathname } = useLocation()
  return (
    <FlexboxGrid justify='center' style={{ marginTop: '3.2rem' }}>
      <FlexboxGrid.Item
        as={Col}
        sm={3}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignSelf: 'stretch'
        }}
      >
        <Nav
          appearance='tabs'
          vertical
          activeKey={pathname}
          style={{ width: 200 }}
        >
          {navItems.map((item) => (
            <Nav.Item
              key={item.href}
              as={NavLink}
              to={item.href}
              eventKey={item.href}
            >
              {item.label}
            </Nav.Item>
          ))}
        </Nav>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item
        as={Col}
        xs={18}
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          paddingLeft: '3.2rem'
        }}
      >
        <Outlet />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}
