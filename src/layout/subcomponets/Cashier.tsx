import { useContext, useEffect, useRef, useState } from 'react'

import { supabase } from '@/supabase'
import { toast } from 'sonner'
import Modal from '@/components/Modal'
import cn from '@/helpers/cn'
import Popover from '@/components/Popover/Popover'
import PopoverItem from '@/components/Popover/PopoverItem'
import Icon from '@/components/Icon'
import Skeleton from '@/components/Skeleton'
import useSession from '@/hooks/useSession'
import PopoverCashier from '@/layout/subcomponets/PopoverCashier'
import ActionModal from './ActionModal'
import useFetching from '@/hooks/useFetching'
import { CartContext } from '@/providers/CartProvider'
import { Cashier as CashierType } from '@/modals/Types'
import { motion } from 'framer-motion'

type CashiersStorage = {
  self: CashierType
  other: CashierType[]
}

const Cashier = () => {
  const session = useSession()
  const [popoverIsOpen, setPopoverIsOpen] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [cashiers, setCashiers] = useState<CashiersStorage>(
    {} as CashiersStorage
  )
  const [userId, setUserId] = useState('')
  const [ordersCount, setOrdersCount] = useState(0)
  const [totalOrdersCount, setTotalOrdersCount] = useState(0)

  const [email, setEmail] = useState('')

  const popoverTriggerRef = useRef<HTMLButtonElement>(null)

  const [cashierFetch, cashierIsLoading] = useFetching()
  const [onDutyFetch, onDutyIsLoading] = useFetching()
  const [loginFetching, _] = useFetching()

  const { cart } = useContext(CartContext)

  async function getTodayOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select()
      .eq('cashier_id', cashiers.self.cashier_id)

    if (error) return toast.error(error.message)

    let count = 0

    data.forEach((order) => {
      const date = order?.created_at.split('T')[0]

      if (date === new Date().toISOString().split('T')[0]) count++
    })

    setOrdersCount(count)
  }

  async function getTotalOrders() {
    const { data, error } = await supabase.from('orders').select()

    if (error) return toast.error(error.message)

    let count = 0

    data.forEach((order) => {
      const date = order?.created_at.split('T')[0]

      if (date === new Date().toISOString().split('T')[0]) count++
    })

    setTotalOrdersCount(count)
  }

  const getCashier = async () => {
    cashierFetch(async () => {
      const { data, error } = await supabase
        .from('cashiers')
        .select()
        .eq('user_id', session?.user.id)

      error?.code && toast.error(error.message)

      setCashiers((prev) => ({ ...prev, self: data![0] }))
      getOnDutyCashiers()
    })
  }

  const getOnDutyCashiers = async () => {
    onDutyFetch(async () => {
      const { data, error } = await supabase
        .from('cashiers')
        .select()
        .eq('on_duty', true)
        .neq('user_id', session?.user.id)

      error?.code && toast.error(error.message)

      setCashiers((prev) => ({ ...prev, other: data! }))
    })
  }

  const getEmailedCashier = async (userId: string) => {
    loginFetching(async () => {
      const { data: email } = await supabase
        .from('cashiers')
        .select('email')
        .eq('user_id', userId)

      setEmail(email?.[0].email)
    })
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()

    if (error) toast.error('Failed to change account!')
  }

  const modalHandle = async (userId: string) => {
    setUserId(userId)
    await getEmailedCashier(userId)
    setModalIsOpen((prev) => !prev)
  }
  useEffect(() => {
    if (!modalIsOpen) setEmail('')
  }, [modalIsOpen])

  useEffect(() => {
    getTodayOrders()
    getTotalOrders()
  }, [cart, cashiers.self])

  useEffect(() => {
    session && getCashier()
  }, [session, modalIsOpen])
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      >
        <ActionModal
          setIsOpen={setModalIsOpen}
          userId={userId}
          email={email}
        />
      </Modal>

      <div className="w-[275px] h-[244px] bg-sideBg rounded-[39px] py-[37px] px-[20px] mt-[12px]">
        <div className="flex justify-between items-center px-[15px]">
          <p className="font-semibold">Cashier</p>
          <p className="text-[12px] text-white/30">{totalOrdersCount} orders</p>
        </div>
        <div
          className={cn(
            'flex items-center gap-3 bg-[#606366]/20',
            ' py-[12px] pl-2  rounded-[32px] mt-[9px] mb-[18px]'
          )}
        >
          {cashierIsLoading ? (
            <Skeleton
              width="52px"
              height="52px"
            />
          ) : (
            <div className="size-[52px] overflow-hidden rounded-full">
              <img
                src={
                  cashiers.self?.avatar?.includes('https://')
                    ? cashiers.self?.avatar
                    : `/images/Cashier1.png`
                }
                alt={cashiers.self?.first_name + ' ' + cashiers.self?.last_name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="">
            {!cashiers.self && cashierIsLoading ? (
              <>
                <Skeleton
                  width="120px"
                  height="27px"
                  className="mb-2"
                />
                <Skeleton
                  width="100px"
                  height="16px"
                />
              </>
            ) : (
              <>
                <h3 className="text-[18px] font-bold">
                  {cashiers.self?.first_name + ' ' + cashiers.self?.last_name}
                </h3>
                {cart.length > 0 ? (
                  <p className="text-[11px] text-primary">
                    Order in progress...{' '}
                  </p>
                ) : (
                  <p className="text-[11px] text-white/30">
                    Today: {ordersCount} orders{' '}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          {onDutyIsLoading ? (
            <>
              <Skeleton
                width="52px"
                height="52px"
              />
              <Skeleton
                width="52px"
                height="52px"
              />
              <Skeleton
                width="52px"
                height="52px"
              />
            </>
          ) : (
            cashiers.other?.slice(0, 3).map((data) => (
              <button
                key={data.user_id}
                onClick={() => modalHandle(data.user_id)}
                className="w-[52px] h-[52px] overflow-hidden rounded-full"
              >
                <img
                  className="w-full h-full object-cover"
                  src={
                    data?.avatar?.includes('https://')
                      ? data?.avatar
                      : '/images/Cashier1.png'
                  }
                  alt=""
                />
              </button>
            ))
          )}
          {!onDutyIsLoading && cashiers.other?.length < 3 && (
            <button
              className={cn(
                'flex justify-center items-center',
                'w-[52px] h-[52px]  rounded-full bg-white/5'
              )}
              onClick={handleLogout}
            >
              <Icon
                path="/plus.svg"
                width="20px"
                height="20px"
              />
            </button>
          )}
          {cashiers.other?.length >= 3 && (
            <button
              ref={popoverTriggerRef}
              onClick={() => setPopoverIsOpen(true)}
              className={cn(
                'bg-[#606366]/20 rounded-[32px] w-[30px] h-[50px] gap-[3px]',
                'flex flex-col justify-center items-center',
                'hover:bg-[#606366]/30 transition duration-300 '
              )}
            >
              <div className="w-[4px] h-[4px] rounded-full bg-white"></div>
              <div className="w-[4px] h-[4px] rounded-full bg-white"></div>
              <div className="w-[4px] h-[4px] rounded-full bg-white"></div>
            </button>
          )}
        </div>
      </div>
      <Popover
        isOpen={popoverIsOpen}
        setIsOpen={setPopoverIsOpen}
        triggerRef={popoverTriggerRef}
      >
        <PopoverItem
          icon="/plus.svg"
          title="Add account"
          onClick={handleLogout}
        />
        {cashiers.other?.slice(3).map((data) => (
          <PopoverCashier
            key={data.cashier_id}
            title={data.email}
            avatar={data.avatar}
            onClick={() => modalHandle(data.user_id)}
          />
        ))}
      </Popover>
    </>
  )
}

export default Cashier
