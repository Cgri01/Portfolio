import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANGUAGE, translations } from "./translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "portfolio-language";

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LANGUAGE;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && translations[stored]) return stored;

      const browserLang = (window.navigator.language || "").toLowerCase();
      if (browserLang.startsWith("en")) return "en";
    } catch (error) {
      console.warn("Dil tercihi okunamadı:", error);
    }

    return DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      console.warn("Dil tercihi kaydedilemedi:", error);
    }

    document.documentElement.lang = language;
    document.title = translations[language].meta.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", translations[language].meta.description);
    }
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
      toggleLanguage: () =>
        setLanguage((prev) => (prev === "tr" ? "en" : "tr")),
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage, LanguageProvider içinde kullanılmalıdır.");
  }

  return context;
};
