import { api } from '@/utils/api'
import { useFetch } from '@/utils/react-query'
import { pathToUrl } from '@/utils/functions'
import { subscription } from '@/endpoints'

export const subscribe = ({ pricing_id }) =>
  api.post(subscription, {
    pricing_id
  })

export const useSubscription = ({ user_id }) =>
  useFetch(pathToUrl(subscription, { user_id }))
