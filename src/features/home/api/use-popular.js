import useSWR from 'swr'
// import { getPopularUsers } from '@/services/paradise-plus/user-service'
import { fetchUserProfilesByFilter } from '@/services/paradise-plus/user-service'

export const usePopular = () => {
  const { data, error } = useSWR('api/users/popular', fetchUserProfilesByFilter)

  const loading = !data && !error

  return {
    loading,
    users: data,
  }
}
