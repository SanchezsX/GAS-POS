import cn from '@/helpers/cn'

interface CartButtonDiscountProps {
  setIsDiscountActive: React.Dispatch<React.SetStateAction<boolean>>
}
const CartButtonDiscount = ({
  setIsDiscountActive,
}: CartButtonDiscountProps) => {
  return (
    <button
      className={cn(
        'text-[#EDB055] text-[17px] bg-[#EDB055]/5 py-[14px] px-[11px] rounded-[20px]',
        'hover:bg-[#EDB055]/10 transition'
      )}
      onClick={() => setIsDiscountActive(true)}
    >
      Add discount card
    </button>
  )
}

export default CartButtonDiscount
