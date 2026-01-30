'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Search, ExternalLink, Clock, TrendingUp, Loader as Loader2, Info, Star } from 'lucide-react';
import { ComparisonResult } from '@/app/api/compare/route';
import { categoryMapping, getFormatoLabel, getAcabadoLabel } from '@/lib/product-helpers';
import { SearchSummary } from '@/components/SearchSummary';

type ProductOptions = {
  formatos: string[];
  cantidades: number[];
  acabados: string[];
  tipos_carpeta?: string[];
};

const productos = [
  { value: 'tarjetas', label: 'Tarjetas de visita' },
  { value: 'papel-carta', label: 'Papel carta' },
  { value: 'sobres', label: 'Sobres' },
  { value: 'flyers', label: 'Flyers' },
  { value: 'dipticos', label: 'Dípticos' },
  { value: 'carteles', label: 'Carteles' },
  { value: 'carpetas', label: 'Carpetas' },
  { value: 'roll-up', label: 'Roll up' },
];

export default function ComparePage() {
  const searchParams = useSearchParams();
  const [productoSlug, setProductoSlug] = useState('');
  const [formato, setFormato] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [acabado, setAcabado] = useState('');
  const [tipoCarpeta, setTipoCarpeta] = useState('');
  const [options, setOptions] = useState<ProductOptions>({ formatos: [], cantidades: [], acabados: [] });
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [results, setResults] = useState<ComparisonResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const productoParam = searchParams.get('producto');
    if (productoParam && categoryMapping[productoParam]) {
      setProductoSlug(productoParam);
      loadProductOptions(productoParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searched && !loading && results.length > 0 && resultsRef.current) {
      setTimeout(() => {
        const element = resultsRef.current;
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, [searched, loading, results]);

  const loadProductOptions = async (slug: string) => {
    const categoria = categoryMapping[slug];
    if (!categoria) return;

    setLoadingOptions(true);
    setFormato('');
    setCantidad('');
    setAcabado('');
    setTipoCarpeta('');
    setResults([]);
    setSearched(false);
    setError('');

    try {
      const response = await fetch(`/api/product-options?categoria=${encodeURIComponent(categoria)}`);
      if (!response.ok) {
        throw new Error('Error al cargar opciones del producto');
      }

      const data = await response.json();
      setOptions(data.options);

      if (data.options.formatos.length === 1) {
        setFormato(data.options.formatos[0]);
      }
    } catch (err) {
      console.error('Error cargando opciones:', err);
      setError('Error al cargar las opciones del producto');
    } finally {
      setLoadingOptions(false);
    }
  };

  const handleProductoChange = (slug: string) => {
    setProductoSlug(slug);
    loadProductOptions(slug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSearched(true);
    setShowAllResults(false);

    try {
      const categoria = categoryMapping[productoSlug];

      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoria,
          formato: formato || undefined,
          cantidad: parseInt(cantidad),
          acabado: acabado || undefined,
          tipo_de_carpeta: tipoCarpeta || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al comparar precios');
      }

      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Ocurrió un error. Intenta de nuevo.'
      );
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    if (!productoSlug || !cantidad) return false;
    if (options.formatos.length > 1 && !formato) return false;
    if (options.acabados.length > 0 && !acabado) return false;
    if (options.tipos_carpeta && options.tipos_carpeta.length > 0 && !tipoCarpeta) return false;
    return true;
  };

  const displayedResults = showAllResults ? results : results.slice(0, 5);
  const hasMoreResults = results.length > 5;
  const currentCategoria = productoSlug ? categoryMapping[productoSlug] : '';

  const buildUrlWithUtm = (baseUrl: string, result: ComparisonResult) => {
    const url = new URL(baseUrl);
    url.searchParams.set('utm_source', 'printoonline');
    url.searchParams.set('utm_medium', 'comparador');
    url.searchParams.set('utm_campaign', 'precio');
    url.searchParams.set('utm_content', result.printer_slug);

    const utmTerm = [
      result.categoria,
      result.producto,
      result.formato,
      result.cantidad,
      result.acabado
    ].filter(Boolean).join('-').toLowerCase().replace(/\s+/g, '-');

    url.searchParams.set('utm_term', utmTerm);

    return url.toString();
  };

  const trackOutboundClick = (result: ComparisonResult) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'outbound_click',
        printer_slug: result.printer_slug,
        printer_name: result.printer_name,
        categoria: result.categoria,
        producto: result.producto,
        formato: result.formato,
        cantidad: result.cantidad,
        acabado: result.acabado,
        precio_total: result.price,
        entrega_dias: result.delivery_days,
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
            Comparador de precios
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto px-2">
            Consulta precios de diferentes imprentas con las mismas especificaciones
          </p>
        </div>

        <Card className="max-w-3xl mx-auto mb-8 sm:mb-12">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Search className="mr-2 h-5 w-5 flex-shrink-0" />
              Configura tu búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="producto">Producto</Label>
                <Select value={productoSlug} onValueChange={handleProductoChange}>
                  <SelectTrigger id="producto">
                    <SelectValue placeholder="Selecciona un producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {productos.map((producto) => (
                      <SelectItem key={producto.value} value={producto.value}>
                        {producto.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {loadingOptions && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                </div>
              )}

              {!loadingOptions && options.formatos.length > 1 && (
                <div className="space-y-2">
                  <Label htmlFor="formato">Formato</Label>
                  <Select value={formato} onValueChange={setFormato}>
                    <SelectTrigger id="formato">
                      <SelectValue placeholder="Selecciona el formato" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.formatos.map((fmt) => (
                        <SelectItem key={fmt} value={fmt}>
                          {getFormatoLabel(fmt, currentCategoria)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {!loadingOptions && options.tipos_carpeta && options.tipos_carpeta.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="tipoCarpeta">Tipo de carpeta</Label>
                  <Select value={tipoCarpeta} onValueChange={setTipoCarpeta}>
                    <SelectTrigger id="tipoCarpeta">
                      <SelectValue placeholder="Selecciona el tipo de carpeta" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.tipos_carpeta.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {!loadingOptions && options.acabados.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="acabado">
                    {currentCategoria === 'Sobres' ? 'Tipo' : 'Acabado'}
                  </Label>
                  <Select value={acabado} onValueChange={setAcabado}>
                    <SelectTrigger id="acabado">
                      <SelectValue placeholder={`Selecciona ${currentCategoria === 'Sobres' ? 'el tipo' : 'el acabado'}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.acabados.map((option) => (
                        <SelectItem key={option} value={option}>
                          {getAcabadoLabel(option)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {!loadingOptions && options.cantidades.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="cantidad">Cantidad</Label>
                  <Select value={cantidad} onValueChange={setCantidad}>
                    <SelectTrigger id="cantidad">
                      <SelectValue placeholder="Selecciona la cantidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.cantidades.map((qty) => (
                        <SelectItem key={qty} value={qty.toString()}>
                          {qty.toLocaleString()} {qty === 1 ? 'unidad' : 'unidades'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {!loadingOptions && options.cantidades.length > 0 && (
                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-slate-700 text-sm">
                    Los plazos mostrados corresponden siempre a la opción más económica. Las imprentas ofrecen opciones urgentes con coste adicional.
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading || loadingOptions || !isFormValid()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Comparando precios...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Comparar precios
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="max-w-3xl mx-auto mb-8">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {searched && !loading && results.length > 0 && (
          <div ref={resultsRef} className="max-w-5xl mx-auto scroll-mt-24">
            <SearchSummary
              producto={productos.find(p => p.value === productoSlug)?.label || ''}
              formato={formato}
              cantidad={parseInt(cantidad)}
              acabado={acabado}
              tipoCarpeta={tipoCarpeta}
              categoria={currentCategoria}
            />

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Resultados de la comparación
              </h2>
              <p className="text-slate-600">
                {results.length} {results.length === 1 ? 'opción encontrada' : 'opciones encontradas'} para tu búsqueda
              </p>
            </div>

            <div className="space-y-4">
              <TooltipProvider>
                {displayedResults.map((result, index) => (
                  <Card
                    key={`${result.printer_name}-${index}`}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-slate-900 mb-1">
                                {result.printer_name}
                              </h3>
                              {result.rating && result.rating_source && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={result.rating_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center text-xs text-slate-500 hover:text-slate-700 cursor-pointer transition-colors"
                                    >
                                      <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                      {result.rating.toFixed(1)} / 5 ({result.rating_source})
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs max-w-xs">
                                      Valoración media en {result.rating_source}. Haz clic para ver todas las opiniones.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                            {index === 0 && (
                              <div className="ml-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Mejor precio
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-4 mt-3">
                            <div className="flex items-center text-sm text-slate-600">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>
                                Entrega aproximada en {result.delivery_days} día
                                {result.delivery_days !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 lg:gap-6 w-full lg:w-auto">
                          <div className="text-left sm:text-right flex-1 sm:flex-initial">
                            <div className="text-sm text-slate-600 mb-1">
                              Precio total
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
                              €{result.price.toFixed(2)}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              El precio final se confirma en la web de la imprenta
                            </div>
                          </div>
                          <Button
                            asChild
                            onClick={() => trackOutboundClick(result)}
                            className="w-full sm:w-auto"
                            size="lg"
                          >
                            <a
                              href={buildUrlWithUtm(result.website_url, result)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center"
                            >
                              Visitar imprenta
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TooltipProvider>
            </div>

            {hasMoreResults && !showAllResults && (
              <div className="text-center mt-6 px-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowAllResults(true)}
                  className="w-full sm:w-auto"
                >
                  Ver todas las opciones ({results.length})
                </Button>
              </div>
            )}
          </div>
        )}

        {searched && !loading && results.length === 0 && !error && (
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-slate-600">
              No se encontraron resultados. Prueba con parámetros diferentes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
