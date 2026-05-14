import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Target, Compass, Calculator, Search, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useKyc } from '@/hooks/useKyc';
import { SIPUserState } from './SIPUserStateSwitcher';

interface HomeOnboardingPanelProps {
  userState: SIPUserState;
  onNavigateTab: (tab: string) => void;
  onSignIn?: () => void;
}

/**
 * State-aware onboarding hero shown on Home for non-investors.
 * - anonymous: 4-step "Start Your Wealth Journey" + discovery quick actions
 * - logged_in_no_holdings: KYC-aware "You're 1 step away" + invest-leaning quick actions
 */
export function HomeOnboardingPanel({ userState, onNavigateTab, onSignIn }: HomeOnboardingPanelProps) {
  const { isKycDone } = useKyc();
  const isAnon = userState === 'anonymous';

  // Checklist state — purely demo-derived for now
  const steps = [
    { id: 'signin', label: isAnon ? 'Sign in / Sign up' : 'Account verified', done: !isAnon, action: () => onSignIn?.() },
    { id: 'kyc', label: 'Complete KYC', done: isKycDone, action: () => onNavigateTab('profile') },
    { id: 'goal', label: 'Define your first goal', done: false, action: () => onNavigateTab('goals') },
    { id: 'invest', label: 'Make your first investment', done: false, action: () => onNavigateTab('buy') },
  ];
  const completed = steps.filter(s => s.done).length;
  const pct = Math.round((completed / steps.length) * 100);

  const headline = isAnon
    ? 'Start your wealth journey'
    : completed === steps.length - 1
      ? "You're 1 step away from your first investment"
      : 'A few quick steps to get you investing';
  const sub = isAnon
    ? 'Sign in, complete KYC, set a goal, invest. We guide you end-to-end.'
    : 'Your Wealth Copilot will hand-hold each step. Start with whichever is next.';

  // Quick action tiles — reordered by state intent
  const tiles = isAnon
    ? [
        { label: 'Define a Goal', emoji: '🎯', tab: 'goals', tone: 'blue' },
        { label: 'Discover Funds', emoji: '🔍', tab: 'screener', tone: 'green' },
        { label: 'Plan for Goals', emoji: '🧭', tab: 'calculator', tone: 'amber' },
        { label: 'Calculate Returns', emoji: '🧮', tab: 'calculator', tone: 'pink' },
        { label: 'Fund Search', emoji: '⚙️', tab: 'screener', tone: 'purple' },
        { label: 'Ask Copilot', emoji: '💬', tab: 'chat', tone: 'blue' },
      ]
    : [
        { label: isKycDone ? 'Define a Goal' : 'Complete KYC', emoji: isKycDone ? '🎯' : '🛡️', tab: isKycDone ? 'goals' : 'profile', tone: 'blue' },
        { label: 'Discover Funds', emoji: '🔍', tab: 'screener', tone: 'green' },
        { label: 'Calculate Returns', emoji: '🧮', tab: 'calculator', tone: 'pink' },
        { label: 'Plan for Goals', emoji: '🧭', tab: 'calculator', tone: 'amber' },
        { label: 'I want to Invest', emoji: '💰', tab: 'buy', tone: 'purple' },
        { label: 'Ask Copilot', emoji: '💬', tab: 'chat', tone: 'green' },
      ];

  const toneClass: Record<string, string> = {
    blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-900',
    green: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-900',
    amber: 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-900',
    pink: 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-900',
    purple: 'bg-violet-50 hover:bg-violet-100 border-violet-200 text-violet-900',
  };

  return (
    <div className="space-y-3">
      {/* Journey checklist */}
      <Card className="border-sip-border overflow-hidden bg-gradient-to-br from-sip-brand/5 via-background to-background">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-sip-brand" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-sip-brand">Action Center</span>
              </div>
              <h2 className="text-base font-bold text-sip-text-primary">{headline}</h2>
              <p className="text-xs text-sip-text-muted mt-0.5">{sub}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] text-muted-foreground">Progress</p>
              <p className="text-sm font-bold text-sip-brand">{completed}/{steps.length}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-sip-brand transition-all" style={{ width: `${pct}%` }} />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {steps.map((s) => (
              <button
                key={s.id}
                onClick={s.action}
                disabled={s.done}
                className={cn(
                  'flex items-center gap-2 text-left px-2.5 py-2 rounded-md border transition-colors',
                  s.done
                    ? 'border-emerald-200 bg-emerald-50/60 text-emerald-900 cursor-default'
                    : 'border-sip-border bg-background hover:border-sip-brand hover:bg-sip-brand/5'
                )}
              >
                {s.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
                <span className={cn('text-xs flex-1 truncate', s.done && 'line-through opacity-70')}>{s.label}</span>
                {!s.done && <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick action tiles */}
      <div>
        <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1.5 px-1">
          Quick actions
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {tiles.map((t) => (
            <button
              key={t.label}
              onClick={() => onNavigateTab(t.tab)}
              className={cn(
                'flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border text-center transition-all hover:scale-[1.02] hover:shadow-sm',
                toneClass[t.tone]
              )}
            >
              <span className="text-2xl leading-none">{t.emoji}</span>
              <span className="text-[11px] font-semibold leading-tight">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
