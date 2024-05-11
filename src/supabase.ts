import { createClient } from '@supabase/supabase-js'

const URL = 'https://algbhmfsgderfplxubyo.supabase.co'
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZ2JobWZzZ2RlcmZwbHh1YnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwNjM5NjUsImV4cCI6MjAyNzYzOTk2NX0.j4N5v9_FkTvQxDlPSw0nruzjw1f7fc01AOZNPFXpE-o'

export const supabase = createClient(URL, KEY!);