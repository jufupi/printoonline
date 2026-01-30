import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export type ComparisonResult = {
  printer_name: string;
  printer_slug: string;
  price: number;
  delivery_days: number;
  quality_score: number;
  website_url: string;
  description: string;
  rating?: number;
  rating_source?: string;
  rating_url?: string;
  categoria?: string;
  producto?: string;
  formato?: string;
  cantidad?: number;
  acabado?: string;
};

type ProductoImprenta = {
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
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { categoria, formato, cantidad, acabado, tipo_de_carpeta } = body;

    if (!categoria || !cantidad) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: categoria, cantidad' },
        { status: 400 }
      );
    }

    let query = supabase
      .from('productos_imprentas')
      .select('*')
      .eq('disponible', true)
      .eq('categoria', categoria)
      .eq('cantidad', parseInt(cantidad));

    if (formato) {
      query = query.eq('formato_mm', formato);
    }

    if (acabado) {
      query = query.eq('acabado', acabado);
    }

    if (tipo_de_carpeta) {
      query = query.eq('tipo_de_carpeta', tipo_de_carpeta);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error en consulta Supabase:', error);
      return NextResponse.json(
        { error: 'Error en la consulta a la base de datos' },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json({
        success: true,
        results: [],
        query: {
          categoria,
          formato,
          cantidad,
          acabado,
          tipo_de_carpeta,
        },
      });
    }

    const { data: printersData } = await supabase
      .from('printers')
      .select('*');

    const printersMap = new Map(
      (printersData || []).map(p => [p.slug, p])
    );

    const mappedResults = (data as ProductoImprenta[])
      .filter(item => item.precio_principal !== null && item.precio_principal > 0)
      .map(item => {
        const printer = printersMap.get(item.imprenta);

        if (!printer) {
          return null;
        }

        const result: ComparisonResult = {
          printer_name: printer.name,
          printer_slug: printer.slug,
          price: item.precio_principal || 0,
          delivery_days: item.plazo_max_dias || 0,
          quality_score: printer.quality_score || 0,
          website_url: printer.website_url,
          description: printer.description || '',
          rating: printer.rating_value ? parseFloat(printer.rating_value) : undefined,
          rating_source: printer.rating_source,
          rating_url: printer.rating_url,
          categoria: item.categoria,
          producto: item.producto,
          formato: item.formato_mm,
          cantidad: item.cantidad,
          acabado: item.acabado,
        };
        return result;
      });

    const results: ComparisonResult[] = mappedResults.filter((item): item is ComparisonResult => item !== null);

    results.sort((a, b) => a.price - b.price);

    return NextResponse.json({
      success: true,
      results,
      query: {
        categoria,
        formato,
        cantidad,
        acabado,
        tipo_de_carpeta,
      },
    });
  } catch (error) {
    console.error('Error en API de comparación:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
