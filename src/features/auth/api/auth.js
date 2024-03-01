import { auth } from '@/endpoints/api'
import { useFetch } from '@/utils/react-query'
import { pathToUrl } from '@/utils/functions'

export const useRegisterConfirmLink = ({ token }) =>
  useFetch(pathToUrl(auth.verifyAccountLink, { token }))