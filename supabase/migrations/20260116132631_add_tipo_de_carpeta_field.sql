/*
  # Add tipo_de_carpeta field to productos_imprentas table

  1. Changes
    - Add `tipo_de_carpeta` column (text, nullable) to `productos_imprentas` table
      - This field distinguishes between "Con solapas" and "Sin solapas" for Carpetas product
      - Required only for Carpetas products, null for other products
    
  2. Index
    - Create index on `tipo_de_carpeta` for better query performance when filtering Carpetas
  
  3. Notes
    - This field ensures that comparisons only show homogeneous results
    - Prevents mixing "Carpetas con solapas" with "Carpetas sin solapas" in results
*/

-- Add the tipo_de_carpeta column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'productos_imprentas' AND column_name = 'tipo_de_carpeta'
  ) THEN
    ALTER TABLE productos_imprentas ADD COLUMN tipo_de_carpeta text;
  END IF;
END $$;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_productos_tipo_carpeta ON productos_imprentas(tipo_de_carpeta) WHERE tipo_de_carpeta IS NOT NULL;