import useSWR from 'swr'
import { fetchGenders } from '@/services/paradise-plus/gender-service'

export const useGender = () => {
  const { data, mutate, error } = useSWR('api_gender', fetchGenders, {
    revalidateOnFocus: false,
    revalidateIfStale: false
    // revalidateOnReconnect: false
  })

  const loading = !data && !error

  return {
    loading,
    genders: data || [],
    setGenders: mutate
  }
}
