export const auth = {

  login: 'auth/login',
  loginAdmin: 'auth/login-admin',
  register: '/auth/register',
  verifyAccount: '/auth/verify/account',
  verifyAccountToken: '/auth/verify/account/:token',
  loginGoogle: '/auth/login/google',
  loginFacebook: '/auth/login/facebook',
  resetPasswordCode: '/auth/forgot-password',
  resetPasswordVerify: '/auth/verify/reset-password',
  resetPassword: '/auth/reset-password'
}

export const userProfile = '/user-profile/:id?'
export const userDetails = '/user/:id/details'
export const userPreferences = '/user-preference/:id?'
export const userMatches = '/user-match/:user_id?'
export const userRequests = '/user-match/requests'
export const userContacts = '/user-match/contacts'
export const userChats = '/user-match/chats'
export const notificationRequest = '/user-match/notification-requests'
export const userRating = '/user-rating'
export const userReport = '/user-report/:id?'
export const userLocation = '/user-location/:id?'
export const userLinkEmail = '/user/link/email'
export const userLinkPhone = '/user/link/phone-number'
export const userUnlinkEmail = '/user/unlink/email/code'
export const userUnlinkPhone = '/user/unlink/phone-number'


export const verificationCodeEmail = '/user/send/email/code'
export const verificationCodePhone = '/user/send/phone-number/code'

export const gender = '/gender'
export const language = '/language'
export const pricing = '/pricing'
export const subscription = '/subscription/:user_id?'

export const verificationPose = '/verification/pose'