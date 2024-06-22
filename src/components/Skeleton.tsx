import { cn } from "@/helpers/cn"
import { SearchProps } from "@/modals/Types"


const Skeleton = ({ width, height, className = '' }: SearchProps) => {
  return (
    <div
      style={{
        width,
        height,
      }}
      className={cn(className, 'bg-white/10 rounded-full animate-pulse')}
    ></div>
  )
}

export default Skeleton
