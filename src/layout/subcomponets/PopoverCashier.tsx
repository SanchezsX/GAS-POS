import { PopoverCashierProps } from '@/modals/Types'
import { FC } from 'react'



const PopoverCashier: FC<PopoverCashierProps> = ({
  avatar,
  title,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-[10px] first:mt-0 mt-3"
    >
      <div className=" flex-shrink-0 flex justify-center items-center ">
        <img
          src={avatar}
          className="w-[50px] h-[50px] rounded-full object-cover"
          alt=""
        />
      </div>
      <p className="text-[18px] font-semibold">{title}</p>
    </button>
  )
}

export default PopoverCashier
