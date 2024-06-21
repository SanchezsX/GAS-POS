import type { FC, MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ModalProps } from '@/modals/Types'
import { cn } from '@/helpers/cn'
import { setModalIsOpen } from '@/store/cartSlice'
import { useDispatch } from 'react-redux'

const Modal: FC<ModalProps> = ({ isOpen, children }) => {
  const dispatch = useDispatch()
  const handleContainerClick = (e: MouseEvent | any) => {
    if (e.target === e.currentTarget) {
      dispatch(setModalIsOpen(false))
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'absolute top-0 left-0 w-full h-screen flex justify-center items-center',
            'z-40 bg-black/40 backdrop-blur-[30px] '
          )}
          onClick={handleContainerClick}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
