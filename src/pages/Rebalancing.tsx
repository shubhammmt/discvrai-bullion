import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home, ShoppingCart, Search, Settings, Calculator, Target, ArrowDownLeft,
  Bell, BarChart3, FileText, Receipt, MessageSquare, UserCircle,
  PanelLeft, PanelLeftClose, LogIn, Plus, Heart, Inbox, Bot,
  Scale, ChevronRight, ChevronLeft, Lock, Shield, TrendingUp, TrendingDown,
  Sparkles, CheckCircle2, AlertTriangle, ArrowRightLeft, Loader2, Check,
  Info, RefreshCw, Replace,
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart,
} from 'recharts';
import { SIPBrandLogo } from '@/components/sip/SIPBrandLogo';
import { SIP_BRAND } from '@/config/sipBrandConfig';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

// ============ Phases ============
type Phase = 'teaser' | 'wizard' | 'dashboard' | 'action';

// ============ Wizard ============
type Horizon = '<3' | '3-7' | '7+';
type Reaction = 'sell' | 'hold' | 'buy';
type Income = 'unstable' | 'stable';
type Goal = 'preserve' | 'steady' | 'maximize';
type Knowledge = 'beginner' | 'advanced';

interface RiskAnswers {
  horizon?: Horizon;
  reaction?: Reaction;
  income?: Income;
  goal?: Goal;
  knowledge?: Knowledge;
}

// ============ Component ============
export default function Rebalancing() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [phase, setPhase] = useState<Phase>('teaser');
  const [sessionId] = useState('03826ACD');

  useEffect(() => { if (isMobile) setSidebarOpen(false); }, [isMobile]);

  // ============ Sidebar nav ============
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, route: '/alerts' },
    { id: 'portfolio', label: 'Portfolio', icon: BarChart3, disabled: true },
    { id: 'invest', label: 'Invest', icon: ShoppingCart, disabled: true },
    { id: 'search', label: 'Search', icon: Search, disabled: true },
    { id: 'transactions', label: 'Transactions', icon: Receipt, disabled: true },
    { id: 'sips', label: 'SIPs', icon: Settings, disabled: true },
    { id: 'statements', label: 'Statements', icon: FileText, disabled: true },
    { id: 'calculator', label: 'Calculator', icon: Calculator, disabled: true },
    { id: 'goals', label: 'Goals', icon: Target, disabled: true },
    { id: 'rebalancing', label: 'Portfolio Rebalancing', icon: Scale, route: '/rebalancing', badge: 'New' },
    { id: 'alerts', label: 'Alerts & digests', icon: Bell, route: '/alerts' },
    { id: 'tracked', label: 'Tracked instruments', icon: Heart, route: '/alerts' },
    { id: 'inbox', label: 'Notification inbox', icon: Inbox, route: '/alerts', badge: phase === 'dashboard' ? '1' : undefined, badgeTone: 'danger' as const },
    { id: 'sell', label: 'Sell', icon: ArrowDownLeft, disabled: true },
    { id: 'chat', label: 'Chat History', icon: MessageSquare, disabled: true },
    { id: 'profile', label: 'Profile', icon: UserCircle, route: '/alerts' },
  ];

  const handleNav = (item: typeof navItems[number]) => {
    if (item.disabled) {
      toast({ title: 'Demo module', description: 'This section lives in the full Wealth Platform.' });
      return;
    }
    if (item.id === 'rebalancing') return;
    if (item.route) navigate(item.route);
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ============ Sidebar ============ */}
      <aside className={cn(
        'bg-sip-sidebar-bg border-r border-sip-border flex flex-col shrink-0 transition-all duration-200 z-50',
        isMobile ? 'fixed inset-y-0 left-0 w-64' : sidebarOpen ? 'w-60' : 'w-14',
        isMobile && !sidebarOpen && '-translate-x-full',
      )}>
        <div className="flex items-center gap-2 px-3 py-4 border-b border-sip-border">
          {(sidebarOpen || isMobile) && (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <SIPBrandLogo size="md" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-sip-text-primary truncate">{SIP_BRAND.name}</p>
                <p className="text-[10px] text-sip-text-muted uppercase tracking-wider">Wealth Platform</p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {navItems.map(item => {
            const isActive = item.id === 'rebalancing';
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item)}
                className={cn(
                  'w-full flex items-center gap-3 rounded-lg text-sm font-medium transition-colors relative',
                  sidebarOpen || isMobile ? 'px-3 py-2' : 'px-0 py-2 justify-center',
                  isActive
                    ? 'bg-sip-brand text-sip-brand-foreground'
                    : item.disabled
                      ? 'text-sip-text-muted hover:bg-sip-sidebar-hover'
                      : 'text-sip-text-secondary hover:bg-sip-sidebar-hover hover:text-sip-text-primary',
                )}
                title={!sidebarOpen && !isMobile ? item.label : undefined}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {(sidebarOpen || isMobile) && (
                  <>
                    <span className="truncate flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        'text-[9px] font-bold px-1.5 py-0.5 rounded-full',
                        item.badgeTone === 'danger'
                          ? 'bg-red-500 text-white'
                          : isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-sip-brand/15 text-sip-brand',
                      )}>{item.badge}</span>
                    )}
                  </>
                )}
              </button>
            );
          })}

          <div className="pt-2 mt-2 border-t border-sip-border">
            <button
              onClick={() => navigate('/alerts')}
              className={cn(
                'w-full flex items-center gap-3 rounded-lg text-sm font-medium transition-colors',
                sidebarOpen || isMobile ? 'px-3 py-2' : 'px-0 py-2 justify-center',
                'text-sip-brand hover:bg-sip-brand/10',
              )}
            >
              <Plus className="w-4 h-4 shrink-0" />
              {(sidebarOpen || isMobile) && <span className="truncate">+ New Chat</span>}
            </button>
          </div>
        </nav>

        {(sidebarOpen || isMobile) && (
          <div className="border-t border-sip-border p-3">
            <Button variant="outline" size="sm" className="w-full justify-start gap-2 h-9">
              <LogIn className="w-3.5 h-3.5" /> Sign In
            </Button>
          </div>
        )}
      </aside>

      {/* ============ Main ============ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="border-b border-sip-border bg-background px-4 md:px-6 h-14 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {!sidebarOpen && !isMobile && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSidebarOpen(true)}>
                <PanelLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="w-8 h-8 rounded-lg bg-sip-brand text-sip-brand-foreground flex items-center justify-center shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <h1 className="text-base md:text-lg font-semibold text-sip-text-primary truncate">
              Portfolio Rebalancing
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="hidden sm:inline text-[10px] font-semibold tracking-wider text-sip-text-muted">
              ID: <span className="text-sip-text-secondary">{sessionId}</span>
            </span>
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-[11px] uppercase tracking-wider text-sip-brand font-semibold">
              <Plus className="w-3.5 h-3.5" /> New Chat
            </Button>
            <button
              className="relative h-8 w-8 flex items-center justify-center rounded-lg hover:bg-sip-sidebar-hover"
              onClick={() => navigate('/alerts')}
              aria-label="Open inbox"
            >
              <Bell className="w-4 h-4 text-sip-text-secondary" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-sip-brand" />
            </button>
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 overflow-y-auto">
          {phase === 'teaser' && <TeaserPhase onStart={() => setPhase('wizard')} />}
          {phase === 'wizard' && <WizardPhase onActivate={() => setPhase('dashboard')} onCancel={() => setPhase('teaser')} />}
          {phase === 'dashboard' && <DashboardPhase onSimulateDrift={() => setPhase('action')} />}
          {phase === 'action' && <ActionPhase onBack={() => setPhase('dashboard')} />}
        </main>

        {/* Footer */}
        <footer className="border-t border-sip-border px-6 py-2.5 text-[11px] text-sip-text-muted text-center shrink-0">
          <span className="text-sip-brand font-medium">AI-powered</span>
          <span className="mx-2">·</span>
          <span>Your data is secure</span>
          <span className="mx-2">·</span>
          <span>Not financial advice</span>
        </footer>
      </div>
    </div>
  );
}

