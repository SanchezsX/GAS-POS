import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import CustomInput from '@/components/CustomInput'
import useSession from '@/hooks/useSession'
import Cashier from './subcomponets/Cahier/Cashier'
import Sidebar from './subcomponets/Sidebar'
import Cart from './subcomponets/cart/Cart'

const Layout = () => {
  const [isFocus, setIsFocus] = useState(false)
  const [search, setSearch] = useState('')
  const session = useSession()
  const navigate = useNavigate()
  const location = useLocation()

  function handleFocus() {
    setIsFocus(true)
  }
  const handleBlur = () => {
    setIsFocus(false)
  }
  useEffect(() => {
    if (search) navigate(`?search=${search}`)
    if (!search) navigate(location.pathname)
  }, [search])

  useEffect(() => {
    if (session === null) navigate('/GAS-POS/login')
  }, [session])

  return (
    <>
      <div className="h-[100svh] grid grid-cols-[282px,1fr,445px] p-[13px]">
        <div className="h-full">
          <Sidebar />
          <Cashier />
        </div>
        <div className="flex flex-col mx-[27px] my-[36px] ">
          <CustomInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            isFocus={isFocus}
            icon="search.svg"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="w-[370px]"
            placeholder="Search..."
          />
          <div className="mt-[29px] grid grid-cols-4 gap-6">
            <Outlet />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Cart />
        </div>
      </div>
    </>
  )
}

export default Layout
