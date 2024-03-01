import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Profile } from '../components/profile'
import { SettingsRoutes } from '../components/settings'

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path='/:userId' element={<Profile />} />
      <Route path='/settings/*' element={<SettingsRoutes />} />
      <Route path='/*' element={<>Not Found</>} />
    </Routes>
  )
}
