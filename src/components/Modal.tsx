import type { FC, MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ModalProps } from '@/modals/Types'
import { cn } from '@/helpers/cn'


const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, children }) => {
  const handleContainerClick = (e: MouseEvent | any) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, }}
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
