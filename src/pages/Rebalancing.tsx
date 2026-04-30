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
// PHASE 4 — ACTION PLAN
// ============================================================
type ActionKind = 'SELL' | 'BUY' | 'SWAP' | 'HOLD';

interface FundOption {
  id: string;
  name: string;
  amc: string;
  expense: number;   // %
  cagr3y: number;    // %
  risk: 'Low' | 'Medium' | 'High';
  rationale: string;
}

interface ActionRow {
  id: string;
  instrument: string;       // current/source instrument
  type: string;
  current: number;
  target: number;
  action: ActionKind;
  // SWAP-specific
  replacement?: FundOption;
  alternatives?: FundOption[];
  // BUY/SELL specific
  editable?: boolean;
  why: string;
  note?: string;
}

const TECH_ALTERNATIVES: FundOption[] = [
  { id: 'icici-bc', name: 'ICICI Prudential Bluechip Fund', amc: 'ICICI Pru', expense: 0.85, cagr3y: 16.4, risk: 'Medium', rationale: 'Large-cap stability with strong 3Y track record.' },
  { id: 'axis-bc', name: 'Axis Bluechip Fund', amc: 'Axis MF', expense: 0.62, cagr3y: 14.8, risk: 'Medium', rationale: 'Lowest expense ratio in peer group.' },
  { id: 'hdfc-t100', name: 'HDFC Top 100 Fund', amc: 'HDFC MF', expense: 1.02, cagr3y: 17.1, risk: 'Medium', rationale: 'Highest 3Y CAGR · slightly higher cost.' },
  { id: 'nifty500-idx', name: 'UTI Nifty 500 Index Fund', amc: 'UTI MF', expense: 0.21, cagr3y: 15.6, risk: 'Medium', rationale: 'Index hugger · lowest cost of all options.' },
  { id: 'mira-largecap', name: 'Mirae Asset Large Cap Fund', amc: 'Mirae', expense: 0.54, cagr3y: 15.9, risk: 'Medium', rationale: 'Balanced risk-adjusted return profile.' },
];

const CURRENT_TECH: FundOption = {
  id: 'current-tech', name: 'High-Risk Tech Sector Fund', amc: 'Sectoral', expense: 1.95, cagr3y: 9.2, risk: 'High',
  rationale: 'Underperforming peer group by 18 months.',
};

const buildInitialPlan = (): ActionRow[] => [
  {
    id: 'swap-tech',
    instrument: CURRENT_TECH.name,
    type: 'MF',
    current: 18,
    target: 18,
    action: 'SWAP',
    replacement: TECH_ALTERNATIVES[3], // default = lowest cost index
    alternatives: TECH_ALTERNATIVES,
    why: 'New fund has ~6% higher 3Y CAGR at the same risk level, with a meaningfully lower expense ratio.',
  },
  {
    id: 'sell-equity',
    instrument: 'Equity Aggressive Fund',
    type: 'MF',
    current: 22,
    target: 17,
    action: 'SELL',
    editable: true,
    why: 'Trimming equity brings allocation back within your 60% cap and reduces drawdown risk.',
    note: 'Trim to bring equity within 60% cap',
  },
  {
    id: 'buy-debt',
    instrument: 'Short-Term Debt Fund',
    type: 'MF',
    current: 12,
    target: 17,
    action: 'BUY',
    editable: true,
    why: 'Restoring the debt buffer cushions the portfolio against equity volatility.',
    note: 'Restore debt buffer',
  },
  {
    id: 'hold-gold',
    instrument: 'Nippon Gold ETF',
    type: 'ETF',
    current: 10,
    target: 10,
    action: 'HOLD',
    why: 'Allocation is within tolerance band — no action required.',
    note: 'Within tolerance · No action',
  },
];

