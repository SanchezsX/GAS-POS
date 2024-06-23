// store/actions/cartActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { supabase } from '@/supabase';
import { Goods } from '@/modals/Types';

import { clearCart, setOrderId, setOrdersCount, setTotalOrdersCount } from '../slices/cartSlice';
import { RootState } from '../store';

export const createOrder = createAsyncThunk(
  'cart/createOrder',
  async (goods: Goods, { getState }) => {
    const state = getState() as RootState;
     // @ts-ignore
    const cashier = state.auth.cashier;
    if (!state.cart.orderId && cashier) {
      const { data, error } = await supabase
        .from('orders')
        .insert({ cashier_id: cashier.cashier_id })
        .select('order_id');
      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      return { orderId: data[0].order_id, goods };
    }
    return { orderId: state.cart.orderId, goods };
  }
);

export const payOrder = createAsyncThunk(
  'cart/payOrder',
  async (price: number, { getState, dispatch }) => {
    const state = getState() as RootState;
    const orderId = state.cart.orderId;

    if (!orderId) {
      throw new Error('No orderId found');
    }
    const { error } = await supabase
      .from('orders')
      .update({ status: 'success', price })
      .eq('order_id', orderId);

    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    } else {
      toast.success('Payment success!');
      dispatch(clearCart());
      dispatch(setOrderId(null));

      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select()
         // @ts-ignore
        .eq('cashier_id', state.auth.cashier.cashier_id);

      if (ordersError) {
        toast.error(ordersError.message);
      } else {
        let count = 0;
        orders.forEach((order) => {
          const date = order?.created_at.split('T')[0];
          if (date === new Date().toISOString().split('T')[0]) count++;
        });
        dispatch(setOrdersCount(count));
        dispatch(setTotalOrdersCount(orders.length));
      }
    }
  }
);
