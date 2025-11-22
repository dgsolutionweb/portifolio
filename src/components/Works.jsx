import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

const ProjectCard = ({ project, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = Array.isArray(project.image) ? project.image : [project.image];

  useEffect(() => {
    let interval;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1500);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      download={project.link.endsWith('.zip')}
      className="card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="image-container">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={project.title}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        <div className="overlay">
          {project.link.endsWith('.zip') ? (
            <Download size={48} />
          ) : (
            <ArrowUpRight size={48} />
          )}
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

      <style jsx>{`
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

        .image-container :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
        }

        .card:hover .image-container :global(img) {
          transform: scale(1.05);
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
          z-index: 10;
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
      `}</style>
    </motion.a>
  );
};

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
            <ProjectCard key={project.id} project={project} index={index} />
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