// ============================================================
// PHASE 1 — TEASER
// ============================================================
function TeaserPhase({ onStart }: { onStart: () => void }) {
  const baseSeries = useMemo(() => {
    const data = [];
    let v = 100;
    for (let i = 0; i < 36; i++) {
      v += (Math.sin(i / 3) * 1.2) + (Math.random() - 0.45) * 1.8;
      data.push({ m: i, current: Math.round(v * 10) / 10, optimized: Math.round((v + i * 0.55) * 10) / 10 });
    }
    return data;
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="outline" className="border-sip-brand/30 text-sip-brand bg-sip-brand/5">
          <Sparkles className="w-3 h-3 mr-1" /> Smart Brain · Always-on monitoring
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold text-sip-text-primary tracking-tight">
          Automated Portfolio Optimization
        </h2>
        <p className="text-sm md:text-base text-sip-text-secondary leading-relaxed">
          Protect your investments from silent decay. Our Smart Brain constantly tracks drift and provides
          one-click rebalancing advice (including smart swaps) to maximize your risk-adjusted returns.
        </p>
      </div>

      {/* Value scorecard */}
      <Card className="border-sip-border overflow-hidden">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-sip-text-muted font-semibold">Preview</p>
              <h3 className="text-lg font-semibold text-sip-text-primary">Your Potential Health Score</h3>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
              +28% projected lift
            </Badge>
          </div>

          {/* Chart with blurred current vs sharp optimized */}
          <div className="relative h-56 rounded-xl bg-gradient-to-br from-sip-brand/5 to-transparent border border-sip-border p-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={baseSeries} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="optGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--sip-brand-primary))" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(var(--sip-brand-primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" hide />
                <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                {/* Blurred current line */}
                <Line
                  type="monotone" dataKey="current" stroke="#9ca3af" strokeWidth={2}
                  dot={false} strokeDasharray="3 3" style={{ filter: 'blur(2px)', opacity: 0.7 }}
                />
                {/* Sharp optimized line */}
                <Area type="monotone" dataKey="optimized" stroke="hsl(var(--sip-brand-primary))" strokeWidth={2.5} fill="url(#optGrad)" />
                <Tooltip
                  contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid hsl(var(--sip-border))' }}
                  labelFormatter={() => ''}
                  formatter={(v: number, n) => [v, n === 'optimized' ? 'Optimized' : 'Current (drifting)']}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="absolute top-3 left-4 flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-sip-text-muted">
                <span className="w-3 h-0.5 bg-gray-400 rounded" style={{ filter: 'blur(1px)' }} /> Current (drifting)
              </span>
              <span className="flex items-center gap-1.5 text-sip-brand font-medium">
                <span className="w-3 h-0.5 bg-sip-brand rounded" /> Optimized
              </span>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <MetricCard
              icon={<TrendingUp className="w-4 h-4 text-emerald-600" />}
              label="Projected Sharpe Improvement"
              value="+0.4x"
              tone="emerald"
            />
            <MetricCard
              icon={<Shield className="w-4 h-4 text-sip-brand" />}
              label="Tracking Error Volatility"
              value="Low"
              tone="brand"
            />
            <MetricCard
              icon={<ArrowRightLeft className="w-4 h-4 text-purple-600" />}
              label="Smart Swaps Available"
              value="2 of 7 funds"
              tone="purple"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-center pt-2">
        <Button
          size="lg"
          onClick={onStart}
          className="bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90 h-12 px-8 text-base font-semibold rounded-xl shadow-lg shadow-sip-brand/20"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Set Up Smart Rebalancing (5 min)
        </Button>
        <p className="text-xs text-sip-text-muted mt-3">
          Risk-aware · Cost-aware · You stay in control of every action.
        </p>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: 'emerald' | 'brand' | 'purple' }) {
  const toneCls = tone === 'emerald'
    ? 'bg-emerald-50 border-emerald-100'
    : tone === 'purple'
      ? 'bg-purple-50 border-purple-100'
      : 'bg-sip-brand/5 border-sip-brand/15';
  return (
    <div className={cn('rounded-xl border p-3', toneCls)}>
      <div className="flex items-center gap-2 mb-1.5">{icon}<span className="text-[11px] font-semibold uppercase tracking-wider text-sip-text-muted">{label}</span></div>
      <p className="text-lg font-bold text-sip-text-primary">{value}</p>
    </div>
  );
}

