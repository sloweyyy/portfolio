import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from '../data/locales/en.json';
import vi from '../data/locales/vi.json';

const translations = { en, vi };

const LanguageContext = createContext();

// Detect browser language, defaulting to 'en'
const detectBrowserLanguage = () => {
    if (typeof window === 'undefined') return 'en';
    
    const stored = localStorage.getItem('portfolio-lang');
    if (stored && (stored === 'en' || stored === 'vi')) {
        return stored;
    }
    
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('vi')) {
        return 'vi';
    }
    return 'en';
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLangState] = useState('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const detectedLang = detectBrowserLanguage();
        setLangState(detectedLang);
        setMounted(true);
    }, []);

    const setLang = useCallback((newLang) => {
        if (newLang === 'en' || newLang === 'vi') {
            setLangState(newLang);
            if (typeof window !== 'undefined') {
                localStorage.setItem('portfolio-lang', newLang);
            }
        }
    }, []);

    const toggleLang = useCallback(() => {
        setLang(lang === 'en' ? 'vi' : 'en');
    }, [lang, setLang]);

    // Translation function with nested key support (e.g., 'nav.home')
    const t = useCallback((key, fallback = '') => {
        const keys = key.split('.');
        let value = translations[lang];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return fallback || key;
            }
        }
        
        return value;
    }, [lang]);

    // Get array of translations (e.g., for roles)
    const tArray = useCallback((key) => {
        const result = t(key, []);
        return Array.isArray(result) ? result : [];
    }, [t]);

    // Get object from translations
    const tObject = useCallback((key) => {
        const result = t(key, {});
        return typeof result === 'object' && !Array.isArray(result) ? result : {};
    }, [t]);

    const value = {
        lang,
        setLang,
        toggleLang,
        t,
        tArray,
        tObject,
        mounted,
        isVietnamese: lang === 'vi',
        isEnglish: lang === 'en',
    };

    return (
        <LanguageContext.Provider value={value}>
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

export default LanguageContext;
