import { FormEvent, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'
import { supabase } from '@/supabase'
import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { toast } from 'sonner'

const Login = () => {
  const [email, setEmail] = useState('bilysana7@gmail.com')
  const [password, setPassword] = useState('sashacashier')
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
      navigate('/GAS-POS/fuel')
      getCashiers(data.user.id)
      toast.success(
        'You are change an account!, if producs not found, please reload the page'
      )
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full h-svh absolute bg-[url('/images/bg-login.jpg')] bg-no-repeat bg-cover bg-center"
      >
        <form
          className="flex flex-col gap-5 w-[400px] items-center mx-auto mt-[300px]"
          onSubmit={handleSubmit}
        >
          <h2 className="font-bold text-[30px] mb-4">take a shift</h2>
          <CustomInput
            className="w-[42vh]"
            placeholder="Email"
            isError={isError}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <CustomInput
            className="w-[42vh]"
            placeholder="Password"
            isError={isError}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          {isError && (
            <h2 className="text-[#DB1057] font-semibold">{isError}</h2>
          )}
          <CustomButton>submit</CustomButton>
        </form>
      </motion.div>
    </AnimatePresence>
  )
}

export default Login
