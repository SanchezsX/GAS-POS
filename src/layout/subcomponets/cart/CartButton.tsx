import CustomButton from '@/components/CustomButton'
import Icon from '@/components/Icon'
import cn from '@/helpers/cn'
import { CartButtonProps } from '@/modals/Types'

const CartButton = ({
  handleClick,
  payWithDiscount,
  isClicked,
}: CartButtonProps) => {
  return (
    <div className="flex gap-3 mt-auto">
      <CustomButton
        onClick={handleClick}
        className="rounded-[30px] w-[20%] justify-center flex items-center bg-white/5 "
      >
        <Icon
          path="refresh.svg"
          width="22px"
          height="22px"
          className={cn(
            isClicked ? '-rotate-[360deg] transition duration-700' : 'rotate-0'
          )}
        />
      </CustomButton>
      <CustomButton onClick={() => payWithDiscount()}>Pay</CustomButton>
    </div>
  )
}

export default CartButton
