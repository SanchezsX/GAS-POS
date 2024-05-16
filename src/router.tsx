import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'
import Main from './page/Main'
import Food from './page/Food'
import Drinks from './page/Drink'
import PageLogin from './page/PageLogin'
import Service from './page/Service'
import Help from './page/Help'

export const router = createBrowserRouter([
  {
    path: '/GAS-POS',
    element: <Layout />,
    errorElement: '',
    children: [
      {
        path: '/fuel',
        element: <Main />,
      },
      {
        path: '/food',
        element: <Food />,
      },
      {
        path: '/drink',
        element: <Drinks />,
      },
      {
        path: '/service',
        element: <Service />,
      },
      {
        path: '/help',
        element: <Help />,
      },
    ],
  },
  {
    path: '/GAS-POS',
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
