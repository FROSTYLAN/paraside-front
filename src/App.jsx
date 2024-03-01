import React from 'react'
import { ToastContainer } from 'react-toastify'
import { AppProvider } from '@/providers/app-provider'
import { AppRoutes } from '@/routes'

function App() {
  return (
    <AppProvider>
      <AppRoutes />
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </AppProvider>
  )
}

export default App
