import { useFetch, usePost } from '@/utils/react-query'
import { pathToUrl } from '@/utils/functions'
import { userProfile, userDetails } from '@/endpoints/api'
import { parseUserProfile } from '@/utils/models/userProfile'
import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from '@/utils/api'

export const useGetUserProfile = ({ id }) => {
  const context = useFetch(pathToUrl(userDetails, { id }))
  let data = context.data
  data = { ...data, profile: parseUserProfile(data?.profile) }
  return { ...context, data }
}

export const useSaveUserProfile = (updater, auxKey) =>
  usePost(pathToUrl(userProfile), undefined, updater, auxKey)

  export const useGetUserProfilesByFilter = (params) => {
    return useFetch(pathToUrl(userProfile), params)
  }

// export const useGetUserProfilesPopular = () =>
//   useFetch(pathToUrl(userProfile), {
//     page_size: 10,
//     page_index: 1,
//     sort_name: 'created_at',
//     sort_direction: 'desc',
//     favorite: true
//   })

export const useGetUserProfilesPopular = () =>
  useInfiniteQuery(
    [pathToUrl(userProfile)],
    async ({ pageParam = 1 }) =>
      await api.get(pathToUrl(userProfile), {
        params: {
          page_size: 10,
          page_index: pageParam,
          sort_name: 'created_at',
          sort_direction: 'desc',
          favorite: true
        }
      }),
    {
      getNextPageParam: (lastPage) => {
        if (
          lastPage?.data?.pager?.page_index < lastPage?.data?.pager?.page_count
        )
          return lastPage?.data?.pager?.page_index + 1
        return undefined
      },
      select: (data) => {
        const pages = data?.pages
        const flatData = pages?.reduce((acc, page) => {
          return [...acc, ...page.data.data]
        }, [])

        return flatData
      }
    }
  )

export const saveUserProfile = (params) => {
  console.log('🚀 ~ file: user-profile.js:63 ~ params:', params)
  return api.post(pathToUrl(userProfile), params)
}
