import { useEffect, useState } from 'react'

import { toast } from 'sonner'
import { useLocation } from 'react-router-dom'
import { supabase } from '@/supabase'
import { Data } from '@/modals/Types'
import SupaError from '@/modals/Error'
import useFetching from '@/hooks/useFetching'
import SectionSceleton from './components/SectionSceleton'
import ProductCard from '@/components/ProductCard/ProductCard'


function Drinks() {
  const [goods, setGoods] = useState<Data[]>([] as Data[])
  const [error, setError] = useState<SupaError>(null)

  const location = useLocation()
  const value = location.search.split('=')[1]

  const [fetching, isLoading] = useFetching()

  useEffect(() => {
    if (!value) {
      fetching(async () => {
        const { data, error } = await supabase
          .from('goods')
          .select()
          .eq('type', 3)

        if (error) {
          setError(error)
          toast.error(error.message)
          return
        }

        setGoods(data as Data[])
      })
    }

    if (value) {
      fetching(async () => {
        const { data, error } = await supabase
          .from('goods')
          .select()
          .eq('type', 3)
          .ilike('title', `%${value}%`)

        if (error) {
          setError(error)
          toast.error(error.message)
          return
        }

        setGoods(data as Data[])
        console.log(value)
      })
    }
  }, [location.search])

  return (
    <>
      {error ? (
        <div>{error.message}</div>
      ) : isLoading ? (
        [...Array(8)].map((_, i) => <SectionSceleton i={i} />)
      ) : (
        goods.map((data) => (
          <ProductCard
            key={data.good_id}
            data={data}
          />
        ))
      )}
    </>
  )
}

export default Drinks
