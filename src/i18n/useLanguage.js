import { useContext } from "react";
import { LanguageContext } from "./language-context";

/**
 * Aktif dili ve çeviri sözlüğünü döndürür.
 * LanguageProvider içinde kullanılmalıdır.
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage, LanguageProvider içinde kullanılmalıdır.");
  }

  return context;
};
