import { useFetch, usePost } from '@/utils/react-query'
import { pathToUrl } from '@/utils/functions'
import { userPreferences } from '@/endpoints/api'

export const useGetUserPreferences = ({ id }) => {
  const context = useFetch(pathToUrl(userPreferences, { id }))
  let data = context.data
  if(data) data['location_id'] = data?.location?.id
  return { ...context, data }
}

export const useSaveUserPreferences = (updater, auxKey) =>
  usePost(pathToUrl(userPreferences), undefined, updater, auxKey)
