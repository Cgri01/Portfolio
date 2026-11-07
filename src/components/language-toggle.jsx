import { useLanguage } from "../i18n/LanguageContext";
import { LANGUAGES } from "../i18n/translations";

/**
 * Sağ üst köşede sabit duran TR / EN dil değiştirme butonu.
 * Mevcut UI yapısına dokunmaz, yalnızca dil değiştirir.
 */
const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className="fixed top-4 right-16 md:top-6 md:right-6 z-[60] flex items-center gap-1 p-1 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full shadow-md"
      role="group"
      aria-label={t.language.label}
    >
      {LANGUAGES.map((lang) => {
        const isActive = language === lang.code;

        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            aria-pressed={isActive}
            title={lang.full}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
