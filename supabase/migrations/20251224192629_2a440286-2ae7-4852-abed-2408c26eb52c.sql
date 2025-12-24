-- Add a sequential quote_number for human-readable reference
ALTER TABLE public.quotes 
ADD COLUMN quote_number SERIAL;

-- Create an index for faster lookups by quote_number
CREATE INDEX idx_quotes_quote_number ON public.quotes(quote_number);