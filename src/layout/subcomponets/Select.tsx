import Icon from '@/components/Icon'
import cn from '@/helpers/cn'
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
interface Option {
  value: string
  label: string
  link: string
}

const OPTIONS: Option[] = [
  { value: 'Cash', label: 'Cash', link: 'dolar.svg' },
  { value: 'Debit Card', label: 'Debit Card', link: 'ion_card.svg' },
  { value: 'E-Wallet', label: 'E-Wallet', link: 'qr.svg' },
]

const Select: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<Option>(OPTIONS[0])
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (value: Option) => {
    setSelectedValue(value)
    setIsOpen(false)
  }

  return (
    <div
      ref={selectRef}
      className={className}
    >
      <button onClick={handleToggle}>
        {(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
              'bg-[#606366]/20 rounded-[20px] flex items-center cursor-pointer w-[163px]',
              'py-[12px] px-[12px] gap-2 text-[14px] font-semibold',
              ' max-2xl:w-[130px]'
            )}
          >
            <Icon
              width="22px"
              height="22px"
              path={selectedValue?.link as string}
            />
            {selectedValue?.label}
            <div
              className={cn(
                'ml-auto transition',
                isOpen ? 'rotate-180' : 'rotate-0'
              )}
            >
              <Icon
                width="12px"
                height="15px"
                path="arrow.svg"
              />
            </div>
          </motion.div>
        ) || (
          <div
            className={cn(
              'bg-[#606366]/20 rounded-[20px] flex items-center cursor-pointer',
              'py-[12px] px-[12px] gap-2 text-[14px] font-semibold'
            )}
          >
            <Icon
              width="22px"
              height="22px"
              path="dolar.svg"
            />
            Cash
            <div className="ml-auto">
              <Icon
                width="13px"
                height="10px"
                path="arrow.svg"
              />
            </div>
          </div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0,  }}
            animate={{ opacity: 1,}}
            exit={{ opacity: 0,  }}            
            transition={{ duration: 0.3, }}

            className={cn(
              'bg-[#272B2F] flex flex-col justify-between rounded-[20px] transition z-10',
              'w-[163px] h-[130px] mt-2 text-[14px] font-semibold py-[16px] absolute',
              'max-2xl:w-[130px]'
            )}
          >
            {OPTIONS.map((option) => (
              <div
                onClick={() => handleSelect(option)}
                key={option.value}
                className={
                  option.value === selectedValue.value
                    ? 'bg-[#333439]'
                    : 'bg-transparent'
                }
              >
                <p className="flex gap-3 ml-[4px] pl-[16px] py-1 cursor-pointer">
                  <Icon
                    width="22px"
                    height="22px"
                    path={option.link}
                  />
                  {option.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Select
