import React, { createContext, useState, useContext } from 'react';
import translations from './i18n/translations';

interface LanguageContextProps {
  language: 'vi' | 'en';
  setLanguage: (lang: 'vi' | 'en') => void;
  t: typeof translations['vi']; // Type for translations
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');

  const value = {
    language,
    setLanguage,
    t: translations[language], // Provide translations based on the current language
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};