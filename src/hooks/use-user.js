import useSWR from 'swr'
import { getAuthenticatedUser } from '@/services/auth-service'

export const useUser = () => {
  const { data, mutate, error } = useSWR('api_user', getAuthenticatedUser)

  const loading = !data && !error
  const loggedOut = error && error.status === 403

  return {
    loading,
    loggedOut,
    user: data,
    setUser: mutate,
  }
}
