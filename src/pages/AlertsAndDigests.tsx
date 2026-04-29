import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home, ShoppingCart, Search, Settings, Calculator, Target, ArrowDownLeft,
  Bell, BarChart3, FileText, Receipt, MessageSquare, UserCircle,
  PanelLeft, PanelLeftClose, LogIn, LogOut, Send, Sparkles, Plus,
  CalendarClock, Smartphone, MessageCircle, CheckCircle2, ChevronRight,
  ArrowLeft, ArrowRight, Shield, Clock, TrendingDown, AlertTriangle,
  Zap, Inbox, ExternalLink, X, Bot, User as UserIcon, Check,
} from 'lucide-react';
import { trackedStore, useTracked, type AlertItem, type WatchItem } from '@/lib/trackedStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { SIPBrandLogo } from '@/components/sip/SIPBrandLogo';
import { SIP_BRAND } from '@/config/sipBrandConfig';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

// ============ Types ============
type ViewMode = 'home' | 'alerts' | 'tracked' | 'inbox' | 'profile-notif' | 'copilot-demo';
type WizardStep = 0 | 1 | 2 | 3;
type Depth = 'quick' | 'detailed';
type Frequency = 'daily' | 'weekdays' | 'custom';
type TimePreset = 'morning' | 'noon' | 'evening' | 'custom';

interface Prefs {
  enabled: boolean;
  timePreset: TimePreset;
  customTime: string;
  topics: { portfolio: boolean; market: boolean; sip: boolean; underperf: boolean; nfo: boolean };
  depth: Depth;
  frequency: Frequency;
  threshold: number;
  channels: { inApp: boolean; whatsapp: boolean; telegram: boolean };
}

const DEFAULT_PREFS: Prefs = {
  enabled: true,
  timePreset: 'morning',
  customTime: '08:00',
  topics: { portfolio: true, market: false, sip: true, underperf: false, nfo: false },
  depth: 'quick',
  frequency: 'daily',
  threshold: 5,
  channels: { inApp: true, whatsapp: false, telegram: false },
};

const presetTime = (p: TimePreset, custom: string) =>
  p === 'morning' ? '08:00 IST' : p === 'noon' ? '13:00 IST' : p === 'evening' ? '19:00 IST' : `${custom} IST`;

// ============ Mock inbox ============
interface InboxItem {
  id: string;
  type: 'Digest' | 'SIP' | 'News' | 'Alert';
  title: string;
  preview: string;
  body: string;
  ts: string;
  priority?: 'high' | 'normal';
  channel: 'WhatsApp' | 'Telegram' | 'In-app';
}

const INBOX: InboxItem[] = [
  {
    id: 'i1', type: 'SIP', title: 'SIP mandate failed — Axis Bluechip',
    preview: '₹5,000 SIP debit failed today. Insufficient balance flagged at 8:02 AM.',
    body: 'Your monthly SIP of ₹5,000 in Axis Bluechip Fund could not be debited from HDFC ****4521 today (29 Apr 2026). Reason: insufficient balance. The next attempt is scheduled for 02 May 2026. Fix the mandate or top up the account to avoid a missed instalment.',
    ts: 'Today, 8:04 AM', priority: 'high', channel: 'WhatsApp',
  },
  {
    id: 'i2', type: 'Digest', title: 'Daily portfolio digest',
    preview: 'Portfolio +1.2% • Weakest: HDFC Mid-cap −0.8% • Nifty +0.6%',
    body: 'Hi Priya, your portfolio is at ₹4,82,140 today (+₹5,720, +1.2%). Top mover: Parag Parikh Flexi (+1.9%). Weakest: HDFC Mid-cap (−0.8%). Nifty 50 closed +0.6%. No SIP debits scheduled tomorrow.',
    ts: 'Today, 8:00 AM', channel: 'WhatsApp',
  },
  {
    id: 'i3', type: 'Alert', title: 'Underperformance alert — ICICI Pru Value Discovery',
    preview: '6-month return trailing category by 4.8 percentage points.',
    body: 'ICICI Pru Value Discovery has trailed its category by 4.8 pp over the last 6 months. Within your 5% threshold, but worth a look. Tap "Why?" for the Copilot breakdown.',
    ts: 'Yesterday, 7:58 PM', channel: 'Telegram',
  },
  {
    id: 'i4', type: 'News', title: 'RBI holds repo rate at 6.50%',
    preview: 'Neutral stance retained; bond funds may see modest tailwind.',
    body: 'RBI MPC kept the repo rate unchanged at 6.50% with a neutral stance. Short-duration debt funds in your portfolio (HDFC Short Term Debt) are likely to see a modest tailwind. No action recommended.',
    ts: 'Yesterday, 11:10 AM', channel: 'In-app',
  },
  {
    id: 'i5', type: 'Digest', title: 'Daily portfolio digest',
    preview: 'Portfolio −0.3% • Auto-debit successful for 2 SIPs',
    body: '2 SIPs debited successfully (Mirae Large Cap ₹3,000, Parag Parikh Flexi ₹4,000). Portfolio at ₹4,76,420 (−0.3%). Markets flat.',
    ts: '28 Apr, 8:00 AM', channel: 'WhatsApp',
  },
];

