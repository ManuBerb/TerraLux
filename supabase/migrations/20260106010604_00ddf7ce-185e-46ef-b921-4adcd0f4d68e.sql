-- Create the quotes storage bucket for image uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('quotes', 'quotes', true);

-- Allow anonymous users to upload files to the quotes bucket
CREATE POLICY "Allow public uploads to quotes bucket"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'quotes');

-- Allow public read access for email viewing
CREATE POLICY "Allow public read access to quotes bucket"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'quotes');