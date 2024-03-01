import { toast } from 'react-toastify'
import { logout } from './auth-service'

export const handleError = (err) => {
  if (err?.response?.status === 401) {
    logout()
    window.location.href = '/login'
    return
  }

  if (err?.response?.status === 400) {
    const data = err.response.data
    const msg = data instanceof Array ? data[0]?.msg : data?.msg || data
    toast.error(msg)
    return Promise.reject(err)
  }

  toast.error(
    `Uy!! Ocurrio un error en el sistema.
    Por favor intentelo mas tarde. Si el error persiste, contáctanos en el Centro de Ayuda.`
  )

  return Promise.reject(err)
}
