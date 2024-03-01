import { get } from 'react-hook-form'
import { fields } from './form-fields'

export const getFields = (options) => {
  if (!(options instanceof Array)) {
    return 'debes enviar un array'
  }

  return fields.filter((x) => options.includes(x.name))
}

export const PROFILE_KEYS = [
  'name',
  'lastname',
  'nickname',
  'birthdate',
  'gender_id',
  'location_id',
  'about_me',
  'language',
  'smoker',
  'looking_for',
]

export const ADMIN_FIELDS = getFields(['admin', 'password'])
export const LOGIN_FIELDS = getFields(['username', 'password'])
export const RESET_FIELDS = getFields(['password', 'confirmPwd'])
export const ALIAS_FIELDS = getFields(['nickname'])
export const PROFILE_FIELDS = getFields(PROFILE_KEYS)
