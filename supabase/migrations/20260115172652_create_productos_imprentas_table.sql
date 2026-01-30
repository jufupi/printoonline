/*
  # Crear tabla de productos de imprentas

  1. Nueva Tabla
    - `productos_imprentas`
      - `id` (text, primary key) - ID único del producto
      - `categoria` (text) - Categoría del producto (Tarjetas, Hojas, etc.)
      - `producto` (text) - Nombre del producto
      - `formato_mm` (text) - Formato en milímetros
      - `papel` (text) - Tipo de papel
      - `gramaje_g` (text) - Gramaje del papel
      - `acabado` (text) - Tipo de acabado
      - `cantidad` (integer) - Cantidad de unidades
      - `imprenta` (text) - Nombre de la imprenta
      - `gama` (text) - Gama del producto (básico/premium)
      - `precio_producto` (numeric) - Precio del producto sin envío
      - `precio_envio` (numeric) - Precio del envío
      - `precio_total_sin_iva` (numeric) - Precio total sin IVA
      - `precio_total_con_iva` (numeric) - Precio total con IVA
      - `precio_principal` (numeric) - Precio principal de referencia
      - `plazo_min_dias` (integer) - Plazo mínimo de entrega en días
      - `plazo_max_dias` (integer) - Plazo máximo de entrega en días
      - `disponible` (boolean) - Si el producto está disponible
      - `observaciones` (text) - Observaciones adicionales
      - `created_at` (timestamptz) - Fecha de creación

  2. Security
    - Enable RLS on `productos_imprentas` table
    - Add policy for public read access (comparison data)
*/

CREATE TABLE IF NOT EXISTS productos_imprentas (
  id text PRIMARY KEY,
  categoria text NOT NULL,
  producto text NOT NULL,
  formato_mm text,
  papel text,
  gramaje_g text,
  acabado text,
  cantidad integer NOT NULL,
  imprenta text NOT NULL,
  gama text,
  precio_producto numeric,
  precio_envio numeric,
  precio_total_sin_iva numeric,
  precio_total_con_iva numeric,
  precio_principal numeric,
  plazo_min_dias integer,
  plazo_max_dias integer,
  disponible boolean DEFAULT true,
  observaciones text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos_imprentas(categoria);
CREATE INDEX IF NOT EXISTS idx_productos_imprenta ON productos_imprentas(imprenta);
CREATE INDEX IF NOT EXISTS idx_productos_disponible ON productos_imprentas(disponible);
CREATE INDEX IF NOT EXISTS idx_productos_precio ON productos_imprentas(precio_total_con_iva);

-- Enable Row Level Security
ALTER TABLE productos_imprentas ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (this is comparison data)
CREATE POLICY "Allow public read access to product prices"
  ON productos_imprentas
  FOR SELECT
  TO public
  USING (true);