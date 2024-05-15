import { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { CartContext } from '@/providers/CartProvider'
import { supabase } from '@/supabase'
import { toast } from 'sonner'
import CustomButton from '@/components/CustomButton'
import { AnimatePresence, motion } from 'framer-motion'

import Skeleton from '@/components/Skeleton'
import CartItem from './CartItem'
import Select from '../Select'

import CartInput from './CartInput'
import CartButtonDiscount from './CartButtonDiscount'
import CartTotalPaySummary from './CartTotalPaySummary'
import CartButton from './CartButton'
import CartAddProduct from './CartAddProduct'
import { cn } from '@/helpers/cn'
import { itemVariants, transition } from '@/variants/framerVariants'

// type OrderStatus = 'pending' | 'success' | 'canceled';

const Cart = () => {
  const { cart, orderId, pay, clearCart } = useContext(CartContext)
  const [isDiscountActive, setIsDiscountActive] = useState(false)
  const [discountValue, setDiscountValue] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountTaken, setDiscountTaken] = useState(0)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => {
      setIsClicked(false)
    }, 1000)
    clearCart()
    setDiscount(0)
    setDiscountValue('')
    setIsDiscountActive(false)
    setDiscountTaken(0)
  }

  async function submitDiscount(e: SyntheticEvent) {
    e.preventDefault()

    const { data, error } = await supabase
      .from('cards')
      .select()
      .eq('id', +discountValue)

    if (error) {
      return toast.error(error.message)
    }

    if (!data[0]) {
      return toast.error('Not valid code card!')
    }

    setDiscount(data[0].discount)
    setIsDiscountActive(false)
    setDiscountValue('')
    setDiscountTaken(0)
  }

  function payWithDiscount() {
    pay(() => {
      setDiscount(0), setDiscountValue(''), setIsDiscountActive(false)
      setDiscountTaken(0)
    }, totalPrice)
  }

  useEffect(() => {
    let cartTotal = 0
    cart.forEach((item) => {
      cartTotal += item.goods.price * item.quantity
    })

    const discountAmount = (cartTotal / 100) * discount
    const totalPriceAfterDiscount = cartTotal - discountAmount

    setTotalPrice(+totalPriceAfterDiscount.toFixed(2))

    const discountTaken = cartTotal - totalPriceAfterDiscount
    setDiscountTaken(+discountTaken.toFixed(2))
  }, [cart, discount])

  return (
    <AnimatePresence>
      <div
        className={cn(
          'flex flex-col h-full w-[445px]',
          'bg-sideBg rounded-[39px] px-[38px] pt-[50px] pb-[38px]',
          'max-2xl:w-[400px] '
        )}
      >
        <div className="flex items-center justify-between">
          {cart.length > 0 && (
            <motion.h2
              variants={itemVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              className="font-bold text-[28px] max-2xl:text-[20px]"
            >
              Order # {orderId}
            </motion.h2>
          )}
          <Select className={cn(cart.length > 0 ? ' ' : 'ml-auto')} />
        </div>
        {cart.length === 0 && <CartAddProduct />}

        {cart.length > 0 && (
          <div className="h-[450px] mt-6 overflow-y-auto pr-3">
            {cart.map((data: any) =>
              !cart.length ? (
                <Skeleton
                  width="200px"
                  height="80px"
                />
              ) : (
                <CartItem
                  key={data.cart_id}
                  data={data}
                />
              )
            )}
          </div>
        )}
        {cart.length === 0 ? (
          <></>
        ) : (
          <>
            <motion.img
              variants={itemVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              src="/icons/line.svg"
            />
            <motion.div
              variants={itemVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              className="py-[20px]"
            >
              <div className="flex justify-between mb-[20px] relative">
                <p className="text-white/50 ">Subtotal</p>
                <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    key={totalPrice}
                    className="font-semibold text-[20px]"
                  >
                   $ {totalPrice}
                  </motion.p>
                {/* <div className="flex gap-2">
                  <span className=" font-semibold text-[20px]">$</span>
                  <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    key={totalPrice}
                    className="font-semibold text-[20px]"
                  >
                    {totalPrice}
                  </motion.p>
                </div> */}
              </div>
              <div className="flex justify-between items-center mb-[20px]">
                <p className="text-white/50">Discount</p>
                {discount ? (
                  <div
                    className={cn(
                      ' text-[17px] font-semibold bg-[#EDB055]/5 p-[14px] rounded-[20px]',
                      'hover:bg-[#EDB055]/10 transition text-[#EDB055]'
                    )}
                  >
                    {' '}
                    - ${discountTaken}
                  </div>
                ) : isDiscountActive ? (
                  <CartInput
                    submitDiscount={submitDiscount}
                    discountValue={discountValue}
                    setDiscountValue={setDiscountValue}
                    setIsDiscountActive={setIsDiscountActive}
                  />
                ) : (
                  <CartButtonDiscount
                    setIsDiscountActive={setIsDiscountActive}
                  />
                )}
              </div>
              <motion.img src="/icons/line.svg" />
            </motion.div>
            <CartTotalPaySummary totalPrice={totalPrice} />
          </>
        )}

        {cart.length === 0 ? (
          <CustomButton
            className="mt-auto"
            disabled
          >
            Pay
          </CustomButton>
        ) : (
          <CartButton
            handleClick={handleClick}
            payWithDiscount={payWithDiscount}
            isClicked={isClicked}
          />
        )}
      </div>
    </AnimatePresence>
  )
}

export default Cart
