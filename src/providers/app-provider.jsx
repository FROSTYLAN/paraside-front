import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { CustomProvider } from 'rsuite'
import esES from 'rsuite/locales/es_ES'
import PropTypes from 'prop-types'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { FacebookProvider } from 'react-facebook'
import { Wrapper as GoogleMapsWrapper } from '@googlemaps/react-wrapper'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AppleLogin from 'react-apple-login';

const googleClientId = import.meta.env.VITE_API_GOOGLE_CLIENT_ID
const facebookClientId = import.meta.env.VITE_API_FACEBOOK_CLIENT_ID
const googleMapsApiKey = import.meta.env.VITE_API_GOOGLE_MAPS_API_KEY

export const AppProvider = ({ children }) => {
  const renderStatus = (status) => status

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false
      }
    }
  })

  // const handleAppleSignIn = (response) => {
  // Manejar la respuesta del inicio de sesión con Apple
  //   console.log(response);
  // };

  return (
    <Suspense fallback={<>loading</>}>
      <IntlProvider locale='es'>
        <CustomProvider locale={esES}>
          <GoogleOAuthProvider clientId={googleClientId}>
            <FacebookProvider appId={facebookClientId}>
              <GoogleMapsWrapper
                render={renderStatus}
                libraries={['places', 'geometry']}
                apiKey={googleMapsApiKey}
              >
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>{children}</BrowserRouter>
                    {/* <AppleLogin
                      clientId="tu-client-id-de-apple"
                      redirectURI="https://tu-redirect-uri.com"
                      onSuccess={handleAppleSignIn}
                      onFailure={(error) => console.error('Error al iniciar sesión con Apple:', error)}
                    /> */}
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
              </GoogleMapsWrapper>
            </FacebookProvider>
          </GoogleOAuthProvider>
        </CustomProvider>
      </IntlProvider>
    </Suspense>
  )
}

AppProvider.propTypes = {
  children: PropTypes.any
}
