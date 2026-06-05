'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, Compass } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/colleges', label: 'Colleges', icon: Search },
    { href: '/compare', label: 'Compare', icon: Compass },
    { href: '/predict', label: 'Predictor', icon: Search },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">CD</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg text-dark">
              College Discovery
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="text-dark hover:text-primary">
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/login" className="px-4 py-2 text-primary hover:bg-light rounded-lg">
              Login
            </Link>
            <Link href="/auth/register" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
              Sign Up
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
