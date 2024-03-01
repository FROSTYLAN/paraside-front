import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
))

// return (
//   <Nav.Item as={NavLink} href='/'>
//     Home
//   </Nav.Item>
// )

NavLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.any,
}