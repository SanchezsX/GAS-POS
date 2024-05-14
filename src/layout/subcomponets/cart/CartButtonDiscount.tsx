import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/helpers/cn'



interface CartButtonDiscountProps {
  setIsDiscountActive: React.Dispatch<React.SetStateAction<boolean>>
}
const CartButtonDiscount = ({
  setIsDiscountActive,
}: CartButtonDiscountProps) => {
  return (
    <AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 600, damping: 10 }}
        
        className={cn(
          'text-[#EDB055] text-[17px] bg-[#EDB055]/5 py-[14px] px-[11px] rounded-[20px]',
          'hover:bg-[#EDB055]/10 '
        )}
        onClick={() => setIsDiscountActive(true)}
      >
        Add discount card
      </motion.button>
    </AnimatePresence>
  )
}

export default CartButtonDiscount
