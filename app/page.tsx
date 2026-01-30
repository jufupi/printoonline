import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  CreditCard,
  FileText,
  BookOpen,
  Image,
  FolderOpen,
  Presentation,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'PrintOOnline - Comparador de Precios de Imprenta Online',
  description:
    'Compara precios de tarjetas de visita, flyers, carteles y más productos de impresión online. Encuentra las mejores ofertas de imprentas en un solo lugar.',
  openGraph: {
    title: 'PrintOOnline - Comparador de Precios de Imprenta Online',
    description:
      'Compara precios de tarjetas de visita, flyers, carteles y más productos de impresión online. Encuentra las mejores ofertas de imprentas en un solo lugar.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrintOOnline - Comparador de Precios de Imprenta Online',
    description:
      'Compara precios de tarjetas de visita, flyers, carteles y más productos de impresión online.',
  },
};

export default function Home() {
  const products = [
    {
      icon: CreditCard,
      name: 'Tarjetas de visita',
      slug: 'tarjetas',
      description: '85×55mm · Couché 350g',
    },
    {
      icon: FileText,
      name: 'Papel carta',
      slug: 'papel-carta',
      description: 'A4 · Couché 90g',
    },
    {
      icon: FileText,
      name: 'Sobres',
      slug: 'sobres',
      description: 'DL, C4 · Offset 90g',
    },
    {
      icon: FileText,
      name: 'Flyers',
      slug: 'flyers',
      description: 'A5, A4, DL · Couché 90g',
    },
    {
      icon: BookOpen,
      name: 'Dípticos',
      slug: 'dipticos',
      description: 'A4, A5, DL · Couché 90g',
    },
    {
      icon: Image,
      name: 'Carteles',
      slug: 'carteles',
      description: 'A3, B1 · Couché 90g',
    },
    {
      icon: FolderOpen,
      name: 'Carpetas',
      slug: 'carpetas',
      description: 'A4 · Couché 350g',
    },
    {
      icon: Presentation,
      name: 'Roll up',
      slug: 'roll-up',
      description: '850×2000, 1000×2000 mm',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Elige el producto',
      description:
        'Selecciona el tipo de material que necesitas imprimir.',
    },
    {
      number: '2',
      title: 'Configura especificaciones',
      description: 'Indica cantidad, formato y acabado según tus necesidades.',
    },
    {
      number: '3',
      title: 'Compara opciones',
      description:
        'Consulta precios de diferentes imprentas para las mismas especificaciones. Los plazos mostrados corresponden a la opción más económica de cada imprenta.',
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-4">
              <span className="font-semibold text-xl tracking-tight" style={{ color: '#1F2A44' }}>
                Print<span className="font-bold">OO</span>nline
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Compara precios de imprentas online
            </h1>
            <p className="text-xl text-slate-600 mb-4 leading-relaxed">
              Mismo producto, mismas especificaciones, diferentes imprentas.
            </p>
            <p className="text-base text-slate-500 mb-8 leading-relaxed max-w-2xl mx-auto">
              Comparamos precios con el mismo criterio para que puedas elegir la opción que mejor se ajuste a tu presupuesto y plazo de entrega.
            </p>
            <Link href="/compare">
              <Button size="lg" className="text-base">
                Comparar precios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              ¿Qué necesitas imprimir?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <Link key={product.slug} href={`/compare?producto=${product.slug}`}>
                  <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer border hover:border-slate-300 h-full">
                    <div className="flex flex-col items-center text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                        <Icon className="h-8 w-8 text-slate-700" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {product.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Cómo funciona
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="bg-white rounded-lg p-6 h-full border border-slate-200">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-xl mb-4" style={{ backgroundColor: '#1F2A44' }}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
