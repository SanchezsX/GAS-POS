import cn from "@/helpers/cn"
interface SearchProps {
  width: string
  height: string
  className?: string
}
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
