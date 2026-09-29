import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLocale, setLocale, t as translateFn, isRTL as checkRTL, SUPPORTED_LANGUAGES, initLocale } from '../i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLocale, setCurrentLocale] = useState(getLocale());
  const [isRtlLayout, setIsRtlLayout] = useState(checkRTL());

  useEffect(() => {
    initLocale().then((loc) => {
      setCurrentLocale(loc);
      setIsRtlLayout(checkRTL());
    });
  }, []);

  const changeLanguage = async (code) => {
    await setLocale(code);
    setCurrentLocale(code);
    setIsRtlLayout(checkRTL());
  };

  const t = (key, fallback = '') => {
    return translateFn(key, fallback);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLocale,
        isRtlLayout,
        changeLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
