import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Printer = {
  id: string;
  name: string;
  website_url: string;
  quality_score: number;
  delivery_speed_factor: number;
  logo_url: string | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
};

export type ProductPrice = {
  id: string;
  printer_id: string;
  product_type: 'business_cards' | 'flyers' | 'posters' | 'banners';
  base_price: number;
  price_per_unit: number;
  min_quantity: number;
  express_delivery_multiplier: number;
  standard_delivery_days: number;
  express_delivery_days: number;
  created_at: string;
};

export type ComparisonResult = {
  printer_name: string;
  price: number;
  delivery_days: number;
  quality_score: number;
  website_url: string;
  description: string | null;
};
