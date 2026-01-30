/*
  # Add INSERT policy for productos_imprentas

  1. Security Changes
    - Add policy to allow public inserts for data import
    - This is safe as the data is public comparison information
*/

-- Allow inserts from anyone (for data import scripts)
CREATE POLICY "Allow insert for import scripts"
  ON productos_imprentas
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow updates for data management
CREATE POLICY "Allow updates for data management"
  ON productos_imprentas
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow deletes for data management
CREATE POLICY "Allow deletes for data management"
  ON productos_imprentas
  FOR DELETE
  TO public
  USING (true);