import { api } from './api'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

export const fetcher = async ({ queryKey, pageParam }) => {
  const [url, params] = queryKey
  return await api
    .get(url, { params: { ...params, pageParam } })
    .then((res) => res.data)
}

export const useLoadMore = (url, params) => {
  const context = useInfiniteQuery(
    [url, params],
    ({ queryKey, pageParam = 1 }) => fetcher({ queryKey, pageParam }),
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
      getNextPageParam: (lastPage) => {
        return lastPage.nextId ?? false
      }
    }
  )

  return context
}

export const usePrefetch = (url, params) => {
  const queryClient = useQueryClient()

  return () => {
    if (!url) {
      return
    }

    queryClient.prefetchQuery([url, params], ({ queryKey }) =>
      fetcher({ queryKey })
    )
  }
}

export const useFetch = (url, params, config) => {
  const context = useQuery(
    [url, params],
    ({ queryKey }) => fetcher({ queryKey }),
    {
      enabled: !!url,
      ...config
    }
  )

  return context
}

export const useGenericMutation = (func, url, params, updater, auxKey) => {
  const queryClient = useQueryClient()

  return useMutation(func, {
    onMutate: async (data) => {
      await queryClient.cancelQueries([`${url}${auxKey}`, params])

      const previousData = queryClient.getQueryData([`${url}${auxKey}`, params])

      queryClient.setQueryData([`${url}${auxKey}`, params], (oldData) => {
        return updater ? updater(oldData, data) : data
      })

      return previousData
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([`${url}${auxKey}`, params], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries([`${url}${auxKey}`, params])
    }
  })
}

export const useDelete = (url, params, updater, auxKey) => {
  return useGenericMutation(
    (id) => api.delete(`${url}/${id}`),
    url,
    params,
    updater,
    auxKey
  )
}

export const usePost = (url, params, updater, auxKey) => {
  return useGenericMutation(
    (data) => api.post(url, data),
    url,
    params,
    updater,
    auxKey
  )
}

export const useUpdate = (url, params, updater) => {
  return useGenericMutation(
    (data) => api.patch(url, data),
    url,
    params,
    updater
  )
}
