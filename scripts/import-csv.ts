import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface ProductoImprenta {
  id: string;
  categoria: string;
  producto: string;
  formato_mm: string;
  papel: string;
  gramaje_g: string;
  acabado: string;
  cantidad: number;
  imprenta: string;
  gama: string;
  precio_producto: number | null;
  precio_envio: number | null;
  precio_total_sin_iva: number | null;
  precio_total_con_iva: number | null;
  precio_principal: number | null;
  plazo_min_dias: number | null;
  plazo_max_dias: number | null;
  disponible: boolean;
  observaciones: string;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ';' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function parseNumber(value: string): number | null {
  if (!value || value === '') return null;
  const cleaned = value.replace(',', '.');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
}

function parseBoolean(value: string): boolean {
  return value.toUpperCase() === 'VERDADERO' || value.toUpperCase() === 'TRUE';
}

async function importCSV() {
  try {
    console.log('Reading CSV file...');
    const csvPath = path.join(process.cwd(), 'data', 'productos_imprentas.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');

    const lines = csvContent.split('\n').filter(line => line.trim());
    const headers = parseCSVLine(lines[0]);

    console.log(`Found ${lines.length - 1} rows to import`);

    const productos: ProductoImprenta[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);

      if (values.length < headers.length) continue;

      const producto: ProductoImprenta = {
        id: values[0],
        categoria: values[1],
        producto: values[2],
        formato_mm: values[3],
        papel: values[4],
        gramaje_g: values[5],
        acabado: values[6],
        cantidad: parseInt(values[7]) || 0,
        imprenta: values[8],
        gama: values[9],
        precio_producto: parseNumber(values[10]),
        precio_envio: parseNumber(values[11]),
        precio_total_sin_iva: parseNumber(values[12]),
        precio_total_con_iva: parseNumber(values[13]),
        precio_principal: parseNumber(values[14]),
        plazo_min_dias: parseNumber(values[15]) ? parseInt(values[15]) : null,
        plazo_max_dias: parseNumber(values[16]) ? parseInt(values[16]) : null,
        disponible: parseBoolean(values[17]),
        observaciones: values[18] || ''
      };

      productos.push(producto);
    }

    console.log(`Parsed ${productos.length} products`);

    // Use upsert to add new records or update existing ones
    const batchSize = 100;
    for (let i = 0; i < productos.length; i += batchSize) {
      const batch = productos.slice(i, i + batchSize);
      console.log(`Upserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(productos.length / batchSize)}...`);

      const { error } = await supabase
        .from('productos_imprentas')
        .upsert(batch, { onConflict: 'id' });

      if (error) {
        console.error(`Error upserting batch:`, error);
        throw error;
      }
    }

    console.log('✅ Import completed successfully!');

    // Verify count
    const { count } = await supabase
      .from('productos_imprentas')
      .select('*', { count: 'exact', head: true });

    console.log(`Total rows in database: ${count}`);

  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

importCSV();
