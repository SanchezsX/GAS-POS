import { iconToColorMap } from '@/data/Data'

import { ProductCardSetBgProps } from '@/modals/Types'
import Icon from '../Icon'
import { cn } from '@/helpers/cn'

const ProductCardSetBg = ({
  data,
  isSelected,
  create,
}: ProductCardSetBgProps) => {
  return (
    <div
      className={cn(
        isSelected ? `${iconToColorMap[data.icon]}` : '',
        'p-[11px] rounded-[45px] transition duration-500',
        'cursor-pointer',
        'max-2xl:p-[8px]'
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
            width=""
            height=""
            className={cn('max-2xl:size-[80px]', 'size-[100px]')}
          />
        ) : (
          <span
            className={cn(
              'max-2xl:text-[110px] max-[1654px]:text-[140px] ',
              'text-[180px] text-[#06090F] font-bold absolute -right-[25px] tracking-[-0.04em] '
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
