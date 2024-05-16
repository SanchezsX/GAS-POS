import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { CartProvider } from './providers/CartProvider.tsx'
import { router } from './router.tsx'
import './assets/global.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Toaster
      position="top-center"
      richColors
    />
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={router}   />
      </CartProvider>
    </QueryClientProvider>
  </>
)
