import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#about' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Trabalhos Realizados', href: '/trabalhos' },
  { label: 'Tecnologias', href: '#tech' },
  { label: 'Contato', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate(`/${href}`);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'py-3 sm:py-4 bg-background/80 dark:bg-black/80 backdrop-blur-lg border-b border-border dark:border-white/5'
            : 'py-4 sm:py-6 bg-transparent'
        )}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="text-lg sm:text-xl font-bold text-foreground font-['Space_Grotesk'] hover:text-primary transition-colors flex-shrink-0"
            >
              LN<span className="text-primary">.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 underline-animation whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-border bg-card/60 dark:border-white/20 dark:bg-black/60 p-2 sm:p-2.5 text-foreground backdrop-blur-sm transition-colors hover:bg-card/80 dark:hover:bg-black/80 dark:hover:border-white/40 focus-visible:outline-2 focus-visible:outline-primary flex-shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/95 dark:bg-black/95 backdrop-blur-lg transition-all duration-500 md:hidden',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        role="navigation"
        aria-label="Menu mobile"
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 px-4">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={cn(
                'text-xl sm:text-2xl font-medium text-foreground hover:text-primary transition-all duration-300',
                isMobileMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              )}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
