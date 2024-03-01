import { useFetch, usePost, useDelete } from '@/utils/react-query'
import { pathToUrl } from '@/utils/functions'
import { userLocation } from '@/endpoints/api'

export const useGetUserLocations = ({ id }) => {
  const context = useFetch(pathToUrl(userLocation, { id }))
  let data = context.data
  data = data?.map((x) => ({ ...x, value: x.location?.id, label: x.location?.city }))

  return { ...context, data }
}

export const useSaveUserLocation = (updater, auxKey) =>
  usePost(pathToUrl(userLocation), undefined, updater, auxKey)

export const useDeleteUserLocation = (updater, auxKey) =>
  useDelete(pathToUrl(userLocation), undefined, updater, auxKey)
