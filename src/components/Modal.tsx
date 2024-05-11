import cn from '@/helpers/cn'
import type { FC, MouseEvent, ReactNode } from 'react'

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void
  isOpen: boolean
  content: ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, content }) => {
  const handleContainerClick = (e: MouseEvent | any) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className={cn(
            'absolute top-0 left-0 w-full h-screen flex justify-center items-center',
            'z-40  bg-black/30 backdrop-blur-[20px]'
          )}
          onClick={handleContainerClick}
        >
          {content}
        </div>
      )}
    </>
  )
}

export default Modal
