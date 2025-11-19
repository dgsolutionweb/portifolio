import assistenteImg from '../assets/assistente.png';
import pdvImg from '../assets/PDV.png';
import storeImg from '../assets/store.png';
import turmaImg from '../assets/turma.png';

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
                    title: "TurmaBox",
                    category: "Plataforma EdTech",
                    description: "Plataforma de gestão e compartilhamento de material acadêmico. Organize, colabore e acelere o aprendizado.",
                    tech: "Next.js • PostgreSQL",
                    image: turmaImg,
                    link: "https://turmabox.com/"
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
                    id: 4,
                    title: "AI CEP Assistant",
                    category: "Bot IA",
                    description: "Assistente inteligente de WhatsApp para consulta de CEPs.",
                    tech: "Node.js • IA",
                    image: assistenteImg,
                    link: "https://wa.me/5517991129386"
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
                    title: "TurmaBox",
                    category: "EdTech Platform",
                    description: "Academic material management and sharing platform. Organize, collaborate, and accelerate learning.",
                    tech: "Next.js • PostgreSQL",
                    image: turmaImg,
                    link: "https://turmabox.com/"
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
                    id: 4,
                    title: "AI CEP Assistant",
                    category: "AI Bot",
                    description: "Intelligent WhatsApp assistant for city ZIP codes (CEP).",
                    tech: "Node.js • AI",
                    image: assistenteImg,
                    link: "https://wa.me/5517991129386"
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
