import { useState, useEffect, useContext } from 'react'

import cn from '@/helpers/cn'
import { Goods } from '@/modals/Goods.modal'
import { CartContext, CartItem } from '@/providers/CartProvider'
import { iconToColorMap } from '@/data/Data'
import Icon from '@/components/Icon'

interface FoodProps {
  data: Goods
}

const ProductCard = ({ data }: FoodProps) => {
  const { cart, create, increment, decrement } = useContext(CartContext)

  const [currentItem, setCurrentItem] = useState<CartItem>({} as CartItem)
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    const item = cart.find((i) => i.good_id === data.good_id)

    setIsSelected(!!item)
    setCurrentItem(item!)
  }, [cart])

  return (
    <>
      <div
        className="w-full"
        key={data.good_id}
      >
        <div
          className={cn(
            isSelected ? iconToColorMap[data.icon] : '',
            'p-[11px] rounded-[45px] transition',
            'cursor-pointer'
          )}
          onClick={() => create(data)}
        >
          <div
            className={cn(
              'max-2xl:h-[150px]',
              'relative w-full h-[190px] rounded-[40px] overflow-hidden ',
              'flex items-center justify-center'
            )}
            style={{ backgroundColor: data.color }}
          >
            {data.icon.startsWith('/') ? (
              <Icon
                path={data.icon}
                width="100px"
                height="100px"
              />
            ) : (
              <span
                className={cn(
                  'max-2xl:text-[110px] ',
                  'text-[180px] text-[#06090F] font-bold absolute -right-[25px]'
                )}
              >
                {data.icon}
              </span>
            )}
          </div>
        </div>
        <div className="left-3">
          <h5
            className={cn(
              'max-2xl:mt-[5px] text-[18px]',
              'text-[20px] font-bold mt-[15px] mb-[10px] ml-[10px]'
            )}
          >
            {data.title}
          </h5>
          {isSelected ? (
            <div
              className={cn(
                'w-[95%] px-[15px] py-[8px] ml-[7px]',
                'rounded-[20px] border-solid border-2 border-[#ffff]/5',
                'bg-[#1A1D22] flex items-center justify-between'
              )}
            >
              <Icon
                width="23px"
                height="23px"
                path="minus.svg"
                className="cursor-pointer"
                onClick={() => decrement(data.good_id)}
              />
              <p>
                {data.type === 1 && (
                  <span className="opacity-40 mr-[5px]">V:</span>
                )}
                {currentItem.quantity}
                {data.type === 1 && (
                  <span className="ml-[3px]">l</span>
                )}
              </p>
              <Icon
                onClick={() => increment(data.good_id)}
                width="23px"
                height="23px"
                path="plus.svg"
                className="cursor-pointer"
              />
            </div>
          ) : (
            <div className="flex justify-between items-center ml-[7px] w-[95%]">
              <p
                className={cn(
                  'max-2xl:text-[20px]',
                  'text-[24px] font-bold pr-2'
                )}
              >
                ${data.price}
              </p>
              <div
                onClick={() => create(data)}
                className="py-[15px] w-[50%] flex justify-center bg-[#FBF8F1]/30 rounded-[25px] cursor-pointer"
              >
                <Icon
                  width="23px"
                  height="23px"
                  path="plus.svg"
                  className="cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductCard
