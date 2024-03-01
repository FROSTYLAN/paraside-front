import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Container, Content, Footer, Header, Nav, Navbar } from 'rsuite'
import { Link, useNavigate } from 'react-router-dom'
import { Text, NavLink } from '@/components/elements'
import {
  IconHome,
  IconChat,
  IconBell,
  IconMoney,
  IconUserCircle,
  IconCogUser,
  IconMoonStar,
  IconQuestionCircle,
  IconLogout
} from '@/assets/icons'
import { useUser } from '@/hooks/use-user'
import { useAuth } from '@/features/auth/api/use-auth'

import styles from './plus-main-layout.module.scss'

export const PlusMainLayout = ({ children }) => {
  const { user, setUser } = useUser()
  const { logout } = useAuth()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setUser(null)
    navigate('/login')
  }

  const nameToShow = () => {
    if (user?.name) {
      return user.name
    }

    if (user?.login_type === 'EMAIL') {
      return user?.email?.split('@')[0]
    }

    return user?.phone_number
  }

  return (
    <Container >
      <Header className={styles.header}>
        <Navbar className={styles.navbar}>
          <div className={styles.navbarContainer}>
            <Link to='/plus'>
              <img
                className={styles.logoImage}
                src='/assets/images/paradise/paradise_plus_white.png'
                alt=''
              />
            </Link>
            <Nav>
              <Nav.Item
                as={NavLink}
                style={{ fontSize: '2.8rem'}}
                href={'/plus/home'}
              >
                <IconHome />
              </Nav.Item>
              <Nav.Item 
                as={NavLink}
                style={{ fontSize: '2.8rem' }}
                href={'/plus/chat'}
              >
                <IconChat />
              </Nav.Item>
              <Nav.Item style={{ fontSize: '2.8rem' }}>
                <IconBell />
              </Nav.Item>
              <Nav.Menu
                title={<IconUserCircle />}
                style={{ fontSize: '2.8rem' }}
                placement='bottomEnd'
              >
                <Nav.Item
                  style={{
                    display: 'flex',
                    gap: '1.6rem',
                    alignItems: 'center',
                    padding: '2rem',
                  }}
                >
                  <Text size={20} weight='bold'>
                    {nameToShow()}
                  </Text>
                  <Avatar
                    size='md'
                    circle
                    src='https://avatars.githubusercontent.com/u/12592949'
                    alt='@SevenOutman'
                  />
                </Nav.Item>
                <Nav.Item
                  as={NavLink}
                  icon={<IconCogUser />}
                  className={styles.navSubItem}
                  href={'/plus/user/settings/my-info'}
                >
                  Configuración de perfil
                </Nav.Item>
                <Nav.Item icon={<IconMoonStar />} className={styles.navSubItem}>
                  Modo nocturno
                </Nav.Item>
                <Nav.Item
                  icon={<IconQuestionCircle />}
                  className={styles.navSubItem}
                >
                  Ayuda y asistencia
                </Nav.Item>
                <Nav.Item
                  icon={<IconLogout />}
                  className={styles.navSubItem}
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Nav.Item>
              </Nav.Menu>
            </Nav>
          </div>
        </Navbar>
      </Header>
      <Content style={{ minHeight: 'calc(100vh - 14rem)' }}>{children}</Content>
      <Footer style={{height: '6rem', borderTop: '0.1rem solid var(--color-lightgray)'}}>Footer</Footer>
    </Container>
  )
}

PlusMainLayout.propTypes = {
  children: PropTypes.any
}
