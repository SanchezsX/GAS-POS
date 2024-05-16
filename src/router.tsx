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
        path: '/GAS-POS/fuel',
        element: <Main />,
      },
      {
        path: '/GAS-POS/food',
        element: <Food />,
      },
      {
        path: '/GAS-POS/drink',
        element: <Drinks />,
      },
      {
        path: '/GAS-POS/service',
        element: <Service />,
      },
      {
        path: '/GAS-POS/help',
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
        path: '/GAS-POS/login',
        element: <PageLogin />,
      },
    ],
  },
])
