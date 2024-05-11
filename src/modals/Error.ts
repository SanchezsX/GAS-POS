import { AuthError, PostgrestError } from '@supabase/supabase-js';

type SupaError = PostgrestError | AuthError | null;

export default SupaError;