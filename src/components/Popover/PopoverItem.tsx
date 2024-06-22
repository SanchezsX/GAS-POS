import { FC } from 'react'
import Icon from '@/components/Icon'
import { PopoverItemProps } from '@/modals/Types'



const PopoverItem: FC<PopoverItemProps> = ({ icon, title, onClick }) => {
  
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-[10px] first:mt-0 mt-3"
    >
      <Icon
        path={icon}
        width="20px"
        height="20px"
      />
      <p className="text-[18px] font-semibold">{title}</p>
    </button>
  )
}

export default PopoverItem
