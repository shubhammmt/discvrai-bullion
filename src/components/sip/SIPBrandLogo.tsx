import { cn } from '@/lib/utils';
import { SIP_LOGO_ICON } from '@/config/sipBrandConfig';

interface SIPBrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { container: 'w-7 h-7', icon: 'w-3.5 h-3.5' },
  md: { container: 'w-8 h-8', icon: 'w-4 h-4' },
  lg: { container: 'w-9 h-9', icon: 'w-5 h-5' },
};

export function SIPBrandLogo({ size = 'md', className }: SIPBrandLogoProps) {
  const Icon = SIP_LOGO_ICON;
  const s = sizeMap[size];

  return (
    <div
      className={cn(
        'rounded-lg bg-sip-brand flex items-center justify-center shrink-0',
        s.container,
        className
      )}
    >
      <Icon className={cn(s.icon, 'text-sip-brand-foreground')} />
    </div>
  );
}

/** Round variant for chat avatars */
export function SIPChatAvatar({ size = 'md', className }: SIPBrandLogoProps) {
  const Icon = SIP_LOGO_ICON;
  const s = sizeMap[size];

  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-br from-sip-brand to-sip-brand/60 flex items-center justify-center shadow-md shrink-0',
        s.container,
        className
      )}
    >
      <Icon className={cn(s.icon, 'text-sip-brand-foreground')} />
    </div>
  );
}
