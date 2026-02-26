import { cn } from '@/lib/utils';

interface TerraluxLogoProps {
  variant?: 'full' | 'icon';
  light?: boolean;
  className?: string;
}

export function TerraluxLogo({ variant = 'full', light = false, className }: TerraluxLogoProps) {
  const textColor = light ? '#FFFFFF' : 'hsl(210, 10%, 18%)';
  const subtitleColor = light ? 'rgba(255,255,255,0.7)' : 'hsl(210, 10%, 45%)';

  return (
    <svg
      viewBox={variant === 'full' ? '0 0 280 60' : '0 0 60 60'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-10', className)}
      aria-label="Terralux Landscape"
    >
      {/* Three stacked chevrons */}
      <g>
        {/* Top chevron - Sage Green */}
        <path
          d="M10 12 L30 4 L50 12 L30 20 Z"
          fill="hsl(145, 30%, 50%)"
        />
        {/* Middle chevron - Muted Green */}
        <path
          d="M10 24 L30 16 L50 24 L30 32 Z"
          fill="hsl(160, 15%, 42%)"
        />
        {/* Bottom chevron - Dark Slate */}
        <path
          d="M10 36 L30 28 L50 36 L30 44 Z"
          fill="hsl(200, 12%, 25%)"
        />
      </g>

      {variant === 'full' && (
        <g>
          {/* TERRALUX text */}
          <text
            x="62"
            y="28"
            fontFamily="'Outfit', system-ui, sans-serif"
            fontSize="22"
            fontWeight="700"
            letterSpacing="1.5"
            fill={textColor}
          >
            TERRALUX
          </text>
          {/* LANDSCAPE subtitle */}
          <text
            x="62"
            y="44"
            fontFamily="'Outfit', system-ui, sans-serif"
            fontSize="10"
            fontWeight="500"
            letterSpacing="3.5"
            fill={subtitleColor}
          >
            LANDSCAPE
          </text>
        </g>
      )}
    </svg>
  );
}
