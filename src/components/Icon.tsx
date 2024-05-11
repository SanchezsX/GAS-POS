import cn from '@/helpers/cn'
import type { FC } from 'react'


interface IconProps {
  width: string
  height: string
  color?: string
  path: string
  className?: string
  onClick?: () => void
}

const Icon: FC<IconProps> = ({
  width,
  height,
  color = '#FFFFFF',
  path,
  className = '',
  onClick,
}) => {
  return (
    <div
    onClick={onClick}
      className={cn(`icon flex-shrink-0`, className, color.charAt(0) !== '#' ? color : '')}
      style={{
        maskImage: `url("/icons/${path}")`,
        backgroundColor: color.charAt(0) === '#' ? color : '',
        width,
        height,
      }}
    ></div>
  )
}

export default Icon
