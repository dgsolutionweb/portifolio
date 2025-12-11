import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations, Translation } from '../utils/translations';

interface LanguageContextType {
    language: 'pt' | 'en';
    toggleLanguage: () => void;
    t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<'pt' | 'en'>('pt');

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'));
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
