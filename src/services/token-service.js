const USER_KEY = 'user'
const ADMIN_KEY = 'admin'
const TOKEN_KEY = 'access_token'
const REFRESH_KEY = 'refresh_token'

export const saveAuthData = ({ user, admin, tokens }) => {
  const { access_token, refresh_token } = tokens

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } else {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(admin))
  }

  localStorage.setItem(TOKEN_KEY, access_token)
  localStorage.setItem(REFRESH_KEY, refresh_token)
}

export const removeAuthData = () => {
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
}

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const getAuthUser = () => {
  return localStorage.getItem(USER_KEY)
    ? JSON.parse(localStorage.getItem(USER_KEY))
    : null
}

export const getAuthAdmin = () => {
  return localStorage.getItem(ADMIN_KEY)
    ? JSON.parse(localStorage.getItem(ADMIN_KEY))
    : null
}

export const getAuthRefreshToken = () => {
  return localStorage.getItem(REFRESH_KEY)
}
