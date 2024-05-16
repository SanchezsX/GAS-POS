import CustomInput from '@/components/CustomInput'
import Icon from '@/components/Icon'
import { CartInputProps } from '@/modals/Types'

const CartInput = ({
  submitDiscount,
  discountValue,
  setDiscountValue,
  setIsDiscountActive,
}: CartInputProps) => {
  return (
    <div className="relative flex w-[220px] items-center font-semibold">
      <form onSubmit={submitDiscount}>
        <CustomInput
          className=" w-full pr-12 py-[14px]"
          value={discountValue}
          onChange={(e) => setDiscountValue(e.target.value)}
        />
      </form>
      <button
        className="absolute right-2 px-3"
        onClick={() => setIsDiscountActive(false)}
      >
        <Icon
          className="rotate-45"
          width="14px"
          height="14px"
          path="/plus.svg"
        />
      </button>
    </div>
  )
}

export default CartInput
