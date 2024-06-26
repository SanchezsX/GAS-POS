import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/helpers/cn'
import Icon from '@/components/Icon'
import { SectionProps } from '@/modals/Types'


const Section = ({ children, isActive, pathIcon, to }: SectionProps) => {
  return (
    <AnimatePresence>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          className={cn(
            'flex gap-3 py-[18px] pl-[20px] ',
            ' transition duration-300 rounded-[24px]',
            isActive
              ? 'text-primary bg-primary/5 hover:bg-primary/5 '
              : 'text-sideBg text-white '
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
      </motion.div>
    </AnimatePresence>
  )
}

export default Section
