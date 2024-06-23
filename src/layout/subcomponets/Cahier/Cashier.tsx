import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cashier as CashierType } from '@/modals/Types'
import { supabase } from '@/supabase'
import { toast } from 'sonner'
import Modal from '@/components/Modal'
import Popover from '@/components/Popover/Popover'
import PopoverItem from '@/components/Popover/PopoverItem'
import Icon from '@/components/Icon'
import useSession from '@/hooks/useSession'
import PopoverCashier from '@/layout/subcomponets/PopoverCashier'
import useFetching from '@/hooks/useFetching'
import ActionModal from '../ActionModal'
import CahierAcount from './CahierAcount'
import CashierModal from './CashierModal'
import CahierSceleton from './CahierSceleton'
import { cn } from '@/helpers/cn'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import {
  setEmailCahier,
  setModalIsOpen,
  setOrdersCount,
  setPopoverIsOpen,
  setTotalOrdersCount,
  setUserId,
} from '@/store/slices/cartSlice'
type CashiersStorage = {
  self: CashierType
  other: CashierType[]
}
const Cashier = () => {
  const session = useSession()

  const [cashiers, setCashiers] = useState<CashiersStorage>(
    {} as CashiersStorage
  )

  const dispatch = useDispatch()
  const popoverTriggerRef = useRef<HTMLButtonElement>(null)

  const [cashierFetch, cashierIsLoading] = useFetching()
  const [onDutyFetch, onDutyIsLoading] = useFetching()
  const [loginFetching, _] = useFetching()

  const {
    cart,
    modalIsOpen,
    userId,
    emailCahier,
    totalOrdersCount,
    popoverIsOpen,
    ordersCount,
    cartPay,
    orderId,
  } = useSelector((state: RootState) => state.cart)

  async function getTodayOrders() {
    if (!cashiers.self) {
      toast.error('Cashier not found')
      return
    }
    const { data, error } = await supabase
      .from('orders')
      .select()
      .eq('cashier_id', cashiers.self.cashier_id)
      .in('status', ['success', 'rejected'])

    if (error) return toast.error(error.message)

    let count = 0
    data.forEach((order) => {
      const date = order?.created_at.split('T')[0]
      if (date === new Date().toISOString().split('T')[0]) count++
    })

    dispatch(setOrdersCount(count))
  }

  async function getTotalOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select()
      .in('status', ['success', 'rejected'])

    if (error) return toast.error(error.message)

    let count = 0

    data.forEach((order) => {
      const date = order?.created_at.split('T')[0]

      if (date === new Date().toISOString().split('T')[0]) count++
    })

    dispatch(setTotalOrdersCount(count))
  }

  const getCashier = async () => {
    cashierFetch(async () => {
      const { data, error } = await supabase
        .from('cashiers')
        .select()
        .eq('user_id', session?.user.id)
      if (error) {
        toast.error(error.message)
        return
      }

      setCashiers((prev: any) => ({ ...prev, self: data![0] }))
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

      if (error) {
        toast.error(error.message)
        return
      }

      setCashiers((prev: any) => ({ ...prev, other: data! }))
    })
  }

  const getEmailedCashier = async (userId: string) => {
    loginFetching(async () => {
      const { data: email } = await supabase
        .from('cashiers')
        .select('email')
        .eq('user_id', userId)

      dispatch(setEmailCahier(email?.[0].email))
    })
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()

    if (error) toast.error('Failed to change account!',{
      style: {
        background: '#1C1E24',
        color: '#D97B7B',
      },
    })
      
  }

  const modalHandle = async (userId: string) => {
    dispatch(setUserId(userId))
    await getEmailedCashier(userId)
    dispatch(setModalIsOpen(!modalIsOpen))
  }
  useEffect(() => {
    if (!modalIsOpen) dispatch(setEmailCahier(''))
  }, [modalIsOpen])

  useEffect(() => {
    if (cashiers.self) {
      getTodayOrders()
      getTotalOrders()
    }
  }, [cartPay, cashiers.self, orderId])

  useEffect(() => {
    session && getCashier()
  }, [session, modalIsOpen])

  return (
    <>
      <Modal isOpen={modalIsOpen}>
        <ActionModal
          userId={userId}
          email={emailCahier}
        />
      </Modal>
      <div className="w-[275px] h-[244px] bg-sideBg rounded-[39px] py-[37px] px-[20px] mt-[12px]">
        <div className="flex justify-between items-center px-[15px]">
          <p className="font-semibold">Cashier</p>
          <p className="text-[12px] text-white/30">{totalOrdersCount} orders</p>
        </div>
        <CahierAcount
          cashiers={cashiers}
          cashierIsLoading={cashierIsLoading}
          ordersCount={ordersCount}
          cart={cart}
        />
        <div className="flex gap-4">
          {onDutyIsLoading ? (
            <CahierSceleton />
          ) : (
            cashiers.other
              ?.slice(0, 3)
              .map((data: CashierType, index: number) => (
                <AnimatePresence key={index}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    key={index}
                    onClick={() => modalHandle(data.user_id)}
                    className="w-[52px] h-[52px] overflow-hidden rounded-full"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={
                        data.avatar.includes('https://')
                          ? data?.avatar
                          : '/images/Cashier1.png'
                      }
                    />
                  </motion.button>
                </AnimatePresence>
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
            <CashierModal
              setPopoverIsOpen={setPopoverIsOpen}
              popoverTriggerRef={popoverTriggerRef}
            />
          )}
        </div>
      </div>
      <Popover
        isOpen={popoverIsOpen}
        triggerRef={popoverTriggerRef}
      >
        <PopoverItem
          icon="/plus.svg"
          title="Add account"
          onClick={handleLogout}
        />
        {cashiers.other?.slice(3).map((data: any) => (
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
