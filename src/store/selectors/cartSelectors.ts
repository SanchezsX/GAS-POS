// store/selectors/cartSelectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';


const selectCart = (state: RootState) => state.cart;

export const selectOrderId = createSelector(
  selectCart,
  (cart) => cart.orderId
);
