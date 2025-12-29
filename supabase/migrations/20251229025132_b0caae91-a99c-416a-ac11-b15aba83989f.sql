-- Drop the existing RESTRICTIVE policy
DROP POLICY IF EXISTS "Anyone can submit a quote" ON public.quotes;

-- Create a new PERMISSIVE INSERT policy for anonymous and authenticated users
CREATE POLICY "Anyone can submit a quote" 
ON public.quotes 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);