import { toast } from 'react-toastify'

const toasts = {
  error: (msg) => toast.error(msg),
  success: (msg) => toast.success(msg),
  warning: (msg) => toast.warning(msg),
  info: (msg) => toast.info(msg)
}

export const pushNotification = (msg, type = 'error') => {
  toasts[type] && toasts[type](msg)
}
