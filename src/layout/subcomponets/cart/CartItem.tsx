import Icon from '@/components/Icon'
import Skeleton from '@/components/Skeleton'
import cn from '@/helpers/cn'
import { CartItemProps } from '@/modals/Types'

import { CartContext } from '@/providers/CartProvider'
import { useContext } from 'react'

const SELECR_COLOR_HEX: object = {
  1: 'rgba(96, 188, 148, 0.1)',
  2: 'rgba(237, 176, 85, 0.1)',
  3: 'rgba(100, 146, 236, 0.1)',
}
const SELECR_COLOR_RGBA: object = {
  1: '#60BC94',
  2: '#EDB055',
  3: '#6492EC',
}
const CartItem = ({ data }: CartItemProps) => {
  const { increment, decrement } = useContext(CartContext)
  function getCurrentColor(type: any, selectColor: any) {
    for (const property in SELECR_COLOR_HEX) {
      if (property == type) {
        return selectColor[property]
      }
    }
  }

  return (
    <>
      {true ? ( // FIXME: loading...
        <div className="flex items-center justify-between first:mt-0 mt-[40px]">
          <div className="flex items-center gap-4">
            <div
              style={{
                backgroundColor: getCurrentColor(
                  data.goods.type,
                  SELECR_COLOR_HEX
                ),
              }}
              className="p-[28px]  rounded-[24px]"
            >
              {data.goods.icon.startsWith('/') ? (
                <Icon
                  path={data.goods.icon}
                  width="36px"
                  height="36px"
                  color={getCurrentColor(data.goods.type, SELECR_COLOR_RGBA)}
                />
              ) : (
                <Icon
                  path="fuel-icon.svg"
                  width="36px"
                  height="36px"
                  color={getCurrentColor(data.goods.type, SELECR_COLOR_RGBA)}
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
  )
}

export default CartItem
