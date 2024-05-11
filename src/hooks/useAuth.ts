import { Cashier } from '@/layout/subcomponets/Cashier';
import { supabase } from '@/supabase';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export const useAuth = () => {
	const [session, setSession] = useState<Session | null>(null);
	const [cashier, setCashier] = useState<Cashier | null>(null);


	async function gets() {
		const { data: { session } } = await supabase.auth.getSession();
		const { data } = await supabase
			.from('cashiers')
			.select()
			.eq('user_id', session?.user.id);

		setSession(session);
		setCashier(data?.[0]);
	}

	useEffect(() => {
		gets();
	}, [localStorage.getItem('sb-algbhmfsgderfplxubyo-auth-token')]);

	return { session, cashier };
};