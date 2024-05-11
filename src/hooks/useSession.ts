import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/supabase';


const useSession = (): Session | null | undefined => {
	const [session, setSession] = useState<Session | null | undefined>(undefined);

	async function fetch() {
		const { data, error } = await supabase.auth.getSession();
		if (error) console.log("@err", error);
		setSession(data.session)
	}

	useEffect(() => {
		fetch()
		
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			setSession(newSession)
		})

		return () => data.subscription.unsubscribe();
	}, [])

	return session;
}

export default useSession;