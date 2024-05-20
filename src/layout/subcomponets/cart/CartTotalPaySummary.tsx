import { itemVariants, transition } from '@/variants/framerVariants'
import { AnimatePresence, motion } from 'framer-motion'

const CartTotalPaySummary = ({ totalPrice }: { totalPrice: number }) => {
  return (
    <AnimatePresence>
      <motion.div
        variants={itemVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        className="flex justify-between mb-[30px] mt-auto"
      >
        <p className="text-[20px] font-semibold ">Total pay</p>
        <motion.p
          variants={itemVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          key={totalPrice}
          className="text-[25px] font-semibold"
        >
          $ {totalPrice}
        </motion.p>
        {/* <div className="flex gap-2">
          <motion.span className='text-[25px] font-semibold'>$</motion.span>
          <motion.p
            variants={itemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            key={totalPrice}
            className="text-[25px] font-semibold"
          >
            {totalPrice}
          </motion.p>
        </div> */}
      </motion.div>
    </AnimatePresence>
  )
}

export default CartTotalPaySummary
