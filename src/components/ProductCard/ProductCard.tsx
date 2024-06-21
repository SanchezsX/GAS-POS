import { useState, useEffect } from 'react'
import { CartItem, Goods } from '@/modals/Types'
import { AnimatePresence, motion } from 'framer-motion'
import ProductCardSetBg from './ProductCardSetBg'
import CardCounter from '@/components/CardCounter'
import { cn } from '@/helpers/cn'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const ProductCard = ({ data }: { data: Goods }) => {
  const cart = useSelector((state: RootState) => state.cart.cart)
  const [currentItem, setCurrentItem] = useState<CartItem | null>(null)
  const [isSelected, setIsSelected] = useState(false)
  useEffect(() => {
    if (Array.isArray(cart)) {
      const item = cart.find((i) => i.good_id === data.good_id)
      setIsSelected(!!item)
      setCurrentItem(item || null)
    }
  }, [cart, data.good_id])

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
          isSelected={isSelected}
        />
        <div className="left-3 flex flex-col items-end">
          <h5
            className={cn(
              'max-2xl:mt-[5px] max-2xl:text-[16px] text-[18px]',
              'text-[20px] font-bold mt-[15px] mb-[10px] ml-[10px] flex self-start'
            )}
          >
            {data.title}
          </h5>
          <CardCounter
            data={data}
            isSelected={isSelected}
            currentItem={currentItem}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProductCard
