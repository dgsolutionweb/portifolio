
import pdvImg from '../assets/PDV.png';
import storeImg from '../assets/store.png';
import mapsImg from '../assets/maps_extractor_project.png';
import extrator1 from '../assets/extrator1.png';
import extrator2 from '../assets/extrator2.png';
import mecanicaImg from '../assets/mecanica.png';
import medicamentoImg from '../assets/medicamento.png';
import dgsolutionSiteImg from '../assets/dgsolution.png';
import restauranteImg from '../assets/restaurante.png';
import orcamentoImg from '../assets/orcamento.png';
import destacaaiImg from '../assets/destacaai.png';



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
                    id: 1,
                    title: "DG Solution Web",
                    category: "Plataforma SaaS",
                    description: "SaaS completo para gestão de vendas, estoque e relatórios. Dashboard em tempo real e suporte multiusuário.",
                    tech: "Next.js • PostgreSQL",
                    image: pdvImg,
                    link: "https://app.dgsolutionweb.com/"
                },
                {
                    id: 2,
                    title: "DestacaAI",
                    category: "Plataforma RH/Carreira",
                    description: "Gere currículos gratuitamente, baixe em PDF e utilize um Agente de IA (Especialista Senior em Contratação) para analisar e recriar seu currículo a partir de PDF ou texto, melhorando sua apresentação profissional.",
                    tech: "Next.js • Supabase • IA",
                    image: destacaaiImg,
                    link: "https://destacaai.dgsolutionweb.com"
                },

                {
                    id: 3,
                    title: "ConsertaPro Store",
                    category: "E-commerce",
                    description: "Loja de acessórios com painel administrativo, gestão de afiliados e relatórios automáticos de cupons.",
                    tech: "Next.js • PostgreSQL",
                    image: storeImg,
                    link: "https://store.consertapro.com/"
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
                    id: 8,
                    title: "DG Solution Institucional",
                    category: "Website",
                    description: "Site feito para empresa de desenvolvimento web.",
                    tech: "React • Tailwind",
                    image: dgsolutionSiteImg,
                    link: "https://dgsolutionweb.com"
                },
                {
                    id: 9,
                    title: "Restaurante",
                    category: "Website",
                    description: "Site feito para um restaurante.",
                    tech: "React • CSS",
                    image: restauranteImg,
                    link: "https://madremia.dgsolutionweb.com"
                },
                {
                    id: 10,
                    title: "OrçaFlow",
                    category: "Plataforma SaaS",
                    description: "Plataforma OrçaFlow feita para gerenciamento inteligente de orçamentos.",
                    tech: "Next.js • Supabase",
                    image: orcamentoImg,
                    link: "https://orcaflow.dgsolutionweb.com"
                }
            ]
        },
        contact: {
            label: "03 / CONTATO",
            headline: "Vamos trabalhar juntos",
            or: "Ou envie uma mensagem diretamente:"
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
                    id: 1,
                    title: "DG Solution Web",
                    category: "SaaS Platform",
                    description: "Complete SaaS for sales, inventory, and reporting management. Real-time dashboard and multi-user support.",
                    tech: "Next.js • PostgreSQL",
                    image: pdvImg,
                    link: "https://app.dgsolutionweb.com/"
                },
                {
                    id: 2,
                    title: "DestacaAI",
                    category: "HR/Career Platform",
                    description: "Create resumes for free, download as PDF, and use an AI Agent (Senior Hiring Specialist) to analyze and rebuild your resume from PDF or text, enhancing your professional presentation.",
                    tech: "Next.js • Supabase • AI",
                    image: destacaaiImg,
                    link: "https://destacaai.dgsolutionweb.com"
                },

                {
                    id: 3,
                    title: "ConsertaPro Store",
                    category: "E-commerce",
                    description: "Accessories store with admin panel, affiliate management, and automatic coupon reporting.",
                    tech: "Next.js • PostgreSQL",
                    image: storeImg,
                    link: "https://store.consertapro.com/"
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
                    id: 8,
                    title: "DG Solution Corporate",
                    category: "Website",
                    description: "Website built for a web development company.",
                    tech: "React • Tailwind",
                    image: dgsolutionSiteImg,
                    link: "https://dgsolutionweb.com"
                },
                {
                    id: 9,
                    title: "Restaurant",
                    category: "Website",
                    description: "Website built for a restaurant.",
                    tech: "React • CSS",
                    image: restauranteImg,
                    link: "https://madremia.dgsolutionweb.com"
                },
                {
                    id: 10,
                    title: "OrçaFlow",
                    category: "SaaS Platform",
                    description: "OrçaFlow platform built for intelligent budget management.",
                    tech: "Next.js • Supabase",
                    image: orcamentoImg,
                    link: "https://orcaflow.dgsolutionweb.com"
                }
            ]
        },
        contact: {
            label: "03 / CONTACT",
            headline: "Let's work together",
            or: "Or send me a message directly:"
        }
    }
};
