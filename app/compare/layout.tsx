import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comparador de Precios | PrintOOnline',
  description:
    'Compara precios de imprenta online en tiempo real. Encuentra las mejores ofertas de tarjetas de visita, flyers, carteles y más productos de impresión.',
  openGraph: {
    title: 'Comparador de Precios | PrintOOnline',
    description:
      'Compara precios de imprenta online en tiempo real. Encuentra las mejores ofertas de tarjetas de visita, flyers, carteles y más productos de impresión.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comparador de Precios | PrintOOnline',
    description:
      'Compara precios de imprenta online en tiempo real.',
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
