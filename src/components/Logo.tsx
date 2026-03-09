import { useTranslation } from 'react-i18next';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: 'dark' | 'light';
}

export function Logo({ className = '', iconOnly = false, variant = 'dark' }: LogoProps) {
  const { i18n } = useTranslation();
  const isFr = i18n.language?.startsWith('fr');
  const isLight = variant === 'light';
  const textFill = isLight ? '#ffffff' : '#404245';
  const chevronFills = isLight
    ? ['white', 'rgba(255,255,255,0.75)', 'rgba(255,255,255,0.5)']
    : ['#90a991', '#707b7c', '#4d5459'];

  if (iconOnly) {
    return (
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M250 50L50 150V235L250 135L450 235V150L250 50Z" fill="#90a991" />
        <path d="M250 180L50 280V365L250 265L450 365V280L250 180Z" fill="#707b7c" />
        <path d="M250 310L50 410V495L250 395L450 495V410L250 310Z" fill="#4d5459" />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Icon */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto shrink-0"
      >
        <path d="M250 50L50 150V235L250 135L450 235V150L250 50Z" fill="#90a991" />
        <path d="M250 180L50 280V365L250 265L450 365V280L250 180Z" fill="#707b7c" />
        <path d="M250 310L50 410V495L250 395L450 495V410L250 310Z" fill="#4d5459" />
      </svg>
      {/* Text */}
      <svg
        viewBox={isFr ? "0 0 600 160" : "0 0 430 160"}
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto shrink-0"
      >
        <text
          x={isFr ? "300" : "5"}
          y="95"
          fontFamily='"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
          fontWeight="800"
          fontSize="72"
          fill={textFill}
          textAnchor={isFr ? "middle" : "start"}
          letterSpacing="0.05em"
        >
          {isFr ? 'PAYSAGEMENT' : 'TERRALUX'}
        </text>
        <text
          x={isFr ? "300" : "5"}
          y="150"
          fontFamily='"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
          fontWeight="800"
          fontSize="42"
          fill={textFill}
          textAnchor={isFr ? "middle" : "start"}
          letterSpacing="0.12em"
        >
          {isFr ? 'TERRALUX INC.' : 'LANDSCAPE INC.'}
        </text>
      </svg>
    </div>
  );
}
