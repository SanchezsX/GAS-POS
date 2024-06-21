import Icon from '@/components/Icon'
import Skeleton from '@/components/Skeleton'

import { CartItemProps } from '@/modals/Types'
import { AnimatePresence, motion } from 'framer-motion'

// import { CartContext } from '@/providers/CartProvider'
// import { useContext } from 'react'
import { itemVariants, transition } from '@/variants/framerVariants'
import CartCounter from './CartCounter'

const SELECR_COLOR_HEX: object = {
  1: 'rgba(96, 188, 148, 0.1)',
  2: 'rgba(237, 176, 85, 0.1)',
  3: 'rgba(100, 146, 236, 0.1)',
}
const SELECR_COLOR_RGBA: object = {
  1: '#60BC94',
  2: '#EDB055',
  3: '#6492EC',
}
const CartItem = ({ data }: CartItemProps) => {


  function getCurrentColor(type: any, selectColor: any) {
    for (const property in SELECR_COLOR_HEX) {
      if (property == type) {
        return selectColor[property]
      }
    }
  }

  return (
    <>
      <AnimatePresence>
        {true ? ( // FIXME: loading...
          <motion.div
            variants={itemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="flex items-center justify-between first:mt-3 mt-[40px]"
          >
            <div className="flex items-center gap-4">
              <div
                style={{
                  backgroundColor: getCurrentColor(
                    data.goods.type,
                    SELECR_COLOR_HEX
                  ),
                }}
                className="p-[28px]  rounded-[24px]"
              >
                {data.goods.icon.startsWith('/') ? (
                  <Icon
                    path={data.goods.icon}
                    width="36px"
                    height="36px"
                    color={getCurrentColor(data.goods.type, SELECR_COLOR_RGBA)}
                  />
                ) : (
                  <Icon
                    path="fuel-icon.svg"
                    width="36px"
                    height="36px"
                    color={getCurrentColor(data.goods.type, SELECR_COLOR_RGBA)}
                  />
                )}
              </div>
              <div className="">
                <h4 className="text-[20px] font-semibold">
                  {data.goods.title}
                </h4>
                <CartCounter data={data} />
              </div>
            </div>
            <p className="text-[20px] font-semibold">$ {data.goods.price}</p>
          </motion.div>
        ) : (
          <div className="flex gap-4">
            <Skeleton
              width="90px"
              height="90px"
              className="rounded-[18px]"
            />
            <div className="flex flex-col gap-2">
              <Skeleton
                width="180px"
                height="30px"
                className="rounded-full"
              />
              <Skeleton
                width="140px"
                height="45px"
                className="rounded-full"
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CartItem
