import { supabase } from "@/supabase"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
const useRedirectSession = async () => {
  const navigate = useNavigate()

  const { data, error } = await supabase.auth.getSession()

  if (error) console.log(error);

  useEffect(() => {
    if (data.session === null) navigate('/login')
  }, [data.session])
}

export default useRedirectSession
