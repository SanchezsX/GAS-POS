import { iconToColorMap } from '@/data/Data'
import cn from '@/helpers/cn'
import { ProductCardSetBgProps } from '@/modals/Types'
import Icon from '../Icon'

const ProductCardSetBg = ({
  data,
  create,
  isSelected,
}: ProductCardSetBgProps) => {
  return (
    <div
      className={cn(
        isSelected ? `${iconToColorMap[data.icon]}/20` : '',
        'p-[11px] rounded-[45px] transition duration-500',
        'cursor-pointer'
      )}
      onClick={() => create(data)}
    >
      <div
        className={cn(
          'max-2xl:h-[150px]',
          'relative w-full h-[190px] rounded-[40px] overflow-hidden ',
          'flex items-center justify-center'
        )}
        style={{ backgroundColor: data.color }}
      >
        {data.icon.startsWith('/') ? (
          <Icon
            path={data.icon}
            width="100px"
            height="100px"
          />
        ) : (
          <span
            className={cn(
              'max-2xl:text-[110px] ',
              'text-[180px] text-[#06090F] font-bold absolute -right-[25px]'
            )}
          >
            {data.icon}
          </span>
        )}
      </div>
    </div>
  )
}

export default ProductCardSetBg
