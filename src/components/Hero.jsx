import React from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="section hero">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="greeting mono">{t.hero.greeting}</h2>
          <h1 className="title">
            DOUGLAS <br />
            <span className="outline">RODRIGUES</span>
          </h1>
          <p className="subtitle">
            {t.hero.role}
          </p>

          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="mono">{t.hero.scroll}</span>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
        }

        .greeting {
          color: var(--accent-color);
          font-size: 1rem;
          margin-bottom: var(--spacing-sm);
          opacity: 0.8;
        }

        .title {
          font-size: clamp(3rem, 10vw, 8rem);
          line-height: 0.9;
          font-weight: 700;
          margin-bottom: var(--spacing-md);
        }

        .outline {
          -webkit-text-stroke: 2px var(--text-color);
          color: transparent;
          transition: color 0.3s;
        }

        .outline:hover {
          color: var(--text-color);
        }

        .subtitle {
          font-size: 1.2rem;
          color: var(--secondary-text);
          max-width: 500px;
        }

        .scroll-indicator {
          position: absolute;
          bottom: var(--spacing-lg);
          left: 50%;
          transform: translateX(-50%);
          opacity: 0.5;
        }
      `}</style>
    </section>
  );
};

export default Hero;
