import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLowDataMode } from '@/context/LowDataModeContext';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { isLowDataMode, toggleLowDataMode } = useLowDataMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncAuthState = () => {
      const storedName = localStorage.getItem('userName');
      const storedRole = localStorage.getItem('userRole');
      setIsLoggedIn(Boolean(storedName));
      setUserRole(storedRole);
    };

    syncAuthState();
    window.addEventListener('storage', syncAuthState);
    return () => window.removeEventListener('storage', syncAuthState);
  }, []);

  const navLinks = useMemo(() => {
    const baseLinks = [
      { label: 'Product', href: '/#product' },
      { label: 'Micro-Learning', href: '/micro-learning' },
      { label: 'Portals', href: '/#portals' },
      { label: 'SOS', href: '/sos' },
      { label: 'Analytics', href: '/analytics/website' },
      { label: 'Contact', href: '/#contact' },
    ];

    return baseLinks.filter((link) => {
      if (link.label === 'Micro-Learning' && userRole && userRole !== 'student') {
        return false;
      }
      return true;
    });
  }, [userRole]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.9, 0.35, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-glass'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="hidden lg:flex items-center h-20">
          <div className="flex items-center gap-3 w-[200px]">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Prashiskshan</span>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  link.label === 'SOS'
                    ? 'text-red-300 hover:text-red-100 hover:bg-red-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 w-[200px]">
            <button
              onClick={toggleLowDataMode}
              aria-pressed={isLowDataMode}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-white/10 text-slate-200 hover:text-white hover:border-white/20 transition-colors"
            >
              {isLowDataMode ? 'Standard Mode' : 'Low Data Mode'}
            </button>
            <div className="hidden" aria-hidden="true" />
          </div>
        </div>

        <div className="flex lg:hidden items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple blur opacity-40" />
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLowDataMode}
              aria-pressed={isLowDataMode}
              className="px-3 py-1 text-[11px] font-semibold rounded-md border border-white/10 text-slate-200 hover:text-white hover:border-white/20 transition-colors"
            >
              {isLowDataMode ? 'Standard' : 'Low Data'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.9, 0.35, 1] }}
            className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    link.label === 'SOS'
                      ? 'text-red-300 hover:text-red-100 hover:bg-red-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  toggleLowDataMode();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full mt-2 px-4 py-3 rounded-lg text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 transition-colors"
              >
                {isLowDataMode ? 'Switch to Standard Mode' : 'Enable Low Data Mode'}
              </button>
              {!isLoggedIn && (
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full mt-4 px-6 py-3 rounded-xl font-semibold text-center
                           bg-gradient-to-r from-neon-blue to-primary-500
                           hover:shadow-neon-hover
                           transition-all duration-150"
                >
                  Sign in / Sign up
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
