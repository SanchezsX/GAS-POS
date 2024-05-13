import { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'
import { supabase } from '@/supabase'
import SupaError from '@/modals/Error'
import { toast } from 'sonner'
import useFetching from '@/hooks/useFetching'
import SectionSceleton from './components/SectionSceleton'
import ProductCard from '@/components/ProductCard/ProductCard'


interface Data {
  good_id: number
  title: string
  price: number
  color: string
  type: number
  quantity: number
  icon: string
}

function Main() {
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
          .eq('type', 1)

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
          .eq('type', 1)
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
        [...Array(8)].map((_, i) => (
          <SectionSceleton i={i} />
        ))
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

export default Main
