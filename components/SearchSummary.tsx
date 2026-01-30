'use client';

import { useEffect, useState, useRef } from 'react';
import { getFormatoLabel, getAcabadoLabel } from '@/lib/product-helpers';

interface SearchSummaryProps {
  producto: string;
  formato?: string;
  cantidad: number;
  acabado?: string;
  tipoCarpeta?: string;
  categoria: string;
}

export function SearchSummary({
  producto,
  formato,
  cantidad,
  acabado,
  tipoCarpeta,
  categoria,
}: SearchSummaryProps) {
  const [isSticky, setIsSticky] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '-1px 0px 0px 0px',
      }
    );

    if (summaryRef.current) {
      observer.observe(summaryRef.current);
    }

    return () => {
      if (summaryRef.current) {
        observer.unobserve(summaryRef.current);
      }
    };
  }, []);

  const formatoLabel = formato ? getFormatoLabel(formato, categoria) : '';
  const acabadoLabel = acabado ? getAcabadoLabel(acabado) : '';
  const cantidadFormatted = cantidad.toLocaleString();

  return (
    <>
      <div
        ref={summaryRef}
        className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6 mb-6 shadow-sm"
      >
        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
          <span className="text-slate-600">Búsqueda:</span>
          <span className="font-semibold text-slate-900">{producto}</span>
          {formato && (
            <>
              <span className="text-slate-400">•</span>
              <span className="text-slate-900">{formatoLabel}</span>
            </>
          )}
          {tipoCarpeta && (
            <>
              <span className="text-slate-400">•</span>
              <span className="text-slate-900">{tipoCarpeta}</span>
            </>
          )}
          {acabado && (
            <>
              <span className="text-slate-400">•</span>
              <span className="text-slate-900">{acabadoLabel}</span>
            </>
          )}
          <span className="text-slate-400">•</span>
          <span className="text-slate-900">
            {cantidadFormatted} {cantidad === 1 ? 'unidad' : 'unidades'}
          </span>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 right-0 bg-white border-b border-slate-200 shadow-md z-50 transition-transform duration-300 ${
          isSticky ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span className="text-slate-600">Búsqueda:</span>
            <span className="font-semibold text-slate-900">{producto}</span>
            {formato && (
              <>
                <span className="text-slate-400">•</span>
                <span className="text-slate-900">{formatoLabel}</span>
              </>
            )}
            {tipoCarpeta && (
              <>
                <span className="text-slate-400">•</span>
                <span className="text-slate-900">{tipoCarpeta}</span>
              </>
            )}
            {acabado && (
              <>
                <span className="text-slate-400">•</span>
                <span className="text-slate-900">{acabadoLabel}</span>
              </>
            )}
            <span className="text-slate-400">•</span>
            <span className="text-slate-900">
              {cantidadFormatted} {cantidad === 1 ? 'unidad' : 'unidades'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
