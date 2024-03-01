import { api } from '@/utils/api'
import { userReport } from '@/endpoints'
import { useFetch } from "../utils/react-query";
import { pathToUrl } from "../utils/functions";

export const useGetUserOverFiveReports = (params) => {
  return useFetch(pathToUrl(userReport), params)
}

export const useGetReportsByUser = ({ id }) => {
  return useFetch(pathToUrl(userReport, { id }), )
}

export const saveUserReport = ({ user_id, description }) => {
  return api.post(pathToUrl(userReport), {
    user_id,
    description
  })
}