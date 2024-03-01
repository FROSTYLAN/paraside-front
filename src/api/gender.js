import { useFetch } from '@/utils/react-query'
import { pathToUrl } from '@/utils/functions'
import { gender } from '@/endpoints/api'

export const useGender = () => {
  const context = useFetch(pathToUrl(gender))
  let data = context.data
  data = data?.map((x) => ({ value: x.id, label: x.description }))

  return { ...context, data }
}
