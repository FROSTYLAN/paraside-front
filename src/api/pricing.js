import { useFetch } from '@/utils/react-query'
import { pathToUrl } from '@/utils/functions'
import { pricing } from '@/endpoints/api'

export const usePricing = () => useFetch(pathToUrl(pricing))
