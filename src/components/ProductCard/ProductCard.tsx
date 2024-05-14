import { useState, useEffect, useContext } from 'react'
import { CartContext } from '@/providers/CartProvider'
import { CartItem, Goods } from '@/modals/Types'
import { AnimatePresence, motion } from 'framer-motion'

import ProductCardSetBg from './ProductCardSetBg'

import CardCounter from '@/components/CardCounter'
import { cn } from '@/helpers/cn'

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="w-full select-none"
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
              'text-[20px] font-bold mt-[15px] mb-[10px] ml-[10px] '
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
      </motion.div>
    </AnimatePresence>
  )
}

export default ProductCard
