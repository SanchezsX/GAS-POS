import cn from '@/helpers/cn'
import { Dispatch, SetStateAction, useEffect, useRef, type FC } from 'react'
import { createPortal } from 'react-dom'

interface PopoverProps {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  triggerRef: React.RefObject<HTMLButtonElement>
}

const Popover: FC<PopoverProps> = ({
  children,
  isOpen,
  setIsOpen,
  triggerRef,
}) => {
  const popoverContentRef = useRef<HTMLDivElement>(null)

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
        setIsOpen(false)
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
      <div
        id="popover-content"
        className="top-0 w-full h-svh absolute bg-black/40 backdrop-blur-[1px]"
      >
        <div
          ref={popoverContentRef}
          className={cn(
            'absolute bottom-[80px] left-[20px] h-max max-h-[300px]',
            'bg-[#1C1E24] rounded-[20px]  p-4 overflow-y-auto overflow-x-hidden',
            'flex flex-col'
          )}
        >
          {children}
        </div>
      </div>,
      document.body
    )
}

export default Popover
