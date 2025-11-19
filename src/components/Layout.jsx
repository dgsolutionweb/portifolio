import React from 'react';
import { Menu, X } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="layout">
      <header className="header">
        <div className="container header-content">
          <a href="#" className="logo">PORTFOLIO</a>

          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-list">
              <li><a href="#hero" onClick={toggleMenu}>{t.nav.home}</a></li>
              <li><a href="#about" onClick={toggleMenu}>{t.nav.about}</a></li>
              <li><a href="#works" onClick={toggleMenu}>{t.nav.works}</a></li>
              <li><a href="#contact" onClick={toggleMenu}>{t.nav.contact}</a></li>
              <li>
                <button onClick={toggleLanguage} className="lang-toggle">
                  {language === 'pt' ? 'EN' : 'PT'}
                </button>
              </li>
            </ul>
          </nav>

          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="socials">
            <a href="https://wa.me/5517999754390" target="_blank" rel="noopener noreferrer" className="whatsapp-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="whatsapp-icon"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>17999754390</span>
            </a>
          </div>
          <p className="copyright">© 2024 Portfolio. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          padding: var(--spacing-sm) 0;
          backdrop-filter: blur(10px);
          background: rgba(10, 10, 10, 0.5);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 1.2rem;
          letter-spacing: 2px;
        }

        .nav-list {
          display: flex;
          gap: var(--spacing-md);
        }

        .nav-list a {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.7;
          transition: opacity 0.3s;
        }

        .nav-list a:hover {
          opacity: 1;
        }

        .lang-toggle {
          background: none;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--text-color);
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          transition: all 0.3s;
        }

        .lang-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--text-color);
        }

        .menu-toggle {
          display: none;
        }

        .footer {
          padding: var(--spacing-md) 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(10, 10, 10, 0.8);
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .socials {
          display: flex;
          align-items: center;
        }

        .whatsapp-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--text-color);
          text-decoration: none;
          transition: opacity 0.3s;
        }

        .whatsapp-link:hover {
          opacity: 0.8;
        }

        .copyright {
          font-size: 0.8rem;
          color: var(--secondary-text);
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: var(--spacing-md);
            text-align: center;
          }

          .nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 100%;
            height: 100vh;
            background: var(--bg-color);
            display: flex;
            justify-content: center;
            align-items: center;
            transition: right 0.3s ease;
          }

          .nav.open {
            right: 0;
          }

          .nav-list {
            flex-direction: column;
            align-items: center;
            gap: var(--spacing-lg);
          }

          .menu-toggle {
            display: block;
            z-index: 101;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
