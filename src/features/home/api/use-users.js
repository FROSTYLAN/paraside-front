// import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { fetchUserProfilesByFilter } from '@/services/paradise-plus/user-service'

export const useUsers = () => {
  // const { data, error } = useSWR(
  //   'api/users/filter',
  //   fetchUserProfilesByFilter,
  //   {
  //     revalidateOnFocus: false,
  //     revalidateIfStale: false,
  //     revalidateFirstPage: false
  //   }
  // )
  const { trigger, data, error, isMutating } = useSWRMutation(
    //{url: 'api/users/filter', args: { location: '12,19' }},
    'api/users/filter',
    fetchUserProfilesByFilter,
  )
  const loading = !data && !error && isMutating

  return {
    loading,
    users: data,
    triggerUsers: trigger
  }
}
