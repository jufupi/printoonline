import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Comparar precios', href: '/compare' },
      { name: 'Cómo funciona', href: '/how-it-works' },
      { name: 'Para imprentas', href: '/for-printers' },
    ],
    company: [
      { name: 'Acerca de', href: '/about' },
      { name: 'Contacto', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="font-semibold text-lg tracking-tight" style={{ color: '#1F2A44' }}>
                Print<span className="font-bold">OO</span>nline
              </span>
            </Link>
            <p className="text-sm text-slate-600 max-w-md">
              La plataforma independiente de comparación de precios para servicios
              de impresión online. Compara precios de múltiples imprentas y
              encuentra la mejor oferta para tus necesidades de impresión.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Producto
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Empresa
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-600 text-center">
            &copy; {currentYear} PrintOOnline. Todos los derechos reservados.
            Plataforma independiente de comparación de precios.
          </p>
        </div>
      </div>
    </footer>
  );
}
