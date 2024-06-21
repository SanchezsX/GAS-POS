
import { cn } from '@/helpers/cn'
import { setPopoverIsOpen } from '@/store/cartSlice'
import { useDispatch } from 'react-redux'
interface CashierModalProps {
  setPopoverIsOpen: (isOpen: boolean) => void
  popoverTriggerRef: React.RefObject<HTMLButtonElement>
}

const CashierModal = ({
  // setPopoverIsOpen,
  popoverTriggerRef,
}: CashierModalProps) => {

  const dispatch = useDispatch()
  return (
      <button
        ref={popoverTriggerRef}
        onClick={() => dispatch(setPopoverIsOpen(true))}
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
