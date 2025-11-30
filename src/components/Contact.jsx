import React from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="content">
          <span className="label mono">{t.contact.label}</span>

          <motion.h2
            className="headline"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.contact.headline}
          </motion.h2>

          <motion.a
            href="mailto:douuglinha@gmail.com"
            className="email-link"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            douuglinha@gmail.com
          </motion.a>

          <div className="form-container">
            {/* Simple form placeholder */}

            {/* Add form here if needed, keeping it simple for now */}
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact {
          text-align: center;
        }

        .label {
          display: block;
          color: var(--secondary-text);
          margin-bottom: var(--spacing-md);
        }

        .headline {
          font-size: clamp(2rem, 6vw, 4rem);
          margin-bottom: var(--spacing-md);
        }

        .email-link {
          font-size: clamp(1.5rem, 4vw, 3rem);
          color: var(--secondary-text);
          text-decoration: underline;
          transition: color 0.3s;
        }

        .email-link:hover {
          color: var(--text-color);
        }

        .form-container {
          margin-top: var(--spacing-xl);
          opacity: 0.5;
        }
      `}</style>
    </section>
  );
};

export default Contact;
