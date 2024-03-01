import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemas } from './schemas'
import { PROFILE_KEYS } from '../../constants/form-fields'

export const getSchemasOptions = (options) => {
  if (!(options instanceof Array)) {
    return 'debes enviar un array'
  }

  const filteredSchemas = Object.fromEntries(
    Object.entries(schemas).filter((x) => options.includes(x[0]))
  )

  const formSchema = Yup.object().shape(filteredSchemas)

  return { resolver: yupResolver(formSchema) }
}

export const LOGIN_SCHEMAS = getSchemasOptions(['username', 'password'])
export const ALIAS_SCHEMAS = getSchemasOptions(['nickname'])
export const RESET_SCHEMAS = getSchemasOptions(['password', 'confirmPwd'])
export const PHOTOS_SCHEMAS=getSchemasOptions(['uploader'])
export const ORIENTATION_SCHEMAS=getSchemasOptions(['orientation'])
export const ROL_SCHEMAS=getSchemasOptions(['rol'])
export const PROFILE_SCHEMAS = getSchemasOptions(PROFILE_KEYS)
export const LINK_EMAIL_SCHEMAS = getSchemasOptions(['email'])
export const LINK_PHONE_SCHEMAS = getSchemasOptions(['phone_number'])
export const CONFIRM_CODE_SCHEMAS = getSchemasOptions(['confirmCode'])