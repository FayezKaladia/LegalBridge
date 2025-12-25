import { AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DisclaimerBannerProps {
  variant?: 'warning' | 'info';
  className?: string;
}

export function DisclaimerBanner({ variant = 'warning', className }: DisclaimerBannerProps) {
  const isWarning = variant === 'warning';
  
  return (
    <div 
      className={cn(
        "flex items-start gap-3 rounded-lg px-4 py-3 text-sm",
        isWarning 
          ? "bg-warning/10 border border-warning/30 text-foreground" 
          : "bg-info/10 border border-info/30 text-foreground",
        className
      )}
    >
      {isWarning ? (
        <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
      ) : (
        <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
      )}
      <p>
        <strong>Important:</strong> LegalBridge provides legal guidance and case preparation assistance only. 
        This is <strong>not legal representation</strong>. For court matters or complex legal issues, 
        please consult a licensed advocate.
      </p>
    </div>
  );
}
