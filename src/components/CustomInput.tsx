import { useState } from 'react'
import { CustomInputProps } from '@/modals/Types'

import Icon from '@/components/Icon'
import cn from '@/helpers/cn'

const CustomInput = ({
  className = '',
  value,
  isError,
  placeholder,
  type,
  icon,
  isFocus,
  onBlur,
  onChange,
  onFocus,
}: CustomInputProps) => {
  const [isHidden, setIsHidden] = useState(false)

  return (
    <div className="relative flex items-center">
      {icon && (
        <Icon
          className={cn(
            isFocus ? 'opacity-50 ' : 'opacity-100',
            'absolute left-5 transition duration-300'
          )}
          width="20px"
          height="20px"
          path={icon}
        />
      )}

      <input
        className={cn(
          className,
          isError
            ? 'border-solid border-[2px] border-[#DB1057]'
            : 'focus:outline-2 focus:outline-primary',
          ' disabled:bg-red-500 ',
          'pl-[25px] p-[20px] bg-[#FBF8F1]/15 rounded-[28px] outline-none ',
          icon ? 'pl-[50px]' : ''
        )}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        type={isHidden ? 'text' : type}
      />
      {type === 'password' && (
        <button
          type="button"
          className="absolute right-6"
          onClick={() => setIsHidden((prev) => !prev)}
        >
          <Icon
            path={!isHidden ? 'eye-slash.svg' : 'eye.svg'}
            width="20px"
            height="20px"
          />
        </button>
      )}
    </div>
  )
}

export default CustomInput
