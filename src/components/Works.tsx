import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string;
  image: string | string[];
  link: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = Array.isArray(project.image) ? project.image : [project.image];

  useEffect(() => {
    let interval: NodeJS.Timeout;
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
      className="block cursor-pointer text-inherit no-underline group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded mb-4 aspect-video bg-[#1a1a1a]">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={project.title}
            className="w-full h-full object-contain absolute top-0 left-0 transition-transform duration-300 group-hover:scale-105"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300 z-10 group-hover:opacity-100 group-focus-visible:opacity-100">
          {project.link.endsWith('.zip') ? (
            <Download size={48} />
          ) : (
            <ArrowUpRight size={48} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <h3 className="text-2xl font-medium mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-secondary text-base leading-relaxed mb-4">{project.description}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-primary/10 pt-2 gap-2 md:gap-0">
          <span className="text-xs text-accent font-mono">{project.tech}</span>
          <span className="text-xs text-secondary font-mono">{project.category}</span>
        </div>
      </div>
    </motion.a>
  );
};

const Works = () => {
  const { t } = useLanguage();

  return (
    <section id="works" className="section relative">
      <div className="container mx-auto px-8">
        <div className="mb-16">
          <span className="text-secondary text-sm font-mono">{t.works.label}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-16 items-start">
          {t.works.projects.map((project: any, index: number) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
