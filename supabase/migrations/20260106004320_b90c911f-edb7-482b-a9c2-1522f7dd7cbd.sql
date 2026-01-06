-- Drop any existing insert policies to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous quote submissions" ON public.quotes;
DROP POLICY IF EXISTS "Anyone can submit a quote" ON public.quotes;
DROP POLICY IF EXISTS "public_insert_quotes" ON public.quotes;

-- Create scoped INSERT policy for anon and authenticated only
CREATE POLICY "Allow quote submissions"
ON public.quotes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Grant INSERT permission to anon and authenticated roles
GRANT INSERT ON public.quotes TO anon;
GRANT INSERT ON public.quotes TO authenticated;

-- Grant sequence permissions for quote_number auto-increment
GRANT USAGE, SELECT ON SEQUENCE quotes_quote_number_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE quotes_quote_number_seq TO authenticated;