// ============ Quick action pills ============
const QUICK_ACTIONS = [
  { label: 'Ask me anything', icon: '✨' },
  { label: 'Plan for Goals', icon: '🎯' },
  { label: 'Advise on my Portfolio', icon: '📊' },
  { label: 'Explore Funds', icon: '🔍' },
  { label: 'Fund Search', icon: '⚖️' },
  { label: 'Calculate my Returns', icon: '🧮' },
  { label: 'Statements', icon: '📄' },
  { label: 'I want to Invest', icon: '💰' },
  { label: 'Complete Full KYC', icon: '🪪' },
  { label: 'Schedule my updates', icon: '🔔', highlight: true },
];

// ============ Component ============
export default function AlertsAndDigests() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [view, setView] = useState<ViewMode>('home');
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<WizardStep>(1);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [openItem, setOpenItem] = useState<InboxItem | null>(null);
  const [sessionId] = useState('03826ACD');

  useEffect(() => { if (isMobile) setSidebarOpen(false); }, [isMobile]);

  const updatePref = <K extends keyof Prefs>(k: K, v: Prefs[K]) => setPrefs(p => ({ ...p, [k]: v }));

  const savePrefs = () => {
    toast({ title: 'Preferences saved', description: `Daily digest ${prefs.enabled ? 'on' : 'off'} · ${presetTime(prefs.timePreset, prefs.customTime)} · ${prefs.depth === 'quick' ? 'Quick' : 'Detailed'}` });
  };

  const connectChannel = (ch: 'whatsapp' | 'telegram') => {
    setPrefs(p => ({ ...p, channels: { ...p.channels, [ch]: true } }));
    toast({ title: `${ch === 'whatsapp' ? 'WhatsApp' : 'Telegram'} connected (demo)`, description: ch === 'whatsapp' ? 'Linked to +91 ••••• •4521' : 'Linked to @priya_w' });
  };

  // ============ Sidebar nav ============
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'portfolio', label: 'Portfolio', icon: BarChart3, disabled: true },
    { id: 'invest', label: 'Invest', icon: ShoppingCart, disabled: true },
    { id: 'search', label: 'Search', icon: Search, disabled: true },
    { id: 'transactions', label: 'Transactions', icon: Receipt, disabled: true },
    { id: 'sips', label: 'SIPs', icon: Settings, disabled: true },
    { id: 'statements', label: 'Statements', icon: FileText, disabled: true },
    { id: 'calculator', label: 'Calculator', icon: Calculator, disabled: true },
    { id: 'goals', label: 'Goals', icon: Target, disabled: true },
    { id: 'alerts', label: 'Alerts & digests', icon: Bell, badge: 'New' },
    { id: 'tracked', label: 'Tracked instruments', icon: Heart },
    { id: 'inbox', label: 'Notification inbox', icon: Inbox },
    { id: 'sell', label: 'Sell', icon: ArrowDownLeft, disabled: true },
    { id: 'chat', label: 'Chat History', icon: MessageSquare, disabled: true },
    { id: 'profile-notif', label: 'Profile', icon: UserCircle },
  ];

  const handleNav = (id: string, disabled?: boolean) => {
    if (disabled) {
      toast({ title: 'Demo module', description: 'This section lives in the full Wealth Platform.' });
      return;
    }
    if (id === 'home' || id === 'alerts' || id === 'inbox' || id === 'profile-notif') {
      setView(id as ViewMode);
    }
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
            const isActive =
              (view === 'home' && item.id === 'home') ||
              (view === 'alerts' && item.id === 'alerts') ||
              (view === 'inbox' && item.id === 'inbox') ||
              (view === 'profile-notif' && item.id === 'profile-notif');
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id, item.disabled)}
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
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-sip-brand/15 text-sip-brand">{item.badge}</span>
                    )}
                  </>
                )}
              </button>
            );
          })}

          <div className="pt-2 mt-2 border-t border-sip-border">
            <button
              onClick={() => { setView('home'); }}
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
              <Bot className="w-4 h-4" />
            </div>
            <h1 className="text-base md:text-lg font-semibold text-sip-text-primary truncate">
              {view === 'home' && 'Home'}
              {view === 'alerts' && 'Alerts & digests'}
              {view === 'inbox' && 'Notification inbox'}
              {view === 'profile-notif' && 'Profile · Notifications'}
              {view === 'copilot-demo' && 'Wealth Copilot'}
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
              onClick={() => setView('inbox')}
              aria-label="Open inbox"
            >
              <Bell className="w-4 h-4 text-sip-text-secondary" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-sip-brand" />
            </button>
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 overflow-y-auto">
          {view === 'home' && (
            <HomeView
              prefs={prefs}
              onSchedule={() => { setWizardStep(1); setWizardOpen(true); }}
              onOpenAlerts={() => setView('alerts')}
              onOpenCopilot={() => setView('copilot-demo')}
            />
          )}
          {view === 'alerts' && (
            <AlertsHubView
              prefs={prefs}
              updatePref={updatePref}
              onSave={savePrefs}
              onConnect={connectChannel}
              onOpenWizard={() => { setWizardStep(1); setWizardOpen(true); }}
              onOpenAdvanced={() => setAdvancedOpen(true)}
            />
          )}
          {view === 'inbox' && (
            <InboxView onOpen={setOpenItem} />
          )}
          {view === 'profile-notif' && (
            <ProfileNotifView prefs={prefs} onEdit={() => setView('alerts')} />
          )}
          {view === 'copilot-demo' && (
            <CopilotDemoView onViewAlerts={() => setView('alerts')} threshold={prefs.threshold} setThreshold={(n) => updatePref('threshold', n)} />
          )}
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

      {/* ============ Wizard ============ */}
      <Dialog open={wizardOpen} onOpenChange={setWizardOpen}>
        <DialogContent className="max-w-lg">
          <WizardBody
            step={wizardStep}
            setStep={setWizardStep}
            prefs={prefs}
            updatePref={updatePref}
            onClose={() => setWizardOpen(false)}
            onDone={() => { setWizardOpen(false); setView('alerts'); toast({ title: 'You\'re all set 🎉', description: 'Daily digest scheduled at ' + presetTime(prefs.timePreset, prefs.customTime) }); }}
          />
        </DialogContent>
      </Dialog>

      {/* ============ Advanced setup ============ */}
      <Dialog open={advancedOpen} onOpenChange={setAdvancedOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Advanced setup</DialogTitle>
            <DialogDescription>Phase 1 onboarding — finer control over what, when and how.</DialogDescription>
          </DialogHeader>
          <AdvancedSetup prefs={prefs} updatePref={updatePref} onClose={() => { setAdvancedOpen(false); savePrefs(); }} />
        </DialogContent>
      </Dialog>

      {/* ============ Inbox slide-over ============ */}
      <Sheet open={!!openItem} onOpenChange={(o) => !o && setOpenItem(null)}>
        <SheetContent className="w-full sm:max-w-md">
          {openItem && <InboxDetail item={openItem} onClose={() => setOpenItem(null)} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ============ HOME VIEW ============
function HomeView({ prefs, onSchedule, onOpenAlerts, onOpenCopilot }: {
  prefs: Prefs;
  onSchedule: () => void;
  onOpenAlerts: () => void;
  onOpenCopilot: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-4">
      {/* Greeting bubble */}
      <Card className="border-sip-border rounded-2xl">
        <CardContent className="p-5">
          <p className="text-sm text-sip-text-primary">
            Hi! 👋 I am your <span className="font-semibold">Wealth Copilot</span>. I can help you in following:
          </p>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        {QUICK_ACTIONS.map(a => (
          <button
            key={a.label}
            onClick={() => a.label === 'Schedule my updates' ? onSchedule() : null}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
              a.highlight
                ? 'bg-sip-brand text-sip-brand-foreground border-sip-brand hover:bg-sip-brand/90'
                : 'bg-card border-sip-border text-sip-text-secondary hover:border-sip-brand/40 hover:text-sip-text-primary',
            )}
          >
            <span>{a.icon}</span>
            <span>{a.label}</span>
          </button>
        ))}
      </div>

      {/* Daily digest starter card */}
      <Card className="border-sip-border rounded-2xl border-l-4 border-l-sip-brand">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-sip-brand/10 text-sip-brand flex items-center justify-center shrink-0">
              <CalendarClock className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sip-text-primary">Turn on your daily portfolio digest</p>
              <p className="text-xs text-sip-text-secondary mt-1">
                Get a 30-second summary on WhatsApp every morning — portfolio moves, weakest fund, what to watch.
              </p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={onSchedule} className="bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90 h-8">
                  <Zap className="w-3.5 h-3.5 mr-1.5" /> Get started
                </Button>
                <Button size="sm" variant="outline" onClick={onOpenAlerts} className="h-8">
                  Open Alerts & digests
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Copilot static demo entry */}
      <Card className="border-sip-border rounded-2xl">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-sip-text-primary">Tell Copilot what to watch</p>
              <p className="text-xs text-sip-text-secondary mt-1">Try: "Only alert me if my portfolio drops more than 5%"</p>
              <Button size="sm" variant="ghost" className="mt-2 h-8 text-sip-brand" onClick={onOpenCopilot}>
                Open Copilot demo <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Composer */}
      <Card className="border-sip-border rounded-2xl">
        <CardContent className="p-3 flex items-center gap-2">
          <Input placeholder="Ask about funds, SIPs, goals, or anything…" className="border-0 focus-visible:ring-0 shadow-none" />
          <Button size="sm" className="h-9 w-9 p-0 bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90">
            <Send className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ============ ALERTS HUB ============
