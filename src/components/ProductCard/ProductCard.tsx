import { useState, useEffect, useContext } from 'react'
import { CartContext } from '@/providers/CartProvider'
import { CartItem, Goods } from '@/modals/Types'

import ProductCardSetBg from './ProductCardSetBg'
import cn from '@/helpers/cn'
import CardCounter from '@/components/CardCounter'

const ProductCard = ({ data }: { data: Goods }) => {
  const { cart, create, increment, decrement } = useContext(CartContext)
  const [currentItem, setCurrentItem] = useState<CartItem>({} as CartItem)
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    const item = cart.find((i) => i.good_id === data.good_id)

    setIsSelected(!!item)
    setCurrentItem(item!)
  }, [cart])

  return (
    <div
      className="w-full"
      key={data.good_id}
    >
      <ProductCardSetBg
        data={data}
        create={create}
        isSelected={isSelected}
      />
      <div className="left-3">
        <h5
          className={cn(
            'max-2xl:mt-[5px] text-[18px]',
            'text-[20px] font-bold mt-[15px] mb-[10px] ml-[10px]'
          )}
        >
          {data.title}
        </h5>
        <CardCounter
          data={data}
          create={create}
          increment={increment}
          decrement={decrement}
          isSelected={isSelected}
          currentItem={currentItem}
        />
      </div>
    </div>
  )
}

export default ProductCard
