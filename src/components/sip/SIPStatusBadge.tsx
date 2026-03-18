import { cn } from '@/lib/utils';

/**
 * Centralized status badge — all status colors come from --sip-* tokens.
 * Change the token values in index.css to retheme globally.
 */

const statusStyles: Record<string, { label: string; classes: string }> = {
  ACTIVE: {
    label: 'Active',
    classes: 'bg-sip-action-success-light text-sip-action-success-foreground',
  },
  PAUSED: {
    label: 'Paused',
    classes: 'bg-sip-action-warning-light text-sip-action-warning-foreground',
  },
  CANCELLED: {
    label: 'Cancelled',
    classes: 'bg-sip-action-danger-light text-sip-action-danger-foreground',
  },
  CREATED: {
    label: 'Pending Setup',
    classes: 'bg-sip-action-info-light text-sip-action-info-foreground',
  },
  PENDING: {
    label: 'Pending',
    classes: 'bg-sip-action-info-light text-sip-action-info-foreground',
  },
  // Transaction statuses
  Completed: {
    label: 'Completed',
    classes: 'bg-sip-action-success-light text-sip-action-success-foreground',
  },
  Pending: {
    label: 'Pending',
    classes: 'bg-sip-action-warning-light text-sip-action-warning-foreground',
  },
  Failed: {
    label: 'Failed',
    classes: 'bg-sip-action-danger-light text-sip-action-danger-foreground',
  },
};

interface SIPStatusBadgeProps {
  status: string;
  className?: string;
}

export function SIPStatusBadge({ status, className }: SIPStatusBadgeProps) {
  const style = statusStyles[status] || statusStyles.ACTIVE;
  return (
    <span
      className={cn(
        'text-[10px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap',
        style.classes,
        className
      )}
    >
      {style.label}
    </span>
  );
}

/** Transaction type icon colors */
export const txTypeColors: Record<string, string> = {
  Buy: 'text-sip-action-success-foreground bg-sip-action-success-light',
  SIP: 'text-sip-action-info-foreground bg-sip-action-info-light',
  Sell: 'text-sip-action-danger-foreground bg-sip-action-danger-light',
  Switch: 'text-sip-action-warning-foreground bg-sip-action-warning-light',
};

/** Risk level colors */
export const riskLevelColors: Record<string, string> = {
  Low: 'text-sip-action-success-foreground bg-sip-action-success-light',
  Moderate: 'text-sip-action-warning-foreground bg-sip-action-warning-light',
  High: 'text-sip-action-danger-foreground bg-sip-action-danger-light',
  'Very High': 'text-sip-action-danger-foreground bg-sip-action-danger-light',
};

/** Banner colors */
export const bannerStyles: Record<string, string> = {
  success: 'bg-sip-action-success-light text-sip-action-success-foreground border-sip-action-success-border',
  info: 'bg-sip-action-info-light text-sip-action-info-foreground border-sip-action-info-border',
  error: 'bg-sip-action-danger-light text-sip-action-danger-foreground border-sip-action-danger-border',
  warning: 'bg-sip-action-warning-light text-sip-action-warning-foreground border-sip-action-warning-border',
};
