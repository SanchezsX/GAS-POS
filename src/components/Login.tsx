import { FormEvent, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import CustomButton from '@/components/CustomButton'
import { supabase } from '@/supabase'
import CustomInput from '@/components/CustomInput'
import cn from '@/helpers/cn'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setError] = useState('')
  const navigate = useNavigate()

  const loginCashiers = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      setError(error.message)
    } else {
      navigate('/fuel')
      getCashiers(data.user.id)
      console.log(data.user.id)
    }
  }
  const getCashiers = async (id: string) => {
    const { data, error } = await supabase
      .from('cashiers')
      .update({ on_duty: true })
      .eq('user_id', id)
    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginCashiers()
  }

  return (
    <div className="w-full h-svh absolute bg-[url('/images/bg-login.jpg')] bg-no-repeat bg-cover bg-center">
      <form
        className="flex flex-col gap-5 w-[400px] items-center mx-auto mt-[300px]"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-[30px] mb-4">take a shift</h2>
        <CustomInput
          placeholder="Email"
          isError={isError}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <CustomInput
          placeholder="Password"
          isError={isError}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />
        {isError && <h2 className="text-[#DB1057] font-semibold">{isError}</h2>}
        <CustomButton>submit</CustomButton>
      </form>
    </div>
  )
}

export default Login
