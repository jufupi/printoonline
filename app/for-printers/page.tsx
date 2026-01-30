import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Users,
  FileText,
  Shield,
  Target,
  CheckCircle,
  Mail,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Para Imprentas | PrintOOnline',
  description:
    'Únete a nuestro comparador de precios y aumenta tu visibilidad. Información para imprentas online que quieren aparecer en PrintOOnline.',
  openGraph: {
    title: 'Para Imprentas | PrintOOnline',
    description:
      'Únete a nuestro comparador de precios y aumenta tu visibilidad. Información para imprentas online que quieren aparecer en PrintOOnline.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Para Imprentas | PrintOOnline',
    description:
      'Únete a nuestro comparador de precios y aumenta tu visibilidad.',
  },
};

export default function ForPrintersPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Visibilidad en comparaciones',
      description:
        'Tus precios aparecen cuando los usuarios buscan productos que ofreces.',
    },
    {
      icon: FileText,
      title: 'Mismo criterio para todos',
      description:
        'Comparamos con las mismas especificaciones, sin favorecer a ninguna imprenta.',
    },
    {
      icon: Target,
      title: 'Enlaces directos',
      description:
        'Los usuarios acceden directamente a tu web para completar el pedido.',
    },
    {
      icon: Shield,
      title: 'Participación voluntaria',
      description:
        'Decides si quieres estar en la comparación y puedes actualizar tus tarifas cuando quieras.',
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Contacto inicial',
      description:
        'Escríbenos y te explicamos cómo funciona la inclusión de tus tarifas en el comparador.',
    },
    {
      step: '2',
      title: 'Facilitas tus precios',
      description:
        'Nos envías tu estructura de precios para los productos que quieras incluir.',
    },
    {
      step: '3',
      title: 'Apareces en resultados',
      description:
        'Cuando un usuario busca un producto que ofreces, tu imprenta aparece en los resultados.',
    },
  ];

  const requirements = [
    'Impresión online con precios públicos',
    'Capacidad para procesar pedidos estándar',
    'Web funcional donde completar los pedidos',
    'Precios actualizados y vigentes',
  ];

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Para imprentas online
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Si ofreces impresión online, tus tarifas pueden aparecer en nuestro comparador
          </p>
          <Link href="/contact">
            <Button size="lg">
              Consultar colaboración
              <Mail className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Cómo funciona
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              El comparador muestra precios de diferentes imprentas para el mismo producto
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title}>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100">
                          <Icon className="h-6 w-6 text-slate-700" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {benefit.description}
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

      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Proceso de colaboración
            </h2>
            <p className="text-lg text-slate-600">
              Tres pasos para empezar a aparecer en el comparador
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 text-white font-bold text-2xl mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Requisitos básicos
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {requirements.map((requirement) => (
                <div key={requirement} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-slate-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Criterios del comparador
          </h2>

          <div className="space-y-6 text-slate-700">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Ordenación por precio
                </h3>
                <p className="leading-relaxed">
                  Los resultados se ordenan de menor a mayor precio total.
                  No hay posiciones destacadas ni promociones.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Mismo producto, mismas especificaciones
                </h3>
                <p className="leading-relaxed">
                  Consultamos precios usando exactamente la misma configuración:
                  mismo formato, cantidad y acabado para todas las imprentas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Información sobre plazos
                </h3>
                <p className="leading-relaxed">
                  El plazo de entrega mostrado corresponde a la opción más económica.
                  Las opciones urgentes no se incluyen en la comparación base.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">¿Interesado en aparecer?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Escríbenos y te explicamos las condiciones de colaboración
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-slate-900 hover:bg-slate-100"
              >
                Contactar
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-12 border-t border-slate-700">
            <h3 className="text-xl font-semibold mb-4 text-center">
              ¿Tienes preguntas?
            </h3>
            <p className="text-center text-slate-300">
              Escríbenos y resolveremos cualquier duda sobre cómo funciona la inclusión
              de tu imprenta en PrintOOnline.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
