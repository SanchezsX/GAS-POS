import { useAuth } from '@/hooks/useAuth';
import { Goods } from '@/modals/Goods.modal';
import { supabase } from '@/supabase';
import type { FC, ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export type CartItem = {
  cart_id: string;
  good_id: number;
  order_id: number;
  quantity: number;
  goods: Goods;
};

interface CartContextValues {
  cart: CartItem[];
  create: (goods: Goods) => void;
  remove: (goodId: number) => void;
  increment: (goodId: number) => void;
  decrement: (goodId: number) => void;
  pay: (cb: () => void, price: number) => void;
  clearCart: () => void;
}

let CART_ITEMS: CartItem[] | null = null;
let CART_PAY = false;

export const CartContext = createContext<CartContextValues>(
  {} as CartContextValues
);

export const CartProvider: FC<{ children: ReactNode; }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderId, setOrderId] = useState<number | null>(null);

  const { cashier } = useAuth();

  async function create(goods: Goods) {
    if (!orderId && cashier) {
      const { data, error } = await supabase
        .from('orders')
        .insert({ cashier_id: cashier.cashier_id })
        .select('order_id');

      if (error) {
        return toast.error(error.message);
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
      ]);

      return setOrderId(data?.[0].order_id);
    }

    if (cart.some((i) => i.good_id === goods.good_id))
      return remove(goods.good_id);

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
      ]);
    }
  }

  function remove(goodId: number) {
    const filteredCart = cart.filter((item) => item.good_id !== goodId);
    setCart(filteredCart);
  }

  function increment(goodId: number) {
    const foundItem = cart.find((item) => item.good_id === goodId)!;
    const incrementNumber = foundItem?.goods.quantity;

    const filteredItems = cart.map((item) => {
      if (item.good_id === goodId) {
        return { ...foundItem, quantity: foundItem.quantity + incrementNumber };
      }

      return item;
    });

    setCart(filteredItems);
  }

  function decrement(goodId: number) {
    const foundItem = cart.find((item) => item.good_id === goodId)!;
    const decrementNumber = foundItem?.goods.quantity;

    if (
      foundItem.quantity <= decrementNumber ||
      foundItem.quantity <= decrementNumber
    )
      return remove(goodId);

    const filteredItems = cart.map((item) => {
      if (item.good_id === goodId) {
        return { ...foundItem, quantity: foundItem.quantity - decrementNumber };
      }

      return item;
    });

    setCart(filteredItems);
  }

  async function pay(cb: () => void, price: number) {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'success', price })
      .eq('order_id', orderId);

    if (error) return toast.error(error.message);

    CART_PAY = true;
    setOrderId(null);
    setCart([]);
    cb()
  }

  async function clearCart() {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'canceled' })
      .eq('order_id', orderId);

    if (error) return toast.error(error.message);

    CART_PAY = true;
    setOrderId(null);
    setCart([]);
  }

  async function selectOrder() {
    if (cashier?.cashier_id) {
      const { data } = await supabase
        .from('orders')
        .select('order_id')
        .eq('cashier_id', cashier.cashier_id)
        .eq('status', 'pending');

      setOrderId(data?.[0]?.order_id);
    }
  }

  useEffect(() => {
    selectOrder();
  }, [cashier?.cashier_id]);

  async function selectCartItems() {
    if (orderId) {
      const { data } = await supabase
        .from('carts')
        .select(`*, goods(*)`)
        .eq('order_id', orderId);

      CART_ITEMS = data;
      setCart(data as CartItem[]);
    }
  }

  useEffect(() => {
    selectCartItems();
  }, [orderId]);

  async function getCart() {
    if (orderId) {
      const { data } = await supabase
        .from('carts')
        .select(`*, goods(*)`)
        .eq('order_id', orderId);

      CART_ITEMS = data;
    }
  }

  useEffect(() => {
    if (CART_PAY) {
      CART_PAY = false;
      return;
    }

    if (orderId) {
      cart.forEach(async (item) => {
        if (CART_ITEMS?.some((i) => i.cart_id === item.cart_id)) {
          await supabase
            .from('carts')
            .update({ quantity: item.quantity })
            .eq('cart_id', item.cart_id);
        }

        if (!CART_ITEMS?.some((i) => i.cart_id === item.cart_id)) {
          await supabase.from('carts').insert({
            cart_id: item.cart_id,
            order_id: item.order_id,
            good_id: item.good_id,
            quantity: item.quantity,
          });
        }
      });
    }

    CART_ITEMS?.forEach(async (item) => {
      if (!cart.some((i) => i.cart_id === item.cart_id)) {
        await supabase.from('carts').delete().eq('cart_id', item.cart_id);
      }
    });

    getCart();
  }, [cart, CART_PAY]);

  return (
    <CartContext.Provider
      value={{
        cart,
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
  );
};
