import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Search,
  FileText,
  BarChart3,
  ExternalLink,
  CheckCircle,
  Info,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cómo funciona | PrintOOnline',
  description:
    'Descubre cómo funciona nuestro comparador de precios de imprenta online. Compara precios, elige la mejor oferta y ahorra en tus productos de impresión.',
  openGraph: {
    title: 'Cómo funciona | PrintOOnline',
    description:
      'Descubre cómo funciona nuestro comparador de precios de imprenta online. Compara precios, elige la mejor oferta y ahorra en tus productos de impresión.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Cómo funciona | PrintOOnline',
    description:
      'Descubre cómo funciona nuestro comparador de precios de imprenta online.',
  },
};

export default function HowItWorksPage() {
  const steps = [
    {
      icon: FileText,
      title: 'Selecciona tu producto',
      description:
        'Elige entre tarjetas de visita, flyers, carteles o lonas. Especifica la cantidad que necesitas y tu plazo de entrega preferido.',
      details: [
        'Múltiples categorías de productos disponibles',
        'Opciones flexibles de cantidad',
        'Entrega estándar o urgente',
      ],
    },
    {
      icon: Search,
      title: 'Comparamos los precios',
      description:
        'Nuestro sistema consulta múltiples servicios de impresión verificados y calcula el coste total según tus requisitos.',
      details: [
        'Cálculos de precios en tiempo real',
        'Considera descuentos por cantidad',
        'Incluye costes de envío',
      ],
    },
    {
      icon: BarChart3,
      title: 'Revisa y elige',
      description:
        'Compara precios, valoraciones de calidad y plazos de entrega lado a lado. Visita tu imprenta preferida para completar el pedido.',
      details: [
        'Desglose de precios transparente',
        'Valoraciones de calidad para cada imprenta',
        'Plazos de entrega estimados',
      ],
    },
  ];

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Cómo funciona PrintOOnline
            </h1>
            <p className="text-xl text-slate-600">
              Compara precios de impresión en tres pasos sencillos
            </p>
          </div>

          <Alert className="bg-blue-50 border-blue-200 mb-12">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-slate-700">
              PrintOOnline es una plataforma independiente de comparación. Te ayudamos
              a encontrar las mejores ofertas de impresión pero no somos un servicio
              de impresión propiamente dicho.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-6 md:gap-8"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 text-white font-bold text-2xl">
                      {index + 1}
                    </div>
                  </div>

                  <Card className="flex-1">
                    <CardContent className="pt-6">
                      <div className="flex items-start mb-4">
                        <Icon className="h-8 w-8 text-slate-700 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-slate-600 leading-relaxed mb-4">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 ml-12">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            ¿Qué nos hace diferentes?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Independencia total
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  No somos propiedad de ningún servicio de impresión ni estamos afiliados con ellos.
                  Nuestras comparaciones son completamente neutrales e imparciales.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Metodología transparente
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Nuestro algoritmo de comparación es directo: calculamos
                  los costes totales basándonos en datos reales de precios y ordenamos los resultados por
                  precio.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Datos reales
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Nuestra plataforma utiliza información real de precios de servicios
                  de impresión verificados para proporcionar comparaciones precisas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Uso gratuito
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  PrintOOnline es completamente gratuito para los clientes. Recibimos una
                  pequeña comisión de las imprentas cuando realizas una compra.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
              Preguntas frecuentes
            </h2>

            <div className="space-y-6 mt-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  ¿Es gratuito usar PrintOOnline?
                </h3>
                <p className="text-slate-600">
                  Sí, completamente gratuito. Recibimos una comisión de los servicios
                  de impresión cuando realizas una compra a través de nuestra plataforma.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  ¿Son precisos los precios?
                </h3>
                <p className="text-slate-600">
                  Utilizamos datos reales de precios de nuestras imprentas asociadas. Sin embargo,
                  los precios finales pueden variar según los requisitos específicos o
                  promociones vigentes. Verifica siempre en el sitio web de la imprenta.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  ¿Cómo elegís qué imprentas incluir?
                </h3>
                <p className="text-slate-600">
                  Solo trabajamos con servicios de impresión verificados y fiables con
                  buenos antecedentes. Todas las imprentas cumplen nuestros estándares de calidad y servicio.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  ¿Hago el pedido a través de PrintOOnline?
                </h3>
                <p className="text-slate-600">
                  No, somos una plataforma de comparación. Una vez que hayas encontrado el
                  mejor precio, visitarás el sitio web de la imprenta para
                  completar tu pedido.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para empezar?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Compara precios de impresión y encuentra la mejor oferta en segundos
          </p>
          <Link href="/compare">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-slate-900 hover:bg-slate-100"
            >
              Comparar precios ahora
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
