import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section bg-primary/2">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
          <motion.div
            className="text-secondary text-sm font-mono"
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
            <h3 className="text-[clamp(1.5rem,4vw,2.5rem)] font-medium mb-8 leading-[1.2]">
              {t.about.headline}
            </h3>
            <p className="text-lg text-secondary mb-4 leading-relaxed max-w-[600px]">
              {t.about.description1}
            </p>
            <p className="text-lg text-secondary mb-4 leading-relaxed max-w-[600px]">
              {t.about.description2}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
