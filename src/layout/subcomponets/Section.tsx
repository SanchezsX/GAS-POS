import { ReactNode } from 'react'

import { Link } from 'react-router-dom'
import cn from '@/helpers/cn'
import Icon from '@/components/Icon'

interface SectionProps {
  isActive: boolean
  children: ReactNode
  pathIcon: string
  to: string
  
}

const Section = ({ children, isActive, pathIcon, to }: SectionProps) => {
  return (
    <>
      <Link
        className={cn(
          'flex gap-3 py-[18px] pl-[20px] rounded-[24px]',
          'hover:bg-white/5 transition duration-300',
          isActive
            ? 'text-primary bg-primary/5 hover:bg-primary/5'
            : 'text-sideBg text-white'
        )}
        to={to}
      >
        <Icon
          width="24px"
          height="24px"
          path={pathIcon}
          color={isActive ? 'bg-primary' : 'bg-white'}
        />
        {children}
      </Link>
    </>
  )
}

export default Section
