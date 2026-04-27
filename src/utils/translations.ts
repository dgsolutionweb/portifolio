
import mapsImg from '../assets/maps_extractor_project.png';
import extrator1 from '../assets/extrator1.png';
import extrator2 from '../assets/extrator2.png';
import mecanicaImg from '../assets/mecanica.png';
import medicamentoImg from '../assets/medicamento.png';
import restauranteImg from '../assets/restaurante.png';
import destacaaiImg from '../assets/destacaai.png';
import cepsFeraImg from '../assets/ceps-fera.png';



export type Translation = typeof translations.pt;

export const translations = {
    pt: {
        nav: {
            home: "Início",
            about: "Sobre",
            works: "Projetos",
            contact: "Contato"
        },
        hero: {
            greeting: "Olá, eu sou",
            role: "Desenvolvedor Web & Especialista em Bots IA",
            scroll: "ROLA"
        },
        about: {
            label: "01 / SOBRE",
            headline: "Especializado em soluções web robustas e integrações de bots inteligentes.",
            description1: "Sou Desenvolvedor Web e especialista em Node.js com foco em integrações de IA. Construo plataformas SaaS escaláveis, soluções de e-commerce e assistentes inteligentes que impulsionam a eficiência dos negócios.",
            description2: "Minha expertise abrange todo o stack, desde a criação de front-ends responsivos com Next.js até a arquitetura de sistemas back-end complexos com PostgreSQL e modelos de IA."
        },
        works: {
            label: "02 / PROJETOS",
            projects: [
                {
                    id: 2,
                    title: "DestacaAI",
                    category: "Plataforma RH/Carreira",
                    description: "Gere currículos de forma rápida, simples e grátis, e exporte em PDF.",
                    tech: "Next.js • Supabase",
                    image: destacaaiImg,
                    link: "https://destacaai.dgsolutionweb.com"
                },
                {
                    id: 3,
                    title: "Buscador de CEPs FERA",
                    category: "Ferramenta Web",
                    description: "Um buscador de CEPs completo e funcional com integração à API do Google Maps para localização precisa.",
                    tech: "React • Google Maps API",
                    image: cepsFeraImg,
                    link: "https://ceps-fera.vercel.app"
                },

                {
                    id: 5,
                    title: "Extensão de Prospecção Maps",
                    category: "Extensão Browser",
                    description: "Extensão publica para navegadores, onde podem extrair dados das empresas da cidade atraves do google maps",
                    tech: "Javascript • Chrome API",
                    image: [extrator1, extrator2],
                    link: "/ext-prospecao.zip"
                },
                {
                    id: 6,
                    title: "Oficina Mecânica",
                    category: "Website",
                    description: "Site feito para oficina mecânica, utilizando Vite, React e TypeScript.",
                    tech: "Vite • React • TypeScript",
                    image: mecanicaImg,
                    link: "https://oficina.dgsolutionweb.com"
                },
                {
                    id: 7,
                    title: "Medimind",
                    category: "App Mobile",
                    description: "Aplicativo de lembrete de medicamentos feito em React Native com Firebase.",
                    tech: "React Native • Firebase",
                    image: medicamentoImg,
                    link: "https://lembrei.dgsolutionweb.com"
                },
                {
                    id: 9,
                    title: "Restaurante",
                    category: "Website",
                    description: "Site feito para um restaurante.",
                    tech: "React • CSS",
                    image: restauranteImg,
                    link: "https://madremia.dgsolutionweb.com"
                }
            ]
        },
        contact: {
            label: "03 / CONTATO",
            headline: "Vamos trabalhar juntos",
            or: "Ou envie uma mensagem diretamente:",
            whatsapp: "Falar no WhatsApp"
        }
    },
    en: {
        nav: {
            home: "Home",
            about: "About",
            works: "Works",
            contact: "Contact"
        },
        hero: {
            greeting: "Hello, I am",
            role: "Web Developer & AI Bot Specialist",
            scroll: "SCROLL"
        },
        about: {
            label: "01 / ABOUT",
            headline: "Specializing in robust web solutions and intelligent bot integrations.",
            description1: "I am a Web Developer and Node.js specialist with a focus on AI integrations. I build scalable SaaS platforms, e-commerce solutions, and intelligent assistants that drive business efficiency.",
            description2: "My expertise spans the full stack, from crafting responsive front-ends with Next.js to architecting complex back-end systems with PostgreSQL and AI models."
        },
        works: {
            label: "02 / WORKS",
            projects: [
                {
                    id: 2,
                    title: "DestacaAI",
                    category: "HR/Career Platform",
                    description: "Create resumes quickly, simply, and for free, and export as PDF.",
                    tech: "Next.js • Supabase",
                    image: destacaaiImg,
                    link: "https://destacaai.dgsolutionweb.com"
                },
                {
                    id: 3,
                    title: "FERA ZIP Code Search",
                    category: "Web Tool",
                    description: "A complete and functional ZIP code search tool with Google Maps API integration for precise localization.",
                    tech: "React • Google Maps API",
                    image: cepsFeraImg,
                    link: "https://ceps-fera.vercel.app"
                },

                {
                    id: 5,
                    title: "Maps Prospecting Extension",
                    category: "Browser Extension",
                    description: "Public browser extension to extract business data from city maps via Google Maps",
                    tech: "Javascript • Chrome API",
                    image: [extrator1, extrator2],
                    link: "/ext-prospecao.zip"
                },
                {
                    id: 6,
                    title: "Mechanic Workshop",
                    category: "Website",
                    description: "Website built for a mechanic workshop, using Vite, React, and TypeScript.",
                    tech: "Vite • React • TypeScript",
                    image: mecanicaImg,
                    link: "https://oficina.dgsolutionweb.com"
                },
                {
                    id: 7,
                    title: "Medimind",
                    category: "Mobile App",
                    description: "Medication reminder app built with React Native and Firebase.",
                    tech: "React Native • Firebase",
                    image: medicamentoImg,
                    link: "https://lembrei.dgsolutionweb.com"
                },
                {
                    id: 9,
                    title: "Restaurant",
                    category: "Website",
                    description: "Website built for a restaurant.",
                    tech: "React • CSS",
                    image: restauranteImg,
                    link: "https://madremia.dgsolutionweb.com"
                }
            ]
        },
        contact: {
            label: "03 / CONTACT",
            headline: "Let's work together",
            or: "Or send me a message directly:",
            whatsapp: "Contact on WhatsApp"
        }
    }
};
