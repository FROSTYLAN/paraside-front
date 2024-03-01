import { api } from '@/utils/api'
import { userRating } from '@/endpoints'

export const saveUserRating = ({ user_id, rating, description }) =>
  api.post(userRating, {
    user_id,
    rating,
    description
  })
