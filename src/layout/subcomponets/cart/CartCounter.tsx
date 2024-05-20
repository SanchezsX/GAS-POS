import { cn } from '@/helpers/cn'
import Icon from '@/components/Icon'
import { AnimatePresence, motion } from 'framer-motion'
import { itemVariants, transition } from '@/variants/framerVariants'

interface CartCounterProps {
  data: any
  increment: any
  decrement: any
}

const CartCounter = ({ data, increment, decrement }: CartCounterProps) => {
  return (
    <AnimatePresence>
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
        <p className="flex">
          {data.goods.type === 1 && (
            <span className="opacity-40 mr-[5px]">V:</span>
          )}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            key={data.quantity}
          >
            {data.quantity}
          </motion.p>
        </p>
        <Icon
          width="18px"
          height="18px"
          path="plus.svg"
          className="cursor-pointer "
          onClick={() => increment(data.good_id)}
        />
      </div>
    </AnimatePresence>
  )
}

export default CartCounter
