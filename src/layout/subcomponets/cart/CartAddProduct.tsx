import { AnimatePresence, motion } from 'framer-motion'

const CartAddProduct = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="ml-auto mt-40"
      >
        <img
          className="pt-auto"
          src="./images/cart-gas.png"
          alt=""
        />
        <h4 className="font-semibold text-[20px]">Add products to the cart</h4>
      </motion.div>
    </AnimatePresence>
  )
}

export default CartAddProduct
