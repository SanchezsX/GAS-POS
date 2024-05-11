import { SyntheticEvent, useContext, useEffect, useState, type FC } from 'react';
import CustomButton from '@/components/CustomButton';
import cn from '@/helpers/cn';
import CartItem from './CartItem';
import Icon from '@/components/Icon';
import { CartContext } from '@/providers/CartProvider';
import Select from '../Select';
import CustomInput from '@/components/CustomInput';
import { supabase } from '@/supabase';
import { toast } from 'sonner';

// type OrderStatus = 'pending' | 'success' | 'canceled';

const Cart: FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [isDiscountActive, setIsDiscountActive] = useState(false);
  const [discountValue, setDiscountValue] = useState('');

  const { cart, pay, clearCart } = useContext(CartContext);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
    clearCart();
  };

  async function submitDiscount(e: SyntheticEvent) {
    e.preventDefault();

    const { data, error } = await supabase
      .from('cards')
      .select()
      .eq('id', +discountValue);

    if (error) {
      return toast.error(error.message);
    }

    if (!data[0]) {
      return toast.error('Not valid code card!');
    }

    setDiscount(data[0].discount);
    setIsDiscountActive(false);
    setDiscountValue('');
  }

  useEffect(() => {
    let total: number = 0;

    cart.forEach((i) => {
      total += i.goods.price * i.quantity;
      const discountPercent = (total / 100) * discount;
      setTotalPrice(+(total - discountPercent).toFixed(2));
    });
  }, [cart, discount]);

  return (
    <div
      className={cn(
        'flex flex-col h-full w-[445px]',
        'bg-sideBg rounded-[39px] px-[38px] pt-[50px] pb-[38px]',
        'max-2xl:w-[400px] '
      )}
    >
      <div className="flex items-center justify-between">
        {cart.length > 0 && (
          <h2 className="font-bold text-[28px] max-2xl:text-[20px]">
            Order #95
          </h2>
        )}

        <Select className={cn(cart.length > 0 ? ' ' : 'ml-auto')} />
      </div>
      {cart.length === 0 && (
        <div className="ml-auto mt-40">
          <img
            className="pt-auto"
            src="/images/cart-gas.png"
            alt=""
          />
          <h4 className="font-semibold text-[20px]">
            Add products to the cart
          </h4>
        </div>
      )}
      {!!cart.length &&
        <div className="h-[450px] mt-6 overflow-y-auto pr-2">
          {cart.map((data: any) => (
            <CartItem
              key={data.cart_id}
              data={data}
            />
          ))}
        </div>
      }
      {cart.length === 0 ? (
        <></>
      ) : (
        <>
          <img src="/icons/line.svg" />
          <div className="py-[20px]">
            <div className="flex justify-between mb-[20px]">
              <p className="text-white/50">Subtotal</p>
              <p>$ {totalPrice}</p>
            </div>
            <div className="flex justify-between items-center mb-[20px]">
              <p className="text-white/50">Discount</p>
              {discount ? (
                <div>{discount}%</div>
              ) : isDiscountActive ? (
                <div className="relative flex w-[220px] items-center">
                  <form onSubmit={submitDiscount}>
                    <CustomInput
                      className=" w-full pr-12 py-[14px]"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                    />
                  </form>
                  <button
                    className="absolute right-2 px-3"
                    onClick={() => setIsDiscountActive(false)}
                  >
                    <Icon
                      className="rotate-45"
                      width="14px"
                      height="14px"
                      path="/plus.svg"
                    />
                  </button>
                </div>
              ) : (
                <button
                  className={cn(
                    'text-[#EDB055] text-[17px] bg-[#EDB055]/5 py-[14px] px-[11px] rounded-[20px]',
                    'hover:bg-[#EDB055]/10 transition'
                  )}
                  onClick={() => setIsDiscountActive(true)}
                >
                  Add discount card
                </button>
              )}
            </div>
            <img src="/icons/line.svg" />
          </div>
          <div className="flex justify-between mb-[30px]">
            <p className="text-[20px] font-semibold">Total pay</p>
            <p className="text-[20px] font-semibold">$ {totalPrice}</p>
          </div>
        </>
      )}

      {cart.length === 0 ? (
        <>
          <CustomButton className='mt-auto' disabled>Pay</CustomButton>
        </>
      ) : (
        <div className="flex gap-3">
          <CustomButton
            onClick={handleClick}
            className="rounded-[30px] w-[25%] justify-center flex items-center  bg-white/5"
          >
            <Icon
              path="refresh.svg"
              width="22px"
              height="22px"
              className={cn(
                isClicked
                  ? '-rotate-[360deg] transition duration-700'
                  : 'rotate-0'
              )}
            />
          </CustomButton>
          <CustomButton onClick={() => pay(totalPrice)}>Pay</CustomButton>
        </div>
      )}
    </div>
  );
};

export default Cart;
