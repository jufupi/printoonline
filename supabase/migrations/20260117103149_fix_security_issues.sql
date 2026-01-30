/*
  # Fix Security Issues
  
  1. Drop Unused Indexes
    - Remove 6 unused indexes across multiple tables to improve database performance
    - Indexes: idx_productos_imprenta, idx_productos_disponible, idx_valoraciones_imprenta,
      idx_printers_slug, idx_product_prices_product_type, idx_printers_is_active
  
  2. Fix RLS Policies with Always True Conditions
    - Remove overly permissive policies on `productos_imprentas` table
      - DELETE, INSERT, UPDATE policies that allowed unrestricted access
    - Remove overly permissive policies on `valoraciones_imprentas` table
      - INSERT, UPDATE policies that allowed unrestricted access
    - Keep only SELECT policies for public read access
    - Data modifications should be done via service role (import scripts, admin operations)
  
  3. Security Improvements
    - Tables remain read-only for public access
    - Administrative operations require service role credentials
    - Eliminates security bypass vulnerabilities
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_productos_imprenta;
DROP INDEX IF EXISTS idx_productos_disponible;
DROP INDEX IF EXISTS idx_valoraciones_imprenta;
DROP INDEX IF EXISTS idx_printers_slug;
DROP INDEX IF EXISTS idx_product_prices_product_type;
DROP INDEX IF EXISTS idx_printers_is_active;

-- Remove overly permissive RLS policies on productos_imprentas
DROP POLICY IF EXISTS "Allow deletes for data management" ON productos_imprentas;
DROP POLICY IF EXISTS "Allow insert for import scripts" ON productos_imprentas;
DROP POLICY IF EXISTS "Allow updates for data management" ON productos_imprentas;

-- Remove overly permissive RLS policies on valoraciones_imprentas
DROP POLICY IF EXISTS "Authenticated users can insert ratings" ON valoraciones_imprentas;
DROP POLICY IF EXISTS "Authenticated users can update ratings" ON valoraciones_imprentas;
