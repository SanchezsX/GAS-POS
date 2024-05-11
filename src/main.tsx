import ReactDOM from 'react-dom/client'
import './assets/global.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Toaster } from 'sonner'
import Main from './page/Main.tsx'
import Food from './page/Food.tsx'
import Drinks from './page/Drink.tsx'
import PageLogin from './page/PageLogin.tsx'
import Layout from './layout/Layout.tsx'
import { CartProvider } from './providers/CartProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: '',
    children: [
      {
        path: 'Fuel',
        element: <Main />,
      },
      {
        path: 'Food',
        element: <Food />,
      },
      {
        path: 'Drink',
        element: <Drinks />,
      },
    ],
  },
  {
    path: '/',
    element: '',
    errorElement: '',
    children: [
      {
        path: 'login',
        element: <PageLogin />,
      },
    ],
  },
])

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Toaster
      position="top-center"
      richColors
    />
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </QueryClientProvider>
  </>
)
