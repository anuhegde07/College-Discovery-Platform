'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, User, LogOut, Home, Search, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserData {
  id: string;
  email: string;
  name: string;
}

export default function EnhancedNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    const response = await fetch('/auth/logout', { method: 'POST' });
    if (response.ok) {
      setUser(null);
      router.push('/');
    }
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
            <span className="hidden sm:inline font-bold text-lg text-dark">College Discovery</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-dark transition',
                  pathname === href ? 'text-primary font-semibold' : 'hover:text-primary'
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-light rounded-lg transition"
                >
                  <User size={18} />
                  <span className="text-sm">{user.name}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                    <Link
                      href="/profile"
                      className="block px-4 py-3 text-dark hover:bg-light transition border-b"
                    >
                      View Profile
                    </Link>
                    <Link
                      href="/saved"
                      className="block px-4 py-3 text-dark hover:bg-light transition border-b"
                    >
                      Saved Colleges
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="px-4 py-2 text-primary hover:bg-light rounded-lg transition">
                  Login
                </Link>
                <Link href="/auth/register" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition">
                  Sign Up
                </Link>
              </>
            )}
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
          <div className="md:hidden pb-4 space-y-2 border-t">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 text-dark hover:bg-light rounded-lg transition',
                  pathname === href && 'bg-primary/10 text-primary'
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
            <div className="border-t pt-2">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-dark hover:bg-light rounded-lg transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="inline mr-2" size={18} />
                    {user.name}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <LogOut className="inline mr-2" size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/auth/login"
                    className="block px-4 py-2 text-center text-primary hover:bg-light rounded-lg transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-4 py-2 text-center bg-primary text-white rounded-lg hover:bg-blue-600 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
