-- Drop existing INSERT policy if it exists
DROP POLICY IF EXISTS "Anyone can submit a quote" ON public.quotes;

-- Create a new policy that allows anyone (including anonymous users) to insert quotes
CREATE POLICY "Allow anonymous quote submissions"
ON public.quotes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);