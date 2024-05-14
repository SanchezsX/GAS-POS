import Skeleton from '@/components/Skeleton'
import cn from '@/helpers/cn'

import { CahierAcountProps } from '@/modals/Types'

const CahierAcount = ({
  cashiers,
  cashierIsLoading,
  ordersCount,
  cart,
}: CahierAcountProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-3 bg-[#606366]/20',
        ' py-[12px] pl-2  rounded-[32px] mt-[9px] mb-[18px]'
      )}
    >
      {cashierIsLoading ? (
        <Skeleton
          width="52px"
          height="52px"
        />
      ) : (
        <div className="size-[52px] overflow-hidden rounded-full">
          <img
            src={
              cashiers.self?.avatar?.includes('https://')
                ? cashiers.self?.avatar
                : `/images/Cashier1.png`
            }
            alt={cashiers.self?.first_name + ' ' + cashiers.self?.last_name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div>
        {!cashiers.self && cashierIsLoading ? (
          <>
            <Skeleton
              width="120px"
              height="27px"
              className="mb-2"
            />
            <Skeleton
              width="100px"
              height="16px"
            />
          </>
        ) : (
          <>
            <h3 className="text-[18px] font-bold">
              {cashiers.self?.first_name + ' ' + cashiers.self?.last_name}
            </h3>
            {cart.length > 0 ? (
              <p className="text-[11px] text-primary">Order in progress... </p>
            ) : (
              <p className="text-[11px] text-white/30">
                Today: {ordersCount} orders{' '}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CahierAcount
