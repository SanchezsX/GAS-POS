import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import { cn } from '@/helpers/cn'


interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

const CustomButton: FC<CustomButtonProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={cn(
        className,
        'font-semibold text-[18px] transition duration-300',
        'w-full bg-primary py-[14px] rounded-[30px]',
        'not:disabled:hover:bg-opacity-80 outline-offset-2 focus:outline-2 focus:outline-primary ',
        'disabled:bg-gray-500 hover:bg-opacity-80'
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default CustomButton
