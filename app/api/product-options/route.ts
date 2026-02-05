import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

type ProductOptions = {
  formatos: string[];
  cantidades: number[];
  acabados: string[];
  tipos_carpeta?: string[];
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoria = searchParams.get('categoria');

    if (!categoria) {
      return NextResponse.json(
        { error: 'Falta el parámetro categoria' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('productos_imprentas')
      .select('formato_mm, cantidad, acabado, tipo_de_carpeta')
     .ilike('categoria', categoria.trim())
      .eq('disponible', true);

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
        options: {
          formatos: [],
          cantidades: [],
          acabados: [],
          tipos_carpeta: [],
        },
      });
    }

    const formatos = Array.from(new Set(data.map(d => d.formato_mm).filter(f => f)));
    const cantidades = Array.from(new Set(data.map(d => d.cantidad))).sort((a, b) => a - b);
    const acabados = Array.from(new Set(data.map(d => d.acabado).filter(a => a)));

   const options: ProductOptions = {
  formatos,
  cantidades,
  acabados,
  tipos_carpeta: [],
};

    if (categoria === 'Carpetas') {
      const tiposCarpeta = Array.from(new Set(data.map((d: any) => d.tipo_de_carpeta).filter((t: any) => t)));
      options.tipos_carpeta = tiposCarpeta;
    }

    return NextResponse.json({
      success: true,
      categoria,
      options,
    });
  } catch (error) {
    console.error('Error en API de opciones:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
