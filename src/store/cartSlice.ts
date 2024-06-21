import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import { supabase } from '@/supabase'
import { CartItem, CartState, Goods } from '@/modals/Types'
import { RootState } from './store'

const initialState: CartState = {
  cart: [],
  discountTaken: 0,
  orderId: null,
  discount: 0,
  cartPay: false,
  isHidden: true,
  email: 'bilysana7@gmail.com',
  password: 'sashacashier',
  isError: '',
  popoverIsOpen: false,
  modalIsOpen: false,
  userId: '',
  ordersCount: 0,
  totalOrdersCount: 0,
  emailCahier: '',
}

const selectCart = (state: RootState) => state.cart;

export const selectOrderId = createSelector(
  selectCart,
  (cart) => cart.orderId
);


export const createOrder = createAsyncThunk(
  'cart/createOrder',
  async (goods: Goods, { getState }) => {
    const state = getState() as RootState
     // @ts-ignore
    const cashier = state.auth.cashier
    debugger
    
    if (!state.cart.orderId && cashier) {
      const { data, error } = await supabase
        .from('orders')
        .insert({ cashier_id: cashier.cashier_id })
        .select('order_id')

      if (error) {
        toast.error(error.message)
        throw new Error(error.message)
      }

      return { orderId: data[0].order_id, goods }
    }

    return { orderId: state.cart.orderId, goods }
  }
)

export const payOrder = createAsyncThunk(
  'cart/payOrder',
  async (price: number, { getState, dispatch }) => {
    const state = getState() as RootState
    const orderId = state.cart.orderId

    if (!orderId) {
      throw new Error('No orderId found')
    }
    const { error } = await supabase
      .from('orders')
      .update({ status: 'success', price })
      .eq('order_id', orderId)

    if (error) {
      toast.error(error.message)
      throw new Error(error.message)
    } else {
      toast.success('Payment success!')
      dispatch(clearCart())
      dispatch(setOrderId(null))

      
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select()
        // @ts-ignore
        .eq('cashier_id', state.auth.cashier.cashier_id)

      if (ordersError) {
        toast.error(ordersError.message)
      } else {
        let count = 0
        orders.forEach((order) => {
          const date = order?.created_at.split('T')[0]
          if (date === new Date().toISOString().split('T')[0]) count++
        })
        dispatch(setOrdersCount(count))
        dispatch(setTotalOrdersCount(orders.length))
      }
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      state.cart.push(action.payload)
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter(item => item.good_id !== action.payload)
    },
    incrementQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find(item => item.good_id === action.payload)
      if (item) {
        item.quantity += item.goods.quantity
      }
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find(item => item.good_id === action.payload)
      if (item) {
        item.quantity -= item.goods.quantity
        if (item.quantity <= 0) {
          state.cart = state.cart.filter(cartItem => cartItem.good_id !== action.payload)
        }
      }
    },
    clearCart(state) {
      state.cart = []
      state.orderId = null
    },
    setOrderId(state, action: PayloadAction<number | null>) {
      state.orderId = action.payload
      
    },
    setDiscount(state, action: PayloadAction<number>) {
      state.discount = action.payload
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.cart = action.payload
    },
    setCartPay(state, action: PayloadAction<boolean>) {
      state.cartPay = action.payload
    },
    setDiscountTaken(state, action: PayloadAction<number>) {
      state.discountTaken = action.payload
    },
    setIsHidden(state, action: PayloadAction<boolean>) {
      state.isHidden = action.payload
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
    setError(state, action: PayloadAction<string>) {
      state.isError = action.payload
    },
    setPopoverIsOpen(state, action: PayloadAction<boolean>) {
      state.popoverIsOpen = action.payload
    },
    setModalIsOpen(state, action: PayloadAction<boolean>) {
      state.modalIsOpen = action.payload
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload
    },
    setOrdersCount(state,action: PayloadAction<number>) {
      state.ordersCount = action.payload
    },
    setTotalOrdersCount(state,action: PayloadAction<number>) {
      state.totalOrdersCount = action.payload
    },
    setEmailCahier(state, action: PayloadAction<string>) {
      state.emailCahier = action.payload
     }
  },
  
  extraReducers: (builder) => {
  builder.addCase(createOrder.fulfilled, (state, action) => {
    const { orderId, goods } = action.payload
    state.orderId = orderId
    state.cart.push({
      cart_id: Math.random().toString(16).slice(2),
      good_id: goods.good_id,
      order_id: orderId,
      quantity: goods.quantity,
      goods,
    })
  })
}
})
export const { 
    addToCart,
    removeFromCart, 
    incrementQuantity, 
    decrementQuantity,
    clearCart,
    setOrderId,
    setDiscount,
    setCart, 
    setCartPay,
    setDiscountTaken,
    setIsHidden,
    setEmail,
    setPassword,
    setError,
    setPopoverIsOpen,
    setModalIsOpen,
    setUserId,
    setOrdersCount,
    setTotalOrdersCount,
    setEmailCahier

  } = cartSlice.actions

export default cartSlice.reducer
