import CustomButton from '@/components/CustomButton'
import Icon from '@/components/Icon'
import { cn } from '@/helpers/cn'
import { AnimatePresence, motion } from 'framer-motion'

import { CartButtonProps } from '@/modals/Types'
import { itemVariants, transition } from '@/variants/framerVariants'

const CartButton = ({
  handlRefresh,
  pay,
  isClicked,
}: CartButtonProps) => {
  return (
    <AnimatePresence>
      <motion.div
         variants={itemVariants}
         initial="initial"
         animate="animate"
         exit="exit"
         transition={transition}
        className="flex gap-3 mt-auto"
      >
        <CustomButton
          onClick={handlRefresh}
          className="rounded-[30px] w-[15vh] justify-center flex items-center bg-white/5 hover:bg-white/10 "
        >
          <Icon
            path="refresh.svg"
            width="22px"
            height="22px"
            className={cn(
              isClicked
                ? '-rotate-[360deg] transition duration-700'
                : 'rotate-0'
            )}
          />
        </CustomButton>
        <CustomButton onClick={() => pay()}>Pay</CustomButton>
      </motion.div>
    </AnimatePresence>
  )
}

export default CartButton
