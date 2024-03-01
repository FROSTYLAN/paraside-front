import useSWR from 'swr'
import { getAuthenticatedAdmin } from '@/services/auth-service'

export const useAdmin = () => {
  const { data, mutate, error } = useSWR('api_user', getAuthenticatedAdmin)

  const loading = !data && !error
  const loggedOut = error && error.status === 403

  return {
    loading,
    loggedOut,
    admin: data,
    setUser: mutate,
  }
}
