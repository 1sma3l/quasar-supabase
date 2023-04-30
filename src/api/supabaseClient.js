import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://rvwsoiwutlwnqbcvgizf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2d3NvaXd1dGx3bnFiY3ZnaXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2Mzg3MzAsImV4cCI6MTk5ODIxNDczMH0.CE4GFq9emoB_ZYiElM0w4UzQQ1CHcxoQDcgAbbP_u3s"
);
