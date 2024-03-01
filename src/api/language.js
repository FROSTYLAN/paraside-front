import { useFetch } from '@/utils/react-query'
import { pathToUrl } from '@/utils/functions'
import { language } from '@/endpoints/api'

export const useLanguage = () => {
  const context = useFetch(pathToUrl(language))
  let data = context.data
  data = data?.map((x) => ({ value: x.id, label: x.description }))

  return { ...context, data }
}
