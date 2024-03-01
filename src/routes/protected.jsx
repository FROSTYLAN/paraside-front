import React, { Suspense } from 'react'
import { lazyImport } from '@/utils/lazy-import'
import { PlusMainLayout, AdminMainLayout } from '@/components/layout'
import { Navigate, Outlet } from 'react-router-dom'
import { RequireAuth } from './require-auth'
import { AdminAuth } from './admin-auth'

const { InitialSteps } = lazyImport(
  () => import('@/features/initial-steps'),
  'InitialSteps'
)
// const { AppSelection } = lazyImport(
//   () => import('@/features/auth/components/app-selection'),
//   'AppSelection'
// )
const {  UserRoutes } = lazyImport(() => import('@/features/user'), 'UserRoutes')
const { Home } = lazyImport(() => import('@/features/home'), 'Home')
const { Pricing } = lazyImport(() => import('@/features/pricing'), 'Pricing')
const { Checkout } = lazyImport(() => import('@/features/checkout'), 'Checkout')
const { Chat } = lazyImport(() => import('@/features/chat'), 'Chat')
const { Receipt } = lazyImport(() => import('@/features/receipt'), 'Receipt')

const Plus = () => (
  <RequireAuth>
    <PlusMainLayout>
      <Suspense fallback={<>Loading</>}>
        <Outlet />
      </Suspense>
    </PlusMainLayout>
  </RequireAuth>
)

const Admin = () => (
  <AdminAuth>
    <AdminMainLayout>
      <Suspense fallback={<>Loading</>}>
        <Outlet />
      </Suspense>
    </AdminMainLayout>
  </AdminAuth>
)

export const protectedRoutes = [
  {
    path: '/initial-steps',
    element: (
      <RequireAuth>
        <InitialSteps />
      </RequireAuth>
    )
  },
  {
    path: '/plus',
    element: <Plus />,
    children: [
      {
        index: true,
        element: <Navigate to='home' />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'user/*',
        element: <UserRoutes />
      },
      {
        path: '*',
        element: <Navigate to='home' />
      },
      {
        path: 'pricing',
        element: <Pricing />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'chat',
        element: <Chat />
      }
    ]
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        index: true,
        element: <Navigate to='receipt' />
      },
      {
        path: 'receipt/*',
        element: <Receipt />
      },
      {
        path: '*',
        element: <Receipt />
      }
    ]
  }
]
