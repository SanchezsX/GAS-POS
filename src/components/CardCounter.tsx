import { CartItem, Goods } from '@/modals/Types'
import { cn } from '@/helpers/cn'
import Icon from './Icon'
import { AnimatePresence, motion } from 'framer-motion'

interface CardCounterProps {
  data: Goods
  create: (data: Goods) => void
  increment: (id: number) => void
  decrement: (id: number) => void
  isSelected: boolean
  currentItem: CartItem
}

const CardCounter = ({
  data,
  create,
  increment,
  decrement,
  isSelected,
  currentItem,
}: CardCounterProps) => {
  return (
    <>
      <AnimatePresence>
        {isSelected ? (
          <motion.div
          initial={{ width: '0%', transformOrigin: 'right' }}
          animate={{ width: '100%', transformOrigin: 'right' }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
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
              {data.type === 1 && <span className="ml-[3px]">l</span>}
            </p>
            <Icon
              onClick={() => increment(data.good_id)}
              width="23px"
              height="23px"
              path="plus.svg"
              className="cursor-pointer"
            />
          </motion.div>
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
              className={cn(
                ' flex justify-center rounded-[25px] cursor-pointer',
                'bg-[#FBF8F1]/30 py-[15px] w-[50%]',
                'max-2xl:py-[10px]'
              )}
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
      </AnimatePresence>
    </>
  )
}

export default CardCounter
