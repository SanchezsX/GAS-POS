import { useEffect, useRef, type FC } from 'react'

import { cn } from '@/helpers/cn'
import { PopoverProps } from '@/modals/Types'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { setPopoverIsOpen } from '@/store/slices/cartSlice'
import { useDispatch } from 'react-redux'

const Popover: FC<PopoverProps> = ({
  children,
  isOpen,
  triggerRef,
}) => {
  const popoverContentRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const popoverContent = popoverContentRef.current
      const trigger = triggerRef.current

      if (
        isOpen &&
        popoverContent &&
        trigger &&
        !trigger.contains(event.target as Node) &&
        !popoverContent.contains(event.target as Node)
      ) {
        dispatch(setPopoverIsOpen(false))
      }
    }

    document.addEventListener('click', handleClickOutside)

    const popoverContent = popoverContentRef.current
    const trigger = triggerRef.current

    if (popoverContent && trigger) {
      popoverContent.style.left =
        trigger.offsetLeft + trigger.offsetWidth + 'px'
      popoverContent.style.top =
        trigger.offsetTop -
        popoverContent.offsetHeight +
        trigger.offsetHeight +
        'px'
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    function handlePopoverContentClick(event: MouseEvent) {
      event.stopPropagation()
    }

    const popoverContent = popoverContentRef.current

    if (popoverContent) {
      popoverContent.addEventListener('mousedown', handlePopoverContentClick)
      return () => {
        popoverContent.removeEventListener(
          'mousedown',
          handlePopoverContentClick
        )
      }
    }
  }, [])

  if (isOpen)
    return createPortal(
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          id="popover-content"
          className="top-0 w-full h-svh absolute bg-black/40 backdrop-blur-[1px]"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: '0deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            transition={{ duration: 0.3 }}
            ref={popoverContentRef}
            className={cn(
              'absolute bottom-[80px] left-[20px] h-max max-h-[300px]',
              'bg-[#1C1E24] rounded-[20px] p-4 overflow-y-auto overflow-x-hidden',
              'flex flex-col'
            )}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>,
      document.body
    )
}

export default Popover
