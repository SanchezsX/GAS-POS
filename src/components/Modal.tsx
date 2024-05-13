import cn from '@/helpers/cn'
import { ModalProps } from '@/modals/Types'
import type { FC, MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, children}) => {
  const handleContainerClick = (e: MouseEvent | any) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key='modal'
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1,  backdropFilter: 'blur(30px)'  }}
          exit={{ opacity: 0 }}
          className={cn(
            'absolute top-0 left-0 w-full h-screen flex justify-center items-center',
            'z-40 bg-black/30 '
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
