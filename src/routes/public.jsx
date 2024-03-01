import React from 'react'
import { lazyImport } from '@/utils/lazy-import'

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes')

export const publicRoutes = [
  {
    path: '/*',
    element: <AuthRoutes />,
  },
]
