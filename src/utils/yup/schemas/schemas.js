import * as Yup from 'yup'
import { isEmail, isPhoneNumber, isConfirmCode } from '../../regex'

export const schemas = {
  email: Yup.string()
    .required('Email es requerido')
    .email('Email inválido'),
  phone_number: Yup.string()
    .required('Telefono es requerido')
    .test('test-phone-number', 'Número de teléfono inválido', (value) =>
      isPhoneNumber(value && value.toString())
    ),
  username: Yup.string()
    .required('Este campo es requerido')
    .test(
      'test-username',
      'Revisa tu email o número de teléfono',
      function (value) {
        const isValidEmail = isEmail(value)
        const isValidPhone = isPhoneNumber(value)
        if (!isValidEmail && !isValidPhone) {
          return false
        }
        return true
      }
    )
    .max(50, 'Largo permitido de 50 caracteres'),
  password: Yup.string()
    .required('Este campo es requerido')
    .min(8, '8 caracteres como mínimo')
    .max(20, '20 caracteres como máximo'),
  confirmPwd: Yup.string()
    .required('Este campo es requerido')
    .oneOf([Yup.ref('password')], 'Contraseñas no coinciden'),
  confirmCode: Yup.string()
    .required('Este campo es requerido')
    .test('test-confirm-code', 'Debe digitar 8 numeros', (value) =>
      isConfirmCode(value && value.toString())
    ),
  name: Yup.string().required('Este campo es requerido'),
  lastname: Yup.string().required('Este campo es requerido'),
  nickname: Yup.string().required('Este campo es requerido'),
  birthdate: Yup.string()
    .typeError('Este campo es requerido')
    .required('Este campo es requerido'),
  gender_id: Yup.number()
    .typeError('Este campo es requerido')
    .required('Este campo es requerido'),
  location_id: Yup.number()
    .typeError('Este campo es requerido')
    .required('Este campo es requerido'),
  about_me: Yup.string().max(200, 'Largo permitido de 200 caracteres'),
  language: Yup.array(),
  smoker: Yup.number(),
  orientation:Yup.string(),
  rol:Yup.number(),
  looking_for: Yup.array(),
  uploader:Yup.array().required('Es necesario subir las 3 fotos')
}