function ActionPhase({ onBack }: { onBack: () => void }) {
  const [plan, setPlan] = useState<ActionRow[]>(buildInitialPlan);
  const [executing, setExecuting] = useState(false);
  const [done, setDone] = useState(false);
  const [swapRowId, setSwapRowId] = useState<string | null>(null);

  const swapRow = plan.find(r => r.id === swapRowId) || null;

  const updateTarget = (id: string, newTarget: number) => {
    setPlan(prev => prev.map(r => r.id === id ? { ...r, target: Math.max(0, Math.min(100, newTarget)) } : r));
    toast({ title: 'Recalculating…', description: `Updated allocation for ${plan.find(r => r.id === id)?.instrument}` });
  };

  const selectReplacement = (rowId: string, fund: FundOption) => {
    setPlan(prev => prev.map(r => r.id === rowId ? { ...r, replacement: fund } : r));
    setSwapRowId(null);
    toast({ title: 'Replacement updated', description: `Now swapping into ${fund.name}` });
  };

  const execute = () => {
    setExecuting(true);
    setTimeout(() => { setExecuting(false); setDone(true); toast({ title: 'Batch trade executed', description: `${plan.filter(r => r.action !== 'HOLD').length} actions queued · Settlement T+1` }); }, 1400);
  };

  const swapCount = plan.filter(r => r.action === 'SWAP').length;
  const totalActions = plan.filter(r => r.action !== 'HOLD').length;

  return (
    <TooltipProvider delayDuration={150}>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 space-y-5">
        <button onClick={onBack} className="text-xs text-sip-text-muted hover:text-sip-text-primary flex items-center gap-1">
          <ChevronLeft className="w-3.5 h-3.5" /> Back to dashboard
        </button>

        {/* Copilot nudge */}
        <Card className="border-sip-brand/30 bg-gradient-to-br from-sip-brand/5 to-background overflow-hidden">
          <CardContent className="p-5 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-sip-brand text-sip-brand-foreground flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-sip-text-primary">DiscvrAI Copilot</p>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200 text-[10px]">
                  <AlertTriangle className="w-3 h-3 mr-1" /> Drift detected
                </Badge>
              </div>
              <p className="text-sm text-sip-text-secondary leading-relaxed">
                Hello Priya 👋 Our background monitoring has detected a significant <strong>portfolio drift</strong>.
                Your equity exposure is currently <strong className="text-amber-700">15% too high</strong> versus your
                Moderate profile. We've prepared a simple, cost-aware rebalancing plan to protect your goals
                (including <span className="text-purple-700 font-medium">{swapCount} high-quality smart swap{swapCount === 1 ? '' : 's'}</span>).
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="outline" className="border-sip-border text-sip-text-secondary text-[11px]">Estimated tax: ₹420</Badge>
                <Badge variant="outline" className="border-sip-border text-sip-text-secondary text-[11px]">Brokerage: ₹0</Badge>
                <Badge variant="outline" className="border-sip-border text-sip-text-secondary text-[11px]">Sharpe lift: +0.32x</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action plan table */}
        <Card className="border-sip-border overflow-hidden">
          <CardContent className="p-0">
            <div className="px-5 py-4 border-b border-sip-border flex items-center justify-between">
              <h3 className="text-base font-semibold text-sip-text-primary">Action Plan Summary</h3>
              <p className="text-xs text-sip-text-muted">{totalActions} actions · {swapCount} smart swap{swapCount === 1 ? '' : 's'} · click any row to review</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-sip-sidebar-hover text-left">
                  <tr className="text-[11px] uppercase tracking-wider text-sip-text-muted">
                    <th className="px-5 py-2.5 font-semibold">Instrument & Details</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Current</th>
                    <th className="px-3 py-2.5 font-semibold text-right w-32">Target</th>
                    <th className="px-5 py-2.5 font-semibold w-56">Recommended Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sip-border">
                  {plan.map((r) => (
                    <ActionRowView
                      key={r.id}
                      row={r}
                      onOpenSwap={() => setSwapRowId(r.id)}
                      onTargetChange={(v) => updateTarget(r.id, v)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Execute */}
        <div className="text-center pt-2 space-y-3">
          {!done ? (
            <>
              <Button
                size="lg"
                disabled={executing}
                onClick={execute}
                className="bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90 h-12 px-8 text-base font-semibold rounded-xl shadow-lg shadow-sip-brand/20"
              >
                {executing
                  ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Executing batch trade…</>)
                  : (<><Sparkles className="w-4 h-4 mr-2" /> Approve and Execute Batch Trade</>)}
              </Button>
              <div>
                <button className="text-xs text-sip-brand hover:underline">Adjust recommendations manually</button>
              </div>
            </>
          ) : (
            <div className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center animate-in zoom-in-50">
                <Check className="w-7 h-7" strokeWidth={3} />
              </div>
              <div>
                <p className="text-base font-bold text-emerald-900">Batch trade approved</p>
                <p className="text-xs text-emerald-800/80 mt-1">{totalActions} actions queued · Settlement expected by T+1</p>
              </div>
              <Button variant="outline" size="sm" onClick={onBack} className="border-emerald-300 text-emerald-800 hover:bg-emerald-100">
                Back to dashboard
              </Button>
            </div>
          )}
        </div>

        {/* Replacement Drawer */}
        <Sheet open={!!swapRow} onOpenChange={(o) => !o && setSwapRowId(null)}>
          <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
            {swapRow && swapRow.replacement && swapRow.alternatives && (
              <>
                <SheetHeader className="pb-4 border-b border-sip-border">
                  <SheetTitle className="flex items-center gap-2">
                    <Replace className="w-4 h-4 text-purple-600" /> Select Replacement Fund
                  </SheetTitle>
                  <SheetDescription>
                    Replacing <strong>{swapRow.instrument}</strong>. Compare any candidate side-by-side and pick the one that suits you.
                  </SheetDescription>
                </SheetHeader>

                {/* Side-by-side comparison: current vs selected */}
                <div className="mt-5">
                  <p className="text-[11px] uppercase tracking-wider text-sip-text-muted mb-2 font-semibold">Currently selected</p>
                  <ComparisonCard current={CURRENT_TECH} selected={swapRow.replacement} />
                </div>

                {/* Alternatives list */}
                <div className="mt-6 space-y-2">
                  <p className="text-[11px] uppercase tracking-wider text-sip-text-muted mb-1 font-semibold">Best-fit alternatives</p>
                  {swapRow.alternatives.map((f) => {
                    const isSelected = f.id === swapRow.replacement?.id;
                    return (
                      <div
                        key={f.id}
                        className={cn(
                          'border rounded-lg p-3 transition-all',
                          isSelected ? 'border-purple-400 bg-purple-50/60' : 'border-sip-border hover:border-purple-300 hover:bg-purple-50/30'
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-sip-text-primary truncate">{f.name}</p>
                            <p className="text-[11px] text-sip-text-muted">{f.amc} · {f.rationale}</p>
                            <div className="flex flex-wrap gap-3 mt-2 text-[11px] tabular-nums">
                              <span className="text-sip-text-secondary">Expense <strong className="text-sip-text-primary">{f.expense}%</strong></span>
                              <span className="text-sip-text-secondary">3Y CAGR <strong className="text-emerald-700">{f.cagr3y}%</strong></span>
                              <span className="text-sip-text-secondary">Risk <strong className={riskColor(f.risk)}>{f.risk}</strong></span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant={isSelected ? 'outline' : 'default'}
                            onClick={() => selectReplacement(swapRow.id, f)}
                            className={cn(
                              'shrink-0 text-xs h-8',
                              !isSelected && 'bg-purple-600 hover:bg-purple-700 text-white'
                            )}
                          >
                            {isSelected ? <><Check className="w-3 h-3 mr-1" /> Selected</> : 'Select this Fund'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  );
}

function riskColor(risk: 'Low' | 'Medium' | 'High') {
  return risk === 'Low' ? 'text-emerald-700' : risk === 'Medium' ? 'text-amber-700' : 'text-red-700';
}

function ComparisonCard({ current, selected }: { current: FundOption; selected: FundOption }) {
  const cheaper = selected.expense < current.expense;
  const higherCagr = selected.cagr3y > current.cagr3y;
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="border border-sip-border rounded-lg p-3 bg-sip-sidebar-hover/30">
        <p className="text-[10px] uppercase tracking-wider text-sip-text-muted font-semibold mb-1">Current</p>
        <p className="text-sm font-semibold text-sip-text-primary leading-tight">{current.name}</p>
        <div className="mt-3 space-y-1.5 text-xs">
          <Row label="Expense Ratio" value={`${current.expense}%`} />
          <Row label="3-Year CAGR" value={`${current.cagr3y}%`} />
          <Row label="Risk Grade" value={current.risk} valueClass={riskColor(current.risk)} />
        </div>
      </div>
      <div className="border-2 border-purple-400 rounded-lg p-3 bg-purple-50/60">
        <p className="text-[10px] uppercase tracking-wider text-purple-700 font-semibold mb-1">Replacement</p>
        <p className="text-sm font-semibold text-sip-text-primary leading-tight">{selected.name}</p>
        <div className="mt-3 space-y-1.5 text-xs">
          <Row label="Expense Ratio" value={`${selected.expense}%`} hint={cheaper ? 'cheaper' : ''} hintTone="good" />
          <Row label="3-Year CAGR" value={`${selected.cagr3y}%`} hint={higherCagr ? 'higher' : ''} hintTone="good" />
          <Row label="Risk Grade" value={selected.risk} valueClass={riskColor(selected.risk)} />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, valueClass, hint, hintTone }: { label: string; value: string; valueClass?: string; hint?: string; hintTone?: 'good' | 'bad' }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sip-text-muted">{label}</span>
      <span className={cn('font-semibold tabular-nums flex items-center gap-1.5', valueClass || 'text-sip-text-primary')}>
        {value}
        {hint && (
          <span className={cn('text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded',
            hintTone === 'good' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
          )}>{hint}</span>
        )}
      </span>
    </div>
  );
}

function ActionRowView({ row, onOpenSwap, onTargetChange }: { row: ActionRow; onOpenSwap: () => void; onTargetChange: (v: number) => void }) {
  const isSwap = row.action === 'SWAP';
  const detail = isSwap && row.replacement
    ? `Replacing ${row.instrument} with ${row.replacement.name} — saves ${(row.replacement ? Math.max(0, (CURRENT_TECH.expense - row.replacement.expense)) : 0).toFixed(2)}% in expense ratio.`
    : row.note || '';

  return (
    <tr className={cn(isSwap && 'bg-purple-50/40')}>
      <td className="px-5 py-3.5">
        <div className={cn('flex items-start gap-2', isSwap && 'border-l-2 border-purple-400 pl-2 -ml-2')}>
          <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 border-sip-border text-sip-text-muted mt-0.5">{row.type}</Badge>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="font-semibold text-sip-text-primary">{row.instrument}</p>
              {isSwap && row.replacement && (
                <>
                  <RefreshCw className="w-3 h-3 text-purple-500 mx-0.5" />
                  <p className="font-semibold text-purple-700">{row.replacement.name}</p>
                </>
              )}
              <UITooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="inline-flex"><Info className="w-3 h-3 text-sip-text-muted hover:text-sip-brand" /></button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[260px] text-xs">{row.why}</TooltipContent>
              </UITooltip>
            </div>
            <p className="text-[11px] text-sip-text-muted mt-0.5">{detail}</p>
          </div>
        </div>
      </td>
      <td className="px-3 py-3.5 text-right tabular-nums text-sip-text-primary">{row.current}%</td>
      <td className="px-3 py-3.5 text-right">
        {row.editable ? (
          <div className="flex items-center justify-end gap-1.5">
            <Input
              type="number"
              value={row.target}
              onChange={(e) => onTargetChange(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              className="h-7 w-16 text-right text-sm tabular-nums px-2 font-semibold"
              min={0}
              max={100}
            />
            <span className="text-xs text-sip-text-muted">%</span>
          </div>
        ) : (
          <span className="font-semibold tabular-nums text-sip-text-primary">{row.target}%</span>
        )}
      </td>
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2">
          <ActionPill action={row.action} delta={row.target - row.current} />
          {isSwap && (
            <Button size="sm" variant="outline" onClick={onOpenSwap} className="h-7 text-[11px] border-purple-300 text-purple-700 hover:bg-purple-50">
              Change
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}

function ActionPill({ action, delta }: { action: ActionKind; delta: number }) {
  const map: Record<ActionKind, { label: string; cls: string; icon: React.ReactNode }> = {
    SELL: { label: 'SELL', cls: 'bg-red-50 text-red-700 border-red-200', icon: <TrendingDown className="w-3 h-3" /> },
    BUY: { label: 'BUY', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <TrendingUp className="w-3 h-3" /> },
    SWAP: { label: 'SWAP', cls: 'bg-purple-50 text-purple-700 border-purple-300', icon: <ArrowRightLeft className="w-3 h-3" /> },
    HOLD: { label: 'NO ACTION', cls: 'bg-gray-100 text-gray-600 border-gray-200', icon: <CheckCircle2 className="w-3 h-3" /> },
  };
  const m = map[action];
  return (
    <div className="flex items-center gap-2">
      <span className={cn('inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md border', m.cls)}>
        {m.icon} {m.label}
      </span>
      {delta !== 0 && action !== 'SWAP' && (
        <span className={cn('text-xs font-semibold tabular-nums', delta > 0 ? 'text-emerald-700' : 'text-red-700')}>
          {delta > 0 ? '+' : ''}{delta}%
        </span>
      )}
    </div>
  );
}
