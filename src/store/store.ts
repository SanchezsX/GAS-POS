import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

// Типы для использования в хуках
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch