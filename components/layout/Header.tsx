'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Cómo funciona', href: '/how-it-works' },
    { name: 'Para imprentas', href: '/for-printers' },
    { name: 'Acerca de', href: '/about' },
    { name: 'Contacto', href: '/contact' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="font-semibold text-2xl tracking-tight" style={{ color: '#1F2A44' }}>
                Print<span className="font-bold">OO</span>nline
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/compare">
              <Button className="ml-4">Comparar precios</Button>
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-base text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/compare" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-2">Comparar precios</Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
