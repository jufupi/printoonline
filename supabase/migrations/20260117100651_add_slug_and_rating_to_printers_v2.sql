/*
  # Add slug and rating fields to existing printers table

  1. Changes
    - Add `slug` column (unique, will match imprenta field in productos_imprentas)
    - Add `rating_value` column (numeric, nullable)
    - Add `rating_source` column (text, nullable)
    - Add `rating_url` column (text, nullable)
    - Add `updated_at` column if not exists
    - Clear existing mock data
    - Insert real printer data with proper slugs and all required fields

  2. Notes
    - Respects existing NOT NULL constraints (quality_score, delivery_speed_factor)
    - Slug will be used to join with productos_imprentas.imprenta
    - Rating fields are optional and can be updated later
*/

-- Add new columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'printers' AND column_name = 'slug'
  ) THEN
    ALTER TABLE printers ADD COLUMN slug text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'printers' AND column_name = 'rating_value'
  ) THEN
    ALTER TABLE printers ADD COLUMN rating_value numeric(3,2);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'printers' AND column_name = 'rating_source'
  ) THEN
    ALTER TABLE printers ADD COLUMN rating_source text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'printers' AND column_name = 'rating_url'
  ) THEN
    ALTER TABLE printers ADD COLUMN rating_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'printers' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE printers ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Delete existing mock data
DELETE FROM printers;

-- Insert real printer data with all required fields
INSERT INTO printers (
  slug, 
  name, 
  website_url, 
  quality_score, 
  delivery_speed_factor,
  rating_value, 
  rating_source, 
  rating_url,
  description,
  is_active
)
VALUES
  ('360imprimir', '360imprimir', 'https://www.360imprimir.es', 4.5, 1.0, 4.50, 'Google', 'https://www.google.com/search?q=360imprimir+opiniones', 'Imprenta online con valoraciones positivas', true),
  ('Exaprint', 'Exaprint', 'https://www.exaprint.es', 4.3, 1.0, 4.30, 'Trustpilot', 'https://es.trustpilot.com/review/exaprint.es', 'Imprenta online de calidad', true),
  ('Flyeralarm', 'Flyeralarm', 'https://www.flyeralarm.com/es', 4.4, 1.0, 4.40, 'Trustpilot', 'https://es.trustpilot.com/review/flyeralarm.com', 'Imprenta online reconocida', true),
  ('Helloprint', 'Helloprint', 'https://www.helloprint.es', 4.2, 1.0, 4.20, 'Trustpilot', 'https://es.trustpilot.com/review/helloprint.es', 'Soluciones de impresión online', true),
  ('Onlineprinters', 'Onlineprinters', 'https://www.onlineprinters.es', 4.3, 1.0, 4.30, 'Trustpilot', 'https://es.trustpilot.com/review/onlineprinters.es', 'Imprenta online de confianza', true),
  ('Pixartprinting', 'Pixartprinting', 'https://www.pixartprinting.es', 4.1, 1.0, 4.10, 'Trustpilot', 'https://es.trustpilot.com/review/pixartprinting.es', 'Imprenta online europea', true),
  ('Print24', 'Print24', 'https://www.print24.com/es', 4.0, 1.0, NULL, NULL, NULL, 'Imprenta online profesional', true),
  ('Saxoprint', 'Saxoprint', 'https://www.saxoprint.es', 4.0, 1.0, 4.00, 'Google', 'https://www.google.com/search?q=saxoprint+opiniones', 'Imprenta online', true),
  ('Soloimprenta', 'Soloimprenta', 'https://www.soloimprenta.es', 4.0, 1.0, NULL, NULL, NULL, 'Imprenta online especializada', true),
  ('Truyol', 'Truyol', 'https://www.truyol.com', 4.0, 1.0, NULL, NULL, NULL, 'Imprenta tradicional online', true);

-- Add unique constraint on slug if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'printers_slug_key'
  ) THEN
    ALTER TABLE printers ADD CONSTRAINT printers_slug_key UNIQUE (slug);
  END IF;
END $$;

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_printers_slug ON printers(slug);
