-- Grant INSERT permission to anon and authenticated roles
GRANT INSERT ON public.quotes TO anon;
GRANT INSERT ON public.quotes TO authenticated;

-- Also grant usage on the sequence for quote_number
GRANT USAGE, SELECT ON SEQUENCE quotes_quote_number_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE quotes_quote_number_seq TO authenticated;