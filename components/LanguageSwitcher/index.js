import React from 'react';
import { useLanguage } from '../../utils/i18n';

const LanguageSwitcher = ({ className = '' }) => {
    const { lang, toggleLang, mounted } = useLanguage();

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <button 
                className={`font-heading font-bold uppercase text-sm px-3 py-1.5 border-2 border-neo-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all rounded-md ${className}`}
                disabled
            >
                <span className="opacity-50">EN</span>
            </button>
        );
    }

    return (
        <button 
            onClick={toggleLang}
            className={`font-heading font-bold uppercase text-sm px-3 py-1.5 border-2 border-neo-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all rounded-md flex items-center gap-1.5 ${className}`}
            aria-label={lang === 'en' ? 'Switch to Vietnamese' : 'Switch to English'}
            title={lang === 'en' ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}
        >
            <span className="text-base">{lang === 'en' ? '🇺🇸' : '🇻🇳'}</span>
            <span>{lang.toUpperCase()}</span>
        </button>
    );
};

export default LanguageSwitcher;
