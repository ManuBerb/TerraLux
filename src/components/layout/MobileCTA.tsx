import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MobileCTAProps {
  className?: string;
}

export function MobileCTA({ className }: MobileCTAProps) {
  const { t } = useTranslation();

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden ${className}`}>
      <div className="bg-background/95 backdrop-blur-md border-t border-border p-4 safe-area-inset-bottom">
        <Button variant="cta" size="lg" className="w-full" asChild>
          <Link to="/quote">
            {t('mobileCTA.button')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
