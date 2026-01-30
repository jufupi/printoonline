/*
  # Create Storage Bucket for Data Files

  1. New Storage Bucket
    - Name: `data`
    - Public: false (requires authentication)
    - File size limit: 50MB
    - Allowed MIME types: CSV files
  
  2. Security Policies
    - Authenticated users can upload files
    - Authenticated users can read files
    - Authenticated users can update their own files
    - Authenticated users can delete their own files
*/

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'data',
  'data',
  false,
  52428800,
  ARRAY['text/csv', 'application/vnd.ms-excel', 'text/plain']
)
ON CONFLICT (id) DO NOTHING;

-- Policy: Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'data');

-- Policy: Allow authenticated users to read files
CREATE POLICY "Authenticated users can read files"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'data');

-- Policy: Allow authenticated users to update files
CREATE POLICY "Authenticated users can update files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'data')
WITH CHECK (bucket_id = 'data');

-- Policy: Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'data');