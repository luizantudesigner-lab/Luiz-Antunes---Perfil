import React, { useState, useEffect } from 'react';
import { content } from '../data/content';
import { links } from '../data/links';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "SOBRE", href: "#sobre" },
    { label: "PROJETOS", href: "#projetos" },
    { label: "EXPERIÊNCIA", href: "#experiencia" },
    { label: "ABORDAGEM", href: "#abordagem" },
    { label: "FERRAMENTAS", href: "#ferramentas" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? 'py-4 bg-brand-light/80 backdrop-blur-md' : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Logo */}
        <a href="#" className={`font-display font-bold text-lg tracking-tight z-50 ${menuOpen ? 'text-brand-light' : (isScrolled ? 'text-brand-dark' : 'mix-blend-difference text-brand-light')}`}>
          LUIZ ANTUNES
        </a>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center gap-4 lg:gap-8 whitespace-nowrap ${isScrolled ? 'text-brand-dark' : 'mix-blend-difference text-brand-light'}`}>
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-[10px] font-bold uppercase tracking-widest hover:opacity-60 transition-opacity"
            >
              {item.label}
            </a>
          ))}
          <a 
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:opacity-60 transition-opacity"
          >
            CONTATO ↗
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden z-50 p-2 ${menuOpen ? 'text-brand-light' : (isScrolled ? 'text-brand-dark' : 'mix-blend-difference text-brand-light')}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-brand-dark text-brand-light z-40 overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="w-full h-full overflow-y-auto flex flex-col justify-center items-center py-24">
          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-display font-medium tracking-tight"
              >
                {item.label}
              </a>
            ))}
            <a 
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl font-display font-medium tracking-tight mt-4 border-b border-brand-light pb-2"
            >
              CONTATO ↗
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
