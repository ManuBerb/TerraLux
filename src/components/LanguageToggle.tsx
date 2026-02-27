import { useTranslation } from 'react-i18next';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === 'en' ? 'fr' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-border bg-secondary text-foreground text-xs font-display font-semibold hover:bg-secondary/80 transition-colors"
      aria-label="Toggle language"
    >
      <span className={currentLang === 'en' ? 'opacity-100' : 'opacity-50'}>EN</span>
      <span className="text-muted-foreground">/</span>
      <span className={currentLang === 'fr' ? 'opacity-100' : 'opacity-50'}>FR</span>
    </button>
  );
}
