import { createContext, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { CartContextValues, CartItem, Goods } from '@/modals/Types'
import { useAuth } from '@/hooks/useAuth'

import { toast } from 'sonner'
import { supabase } from '@/supabase'

let CART_ITEMS: CartItem[] | null = null
let CART_PAY = false

export const CartContext = createContext<CartContextValues>(
  {} as CartContextValues
)

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [orderId, setOrderId] = useState<number | null>(null)
  const { cashier } = useAuth()

  async function create(goods: Goods) {
    if (!orderId && cashier) {
      const { data, error } = await supabase
        .from('orders')
        .insert({ cashier_id: cashier.cashier_id })
        .select('order_id')

      if (error) {
        toast.error(error.message)

        return
      }

      setCart([
        ...cart,
        {
          cart_id: Math.random().toString(16).slice(2),
          good_id: goods.good_id,
          order_id: data?.[0].order_id,
          quantity: goods.quantity,
          goods,
        },
      ])

      return setOrderId(data?.[0].order_id)
    }

    if (cart.some((i) => i.good_id === goods.good_id)) {
      return remove(goods.good_id)
    }

    if (orderId) {
      setCart([
        ...cart,
        {
          cart_id: Math.random().toString(16).slice(2),
          good_id: goods.good_id,
          order_id: orderId,
          quantity: goods.quantity,
          goods,
        },
      ])
    }
  }

  function remove(goodId: number) {
    const filteredCart = cart.filter((item) => item.good_id !== goodId)
    setCart(filteredCart)
  }

  function increment(goodId: number) {
    const foundItem = cart.find((item) => item.good_id === goodId)!
    const incrementNumber = foundItem?.goods.quantity

    const filteredItems = cart.map((item) => {
      if (item.good_id === goodId) {
        return { ...foundItem, quantity: foundItem.quantity + incrementNumber }
      }

      return item
    })

    setCart(filteredItems)
  }

  function decrement(goodId: number) {
    const foundItem = cart.find((item) => item.good_id === goodId)!
    const decrementNumber = foundItem?.goods.quantity

    if (foundItem.quantity <= decrementNumber) return remove(goodId)

    const filteredItems = cart.map((item) => {
      if (item.good_id === goodId) {
        return { ...foundItem, quantity: foundItem.quantity - decrementNumber }
      }

      return item
    })

    setCart(filteredItems)
  }

  async function pay(cb: () => void, price: number) {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'success', price })
      .eq('order_id', orderId)

    if (error) {
      toast.error(error.message)

      return
    } else {
      toast.success('Payment success!')
    }

    CART_PAY = true
    setOrderId(null)
    setCart([])
    cb()
  }

  async function clearCart() {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'canceled' })
      .eq('order_id', orderId)

    if (error) {
      toast.error(error.message)

      return
    }

    CART_PAY = true
    setOrderId(null)
    setCart([])
  }

  async function selectOrder() {
    console.log('Selecting order for cashier:', cashier?.cashier_id)
    if (cashier?.cashier_id) {
      const { data, error } = await supabase
        .from('orders')
        .select('order_id')
        .eq('cashier_id', cashier.cashier_id)
        .eq('status', 'pending')

      if (error) {
        toast.error(error.message)
        console.error('Error selecting order:', error.message)
        return
      }

      console.log('Selected orderId:', data?.[0]?.order_id)
      setOrderId(data?.[0]?.order_id)
    }
  }

  useEffect(() => {
    selectOrder()
  }, [cashier?.cashier_id])

  async function selectCartItems() {
    console.log('Selecting cart items for orderId:', orderId)
    if (orderId) {
      const { data, error } = await supabase
        .from('carts')
        .select(`*, goods(*)`)
        .eq('order_id', orderId)

      if (error) {
        toast.error(error.message)
        console.error('Error selecting cart items:', error.message)
        return
      }

      console.log('Selected cart items:', data)
      CART_ITEMS = data
      setCart(data as CartItem[])
    }
  }

  useEffect(() => {
    selectCartItems()
  }, [orderId])

  async function getCart() {
    if (orderId) {
      const { data, error } = await supabase
        .from('carts')
        .select(`*, goods(*)`)
        .eq('order_id', orderId)

      if (error) {
        toast.error(error.message)

        return
      }

      console.log('Got cart items:', data)
      CART_ITEMS = data
    }
  }

  useEffect(() => {
    if (CART_PAY) {
      CART_PAY = false
      return
    }

    if (orderId) {
      cart.forEach(async (item) => {
        if (CART_ITEMS?.some((i) => i.cart_id === item.cart_id)) {
          await supabase
            .from('carts')
            .update({ quantity: item.quantity })
            .eq('cart_id', item.cart_id)
        } else {
          await supabase.from('carts').insert({
            cart_id: item.cart_id,
            order_id: item.order_id,
            good_id: item.good_id,
            quantity: item.quantity,
          })
        }
      })
    }

    async function updateCart() {
      for (const item of CART_ITEMS || []) {
        if (!cart.some((i) => i.cart_id === item.cart_id)) {
          await supabase.from('carts').delete().eq('cart_id', item.cart_id)
        }
      }
    }

    updateCart()
    getCart()
  }, [cart, CART_PAY])

  return (
    <CartContext.Provider
      value={{
        cart,
        orderId,
        pay,
        create,
        remove,
        increment,
        decrement,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
