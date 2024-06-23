// store/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '@/modals/Types';

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
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      state.cart.push(action.payload);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter(item => item.good_id !== action.payload);
    },
    incrementQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find(item => item.good_id === action.payload);
      if (item) {
        item.quantity += item.goods.quantity;
      }
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find(item => item.good_id === action.payload);
      if (item) {
        item.quantity -= item.goods.quantity;
        if (item.quantity <= 0) {
          state.cart = state.cart.filter(cartItem => cartItem.good_id !== action.payload);
        }
      }
    },
    clearCart(state) {
      state.cart = [];
      state.orderId = null;
    },
    setOrderId(state, action: PayloadAction<number | null>) {
      state.orderId = action.payload;
    },
    setDiscount(state, action: PayloadAction<number>) {
      state.discount = action.payload;
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.cart = action.payload;
    },
    setCartPay(state, action: PayloadAction<boolean>) {
      state.cartPay = action.payload;
    },
    setDiscountTaken(state, action: PayloadAction<number>) {
      state.discountTaken = action.payload;
    },
    setIsHidden(state, action: PayloadAction<boolean>) {
      state.isHidden = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.isError = action.payload;
    },
    setPopoverIsOpen(state, action: PayloadAction<boolean>) {
      state.popoverIsOpen = action.payload;
    },
    setModalIsOpen(state, action: PayloadAction<boolean>) {
      state.modalIsOpen = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    setOrdersCount(state, action: PayloadAction<number>) {
      state.ordersCount = action.payload;
    },
    setTotalOrdersCount(state, action: PayloadAction<number>) {
      state.totalOrdersCount = action.payload;
    },
    setEmailCahier(state, action: PayloadAction<string>) {
      state.emailCahier = action.payload;
    },
  },
});

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
  setEmailCahier,
} = cartSlice.actions;

export default cartSlice.reducer;
