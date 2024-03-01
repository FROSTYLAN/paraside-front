const REGEX = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  // phoneNumber: /^(\+51|\+91)?\d{9}$/,
  phoneNumber: /^\d{11,12}$/,
  confirmCode: /^[0-9]{8}$/
}

const testRegex = (regex, value) => {
  return !!value && typeof value === 'string' && !!REGEX[regex].test(value)
}

export const isEmail = (value) => testRegex('email', value)

export const isPhoneNumber = (value) => testRegex('phoneNumber', value)

export const isConfirmCode = (value) => testRegex('confirmCode', value)
