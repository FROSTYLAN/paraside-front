import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SettingsLayout } from './settings'
import { MyInfo } from './components/my-info'
import { MyAccount } from './components/my-account'
import { MyProfile } from './components/my-profile'
import { MySubscriptions } from './components/my-subscriptions'

export const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<SettingsLayout />}>
        <Route index element={<Navigate to={'personal-info'} />} />
        <Route path='my-info' element={<MyInfo />} />
        <Route path='my-profile' element={<MyProfile />} />
        <Route path='my-account' element={<MyAccount />} />
        <Route path='my-subscriptions' element={<MySubscriptions />} />
        <Route path='*' element={<>Not Found</>} />
      </Route>
    </Routes>
  )
}
