import { subYears } from 'date-fns'

export const fields = [
  {
    type: 'text',
    name: 'admin',
    label: 'Nombre de administrador',
    xs: 12
  },
  {
    type: 'emailPhone',
    name: 'username',
    label: 'Email o número de teléfono'
  },
  {
    type: 'password',
    name: 'password',
    label: 'Contraseña'
  },
  {
    type: 'password',
    name: 'confirmPwd',
    label: 'Repite la contraseña'
  },
  {
    type: 'text',
    name: 'name',
    label: 'Nombres',
    xs: 12
  },
  {
    type: 'text',
    name: 'lastname',
    label: 'Apellidos',
    xs: 12
  },
  {
    type: 'text',
    name: 'nickname',
    label: 'Alias'
  },
  {
    type: 'datePicker',
    name: 'birthdate',
    label: 'Fecha de nacimiento',
    minDate: new Date('1900-01-01'),
    maxDate: subYears(new Date(), 18)
  },
  {
    type: 'select',
    name: 'gender_id',
    label: 'Genero'
  },
  {
    type: 'googleLocationSelect',
    name: 'location_id',
    label: 'Ubicación'
  },
  {
    type: 'text',
    as: 'textarea',
    name: 'about_me',
    label: 'Acerca de mi',
    maxLength: 200
  },
  {
    type: 'checkPicker',
    name: 'language',
    label: 'Idioma'
  },
  {
    type: 'radioButton',
    name: 'smoker',
    label: 'Fumador'
  },
 
  {
    type: 'checkGroup',
    name: 'looking_for',
    label: 'En busca de'
  }
  
 
]
