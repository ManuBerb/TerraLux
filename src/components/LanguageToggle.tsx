import { useTranslation } from 'react-i18next';

interface LanguageToggleProps {
  variant?: 'default' | 'light';
}

export function LanguageToggle({ variant = 'default' }: LanguageToggleProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === 'en' ? 'fr' : 'en');
  };

  const isLight = variant === 'light';

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-xs font-display font-semibold transition-colors ${
        isLight
          ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
          : 'border-border bg-secondary text-foreground hover:bg-secondary/80'
      }`}
      aria-label="Toggle language"
    >
      <span className={currentLang === 'en' ? 'opacity-100' : 'opacity-50'}>EN</span>
      <span className={isLight ? 'text-white/50' : 'text-muted-foreground'}>/</span>
      <span className={currentLang === 'fr' ? 'opacity-100' : 'opacity-50'}>FR</span>
    </button>
  );
}
