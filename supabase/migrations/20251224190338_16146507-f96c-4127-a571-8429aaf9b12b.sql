-- Drop existing table and recreate with correct schema
DROP TABLE IF EXISTS public.quotes;

CREATE TABLE public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_requested TEXT NOT NULL,
  address_or_neighborhood TEXT NULL,
  preferred_contact_method TEXT NULL,
  property_type TEXT NULL,
  additional_details TEXT NULL,
  extra JSONB NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a quote (public form)
CREATE POLICY "Anyone can submit a quote"
ON public.quotes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);