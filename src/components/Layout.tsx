import React, { ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 py-4 backdrop-blur-md bg-background/50 border-b border-primary/10">
        <div className="container mx-auto px-8 flex justify-between items-center">
          <a href="#" className="font-mono font-bold text-lg tracking-[2px]">PORTFOLIO</a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            <ul className="flex gap-8 items-center">
              {['home', 'about', 'works', 'contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className="text-sm uppercase tracking-widest opacity-70 transition-opacity hover:opacity-100">
                    {t.nav[item as keyof typeof t.nav]}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={toggleLanguage}
                  className="bg-transparent border border-primary/20 text-primary px-2 py-1 rounded cursor-pointer font-mono text-xs transition-all hover:bg-primary/10 hover:border-primary"
                >
                  {language === 'pt' ? 'EN' : 'PT'}
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden z-[60]" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Nav Overlay */}
          <nav className={`fixed top-0 right-0 w-full h-screen bg-background flex justify-center items-center transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <ul className="flex flex-col items-center gap-16">
              {['home', 'about', 'works', 'contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={toggleMenu} className="text-sm uppercase tracking-widest opacity-70 transition-opacity hover:opacity-100">
                    {t.nav[item as keyof typeof t.nav]}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => { toggleLanguage(); toggleMenu(); }}
                  className="bg-transparent border border-primary/20 text-primary px-2 py-1 rounded cursor-pointer font-mono text-xs transition-all hover:bg-primary/10 hover:border-primary"
                >
                  {language === 'pt' ? 'EN' : 'PT'}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="py-8 border-t border-primary/10 bg-background/80">
        <div className="container mx-auto px-8 flex flex-col md:flex-row justify-center items-center text-center">
          <p className="text-xs text-secondary">© 2024 Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
