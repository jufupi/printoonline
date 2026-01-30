/*
  # Create external ratings table

  1. New Tables
    - `valoraciones_imprentas`
      - `id` (bigint, primary key, auto-increment)
      - `imprenta` (text, not null) - Name of the printing company
      - `rating` (numeric(3,2), not null) - Rating score (e.g., 4.6)
      - `fuente` (text, not null) - Rating source (e.g., Trustpilot, Trusted Shops)
      - `url` (text, not null) - URL to the review page
      - `created_at` (timestamptz, default now())
      - Unique constraint on imprenta name

  2. Security
    - Enable RLS on `valoraciones_imprentas` table
    - Add policy for public read access (ratings are public information)
*/

CREATE TABLE IF NOT EXISTS valoraciones_imprentas (
  id bigserial PRIMARY KEY,
  imprenta text NOT NULL UNIQUE,
  rating numeric(3,2) NOT NULL CHECK (rating >= 0 AND rating <= 5),
  fuente text NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE valoraciones_imprentas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read ratings"
  ON valoraciones_imprentas
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert ratings"
  ON valoraciones_imprentas
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update ratings"
  ON valoraciones_imprentas
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster lookups by imprenta name
CREATE INDEX IF NOT EXISTS idx_valoraciones_imprenta ON valoraciones_imprentas(imprenta);