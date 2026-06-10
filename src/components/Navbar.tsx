'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, LogOut, Home, Search, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut= async () => {
    await fetch('/auth/logout', { method: 'POST' });
    router.push('/');
  };

  const navLinks = [
    { href: '/colleges', label: 'Colleges', icon: Search },
    { href: '/compare', label: 'Compare', icon: Compass },
    { href: '/predict', label: 'Predictor', icon: Home },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">CD</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg text-dark">
              College Discovery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 text-dark hover:text-primary transition-colors"
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-primary hover:bg-light rounded-lg transition"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-light rounded-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 text-dark hover:bg-light rounded-lg transition'
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
            <div className="pt-4 border-t space-y-2">
              <Link
                href="/auth/login"
                className="block px-4 py-2 text-center text-primary hover:bg-light rounded-lg transition"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="block px-4 py-2 text-center bg-primary text-white rounded-lg hover:bg-blue-600 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
