import { User, UserCheck, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SIPUserState = 'anonymous' | 'logged_in_no_holdings' | 'investor';

interface SIPUserStateSwitcherProps {
  userState: SIPUserState;
  onUserStateChange: (state: SIPUserState) => void;
}

const states: { value: SIPUserState; label: string; icon: typeof User; desc: string }[] = [
  { value: 'anonymous', label: 'Visitor', icon: User, desc: 'Not logged in' },
  { value: 'logged_in_no_holdings', label: 'New User', icon: UserCheck, desc: 'No investments' },
  { value: 'investor', label: 'Investor', icon: Briefcase, desc: 'Has holdings' },
];

export function SIPUserStateSwitcher({ userState, onUserStateChange }: SIPUserStateSwitcherProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl p-2">
        <p className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider text-center mb-1.5">Demo Mode</p>
        <div className="flex gap-1">
          {states.map(s => {
            const Icon = s.icon;
            const isActive = userState === s.value;
            return (
              <button
                key={s.value}
                onClick={() => onUserStateChange(s.value)}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg text-[9px] font-medium transition-all',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted/50'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
