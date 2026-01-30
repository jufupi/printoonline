import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Heart, Shield, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Acerca de | PrintOOnline',
  description:
    'Conoce más sobre PrintOOnline, el comparador independiente de precios de imprenta online. Nuestra misión es facilitar la comparación de precios de forma transparente.',
  openGraph: {
    title: 'Acerca de | PrintOOnline',
    description:
      'Conoce más sobre PrintOOnline, el comparador independiente de precios de imprenta online. Nuestra misión es facilitar la comparación de precios de forma transparente.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Acerca de | PrintOOnline',
    description:
      'Conoce más sobre PrintOOnline, el comparador independiente de precios de imprenta online.',
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Independencia',
      description:
        'No somos propiedad de ninguna imprenta. Nuestro objetivo es facilitar la comparación de precios de forma neutral.',
    },
    {
      icon: Heart,
      title: 'Transparencia',
      description:
        'Mostramos precios reales comparando productos con las mismas especificaciones. Sin condiciones ocultas.',
    },
    {
      icon: Users,
      title: 'Simplicidad',
      description:
        'Comparar precios de impresión debe ser rápido y sencillo. Sin llamadas, sin correos, sin solicitudes de presupuesto.',
    },
    {
      icon: Target,
      title: 'Criterio homogéneo',
      description:
        'Comparamos siempre el mismo producto con las mismas características. Los resultados se ordenan por precio.',
    },
  ];

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Acerca de PrintOOnline
            </h1>
            <p className="text-xl text-slate-600">
              Una herramienta para comparar precios de impresión online
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Por qué existe PrintOOnline
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Comparar precios de impresión requiere visitar varios sitios web,
              navegar por distintas estructuras de precios y anotar cifras para
              poder compararlas después. Es un proceso lento y tedioso.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              PrintOOnline simplifica este proceso: aplica el mismo criterio de
              comparación a diferentes imprentas online para que puedas ver las
              opciones disponibles en un solo lugar.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Es una herramienta pensada para ahorrar tiempo en la fase de comparación,
              nada más.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Nuestros valores
            </h2>
            <p className="text-lg text-slate-600">
              Los principios que guían todo lo que hacemos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title}>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100">
                          <Icon className="h-6 w-6 text-slate-700" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                          {value.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Cómo funciona la comparación
          </h2>

          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Mismo criterio para todos
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Para cada búsqueda, consultamos los precios de diferentes imprentas
                  usando exactamente las mismas especificaciones: mismo producto, misma
                  cantidad, mismo formato y mismo acabado.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Ordenación por precio
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Los resultados se muestran ordenados de menor a mayor precio total,
                  sin promociones ni posicionamiento pagado. El plazo de entrega mostrado
                  corresponde a la opción más económica de cada imprenta.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Uso gratuito
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Comparar precios en PrintOOnline es gratuito. No hay costes ocultos
                  ni necesitas registrarte para consultar los resultados.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              ¿Para quién es útil?
            </h2>
            <div className="mt-8 grid sm:grid-cols-2 gap-6 text-left">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Empresas y autónomos
                  </h3>
                  <p className="text-slate-600">
                    Si necesitas material impreso y quieres comparar opciones antes de decidir.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Diseñadores
                  </h3>
                  <p className="text-slate-600">
                    Para comparar presupuestos de impresión de forma rápida sin visitar múltiples webs.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Agencias
                  </h3>
                  <p className="text-slate-600">
                    Para agilizar la búsqueda de precios en proyectos con componente de impresión.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Cualquier persona
                  </h3>
                  <p className="text-slate-600">
                    Que necesite material impreso y quiera ver qué opciones hay disponibles.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ponte en contacto</h2>
          <p className="text-xl text-slate-300 mb-8">
            ¿Tienes preguntas o comentarios? Nos encantaría saber de ti.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-slate-900 hover:bg-slate-100"
            >
              Contáctanos
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
