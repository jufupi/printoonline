/*
  # Create contact rate limiting table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier
      - `email` (text) - Email from the form submission
      - `ip_address` (text) - IP address of the requester
      - `submitted_at` (timestamptz) - Timestamp of submission
      - `created_at` (timestamptz) - Record creation timestamp
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - No public access policies (server-side only)
  
  3. Indexes
    - Index on email and submitted_at for efficient rate limit queries
    - Index on ip_address and submitted_at for IP-based rate limiting
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  ip_address text,
  submitted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create indexes for efficient rate limit queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email_time 
  ON contact_submissions(email, submitted_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_ip_time 
  ON contact_submissions(ip_address, submitted_at DESC);

-- No public policies - this table is accessed server-side only via service role