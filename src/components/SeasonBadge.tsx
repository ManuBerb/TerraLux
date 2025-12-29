import { Flower2, Sun, Leaf, Calendar } from 'lucide-react';

export type Season = 'spring' | 'summer' | 'fall' | 'year-round';

interface SeasonBadgeProps {
  season: Season;
}

const seasonConfig: Record<Season, { icon: typeof Flower2; label: string; className: string }> = {
  spring: {
    icon: Flower2,
    label: 'Spring',
    className: 'bg-pink-100 text-pink-700 border-pink-200',
  },
  summer: {
    icon: Sun,
    label: 'Summer',
    className: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  fall: {
    icon: Leaf,
    label: 'Fall',
    className: 'bg-orange-100 text-orange-700 border-orange-200',
  },
  'year-round': {
    icon: Calendar,
    label: 'Year-round',
    className: 'bg-secondary text-primary border-border',
  },
};

export function SeasonBadge({ season }: SeasonBadgeProps) {
  const config = seasonConfig[season];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${config.className}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

interface SeasonBadgesProps {
  seasons: Season[];
}

export function SeasonBadges({ seasons }: SeasonBadgesProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {seasons.map((season) => (
        <SeasonBadge key={season} season={season} />
      ))}
    </div>
  );
}
