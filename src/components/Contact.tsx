import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section text-center py-32">
      <div className="container mx-auto px-8">
        <div className="flex flex-col items-center">
          <span className="block text-secondary mb-8 font-mono text-sm">{t.contact.label}</span>

          <motion.h2
            className="text-[clamp(2rem,6vw,4rem)] mb-8 font-bold"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.contact.headline}
          </motion.h2>

          <motion.a
            href="mailto:douuglinha@gmail.com"
            className="text-[clamp(1.5rem,4vw,3rem)] text-secondary underline decoration-1 underline-offset-8 transition-colors duration-300 hover:text-primary hover:decoration-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            douuglinha@gmail.com
          </motion.a>

          <div className="mt-32 opacity-50">
            {/* Simple form placeholder */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
