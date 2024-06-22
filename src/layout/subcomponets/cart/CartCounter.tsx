import { cn } from '@/helpers/cn'
import Icon from '@/components/Icon'
import { AnimatePresence, motion } from 'framer-motion'
import { decrementQuantity, incrementQuantity } from '@/store/cartSlice'
import { useDispatch } from 'react-redux'

interface CartCounterProps {
  data: any
}

const CartCounter = ({ data}: CartCounterProps) => {
  const Dispatch = useDispatch()
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
          onClick={() => Dispatch(decrementQuantity(data.good_id))}
        />
        <p className="flex">
          {data.goods.type === 1 && (
            <span className="opacity-40 mr-[5px]">V:</span>
          )}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            key={data.quantity}
          >
            {data.quantity}
          </motion.span>
        </p>
        <Icon
          width="18px"
          height="18px"
          path="plus.svg"
          className="cursor-pointer "
          onClick={() => Dispatch(incrementQuantity(data.good_id))}
        />
      </div>
    </AnimatePresence>
  )
}

export default CartCounter