function AlertsHubView({ prefs, updatePref, onSave, onConnect, onOpenWizard, onOpenAdvanced }: {
  prefs: Prefs;
  updatePref: <K extends keyof Prefs>(k: K, v: Prefs[K]) => void;
  onSave: () => void;
  onConnect: (ch: 'whatsapp' | 'telegram') => void;
  onOpenWizard: () => void;
  onOpenAdvanced: () => void;
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-sip-text-primary">Alerts & digests</h2>
          <p className="text-xs text-sip-text-muted mt-0.5">Personalized Financial Copilot</p>
          <p className="text-sm text-sip-text-secondary mt-2 max-w-2xl">
            Control how the Wealth Copilot keeps you informed — across <span className="font-medium text-sip-text-primary">WhatsApp</span>, <span className="font-medium text-sip-text-primary">Telegram</span> and <span className="font-medium text-sip-text-primary">in-app</span>. Smart digests, urgent alerts, zero spam.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onOpenAdvanced} size="sm">Advanced setup</Button>
          <Button onClick={onOpenWizard} size="sm" className="bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90">
            <Zap className="w-3.5 h-3.5 mr-1.5" /> Set up in 30 seconds
          </Button>
        </div>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Daily digest */}
        <Card className="border-sip-border lg:col-span-2">
          <CardContent className="p-5 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <CalendarClock className="w-4 h-4 text-sip-brand" />
                  <h3 className="text-sm font-semibold text-sip-text-primary">Daily portfolio digest</h3>
                </div>
                <p className="text-xs text-sip-text-secondary mt-1">A 30-second summary of how your investments moved.</p>
              </div>
              <Switch checked={prefs.enabled} onCheckedChange={(v) => updatePref('enabled', v)} />
            </div>

            {/* Time */}
            <div>
              <Label className="text-xs font-semibold text-sip-text-secondary uppercase tracking-wider">Time</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {([
                  { id: 'morning', label: 'Morning · 8:00' },
                  { id: 'noon', label: 'Noon · 13:00' },
                  { id: 'evening', label: 'Evening · 19:00' },
                  { id: 'custom', label: 'Custom' },
                ] as { id: TimePreset; label: string }[]).map(t => (
                  <button
                    key={t.id}
                    onClick={() => updatePref('timePreset', t.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                      prefs.timePreset === t.id
                        ? 'bg-sip-brand text-sip-brand-foreground border-sip-brand'
                        : 'bg-card text-sip-text-secondary border-sip-border hover:border-sip-brand/40',
                    )}
                  >
                    {t.label}
                  </button>
                ))}
                {prefs.timePreset === 'custom' && (
                  <Input type="time" value={prefs.customTime} onChange={e => updatePref('customTime', e.target.value)} className="h-8 w-28" />
                )}
              </div>
            </div>

            {/* Frequency */}
            <div>
              <Label className="text-xs font-semibold text-sip-text-secondary uppercase tracking-wider">Frequency</Label>
              <RadioGroup value={prefs.frequency} onValueChange={(v) => updatePref('frequency', v as Frequency)} className="flex gap-4 mt-2">
                {[{ id: 'daily', label: 'Daily' }, { id: 'weekdays', label: 'Weekdays only' }, { id: 'custom', label: 'Custom days' }].map(f => (
                  <label key={f.id} className="flex items-center gap-2 text-sm text-sip-text-secondary cursor-pointer">
                    <RadioGroupItem value={f.id} id={`f-${f.id}`} /> {f.label}
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* Depth */}
            <div>
              <Label className="text-xs font-semibold text-sip-text-secondary uppercase tracking-wider">Depth</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  { id: 'quick' as Depth, title: 'Quick summary', sub: '2–3 lines on WhatsApp' },
                  { id: 'detailed' as Depth, title: 'Detailed', sub: 'Full breakdown with context' },
                ].map(d => (
                  <button
                    key={d.id}
                    onClick={() => updatePref('depth', d.id)}
                    className={cn(
                      'rounded-xl border p-3 text-left transition-colors',
                      prefs.depth === d.id
                        ? 'border-sip-brand bg-sip-brand/5'
                        : 'border-sip-border hover:border-sip-brand/40',
                    )}
                  >
                    <p className="text-sm font-semibold text-sip-text-primary">{d.title}</p>
                    <p className="text-[11px] text-sip-text-muted mt-0.5">{d.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div>
              <Label className="text-xs font-semibold text-sip-text-secondary uppercase tracking-wider">Topics</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {([
                  { id: 'portfolio', label: 'Portfolio performance', tag: null },
                  { id: 'sip', label: 'SIP reminders', tag: null },
                  { id: 'underperf', label: 'Underperformance', tag: null },
                  { id: 'market', label: 'Market & news', tag: 'Phase 2+' },
                  { id: 'nfo', label: 'NFO / opportunities', tag: 'Phase 2+' },
                ] as { id: keyof Prefs['topics']; label: string; tag: string | null }[]).map(t => (
                  <label key={t.id} className="flex items-center gap-2 p-2.5 rounded-lg border border-sip-border hover:bg-sip-sidebar-hover cursor-pointer">
                    <Checkbox
                      checked={prefs.topics[t.id]}
                      onCheckedChange={(v) => updatePref('topics', { ...prefs.topics, [t.id]: !!v })}
                    />
                    <span className="text-sm text-sip-text-primary flex-1">{t.label}</span>
                    {t.tag && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">{t.tag}</span>}
                  </label>
                ))}
              </div>
            </div>

            {/* Threshold */}
            <div>
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-sip-text-secondary uppercase tracking-wider">Underperformance threshold</Label>
                <span className="text-sm font-semibold text-sip-brand">{prefs.threshold}%</span>
              </div>
              <Slider
                value={[prefs.threshold]} min={1} max={15} step={1}
                onValueChange={(v) => updatePref('threshold', v[0])}
                className="mt-3"
              />
              <p className="text-[11px] text-sip-text-muted mt-2">
                Alert me only when a fund trails its category by more than <span className="font-semibold text-sip-text-secondary">{prefs.threshold}%</span> over the last 6 months.
              </p>
            </div>

            <div className="flex justify-end">
              <Button onClick={onSave} className="bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90">
                Save preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Channels */}
        <div className="space-y-4">
          <ChannelCard
            name="WhatsApp"
            icon={<MessageCircle className="w-4 h-4" />}
            colorClass="text-emerald-600 bg-emerald-50"
            connected={prefs.channels.whatsapp}
            handle="+91 ••••• •4521"
            onConnect={() => onConnect('whatsapp')}
          />
          <ChannelCard
            name="Telegram"
            icon={<Send className="w-4 h-4" />}
            colorClass="text-sky-600 bg-sky-50"
            connected={prefs.channels.telegram}
            handle="@priya_w"
            onConnect={() => onConnect('telegram')}
          />

          <Card className="border-sip-border bg-sip-sidebar-bg/40">
            <CardContent className="p-4 flex gap-3">
              <Shield className="w-4 h-4 text-sip-brand mt-0.5 shrink-0" />
              <p className="text-[11px] text-sip-text-secondary leading-relaxed">
                Messages contain <span className="font-semibold text-sip-text-primary">investment summaries only</span> — never account credentials, OTPs, or PII. You can disconnect any channel instantly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Message previews */}
      <div>
        <h3 className="text-sm font-semibold text-sip-text-primary mb-2">How your alerts will look</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WhatsAppPreview />
          <TelegramPreview />
        </div>
      </div>
    </div>
  );
}

function ChannelCard({ name, icon, colorClass, connected, handle, onConnect }: {
  name: string; icon: React.ReactNode; colorClass: string; connected: boolean; handle: string; onConnect: () => void;
}) {
  return (
    <Card className="border-sip-border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', colorClass)}>{icon}</div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-sip-text-primary">{name}</p>
              <p className="text-[11px] text-sip-text-muted truncate">
                {connected ? handle : 'Not connected'}
              </p>
            </div>
          </div>
          {connected ? (
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-0 gap-1">
              <CheckCircle2 className="w-3 h-3" /> Connected
            </Badge>
          ) : (
            <Button size="sm" variant="outline" className="h-8" onClick={onConnect}>Connect</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function WhatsAppPreview() {
  return (
    <div className="rounded-2xl border border-sip-border overflow-hidden bg-card shadow-sm">
      <div className="bg-emerald-600 text-white px-4 py-2.5 flex items-center gap-2">
        <MessageCircle className="w-4 h-4" />
        <p className="text-xs font-semibold">WhatsApp · DiscvrAI Wealth</p>
        <span className="ml-auto text-[10px] opacity-80">8:00 AM</span>
      </div>
      <div className="p-4 bg-emerald-50/40">
        <div className="bg-white rounded-xl rounded-tl-sm p-3 max-w-[90%] shadow-sm border border-emerald-100">
          <p className="text-[11px] font-semibold text-sip-text-primary mb-1">Good morning, Priya 🌅</p>
          <p className="text-xs text-sip-text-secondary leading-relaxed">
            Portfolio at <span className="font-semibold text-emerald-700">₹4,82,140 (+1.2%)</span>.<br />
            Top mover: Parag Parikh Flexi <span className="text-emerald-700">+1.9%</span>.<br />
            Weakest: HDFC Mid-cap <span className="text-rose-600">−0.8%</span>.<br />
            No SIP debits today.
          </p>
          <div className="flex gap-3 mt-3 text-[11px] font-semibold">
            <span className="text-emerald-700">View details →</span>
            <span className="text-emerald-700">Analyze →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TelegramPreview() {
  return (
    <div className="rounded-2xl border border-sip-border overflow-hidden bg-card shadow-sm">
      <div className="bg-sky-600 text-white px-4 py-2.5 flex items-center gap-2">
        <Send className="w-4 h-4" />
        <p className="text-xs font-semibold">Telegram · @discvrai_bot</p>
        <span className="ml-auto text-[10px] opacity-80">Now</span>
      </div>
      <div className="p-4 bg-sky-50/40">
        <div className="bg-white rounded-xl rounded-tl-sm p-3 shadow-sm border border-rose-200">
          <div className="flex items-center gap-1.5 mb-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">Urgent · SIP failed</p>
          </div>
          <p className="text-xs text-sip-text-secondary leading-relaxed">
            ₹5,000 SIP in <span className="font-semibold text-sip-text-primary">Axis Bluechip</span> could not be debited. Reason: insufficient balance. Next attempt: <span className="font-semibold">02 May</span>.
          </p>
          <div className="flex gap-2 mt-3">
            <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 text-[11px] font-semibold">Why?</span>
            <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 text-[11px] font-semibold">What should I do?</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ INBOX ============
function InboxView({ onOpen }: { onOpen: (i: InboxItem) => void }) {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-3">
      <div>
        <h2 className="text-xl font-semibold text-sip-text-primary">Notification inbox</h2>
        <p className="text-sm text-sip-text-secondary mt-1">Past digests and alerts across all channels.</p>
      </div>

      <div className="space-y-2">
        {INBOX.map(item => {
          const isHigh = item.priority === 'high';
          return (
            <button
              key={item.id}
              onClick={() => onOpen(item)}
              className={cn(
                'w-full text-left rounded-xl border bg-card p-4 hover:border-sip-brand/40 transition-colors',
                isHigh ? 'border-l-4 border-l-rose-500 border-rose-200' : 'border-sip-border',
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                  item.type === 'Digest' && 'bg-sip-brand/10 text-sip-brand',
                  item.type === 'SIP' && 'bg-rose-50 text-rose-600',
                  item.type === 'News' && 'bg-amber-50 text-amber-700',
                  item.type === 'Alert' && 'bg-purple-50 text-purple-700',
                )}>
                  {item.type === 'Digest' && <CalendarClock className="w-4 h-4" />}
                  {item.type === 'SIP' && <AlertTriangle className="w-4 h-4" />}
                  {item.type === 'News' && <FileText className="w-4 h-4" />}
                  {item.type === 'Alert' && <Bell className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-[10px] h-5 bg-sip-sidebar-hover text-sip-text-secondary border-0">{item.type}</Badge>
                    <Badge variant="outline" className="text-[10px] h-5 border-sip-border text-sip-text-muted">{item.channel}</Badge>
                    {isHigh && <Badge className="text-[10px] h-5 bg-rose-100 text-rose-700 border-0 hover:bg-rose-100">High priority</Badge>}
                    <span className="text-[11px] text-sip-text-muted ml-auto">{item.ts}</span>
                  </div>
                  <p className="text-sm font-semibold text-sip-text-primary mt-1.5">{item.title}</p>
                  <p className="text-xs text-sip-text-secondary mt-0.5 line-clamp-1">{item.preview}</p>
                  {isHigh && (
                    <div className="flex gap-2 mt-2.5">
                      <Button size="sm" className="h-7 text-xs bg-rose-600 text-white hover:bg-rose-700" onClick={(e) => { e.stopPropagation(); toast({ title: 'Mandate fix flow (demo)' }); }}>
                        Fix mandate
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={(e) => { e.stopPropagation(); toast({ title: 'Invest now (demo)' }); }}>
                        Invest now
                      </Button>
                    </div>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-sip-text-muted mt-2 shrink-0" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function InboxDetail({ item, onClose }: { item: InboxItem; onClose: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="pb-3 border-b border-sip-border">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-[10px] h-5">{item.type}</Badge>
          <Badge variant="outline" className="text-[10px] h-5">{item.channel}</Badge>
          {item.priority === 'high' && <Badge className="text-[10px] h-5 bg-rose-100 text-rose-700 hover:bg-rose-100">High priority</Badge>}
        </div>
        <SheetTitle className="text-base text-left mt-2">{item.title}</SheetTitle>
        <SheetDescription className="text-left">{item.ts}</SheetDescription>
      </SheetHeader>
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        <p className="text-sm text-sip-text-secondary leading-relaxed">{item.body}</p>

        <div className="rounded-xl border border-sip-border p-3 bg-sip-sidebar-bg/40">
          <p className="text-[11px] font-semibold text-sip-text-secondary uppercase tracking-wider mb-2">Quick actions</p>
          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" size="sm" className="justify-start gap-2" onClick={() => toast({ title: 'View portfolio (demo)' })}>
              <BarChart3 className="w-3.5 h-3.5" /> View portfolio <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>
            <Button variant="outline" size="sm" className="justify-start gap-2" onClick={() => toast({ title: 'Invest flow (demo)' })}>
              <ShoppingCart className="w-3.5 h-3.5" /> Invest now <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>
            <Button variant="outline" size="sm" className="justify-start gap-2" onClick={() => toast({ title: 'Copilot opens reasoning trail (demo)' })}>
              <Sparkles className="w-3.5 h-3.5" /> Why? Ask Copilot <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ PROFILE NOTIFICATIONS ============
function ProfileNotifView({ prefs, onEdit }: { prefs: Prefs; onEdit: () => void }) {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-5">
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12">
          <AvatarFallback className="bg-sip-brand text-sip-brand-foreground">P</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-base font-semibold text-sip-text-primary">Priya</p>
          <p className="text-xs text-sip-text-muted">priya@example.com · KYC verified</p>
        </div>
      </div>

      <Card className="border-sip-border">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-sip-text-primary">Notifications</p>
              <p className="text-xs text-sip-text-muted">Synced from Alerts & digests · read-only summary</p>
            </div>
            <Button size="sm" variant="outline" onClick={onEdit}>Edit in Alerts & digests</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <SummaryRow label="Daily digest" value={prefs.enabled ? `On · ${presetTime(prefs.timePreset, prefs.customTime)}` : 'Off'} />
            <SummaryRow label="Frequency" value={prefs.frequency === 'daily' ? 'Daily' : prefs.frequency === 'weekdays' ? 'Weekdays only' : 'Custom days'} />
            <SummaryRow label="Depth" value={prefs.depth === 'quick' ? 'Quick summary' : 'Detailed'} />
            <SummaryRow label="Underperf threshold" value={`> ${prefs.threshold}%`} />
            <SummaryRow label="WhatsApp" value={prefs.channels.whatsapp ? 'Connected · +91 ••••• •4521' : 'Not connected'} />
            <SummaryRow label="Telegram" value={prefs.channels.telegram ? 'Connected · @priya_w' : 'Not connected'} />
          </div>

          <div className="pt-2 border-t border-sip-border">
            <p className="text-[11px] font-semibold text-sip-text-secondary uppercase tracking-wider mb-2">Topics</p>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(prefs.topics).map(([k, v]) => (
                <Badge key={k} variant={v ? 'default' : 'outline'} className={cn('text-[10px]', v ? 'bg-sip-brand text-sip-brand-foreground' : 'text-sip-text-muted')}>
                  {labelForTopic(k)}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-sip-sidebar-bg/40 px-3 py-2.5 border border-sip-border">
      <span className="text-xs text-sip-text-muted">{label}</span>
      <span className="text-xs font-semibold text-sip-text-primary truncate ml-2">{value}</span>
    </div>
  );
}

function labelForTopic(k: string) {
  return ({ portfolio: 'Portfolio', sip: 'SIP', underperf: 'Underperformance', market: 'Market & news', nfo: 'NFO' } as Record<string, string>)[k] || k;
}

// ============ COPILOT DEMO (static chat) ============
function CopilotDemoView({ onViewAlerts, threshold, setThreshold }: {
  onViewAlerts: () => void;
  threshold: number;
  setThreshold: (n: number) => void;
}) {
  const [confirmed, setConfirmed] = useState(true);
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-3">
      <div>
        <h2 className="text-xl font-semibold text-sip-text-primary">Wealth Copilot</h2>
        <p className="text-xs text-sip-text-muted mt-0.5">Static demo · single agent turn</p>
      </div>

      {/* User msg */}
      <div className="flex justify-end">
        <div className="flex items-start gap-2 max-w-[80%]">
          <div className="bg-sip-brand text-sip-brand-foreground rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-sm">
            <p className="text-sm">Only alert me if my portfolio drops more than {threshold}%</p>
          </div>
          <Avatar className="w-7 h-7 mt-0.5"><AvatarFallback className="bg-sip-sidebar-hover text-[10px]"><UserIcon className="w-3.5 h-3.5" /></AvatarFallback></Avatar>
        </div>
      </div>

      {/* Assistant */}
      <div className="flex items-start gap-2">
        <div className="w-8 h-8 rounded-lg bg-sip-brand text-sip-brand-foreground flex items-center justify-center shrink-0">
          <Bot className="w-4 h-4" />
        </div>
        <div className="flex-1 max-w-[85%] space-y-2">
          <Card className="border-sip-border rounded-2xl rounded-tl-sm">
            <CardContent className="p-4">
              <p className="text-sm text-sip-text-primary">
                Got it. I'll only ping you when your portfolio's <span className="font-semibold">single-day drop exceeds {threshold}%</span>. Other digests will continue as scheduled.
              </p>

              {confirmed && (
                <div className="mt-3 rounded-xl border border-sip-brand/30 bg-sip-brand/5 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-sip-brand" />
                    <p className="text-xs font-semibold text-sip-text-primary">Rule saved · Drop alert</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <SummaryRow label="Trigger" value={`Portfolio drop > ${threshold}%`} />
                    <SummaryRow label="Window" value="Single day" />
                    <SummaryRow label="Channel" value="WhatsApp + In-app" />
                    <SummaryRow label="Status" value="Active" />
                  </div>

                  <div className="mt-3">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-sip-text-muted">Adjust threshold</Label>
                    <div className="flex items-center gap-3 mt-1">
                      <Slider value={[threshold]} min={1} max={15} step={1} onValueChange={(v) => setThreshold(v[0])} className="flex-1" />
                      <span className="text-xs font-semibold text-sip-brand w-10 text-right">{threshold}%</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="h-8 bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90" onClick={onViewAlerts}>
                      View in Alerts & digests <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8" onClick={() => setConfirmed(false)}>Undo</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ============ WIZARD ============
function WizardBody({ step, setStep, prefs, updatePref, onClose, onDone }: {
  step: WizardStep;
  setStep: (s: WizardStep) => void;
  prefs: Prefs;
  updatePref: <K extends keyof Prefs>(k: K, v: Prefs[K]) => void;
  onClose: () => void;
  onDone: () => void;
}) {
  return (
    <div>
      <DialogHeader>
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3].map(n => (
            <div key={n} className={cn('h-1.5 flex-1 rounded-full', n <= step ? 'bg-sip-brand' : 'bg-sip-sidebar-hover')} />
          ))}
        </div>
        <DialogTitle className="text-lg">
          {step === 1 && 'Smarter, more personal updates'}
          {step === 2 && 'When should we notify you?'}
          {step === 3 && 'You\'re all set 🎉'}
        </DialogTitle>
        <DialogDescription>
          {step === 1 && 'Get a 30-second portfolio digest, urgent SIP alerts and fund warnings — all on the channel you prefer.'}
          {step === 2 && 'Pick a time slot. You can change it any time from Alerts & digests.'}
          {step === 3 && 'Your daily digest is scheduled. Connect WhatsApp or Telegram next, or stay with in-app only.'}
        </DialogDescription>
      </DialogHeader>

      <div className="py-4 min-h-[180px]">
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { icon: <CalendarClock className="w-4 h-4" />, t: 'Daily digest', s: 'Portfolio in 3 lines' },
              { icon: <AlertTriangle className="w-4 h-4" />, t: 'Smart alerts', s: 'Only when it matters' },
              { icon: <Sparkles className="w-4 h-4" />, t: 'Copilot insights', s: '"Why?" in one tap' },
            ].map(c => (
              <div key={c.t} className="rounded-xl border border-sip-border p-3">
                <div className="w-8 h-8 rounded-lg bg-sip-brand/10 text-sip-brand flex items-center justify-center">{c.icon}</div>
                <p className="text-sm font-semibold text-sip-text-primary mt-2">{c.t}</p>
                <p className="text-[11px] text-sip-text-muted mt-0.5">{c.s}</p>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {([
                { id: 'morning', label: 'Morning', sub: '8:00 IST' },
                { id: 'noon', label: 'Noon', sub: '13:00 IST' },
                { id: 'evening', label: 'Evening', sub: '19:00 IST' },
                { id: 'custom', label: 'Custom', sub: 'Pick time' },
              ] as { id: TimePreset; label: string; sub: string }[]).map(t => (
                <button
                  key={t.id}
                  onClick={() => updatePref('timePreset', t.id)}
                  className={cn(
                    'rounded-xl border p-3 text-left transition-colors',
                    prefs.timePreset === t.id ? 'border-sip-brand bg-sip-brand/5' : 'border-sip-border hover:border-sip-brand/40',
                  )}
                >
                  <p className="text-sm font-semibold text-sip-text-primary">{t.label}</p>
                  <p className="text-[11px] text-sip-text-muted">{t.sub}</p>
                </button>
              ))}
            </div>
            {prefs.timePreset === 'custom' && (
              <Input type="time" value={prefs.customTime} onChange={e => updatePref('customTime', e.target.value)} />
            )}
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <p className="text-sm text-sip-text-secondary mt-3">
              Daily digest at <span className="font-semibold text-sip-text-primary">{presetTime(prefs.timePreset, prefs.customTime)}</span>
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between gap-2 pt-2 border-t border-sip-border">
        <Button variant="ghost" size="sm" onClick={() => step > 1 ? setStep((step - 1) as WizardStep) : onClose()}>
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
        </Button>
        {step < 3 ? (
          <Button size="sm" className="bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90" onClick={() => setStep((step + 1) as WizardStep)}>
            Continue <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={onClose}>Back to Copilot</Button>
            <Button size="sm" className="bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90" onClick={onDone}>
              Open Alerts & digests
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ ADVANCED SETUP ============
function AdvancedSetup({ prefs, updatePref, onClose }: {
  prefs: Prefs;
  updatePref: <K extends keyof Prefs>(k: K, v: Prefs[K]) => void;
  onClose: () => void;
}) {
  return (
    <div className="space-y-5 py-2">
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-sip-text-secondary">What do you want to stay updated about?</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {[
            { id: 'portfolio', label: 'Portfolio performance' },
            { id: 'market', label: 'Market & news' },
            { id: 'nfo', label: 'NFO / opportunities' },
            { id: 'sip', label: 'SIP reminders' },
          ].map(t => (
            <label key={t.id} className="flex items-center gap-2 p-2.5 rounded-lg border border-sip-border cursor-pointer hover:bg-sip-sidebar-hover">
              <Checkbox
                checked={prefs.topics[t.id as keyof Prefs['topics']]}
                onCheckedChange={(v) => updatePref('topics', { ...prefs.topics, [t.id]: !!v })}
              />
              <span className="text-sm">{t.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-sip-text-secondary">Frequency</Label>
        <RadioGroup value={prefs.frequency} onValueChange={(v) => updatePref('frequency', v as Frequency)} className="flex gap-4 mt-2">
          {[{ id: 'daily', label: 'Daily' }, { id: 'weekdays', label: 'Weekdays' }, { id: 'custom', label: 'Custom' }].map(f => (
            <label key={f.id} className="flex items-center gap-2 text-sm cursor-pointer">
              <RadioGroupItem value={f.id} id={`af-${f.id}`} /> {f.label}
            </label>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-sip-text-secondary">Channels</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
          {([
            { id: 'inApp', label: 'In-app' },
            { id: 'whatsapp', label: 'WhatsApp' },
            { id: 'telegram', label: 'Telegram' },
          ] as { id: keyof Prefs['channels']; label: string }[]).map(c => (
            <label key={c.id} className="flex items-center gap-2 p-2.5 rounded-lg border border-sip-border cursor-pointer hover:bg-sip-sidebar-hover">
              <Switch
                checked={prefs.channels[c.id]}
                onCheckedChange={(v) => updatePref('channels', { ...prefs.channels, [c.id]: v })}
              />
              <span className="text-sm">{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-sip-border">
        <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
        <Button size="sm" className="bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90" onClick={onClose}>Save & finish</Button>
      </div>
    </div>
  );
}
