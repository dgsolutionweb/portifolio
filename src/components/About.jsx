import React from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="content-wrapper">
          <motion.div
            className="label mono"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {t.about.label}
          </motion.div>

          <motion.div
            className="text-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="headline">
              {t.about.headline}
            </h3>
            <p className="description">
              {t.about.description1}
            </p>
            <p className="description">
              {t.about.description2}
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .about {
          background: rgba(255, 255, 255, 0.02);
        }

        .content-wrapper {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--spacing-lg);
        }

        .label {
          color: var(--secondary-text);
          font-size: 0.9rem;
        }

        .headline {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 500;
          margin-bottom: var(--spacing-md);
          line-height: 1.2;
        }

        .description {
          font-size: 1.1rem;
          color: var(--secondary-text);
          margin-bottom: var(--spacing-sm);
          line-height: 1.6;
          max-width: 600px;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }
        }
      `}</style>
    </section>
  );
};

export default About;
