import { api } from '@/utils/api'
import { verificationPose } from '@/endpoints'

export const saveVerificationPose = ({ image_01, image_02 }) => {
  const formData = new FormData()
  formData.append('image_01', image_01)
  formData.append('image_02', image_02)

  return api.post(verificationPose, formData)
}
