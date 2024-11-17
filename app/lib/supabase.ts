import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qjpixxrqpyrblsfhbzoq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqcGl4eHJxcHlyYmxzZmhiem9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3MDE0OTYsImV4cCI6MjA0NzI3NzQ5Nn0.hqFAq1yld677BSrtbDowpoM_ZwgWPSCT8GOMCeRYFCE';

export const supabase = createClient(supabaseUrl, supabaseKey); 