// ============================================================
// PHASE 2 — WIZARD
// ============================================================
function WizardPhase({ onActivate, onCancel }: { onActivate: () => void; onCancel: () => void }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<RiskAnswers>({});
  const totalSteps = 6;

  const canNext =
    (step === 1 && !!answers.horizon) ||
    (step === 2 && !!answers.reaction) ||
    (step === 3 && !!answers.income) ||
    (step === 4 && !!answers.goal) ||
    (step === 5 && !!answers.knowledge) ||
    step === 6;

  // Profile calculation
  const profile = useMemo(() => {
    const score =
      (answers.horizon === '7+' ? 3 : answers.horizon === '3-7' ? 2 : 1) +
      (answers.reaction === 'buy' ? 3 : answers.reaction === 'hold' ? 2 : 1) +
      (answers.income === 'stable' ? 2 : 1) +
      (answers.goal === 'maximize' ? 3 : answers.goal === 'steady' ? 2 : 1) +
      (answers.knowledge === 'advanced' ? 2 : 1);
    if (score <= 6) return { name: 'Conservative', equityCap: 35, focus: 'Capital Preservation', tone: 'emerald' };
    if (score <= 10) return { name: 'Moderate', equityCap: 60, focus: 'Balanced Mix', tone: 'brand' };
    return { name: 'Aggressive', equityCap: 85, focus: 'Long-Term Growth', tone: 'purple' };
  }, [answers]);

  const smartSwapEnabled = answers.knowledge === 'advanced';

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 space-y-5">
      {/* Step indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-sip-text-primary">Step {step} of {totalSteps}</span>
          <button onClick={onCancel} className="text-sip-text-muted hover:text-sip-text-primary">Cancel</button>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors',
                i < step ? 'bg-sip-brand' : 'bg-sip-border',
              )}
            />
          ))}
        </div>
      </div>

      {/* Step content */}
      <Card className="border-sip-border rounded-2xl">
        <CardContent className="p-6 md:p-8 space-y-6">
          {step === 1 && (
            <WizardStep
              question="When will you need to withdraw this money?"
              hint="This sets your investment horizon."
              options={[
                { value: '<3', label: 'Less than 3 years', desc: 'Short-term · Capital safety first' },
                { value: '3-7', label: '3 – 7 years', desc: 'Medium-term · Balanced approach' },
                { value: '7+', label: '7+ years', desc: 'Long-term · Compounding mode' },
              ]}
              selected={answers.horizon}
              onSelect={(v) => setAnswers(a => ({ ...a, horizon: v as Horizon }))}
            />
          )}
          {step === 2 && (
            <WizardStep
              question="If your account dropped 20% in one month, what would you do?"
              hint="This shows your real risk appetite."
              options={[
                { value: 'sell', label: 'Sell everything', desc: 'Protect what is left' },
                { value: 'hold', label: 'Do nothing', desc: 'Stay the course' },
                { value: 'buy', label: 'Buy more', desc: 'See opportunity in dips' },
              ]}
              selected={answers.reaction}
              onSelect={(v) => setAnswers(a => ({ ...a, reaction: v as Reaction }))}
            />
          )}
          {step === 3 && (
            <WizardStep
              question="How stable is your current income?"
              hint="Stable income lets you take more equity risk."
              options={[
                { value: 'unstable', label: 'Unstable', desc: 'Variable / freelance / commission' },
                { value: 'stable', label: 'Very stable', desc: 'Salaried · Predictable inflows' },
              ]}
              selected={answers.income}
              onSelect={(v) => setAnswers(a => ({ ...a, income: v as Income }))}
            />
          )}
          {step === 4 && (
            <WizardStep
              question="What is the main goal for this money?"
              hint="Drives the equity vs debt balance."
              options={[
                { value: 'preserve', label: 'Preserve it', desc: 'Beat inflation, low volatility' },
                { value: 'steady', label: 'Grow it steadily', desc: 'Predictable real returns' },
                { value: 'maximize', label: 'Maximize growth', desc: 'Accept short-term pain for upside' },
              ]}
              selected={answers.goal}
              onSelect={(v) => setAnswers(a => ({ ...a, goal: v as Goal }))}
            />
          )}
          {step === 5 && (
            <>
              <WizardStep
                question="How well do you understand the stock market?"
                hint="Determines whether Smart Swapping is enabled."
                options={[
                  { value: 'beginner', label: 'Beginner', desc: 'I want simple, guided choices' },
                  { value: 'advanced', label: 'Advanced', desc: 'I understand fund switches & taxes' },
                ]}
                selected={answers.knowledge}
                onSelect={(v) => setAnswers(a => ({ ...a, knowledge: v as Knowledge }))}
              />
              {answers.knowledge && (
                <div className={cn(
                  'rounded-xl border p-3 flex items-start gap-3 text-xs',
                  answers.knowledge === 'advanced'
                    ? 'border-purple-200 bg-purple-50 text-purple-900'
                    : 'border-amber-200 bg-amber-50 text-amber-900',
                )}>
                  {answers.knowledge === 'advanced'
                    ? <ArrowRightLeft className="w-4 h-4 mt-0.5 shrink-0" />
                    : <Shield className="w-4 h-4 mt-0.5 shrink-0" />}
                  <div>
                    <p className="font-semibold mb-0.5">
                      Smart Swapping {answers.knowledge === 'advanced' ? 'Enabled' : 'Disabled'}
                    </p>
                    <p className="opacity-80">
                      {answers.knowledge === 'advanced'
                        ? 'Copilot can recommend swapping a high-cost / underperforming fund for a better one inside the same category.'
                        : 'We will only suggest standard buy/sell rebalances — no fund switches. You can change this later in Settings.'}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
          {step === 6 && (
            <ProfileSummary profile={profile} smartSwapEnabled={smartSwapEnabled} />
          )}

          {/* Footer buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="ghost"
              onClick={() => step === 1 ? onCancel() : setStep(s => s - 1)}
              className="text-sip-text-secondary"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            {step < totalSteps ? (
              <Button
                onClick={() => setStep(s => Math.min(totalSteps, s + 1))}
                disabled={!canNext}
                className="bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90"
              >
                Continue <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={() => { onActivate(); toast({ title: 'Smart Rebalancing activated 🎉', description: `Profile: ${profile.name} · Smart Swapping ${smartSwapEnabled ? 'on' : 'off'}` }); }}
                className="bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90"
              >
                <Sparkles className="w-4 h-4 mr-1.5" /> Activate Smart Rebalancing
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function WizardStep({ question, hint, options, selected, onSelect }: {
  question: string; hint?: string;
  options: { value: string; label: string; desc?: string }[];
  selected?: string; onSelect: (v: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-sip-text-primary">{question}</h3>
        {hint && <p className="text-xs text-sip-text-muted mt-1">{hint}</p>}
      </div>
      <div className="space-y-2.5">
        {options.map(opt => {
          const active = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={cn(
                'w-full text-left rounded-xl border p-4 transition-all flex items-center gap-3',
                active
                  ? 'border-sip-brand bg-sip-brand/5 ring-2 ring-sip-brand/20'
                  : 'border-sip-border hover:border-sip-brand/40 hover:bg-sip-sidebar-hover',
              )}
            >
              <div className={cn(
                'w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center',
                active ? 'border-sip-brand bg-sip-brand' : 'border-sip-border',
              )}>
                {active && <Check className="w-3 h-3 text-sip-brand-foreground" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-sip-text-primary">{opt.label}</p>
                {opt.desc && <p className="text-xs text-sip-text-muted mt-0.5">{opt.desc}</p>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProfileSummary({ profile, smartSwapEnabled }: { profile: { name: string; equityCap: number; focus: string; tone: string }; smartSwapEnabled: boolean }) {
  return (
    <div className="space-y-5">
      <div className="text-center space-y-3">
        <p className="text-xs uppercase tracking-wider text-sip-text-muted font-semibold">Your Recommended Profile</p>
        {/* Circular gauge */}
        <div className="relative w-40 h-40 mx-auto">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="50" stroke="hsl(var(--sip-border))" strokeWidth="10" fill="none" />
            <circle
              cx="60" cy="60" r="50" stroke="hsl(var(--sip-brand-primary))" strokeWidth="10" fill="none"
              strokeDasharray={`${profile.equityCap / 100 * 314} 314`} strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-sip-text-primary">{profile.name}</p>
            <p className="text-[11px] text-sip-text-muted uppercase tracking-wider">Risk Profile</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <SummaryCard label="Equity Cap" value={`${profile.equityCap}%`} icon={<TrendingUp className="w-4 h-4" />} />
        <SummaryCard label="Focus" value={profile.focus} icon={<Target className="w-4 h-4" />} />
        <SummaryCard label="Smart Swapping" value={smartSwapEnabled ? 'Enabled' : 'Disabled'} icon={<ArrowRightLeft className="w-4 h-4" />} accent={smartSwapEnabled} />
      </div>
    </div>
  );
}

function SummaryCard({ label, value, icon, accent }: { label: string; value: string; icon: React.ReactNode; accent?: boolean }) {
  return (
    <div className={cn('rounded-xl border p-3', accent ? 'border-sip-brand/30 bg-sip-brand/5' : 'border-sip-border bg-background')}>
      <div className={cn('flex items-center gap-1.5 mb-1', accent ? 'text-sip-brand' : 'text-sip-text-muted')}>
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-base font-bold text-sip-text-primary">{value}</p>
    </div>
  );
}

// ============================================================
// PHASE 3 — DASHBOARD
// ============================================================
type Threshold = 'strict' | 'normal' | 'relaxed';
type Frequency = 'realtime' | 'weekly' | 'monthly';

const DEFAULT_ASSETS = [
  { id: 'hdfc-flexi', name: 'HDFC Flexi Cap Fund', type: 'MF', alloc: 22, locked: true },
  { id: 'ppfas', name: 'Parag Parikh Flexi Cap', type: 'MF', alloc: 18, locked: false },
  { id: 'axis-blue', name: 'Axis Bluechip Fund', type: 'MF', alloc: 15, locked: false },
  { id: 'gold-etf', name: 'Nippon Gold ETF', type: 'ETF', alloc: 10, locked: true },
  { id: 'hdfcbank', name: 'HDFC Bank', type: 'STOCK', alloc: 12, locked: false },
  { id: 'reliance', name: 'Reliance Industries', type: 'STOCK', alloc: 8, locked: false },
];

function DashboardPhase({ onSimulateDrift }: { onSimulateDrift: () => void }) {
  const [threshold, setThreshold] = useState<Threshold>('normal');
  const [frequency, setFrequency] = useState<Frequency>('weekly');
  const [assets, setAssets] = useState(DEFAULT_ASSETS);

  const toggleLock = (id: string) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, locked: !a.locked } : a));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 space-y-6">
      {/* Banner scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Account health (large) */}
        <Card className="border-sip-border md:col-span-2 bg-gradient-to-br from-emerald-50 to-background overflow-hidden">
          <CardContent className="p-5 flex items-center gap-5">
            <div className="relative w-24 h-24 shrink-0">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="48" stroke="hsl(var(--sip-border))" strokeWidth="10" fill="none" />
                <circle cx="60" cy="60" r="48" stroke="rgb(16 185 129)" strokeWidth="10" fill="none" strokeDasharray={`${0.85 * 301} 301`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-bold text-emerald-700">85</p>
                <p className="text-[9px] text-sip-text-muted uppercase tracking-wider">/ 100</p>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wider text-sip-text-muted font-semibold">Account Health</p>
              <h3 className="text-2xl font-bold text-sip-text-primary mt-0.5">Good</h3>
              <p className="text-xs text-sip-text-secondary mt-1.5">Diversified · Tax-efficient · Low concentration risk</p>
            </div>
          </CardContent>
        </Card>

        {/* Drift */}
        <Card className="border-sip-border">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-sip-text-muted font-semibold">Current Drift</p>
                <p className="text-3xl font-bold text-sip-text-primary mt-1">3<span className="text-base text-sip-text-muted">%</span></p>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Within Limits
              </Badge>
            </div>
            <Progress value={30} className="h-1.5 mt-3" />
            <p className="text-[11px] text-sip-text-muted mt-2">Threshold: {threshold === 'strict' ? '5%' : threshold === 'normal' ? '10%' : '15%'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Demo trigger */}
      <Card className="border-amber-200 bg-amber-50/50">
        <CardContent className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-sip-text-primary">Simulate a drift event</p>
              <p className="text-xs text-sip-text-muted">For the demo: trigger an AI-detected drift to walk through the action plan.</p>
            </div>
          </div>
          <Button size="sm" variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100" onClick={onSimulateDrift}>
            View action plan <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="border-sip-border">
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-sip-text-primary">Rebalancing Settings</h3>
            <p className="text-xs text-sip-text-muted mt-0.5">Tune how strict the system is and how often it talks to you.</p>
          </div>

          {/* Threshold */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-sip-text-primary">Drift Strictness (Threshold)</p>
                <p className="text-xs text-sip-text-muted">How far off-target before we flag a rebalance.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {([
                { v: 'strict', label: 'Strict', sub: '5%' },
                { v: 'normal', label: 'Normal', sub: '10%' },
                { v: 'relaxed', label: 'Relaxed', sub: '15%' },
              ] as { v: Threshold; label: string; sub: string }[]).map(opt => (
                <button
                  key={opt.v}
                  onClick={() => setThreshold(opt.v)}
                  className={cn(
                    'rounded-xl border px-3 py-3 text-center transition-all',
                    threshold === opt.v
                      ? 'border-sip-brand bg-sip-brand/5 ring-2 ring-sip-brand/15'
                      : 'border-sip-border hover:border-sip-brand/40',
                  )}
                >
                  <p className={cn('text-sm font-semibold', threshold === opt.v ? 'text-sip-brand' : 'text-sip-text-primary')}>{opt.label}</p>
                  <p className="text-xs text-sip-text-muted mt-0.5">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div className="space-y-2">
            <div>
              <p className="text-sm font-semibold text-sip-text-primary">Notification Frequency</p>
              <p className="text-xs text-sip-text-muted">We batch alerts based on this setting unless a major risk trigger is breached.</p>
            </div>
            <Select value={frequency} onValueChange={(v) => setFrequency(v as Frequency)}>
              <SelectTrigger className="w-full md:w-72">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-Time</SelectItem>
                <SelectItem value="weekly">Weekly Digest (Default)</SelectItem>
                <SelectItem value="monthly">Monthly Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Protected assets */}
      <Card className="border-sip-border">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-sip-text-primary flex items-center gap-2">
                <Shield className="w-4 h-4 text-sip-brand" /> Protected Assets
              </h3>
              <p className="text-xs text-sip-text-muted mt-0.5">Lock holdings the Copilot will never recommend selling.</p>
            </div>
            <Badge variant="outline" className="border-sip-border text-sip-text-secondary">
              {assets.filter(a => a.locked).length} of {assets.length} locked
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {assets.map(a => (
              <div
                key={a.id}
                className={cn(
                  'rounded-xl border p-3 flex items-center gap-3 transition-colors',
                  a.locked ? 'border-sip-brand/30 bg-sip-brand/5' : 'border-sip-border bg-background hover:bg-sip-sidebar-hover',
                )}
              >
                <Checkbox
                  checked={a.locked}
                  onCheckedChange={() => toggleLock(a.id)}
                  className="data-[state=checked]:bg-sip-brand data-[state=checked]:border-sip-brand"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 border-sip-border text-sip-text-muted">{a.type}</Badge>
                    <p className="text-sm font-semibold text-sip-text-primary truncate">{a.name}</p>
                  </div>
                  {a.locked ? (
                    <p className="text-[11px] text-sip-brand mt-0.5 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Will never be recommended for sale
                    </p>
                  ) : (
                    <p className="text-[11px] text-sip-text-muted mt-0.5">Allocation {a.alloc}% · Eligible for rebalance</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================
// PHASE 4 — ACTION PLAN  (Goal-Impact Engine)
// ============================================================
type ActionKind = 'SELL' | 'BUY' | 'NEW';

interface ImpactTag {
  label: string;
  tone: 'velocity' | 'shield' | 'cost' | 'balance';
}

interface PlanRow {
  id: string;
  instrument: string;
  amc: string;
  type: string;
  current: number;        // current % allocation
  target: number;         // target % allocation
  action: ActionKind;
  amount: number;         // ₹ value moved (informational only)
  impact: ImpactTag;
  why: string;            // The "Why"
  benefit: string;        // The "Benefit"
  newAdditionRationale?: string; // Specific to NEW
}

interface GoalImpact {
  id: string;
  name: string;
  dueLabel: string;
  dueSortKey: number;     // months from today (smaller = sooner)
  baseline: number;       // current success %
  uplift: number;         // % uplift from full plan
  emoji: string;
  rowImpact: Record<string, number>;
}

const BASE_SUCCESS = 73;

const buildInitialPlan = (): PlanRow[] => [
  {
    id: 'sell-tech',
    instrument: 'High-Risk Tech Sector Fund',
    amc: 'Sectoral',
    type: 'MF',
    current: 18,
    target: 6,
    action: 'SELL',
    amount: 54000,
    impact: { label: 'Risk-Shield Enabled', tone: 'shield' },
    why: 'This fund has drifted 12% above its target weight and trails its peer group by 18 months.',
    benefit: 'Locking in ₹18,400 in profits and reducing single-sector concentration risk by 67%.',
  },
  {
    id: 'sell-equity',
    instrument: 'Equity Aggressive Fund',
    amc: 'HDFC MF',
    type: 'MF',
    current: 22,
    target: 17,
    action: 'SELL',
    amount: 22500,
    impact: { label: 'Risk-Shield Enabled', tone: 'shield' },
    why: 'Equity bucket has drifted 5% above the 60% policy cap due to last quarter\'s rally.',
    benefit: 'Locking in ₹9,200 in profits and bringing the portfolio inside its risk envelope.',
  },
  {
    id: 'buy-largecap',
    instrument: 'Mirae Large Cap Fund',
    amc: 'Mirae',
    type: 'MF',
    current: 5,
    target: 12,
    action: 'BUY',
    amount: 31500,
    impact: { label: 'Goal Velocity +5%', tone: 'velocity' },
    why: 'Existing core holding is underweight by 7% relative to the optimised target weight.',
    benefit: 'Tilts the core toward higher-quality large caps — improves expected risk-adjusted return for your Studies goal.',
  },
  {
    id: 'buy-debt',
    instrument: 'Short-Term Debt Fund',
    amc: 'ICICI Pru',
    type: 'MF',
    current: 12,
    target: 17,
    action: 'BUY',
    amount: 22500,
    impact: { label: 'Risk-Shield Enabled', tone: 'shield' },
    why: 'Debt buffer is below the 17% floor required by your medium-term goal horizon.',
    benefit: 'Restores volatility cushion — reduces projected drawdown for the Tour goal by 22%.',
  },
  {
    id: 'new-intl',
    instrument: 'Global Equity Index Fund',
    amc: 'Motilal Oswal',
    type: 'MF',
    current: 0,
    target: 6,
    action: 'NEW',
    amount: 27000,
    impact: { label: 'Diversification Unlocked', tone: 'balance' },
    why: 'Portfolio currently has zero international exposure — fails the geographic diversification check.',
    benefit: 'Aligning risk profile from "Aggressive" to "Balanced" for your Studies Goal.',
    newAdditionRationale: 'We are adding this fund because your current portfolio lacks International Equity exposure, which is mathematically necessary to hit your target probability for your 2027 goals.',
  },
  {
    id: 'new-gold',
    instrument: 'Sovereign Gold ETF',
    amc: 'Nippon India',
    type: 'ETF',
    current: 0,
    target: 4,
    action: 'NEW',
    amount: 18000,
    impact: { label: 'Inflation Hedge Added', tone: 'balance' },
    why: 'No inflation-hedge sleeve present — model portfolio requires 4% Gold for your goal horizon.',
    benefit: 'Adds an uncorrelated asset that historically protects purchasing power against rupee inflation.',
    newAdditionRationale: 'We are adding this fund because your current portfolio lacks Commodity / Inflation-Hedge exposure, which is mathematically necessary to hit your target probability for your 2027 goals.',
  },
];

const GOALS: GoalImpact[] = [
  {
    id: 'studies', name: "Aanya's Studies", dueLabel: 'Aug 2026', dueSortKey: 16,
    baseline: 68, uplift: 11, emoji: '🎓',
    rowImpact: { 'sell-tech': 3, 'sell-equity': 1, 'buy-largecap': 3, 'buy-debt': 2, 'new-intl': 2, 'new-gold': 0 },
  },
  {
    id: 'tour', name: 'Europe Tour', dueLabel: 'Dec 2026', dueSortKey: 20,
    baseline: 74, uplift: 9, emoji: '✈️',
    rowImpact: { 'sell-tech': 2, 'sell-equity': 2, 'buy-largecap': 1, 'buy-debt': 3, 'new-intl': 1, 'new-gold': 0 },
  },
  {
    id: 'wedding', name: 'Wedding 2027', dueLabel: 'Nov 2027', dueSortKey: 31,
    baseline: 73, uplift: 12, emoji: '💍',
    rowImpact: { 'sell-tech': 3, 'sell-equity': 1, 'buy-largecap': 2, 'buy-debt': 2, 'new-intl': 2, 'new-gold': 2 },
  },
  {
    id: 'retire', name: 'Retirement', dueLabel: '2042', dueSortKey: 200,
    baseline: 81, uplift: 6, emoji: '🌴',
    rowImpact: { 'sell-tech': 1, 'sell-equity': 0, 'buy-largecap': 1, 'buy-debt': 1, 'new-intl': 2, 'new-gold': 1 },
  },
];

function ActionPhase({ onBack }: { onBack: () => void }) {
  const [plan] = useState<PlanRow[]>(buildInitialPlan);
  const [selected, setSelected] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(buildInitialPlan().map(r => [r.id, true])),
  );
  const [executing, setExecuting] = useState(false);
  const [done, setDone] = useState(false);
  const [intelRowId, setIntelRowId] = useState<string | null>(null);

  const intelRow = plan.find(r => r.id === intelRowId) || null;

  const sells = plan.filter(r => r.action === 'SELL');
  const buysExisting = plan.filter(r => r.action === 'BUY');
  const buysNew = plan.filter(r => r.action === 'NEW');

  const toggleRow = (id: string) => setSelected(s => ({ ...s, [id]: !s[id] }));

  // Top 3 goals sorted by due date (closest first)
  const topGoals = useMemo(
    () => [...GOALS].sort((a, b) => a.dueSortKey - b.dueSortKey).slice(0, 3),
    [],
  );

  // Per-goal projected uplift based on currently selected rows
  const goalProjections = useMemo(
    () =>
      topGoals.map(g => {
        const projUplift = Object.entries(g.rowImpact)
          .filter(([rid]) => selected[rid])
          .reduce((s, [, v]) => s + v, 0);
        const projected = Math.min(100, g.baseline + projUplift);
        return { goal: g, projUplift, projected };
      }),
    [topGoals, selected],
  );

  const totalSelected = Object.values(selected).filter(Boolean).length;

  const execute = () => {
    setExecuting(true);
    setTimeout(() => {
      setExecuting(false);
      setDone(true);
      toast({
        title: 'Trades executed',
        description: `${totalSelected} actions queued · Settlement T+1.`,
      });
    }, 1400);
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 space-y-5">
        <button onClick={onBack} className="text-xs text-sip-text-muted hover:text-sip-text-primary flex items-center gap-1">
          <ChevronLeft className="w-3.5 h-3.5" /> Back to dashboard
        </button>

        {/* ============ Goal Multi-Impact Dashboard ============ */}
        <Card className="border-[#006AFF]/20 bg-gradient-to-br from-[#006AFF]/5 to-background overflow-hidden">
          <CardContent className="p-6 space-y-5">
            <div>
              <Badge className="bg-[#006AFF]/10 text-[#006AFF] hover:bg-[#006AFF]/10 border-[#006AFF]/20">
                <Target className="w-3 h-3 mr-1" /> Goal Multi-Impact Dashboard
              </Badge>
              <h2 className="text-xl md:text-2xl font-bold text-sip-text-primary mt-2">
                How this rebalance affects your top priorities
              </h2>
              <p className="text-sm text-sip-text-secondary mt-1.5">
                Top 3 goals sorted by closest due date. Toggle trades below to see live uplift.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {goalProjections.map(({ goal, projUplift, projected }, idx) => (
                <GoalImpactCard key={goal.id} goal={goal} projUplift={projUplift} projected={projected} priority={idx + 1} done={done} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ============ SELL Section ============ */}
        <TradeSection
          title="Sell to Secure Gains"
          subtitle="Trim over-exposed assets — locks in profits and restores risk balance."
          tone="sell"
          icon={<TrendingDown className="w-4 h-4" />}
          rows={sells}
          selected={selected}
          onToggle={toggleRow}
          onIntel={setIntelRowId}
        />

        {/* ============ BUY Section ============ */}
        <Card className="border-sip-border overflow-hidden">
          <CardContent className="p-0">
            <div className="px-5 py-4 border-b border-sip-border bg-emerald-50/40">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-sip-text-primary">Buy to Optimize Growth</h3>
                  <p className="text-xs text-sip-text-muted">Redeployment of proceeds into mathematically optimal weights.</p>
                </div>
              </div>
            </div>

            {/* Existing Holdings sub-group */}
            <div className="px-5 pt-4 pb-2 border-b border-sip-border/60 bg-background">
              <p className="text-[10px] uppercase tracking-wider text-sip-text-muted font-semibold">
                Existing Holdings · Top-ups
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <TradeTableHeader />
                <tbody className="divide-y divide-sip-border">
                  {buysExisting.map(r => (
                    <PlanRowView
                      key={r.id}
                      row={r}
                      checked={!!selected[r.id]}
                      onToggle={() => toggleRow(r.id)}
                      onIntel={() => setIntelRowId(r.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* New Strategic Additions sub-group */}
            <div className="px-5 pt-4 pb-2 border-y border-sip-border/60 bg-purple-50/30">
              <p className="text-[10px] uppercase tracking-wider text-purple-700 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> New Strategic Additions · First-time exposures
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <TradeTableHeader />
                <tbody className="divide-y divide-sip-border">
                  {buysNew.map(r => (
                    <PlanRowView
                      key={r.id}
                      row={r}
                      checked={!!selected[r.id]}
                      onToggle={() => toggleRow(r.id)}
                      onIntel={() => setIntelRowId(r.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <p className="text-[11px] text-sip-text-muted text-center -mt-1">
          💡 Tip: <strong>Double-click any row</strong> to open Agent Intelligence — the full reasoning behind each move.
        </p>

        {/* ============ Execute ============ */}
        <div className="text-center pt-1 space-y-3">
          {!done ? (
            <Button
              size="lg"
              disabled={executing || totalSelected === 0}
              onClick={execute}
              className="bg-[#006AFF] text-white hover:bg-[#0058D6] h-12 px-8 text-base font-semibold rounded-xl shadow-lg shadow-[#006AFF]/20"
            >
              {executing
                ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing trades…</>)
                : (<><Sparkles className="w-4 h-4 mr-2" /> Execute All Active Trades ({totalSelected})</>)}
            </Button>
          ) : (
            <div className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center animate-in zoom-in-50">
                <Check className="w-7 h-7" strokeWidth={3} />
              </div>
              <div>
                <p className="text-base font-bold text-emerald-900">Trades executed successfully</p>
                <p className="text-xs text-emerald-800/80 mt-1">{totalSelected} actions queued · Settlement T+1</p>
              </div>
              <Button variant="outline" size="sm" onClick={onBack} className="border-emerald-300 text-emerald-800 hover:bg-emerald-100">
                Back to dashboard
              </Button>
            </div>
          )}
        </div>

        {/* ============ Agent Intelligence Drawer ============ */}
        <Sheet open={!!intelRow} onOpenChange={(o) => !o && setIntelRowId(null)}>
          <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
            {intelRow && (
              <>
                <SheetHeader className="pb-4 border-b border-sip-border">
                  <SheetTitle className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-[#006AFF]" /> Agent Intelligence
                  </SheetTitle>
                  <SheetDescription>{intelRow.instrument}</SheetDescription>
                </SheetHeader>

                <div className="mt-5 space-y-5">
                  {/* Action banner */}
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-sip-border bg-sip-sidebar-hover">
                    <ActionPill action={intelRow.action} delta={intelRow.target - intelRow.current} />
                    <div className="text-xs text-sip-text-secondary tabular-nums">
                      {intelRow.current}% → <strong className="text-sip-text-primary">{intelRow.target}%</strong>
                      <span className="mx-1.5 text-sip-text-muted">·</span>
                      ₹{intelRow.amount.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* The Why */}
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-sip-text-muted font-semibold mb-1.5">The "Why"</p>
                    <p className="text-sm text-sip-text-primary leading-relaxed">{intelRow.why}</p>
                  </div>

                  {/* The Benefit */}
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-sip-text-muted font-semibold mb-1.5">The "Benefit"</p>
                    <p className={cn(
                      'text-sm leading-relaxed p-3 rounded-lg border',
                      intelRow.action === 'SELL'
                        ? 'bg-red-50 border-red-100 text-red-900'
                        : 'bg-emerald-50 border-emerald-100 text-emerald-900',
                    )}>
                      {intelRow.benefit}
                    </p>
                  </div>

                  {/* New Addition specific */}
                  {intelRow.action === 'NEW' && intelRow.newAdditionRationale && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-purple-700 font-semibold mb-1.5 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" /> Why a New Addition
                      </p>
                      <p className="text-sm text-purple-900 leading-relaxed p-3 rounded-lg bg-purple-50 border border-purple-100">
                        {intelRow.newAdditionRationale}
                      </p>
                    </div>
                  )}

                  {/* Impact tag */}
                  <div className="flex items-center justify-between pt-2 border-t border-sip-border">
                    <span className="text-[11px] text-sip-text-muted">Strategic impact</span>
                    <ImpactTagPill tag={intelRow.impact} />
                  </div>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  );
}

// ============ Goal Impact Card ============
function GoalImpactCard({
  goal, projUplift, projected, priority, done,
}: {
  goal: GoalImpact; projUplift: number; projected: number; priority: number; done: boolean;
}) {
  const displayedBase = done ? projected : goal.baseline;
  const displayedUplift = done ? 0 : projUplift;

  return (
    <div className="rounded-xl border border-sip-border bg-background p-3.5 space-y-2.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-base leading-none">{goal.emoji}</span>
            <p className="text-sm font-semibold text-sip-text-primary truncate">{goal.name}</p>
          </div>
          <p className="text-[10px] text-sip-text-muted mt-0.5">Due {goal.dueLabel}</p>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#006AFF]/10 text-[#006AFF]">
          P{priority}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="relative h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-slate-700 rounded-full transition-all duration-500"
            style={{ width: `${displayedBase}%` }}
          />
          {displayedUplift > 0 && (
            <div
              className="absolute inset-y-0 rounded-r-full overflow-hidden transition-all duration-500"
              style={{ left: `${displayedBase}%`, width: `${displayedUplift}%` }}
            >
              <div className="h-full w-full bg-gradient-to-r from-[#006AFF] to-cyan-400 animate-pulse" />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between text-[10px] tabular-nums">
          <span className="text-slate-700 font-semibold">Baseline {displayedBase}%</span>
          {displayedUplift > 0 ? (
            <span className="text-[#006AFF] font-semibold">+{displayedUplift}% post-rebalance</span>
          ) : done ? (
            <span className="text-emerald-700 font-semibold">✓ Locked in</span>
          ) : (
            <span className="text-sip-text-muted">No uplift</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ Trade Section (Sell only — Buy uses inline grouping) ============
function TradeSection({
  title, subtitle, tone, icon, rows, selected, onToggle, onIntel,
}: {
  title: string;
  subtitle: string;
  tone: 'sell' | 'buy';
  icon: React.ReactNode;
  rows: PlanRow[];
  selected: Record<string, boolean>;
  onToggle: (id: string) => void;
  onIntel: (id: string) => void;
}) {
  const headerCls = tone === 'sell' ? 'bg-red-50/40' : 'bg-emerald-50/40';
  const iconCls = tone === 'sell' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700';
  return (
    <Card className="border-sip-border overflow-hidden">
      <CardContent className="p-0">
        <div className={cn('px-5 py-4 border-b border-sip-border', headerCls)}>
          <div className="flex items-center gap-2">
            <span className={cn('w-7 h-7 rounded-md flex items-center justify-center', iconCls)}>{icon}</span>
            <div>
              <h3 className="text-base font-semibold text-sip-text-primary">{title}</h3>
              <p className="text-xs text-sip-text-muted">{subtitle}</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TradeTableHeader />
            <tbody className="divide-y divide-sip-border">
              {rows.map(r => (
                <PlanRowView
                  key={r.id}
                  row={r}
                  checked={!!selected[r.id]}
                  onToggle={() => onToggle(r.id)}
                  onIntel={() => onIntel(r.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function TradeTableHeader() {
  return (
    <thead className="bg-sip-sidebar-hover text-left">
      <tr className="text-[11px] uppercase tracking-wider text-sip-text-muted">
        <th className="px-5 py-2.5 font-semibold">Investment</th>
        <th className="px-3 py-2.5 font-semibold text-right">Current</th>
        <th className="px-3 py-2.5 font-semibold text-right">Target</th>
        <th className="px-5 py-2.5 font-semibold">Action</th>
        <th className="px-3 py-2.5 font-semibold">Impact</th>
        <th className="px-5 py-2.5 font-semibold w-36 text-right">Status</th>
      </tr>
    </thead>
  );
}

// ============ Plan Row ============
function PlanRowView({
  row, checked, onToggle, onIntel,
}: {
  row: PlanRow;
  checked: boolean;
  onToggle: () => void;
  onIntel: () => void;
}) {
  const isNew = row.action === 'NEW';
  const isSell = row.action === 'SELL';

  return (
    <tr
      onDoubleClick={onIntel}
      className={cn(
        'transition-colors cursor-pointer hover:bg-sip-sidebar-hover/50',
        isNew && 'bg-purple-50/30',
      )}
      title="Double-click for Agent Intelligence"
    >
      <td className="px-5 py-3.5">
        <div className="flex items-start gap-2">
          <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 border-sip-border text-sip-text-muted mt-0.5">{row.type}</Badge>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="font-semibold text-sip-text-primary">{row.instrument}</p>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onIntel(); }}
                className="inline-flex"
                aria-label="Open Agent Intelligence"
              >
                <Info className="w-3 h-3 text-sip-text-muted hover:text-[#006AFF]" />
              </button>
            </div>
            <p className="text-[11px] text-sip-text-muted mt-0.5 tabular-nums">
              {row.amc} · ₹{row.amount.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </td>
      <td className="px-3 py-3.5 text-right tabular-nums text-sip-text-primary">{row.current}%</td>
      <td className="px-3 py-3.5 text-right tabular-nums text-sip-text-primary font-semibold">{row.target}%</td>
      <td className="px-5 py-3.5">
        <ActionPill action={row.action} delta={row.target - row.current} />
      </td>
      <td className="px-3 py-3.5">
        <ImpactTagPill tag={row.impact} />
      </td>
      <td className="px-5 py-3.5 text-right">
        <Button
          size="sm"
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className={cn(
            'h-8 text-[11px] font-semibold',
            checked
              ? isSell
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
              : isSell
                ? 'bg-white text-red-700 border border-red-300 hover:bg-red-50'
                : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50',
          )}
        >
          {checked ? (<><Check className="w-3 h-3 mr-1" /> Approved</>) : isSell ? 'Approve Sell' : 'Approve Buy'}
        </Button>
      </td>
    </tr>
  );
}

// ============ Action Pill ============
function ActionPill({ action, delta }: { action: ActionKind; delta: number }) {
  const map: Record<ActionKind, { label: string; cls: string; icon: React.ReactNode }> = {
    SELL: { label: 'SELL', cls: 'bg-red-50 text-red-700 border-red-200', icon: <TrendingDown className="w-3 h-3" /> },
    BUY: { label: 'BUY', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <TrendingUp className="w-3 h-3" /> },
    NEW: { label: 'NEW ADDITION', cls: 'bg-purple-100 text-purple-700 border-purple-300', icon: <Plus className="w-3 h-3" /> },
  };
  const m = map[action];
  return (
    <div className="flex items-center gap-2">
      <span className={cn('inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md border', m.cls)}>
        {m.icon} {m.label}
      </span>
      {delta !== 0 && (
        <span className={cn('text-xs font-semibold tabular-nums', delta > 0 ? 'text-emerald-700' : 'text-red-700')}>
          {delta > 0 ? '+' : ''}{delta}%
        </span>
      )}
    </div>
  );
}

// ============ Impact Tag ============
function ImpactTagPill({ tag }: { tag: ImpactTag }) {
  const tones: Record<ImpactTag['tone'], { cls: string; icon: React.ReactNode }> = {
    velocity: { cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <TrendingUp className="w-3 h-3" /> },
    shield:   { cls: 'bg-blue-50 text-blue-700 border-blue-200', icon: <Shield className="w-3 h-3" /> },
    cost:     { cls: 'bg-amber-50 text-amber-800 border-amber-200', icon: <TrendingDown className="w-3 h-3" /> },
    balance:  { cls: 'bg-purple-50 text-purple-700 border-purple-200', icon: <Scale className="w-3 h-3" /> },
  };
  const t = tones[tag.tone];
  return (
    <span className={cn('inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-md border whitespace-nowrap', t.cls)}>
      {t.icon} {tag.label}
    </span>
  );
}

