import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative h-screen flex items-center">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-accent text-base mb-4 opacity-80 font-mono">{t.hero.greeting}</h2>
          <h1 className="text-[clamp(3rem,10vw,8rem)] leading-[0.9] font-bold mb-8">
            DOUGLAS <br />
            <span className="[-webkit-text-stroke:2px_#ffffff] text-transparent transition-colors duration-300 hover:text-primary">RODRIGUES</span>
          </h1>
          <p className="text-xl text-secondary max-w-[500px]">
            {t.hero.role}
          </p>

          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 opacity-50"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="font-mono">{t.hero.scroll}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
