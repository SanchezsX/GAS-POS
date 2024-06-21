import { Goods } from "@/modals/Types"
import { supabase } from "@/supabase"
import { useAuth } from "./useAuth"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { removeFromCart, selectOrderId, setCart, setOrderId } from "@/store/cartSlice"
import { RootState } from "@/store/store"

function useCreate(goods: Goods) {
  const orderId  = useSelector(selectOrderId);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { cashier } = useAuth()

  const create = async () => {
    if (!orderId && cashier) {
    const { data, error } = await supabase
     .from('orders')
     .insert({ cashier_id: cashier.cashier_id })
     .select('order_id')
     if (error) {
       toast.error(error.message)
       return
      }
   
   dispatch(setCart([
     ...cart,
     {
       cart_id: Math.random().toString(16).slice(2),
       good_id: goods.good_id,
       order_id: data?.[0].order_id,
       quantity: goods.quantity,
       goods,
     },
   ]))

   return dispatch(setOrderId(data?.[0].order_id))
   
 }

 if (cart.some((i) => i.good_id === goods.good_id)) {
   return dispatch(removeFromCart(goods.good_id))
 }

 if (orderId) {
   dispatch(setCart([
     ...cart,
     {
       cart_id: Math.random().toString(16).slice(2),
       good_id: goods.good_id,
       order_id: orderId,
       quantity: goods.quantity,
       goods,
     },
   ]))
 }

 if (!orderId && !cart.length) {
   toast.error('reload the page')

   window.location.reload()
 }
 
  }

  return create
}
export default useCreate