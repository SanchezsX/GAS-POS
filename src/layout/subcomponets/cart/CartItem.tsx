import Icon from '@/components/Icon';
import Skeleton from '@/components/Skeleton';
import cn from '@/helpers/cn';
import { Goods } from '@/modals/Goods.modal';
import { CartContext } from '@/providers/CartProvider';
import { useContext } from 'react';

interface CartItemProps {
  data: {
    cart_id: number,
    order_id: number,
    good_id: number,
    goods: Goods;
    quantity: number;
  };
}

const CartItem = ({
  data
}: CartItemProps) => {
  const { increment, decrement } = useContext(CartContext);

  return (
    <>
      {true ? ( // FIXME: loading...
        <div className="flex items-center justify-between first:mt-0 mt-[40px]">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                data.goods.type === 1 ? 'bg-[#60BC94]/5' : '',
                data.goods.type === 2 ? 'bg-[#EDB055]/5' : '',
                data.goods.type === 3 ? 'bg-[#6492EC]/5' : '',
                'p-[28px]  rounded-[24px]'
              )}
            >
              {data.goods.icon.startsWith('/') ? (
                <Icon
                  path={data.goods.icon}
                  width="36px"
                  height="36px"
                  color={cn(
                    data.goods.type === 1 ? '#60BC94' : '',
                    data.goods.type === 2 ? '#EDB055' : '',
                    data.goods.type === 3 ? '#6492EC' : ''
                  )}
                />
              ) : (
                <Icon
                  path="fuel-icon.svg"
                  width="36px"
                  height="36px"
                  color={cn(
                    data.goods.type === 1 ? '#60BC94' : '',
                    data.goods.type === 2 ? '#EDB055' : '',
                    data.goods.type === 3 ? '#6492EC' : ''
                  )}
                />
              )}
            </div>
            <div className="">
              <h4 className="text-[20px] font-semibold">{data.goods.title}</h4>
              <div
                className={cn(
                  'w-[130px] px-[15px] py-[8px] mt-3',
                  'rounded-[20px] border-solid border-2 border-[#ffff]/5',
                  'bg-[#ffff]/5 flex items-center justify-between'
                )}
              >
                <Icon
                  width="20px"
                  height="20px"
                  path="minus.svg"
                  className="cursor-pointer"
                  onClick={() => decrement(data.good_id)}
                />
                <p>
                  {data.goods.type === 1 && (
                    <span className="opacity-40 mr-[5px]">V:</span>
                  )}
                  {data.quantity}
                </p>
                <Icon
                  width="18px"
                  height="18px"
                  path="plus.svg"
                  className="cursor-pointer "
                  onClick={() => increment(data.good_id)}
                />
              </div>
            </div>
          </div>
          <p className="text-[20px] font-semibold">$ {data.goods.price}</p>
        </div>
      ) : (
        <div className="flex gap-4">
          <Skeleton
            width="90px"
            height="90px"
            className="rounded-[18px]"
          />
          <div className="flex flex-col gap-2">
            <Skeleton
              width="180px"
              height="30px"
              className="rounded-full"
            />
            <Skeleton
              width="140px"
              height="45px"
              className="rounded-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
