import { useEffect, useState } from 'react';

import { Cashier } from '@/modals/Types';
import { supabase } from '@/supabase';
import { Session } from '@supabase/supabase-js';

export const useAuth = () => {
	const [session, setSession] = useState<Session | null>(null);
	const [cashier, setCashier] = useState<Cashier | null>(null);

	async function gets() {
	try {
		const { data: { session } } = await supabase.auth.getSession();
		const { data } = await supabase
			.from('cashiers')
			.select()
			.eq('user_id', session?.user.id);

		setSession(session);
		setCashier(data?.[0]);
	}catch (error) {
		console.error(error);
	}	
	}

	useEffect(() => {
		gets();
	}, [localStorage.getItem('sb-algbhmfsgderfplxubyo-auth-token')]);

	return { session, cashier };
};