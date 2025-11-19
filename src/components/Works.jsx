import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

const Works = () => {
  const { t } = useLanguage();

  return (
    <section id="works" className="section works">
      <div className="container">
        <div className="header-row">
          <span className="label mono">{t.works.label}</span>
        </div>

        <div className="grid">
          {t.works.projects.map((project, index) => (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.id}
              className="card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="image-container">
                <img src={project.image} alt={project.title} />
                <div className="overlay">
                  <ArrowUpRight size={48} />
                </div>
              </div>
              <div className="info">
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                </div>
                <div className="meta">
                  <span className="tech mono">{project.tech}</span>
                  <span className="category mono">{project.category}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .header-row {
          margin-bottom: var(--spacing-lg);
        }

        .label {
          color: var(--secondary-text);
          font-size: 0.9rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
          gap: var(--spacing-lg);
        }

        .card {
          display: block;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }

        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          margin-bottom: var(--spacing-sm);
          aspect-ratio: 16/9;
          background: #1a1a1a;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          opacity: 0.8;
        }

        .card:hover img {
          transform: scale(1.05);
          opacity: 1;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .card:hover .overlay {
          opacity: 1;
        }

        .info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .project-desc {
          font-size: 1rem;
          color: var(--secondary-text);
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: var(--spacing-xs);
        }

        .tech {
          font-size: 0.8rem;
          color: var(--accent-color);
        }

        .category {
          font-size: 0.8rem;
          color: var(--secondary-text);
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Works;
