import { createContext } from "react";

/**
 * Dil bağlamı. Provider ve hook ayrı dosyalarda tutulur ki
 * Fast Refresh (react-refresh) kuralı ihlal edilmesin.
 */
export const LanguageContext = createContext(null);
