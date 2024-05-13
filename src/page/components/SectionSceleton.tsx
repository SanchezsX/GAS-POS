import Skeleton from "@/components/Skeleton"

const SectionSceleton = ({ i }: { i: number }) => {
  return (
    <div
      key={i}
      className="flex flex-col gap-8"
    >
      <Skeleton
        className="rounded-3xl"
        width="100%"
        height="190px"
      />
      <Skeleton
        className="rounded-xl"
        width="100%"
        height="24px"
      />
      <div className="flex items-center gap-5">
        <Skeleton
          className="rounded-xl"
          width="100%"
          height="30px"
        />
        <Skeleton
          className="rounded-xl"
          width="100%"
          height="40px"
        />
      </div>
    </div>
  )
}

export default SectionSceleton
