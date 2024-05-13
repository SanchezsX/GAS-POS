

const CartTotalPaySummary = ({ totalPrice }: { totalPrice: number }) => {
  return (
    <div className="flex justify-between mb-[30px] mt-auto">
    <p className="text-[20px] font-semibold ">Total pay</p>
    <p className="text-[25px] font-semibold">$ {totalPrice}</p>
  </div>
  )
}

export default CartTotalPaySummary
