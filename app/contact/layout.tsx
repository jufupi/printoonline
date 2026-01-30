import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | PrintOOnline',
  description:
    'Contacta con PrintOOnline. Envíanos tus consultas, sugerencias o dudas sobre nuestro comparador de precios de imprenta online.',
  openGraph: {
    title: 'Contacto | PrintOOnline',
    description:
      'Contacta con PrintOOnline. Envíanos tus consultas, sugerencias o dudas sobre nuestro comparador de precios de imprenta online.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Contacto | PrintOOnline',
    description:
      'Contacta con PrintOOnline. Envíanos tus consultas, sugerencias o dudas.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
