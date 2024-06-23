import { useCallback } from 'react';
import { setCart, setCartPay, setOrderId } from '@/store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderId } from '@/store/selectors/cartSelectors';
import { supabase } from '@/supabase';
import { toast } from 'sonner';

const usePay = (cb: () => void, price: number) => {
  const orderId = useSelector(selectOrderId);
  const dispatch = useDispatch();

  const pay = useCallback(async () => {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'success', price })
      .eq('order_id', orderId);

    if (error) {
      toast.error(error.message);
      return;
    } else {
      toast.success('Payment success!', {
        style: {
          background: '#1C1E24',
          color: '#60BC94',
        },
      });
    }

    dispatch(setCartPay(true));
    dispatch(setOrderId(null));
    dispatch(setCart([]));
    cb();
    
  }, [orderId, price, dispatch, cb]);

  return pay;
};

export default usePay;
