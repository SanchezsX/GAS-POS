import { cn } from '@/helpers/cn'
import Icon from '@/components/Icon'

interface CartCounterProps {
  data: any
  increment: any
  decrement: any
}

const CartCounter = ({ data, increment, decrement }: CartCounterProps) => {
  return (
    <div
      className={cn(
        'w-[130px] px-[15px] py-[8px] mt-3',
        'rounded-[20px] border-solid border-2 border-[#ffff]/5',
        'bg-[#ffff]/5 flex items-center justify-between'
      )}
    >
      <Icon
        width="20px"
        height="20px"
        path="minus.svg"
        className="cursor-pointer"
        onClick={() => decrement(data.good_id)}
      />
      <p>
        {data.goods.type === 1 && (
          <span className="opacity-40 mr-[5px]">V:</span>
        )}
        {data.quantity}
      </p>
      <Icon
        width="18px"
        height="18px"
        path="plus.svg"
        className="cursor-pointer "
        onClick={() => increment(data.good_id)}
      />
    </div>
  )
}

export default CartCounter
