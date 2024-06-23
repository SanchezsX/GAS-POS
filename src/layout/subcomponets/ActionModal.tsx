import { type FC, type FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setModalIsOpen } from '@/store/slices/cartSlice'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase } from '@/supabase'
import { toast } from 'sonner'
import { ActionModalPropsCart } from '@/modals/Types'

import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import useFetching from '@/hooks/useFetching'
import SupaError from '@/modals/Error'
import Skeleton from '@/components/Skeleton'
interface Error {
  login: SupaError
  logout: SupaError
}

const ActionModal: FC<ActionModalPropsCart> = ({ userId, email }) => {
  const [error, setError] = useState<Error>({} as Error)
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if (error.login) navigate('/GAS-POS/login')
  }, [error.login])

  const [loginFetching, _] = useFetching()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    loginFetching(async () => {
      const { data: email } = await supabase
        .from('cashiers')
        .select('email')
        .eq('user_id', userId)

      const { error } = await supabase.auth.signInWithPassword({
        email: email?.[0].email,
        password: password,
      })

      if (error) {
        setError((prev) => ({ ...prev, login: error }))
        toast.error(error.message, {
          style: {
            background: '#1C1E24',
            color: '#D97B7B',
          },
        })

        return
      }

      dispatch(setModalIsOpen(false))
      toast.success('You are change an account!', {
        style: {
          background: '#1C1E24',
          color: '#60BC94',
        },
      })
    })
  }

  const [logoutFetching, __] = useFetching()

  function logout() {
    logoutFetching(async () => {
      const { error } = await supabase
        .from('cashiers')
        .update({ on_duty: false })
        .eq('user_id', userId)

      if (error) {
        setError((prev) => ({ ...prev, logout: error }))
        toast.error(error.message, {
          style: {
            background: '#1C1E24',
            color: '#D97B7B',
          },
        })

        return
      }

      dispatch(setModalIsOpen(false))
      toast.success("You're off shift!", {
        style: {
          background: '#1C1E24',
          color: '#60BC94',
        },
      })
    })
  }

  return (
    <AnimatePresence>
      <motion.div
        key="modalAction"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#181924]/90 w-[550px] h-[450px] flex flex-col justify-center rounded-[50px] "
      >
        <div className="mx-auto flex flex-col gap-4 ">
          <h2 className="ml-1 mb-4 text-[30px] font-semibold text-">
            Enter the password
          </h2>
          {!email ? (
            <Skeleton
              className="!bg-primary/10"
              width="200px"
              height="25px"
            />
          ) : (
            <h4 className="text-primary font-semibold tracking-[1px] ml-1">
              {email}
            </h4>
          )}
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <CustomInput
              className="w-[400px]"
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              required
            />
            <CustomButton className="bg-primary hover:bg-primary/80 text-black">
              Submit
            </CustomButton>
          </form>
          <CustomButton
            className="bg-transparent hover:bg-[#DB1057]/20 text-[#DB1057] w-[150px] mx-auto"
            onClick={logout}
          >
            log out
          </CustomButton>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ActionModal
