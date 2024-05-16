import { Dispatch, SetStateAction } from 'react'
import { cn } from '@/helpers/cn'


interface CashierModalProps {
  setPopoverIsOpen: Dispatch<SetStateAction<boolean>>
  popoverTriggerRef: React.RefObject<HTMLButtonElement>
}

const CashierModal = ({
  setPopoverIsOpen,
  popoverTriggerRef,
}: CashierModalProps) => {
  return (
      <button

        ref={popoverTriggerRef}
        onClick={() => setPopoverIsOpen(true)}
        className={cn(
          'bg-[#606366]/20 rounded-[32px] w-[30px] h-[50px] gap-[3px]',
          'flex flex-col justify-center items-center',
          'hover:bg-[#606366]/30 transition duration-300 '
        )}
      >
        <div className="w-[4px] h-[4px] rounded-full bg-white"></div>
        <div className="w-[4px] h-[4px] rounded-full bg-white"></div>
        <div className="w-[4px] h-[4px] rounded-full bg-white"></div>
      </button>

  )
}

export default CashierModal
