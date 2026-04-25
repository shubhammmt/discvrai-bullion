import { useMemo, useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  MessageSquare,
  ShieldCheck,
  Activity,
  Send,
  Zap,
  CheckCircle2,
  XCircle,
  User,
  LogOut,
  Sun,
  Moon,
  ChevronDown,
  Wallet,
  RefreshCw,
  Calculator,
  Target,
  PieChart as PortfolioIcon,
  Bot,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const APP_URL = 'https://agent.discvr.ai/discovery?view=invest';

/* =========================================================================
   DiscvrAI Wealth Copilot — Dark Finance landing page
   Route: /discvrai/copilot
   Aesthetic: deep charcoal #07090d, electric emerald #10F0A8, cyber blue #38BDF8
   ========================================================================= */

type Persona = 'visitor' | 'new_user' | 'investor';

const NAV_VISITOR = [
  { label: 'Features', href: '#features' },
  { label: 'Agents', href: '#agents' },
  { label: 'Security', href: '#security' },
  { label: 'Pricing', href: '#pricing' },
];

const NAV_NEW_USER = [
  { label: 'Invest', href: '#features', icon: Wallet },
  { label: 'SIP', href: '#agents', icon: RefreshCw },
  { label: 'Calculator', href: '#features', icon: Calculator },
  { label: 'Goal', href: '#agents', icon: Target },
  { label: 'Chatbot', href: '#chat', icon: Bot },
];

const NAV_INVESTOR_PORTFOLIO_SUB = [
  { label: 'Sell', href: '#agents' },
  { label: 'Transactions', href: '#agents' },
  { label: 'Statement', href: '#security' },
];

const ALLOC = [
  { name: 'Equity', value: 52, color: '#38BDF8' },
  { name: 'Debt', value: 23, color: '#A78BFA' },
  { name: 'Gold', value: 10, color: '#10F0A8' },
  { name: 'Cash', value: 8, color: '#F59E0B' },
  { name: 'Intl', value: 7, color: '#F472B6' },
];

const REBAL = [
  { name: 'Equity', value: 50, color: '#38BDF8' },
  { name: 'Debt', value: 25, color: '#A78BFA' },
  { name: 'Gold', value: 15, color: '#10F0A8' },
  { name: 'Cash', value: 5, color: '#F59E0B' },
  { name: 'Intl', value: 5, color: '#F472B6' },
];

const TICKERS = [
  { sym: 'NIFTY 50', px: '24,812.40', chg: '+0.82%', up: true },
  { sym: 'GOLD 24K', px: '₹ 7,318/g', chg: '+1.14%', up: true },
  { sym: 'HDFCBANK', px: '₹ 1,712.05', chg: '-0.46%', up: false },
];

const STREAM = [
  { agent: 'Agent 422', action: 'Profit-take 5% Digital Gold', time: '2s ago', tone: 'emerald' },
  { agent: 'Agent 101', action: 'Set 3% GST rule for new buys', time: '14s ago', tone: 'blue' },
  { agent: 'Agent 318', action: 'Rebalanced ELSS → 12% allocation', time: '47s ago', tone: 'emerald' },
  { agent: 'Agent 207', action: 'Paused SIP — bank balance < ₹5,000', time: '1m ago', tone: 'amber' },
  { agent: 'Agent 555', action: 'Goal hit — Vacation 2026 fully funded', time: '3m ago', tone: 'emerald' },
];

const AUDIT_SERIES = Array.from({ length: 24 }).map((_, i) => ({
  t: `${String(i).padStart(2, '0')}:00`,
  v: 80 + Math.sin(i / 2) * 12 + Math.random() * 8,
}));

export default function DiscvrCopilot() {
  const [persona, setPersona] = useState<Persona>('visitor');
  const [dark, setDark] = useState(true);

  const bg = dark ? 'bg-[#111827]' : 'bg-[#f1f5f9]';
  const text = dark ? 'text-slate-100' : 'text-slate-900';

  return (
    <div className={`min-h-screen ${bg} ${text} antialiased selection:bg-emerald-400/30 transition-colors`}>
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className={`absolute -top-40 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full blur-3xl ${dark ? 'bg-emerald-500/10' : 'bg-emerald-300/30'}`} />
        <div className={`absolute top-[55vh] right-[-10%] h-[420px] w-[640px] rounded-full blur-3xl ${dark ? 'bg-sky-500/10' : 'bg-sky-300/30'}`} />
        <div className={`absolute top-[140vh] left-[-10%] h-[420px] w-[640px] rounded-full blur-3xl ${dark ? 'bg-violet-500/10' : 'bg-violet-300/30'}`} />
      </div>

      <TopNav persona={persona} dark={dark} onToggleDark={() => setDark((d) => !d)} />
      <PersonaSwitcher persona={persona} onChange={setPersona} />

      <main className="mx-auto max-w-7xl px-6 pb-40">
        <Hero />
        <ComparisonTable />
        <BentoGrid />
        <LiveStream />
        <TrustSection />
        <StartBuilding />
      </main>

      <ChatBar />
    </div>
  );
}

/* ----------------------- Persona Switcher (Demo) ----------------------- */
function PersonaSwitcher({ persona, onChange }: { persona: Persona; onChange: (p: Persona) => void }) {
  const items: { v: Persona; l: string }[] = [
    { v: 'visitor', l: 'Visitor' },
    { v: 'new_user', l: 'New User' },
    { v: 'investor', l: 'Investor' },
  ];
  return (
    <div className="fixed bottom-24 right-4 z-50">
      <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-2 shadow-2xl backdrop-blur-xl">
        <p className="mb-1.5 text-center text-[9px] font-semibold uppercase tracking-wider text-slate-400">Demo Mode</p>
        <div className="flex gap-1">
          {items.map((it) => (
            <button
              key={it.v}
              onClick={() => onChange(it.v)}
              className={`rounded-lg px-3 py-1.5 text-[10px] font-medium transition ${
                persona === it.v
                  ? 'bg-gradient-to-br from-emerald-400 to-sky-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              {it.l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Top Nav ----------------------------- */
function TopNav({ persona, dark, onToggleDark }: { persona: Persona; dark: boolean; onToggleDark: () => void }) {
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (portfolioRef.current && !portfolioRef.current.contains(e.target as Node)) setPortfolioOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const headerBg = dark ? 'bg-[#111827]/80 border-white/5' : 'bg-white/80 border-slate-900/10';
  const linkCls = dark
    ? 'text-slate-300 hover:bg-white/5 hover:text-white'
    : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-900';
  const iconBtn = dark
    ? 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
    : 'border-slate-900/10 bg-white text-slate-700 hover:bg-slate-100';

  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-xl ${headerBg}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5">
        <a href="/discvrai/copilot" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 text-slate-950 shadow-lg shadow-emerald-500/30">
            <Sparkles className="h-4 w-4" strokeWidth={2.6} />
          </div>
          <div className="leading-tight">
            <div className={`text-[15px] font-semibold tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>DiscvrAI</div>
            <div className={`text-[10px] font-medium uppercase tracking-[0.18em] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Wealth Copilot</div>
          </div>
        </a>

        {/* NAV — varies by persona */}
        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {persona === 'visitor' &&
            NAV_VISITOR.map((n) => (
              <a key={n.label} href={n.href} className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${linkCls}`}>
                {n.label}
              </a>
            ))}

          {persona === 'new_user' &&
            NAV_NEW_USER.map((n) => {
              const Icon = n.icon;
              return (
                <a
                  key={n.label}
                  href={n.href}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${linkCls}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {n.label}
                </a>
              );
            })}

          {persona === 'investor' && (
            <>
              {/* Portfolio dropdown */}
              <div ref={portfolioRef} className="relative">
                <button
                  onClick={() => setPortfolioOpen((p) => !p)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${linkCls}`}
                >
                  <PortfolioIcon className="h-3.5 w-3.5" />
                  Portfolio
                  <ChevronDown className={`h-3 w-3 transition ${portfolioOpen ? 'rotate-180' : ''}`} />
                </button>
                {portfolioOpen && (
                  <div className={`absolute left-0 mt-2 w-44 overflow-hidden rounded-xl border shadow-xl ${
                    dark ? 'border-white/10 bg-slate-900' : 'border-slate-900/10 bg-white'
                  }`}>
                    {NAV_INVESTOR_PORTFOLIO_SUB.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        onClick={() => setPortfolioOpen(false)}
                        className={`block px-4 py-2 text-sm font-medium ${
                          dark ? 'text-slate-300 hover:bg-white/5 hover:text-white' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <a href="#features" className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${linkCls}`}>
                <Wallet className="h-3.5 w-3.5" /> Invest
              </a>
              <a href="#agents" className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${linkCls}`}>
                <RefreshCw className="h-3.5 w-3.5" /> SIP
              </a>
              <a href="#features" className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${linkCls}`}>
                <Calculator className="h-3.5 w-3.5" /> Calculator
              </a>
              <a href="#agents" className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${linkCls}`}>
                <Target className="h-3.5 w-3.5" /> Goal
              </a>
              <a href="#chat" className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${linkCls}`}>
                <Bot className="h-3.5 w-3.5" /> Chatbot
              </a>
            </>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {persona === 'visitor' ? (
            <a
              href={APP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 hover:opacity-95"
            >
              Launch <ArrowRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <>
              {/* Mode toggle */}
              <button
                onClick={onToggleDark}
                aria-label="Toggle theme"
                title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`grid h-9 w-9 place-items-center rounded-full border transition ${iconBtn}`}
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              {/* Profile dropdown */}
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  aria-label="Profile"
                  title="Profile"
                  className={`grid h-9 w-9 place-items-center rounded-full border transition ${iconBtn}`}
                >
                  <User className="h-4 w-4" />
                </button>
                {profileOpen && (
                  <div className={`absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border shadow-xl ${
                    dark ? 'border-white/10 bg-slate-900' : 'border-slate-900/10 bg-white'
                  }`}>
                    <div className={`border-b px-4 py-3 ${dark ? 'border-white/10' : 'border-slate-900/10'}`}>
                      <div className={`text-sm font-semibold ${dark ? 'text-white' : 'text-slate-900'}`}>
                        {persona === 'investor' ? 'Aarav Mehta' : 'New User'}
                      </div>
                      <div className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {persona === 'investor' ? 'Premium · KYC Verified' : 'Setup pending'}
                      </div>
                    </div>
                    <a href="#" className={`block px-4 py-2 text-sm ${dark ? 'text-slate-300 hover:bg-white/5' : 'text-slate-700 hover:bg-slate-50'}`}>
                      Edit Profile
                    </a>
                    <a href="#" className={`block px-4 py-2 text-sm ${dark ? 'text-slate-300 hover:bg-white/5' : 'text-slate-700 hover:bg-slate-50'}`}>
                      Settings
                    </a>
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                aria-label="Logout"
                title="Logout"
                className={`grid h-9 w-9 place-items-center rounded-full border transition ${iconBtn}`}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

/* ----------------------------- Hero ----------------------------- */
function Hero() {
  return (
    <section className="grid items-center gap-10 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Agentic · Always-on
        </div>

        <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
          Your money never sleeps.
          <br />
          <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
            Now, neither does your strategy.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
          The first agentic investment assistant that doesn't just chat — it executes. Build,
          test, and deploy AI agents that monitor markets 24/7.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:opacity-95"
          >
            Launch Your Agent <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
          >
            See it in action
          </a>
        </div>

        <div className="mt-10 flex items-center gap-6 text-xs text-slate-500">
          <Stat k="Markets watched" v="24/7" />
          <div className="h-6 w-px bg-white/10" />
          <Stat k="Avg decision latency" v="0.4s" />
          <div className="h-6 w-px bg-white/10" />
          <Stat k="Audit traceability" v="100%" />
        </div>
      </div>

      {/* Glassmorphism pie card */}
      <div className="lg:col-span-5">
        <div className="relative">
          <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-emerald-400/20 via-sky-400/20 to-violet-400/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Live portfolio</div>
                <div className="mt-1 text-2xl font-semibold text-white">₹ 18,42,310</div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-semibold text-emerald-300">
                <ArrowUpRight className="h-3 w-3" /> +2.34%
              </span>
            </div>

            <div className="mt-4 grid grid-cols-5 items-center gap-4">
              <div className="col-span-3 h-48">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={ALLOC}
                      innerRadius={48}
                      outerRadius={84}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {ALLOC.map((s) => (
                        <Cell key={s.name} fill={s.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="col-span-2 space-y-2 text-sm">
                {ALLOC.map((s) => (
                  <li key={s.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-300">
                      <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                      {s.name}
                    </span>
                    <span className="font-mono text-slate-400">{s.value}%</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decision log snippet */}
            <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-3">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                <Activity className="h-3.5 w-3.5" /> Decision log · just now
              </div>
              <div className="mt-1.5 font-mono text-sm text-slate-200">
                Rebalancing: Moved <span className="text-emerald-300">5%</span> from Cash → Gold
                — <span className="text-emerald-300">Target met</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-base font-semibold text-white">{v}</div>
      <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider">{k}</div>
    </div>
  );
}

/* ----------------------- Comparison Table ----------------------- */
function ComparisonTable() {
  return (
    <section className="mt-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
          The difference
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Traditional Chatbot <span className="text-slate-500">vs.</span>{' '}
          <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">DiscvrAI Agent</span>
        </h2>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <CompareCard
          title="Traditional Chatbot"
          tone="muted"
          rows={[
            { label: 'Static Advice', body: 'Replies with generic text. You still have to interpret what to do next.' },
            { label: 'Manual Execution', body: 'You log into another app, click, confirm, and pray you didn\'t miss the cutoff.' },
          ]}
        />
        <CompareCard
          title="DiscvrAI Agent"
          tone="hot"
          rows={[
            { label: 'Actionable Strategy', body: 'Translates your intent into a rule the agent enforces — every market session.' },
            { label: 'Autonomous Action', body: 'Places, modifies, and reconciles transactions with a full audit trail. You approve once.' },
          ]}
        />
      </div>
    </section>
  );
}

function CompareCard({
  title,
  tone,
  rows,
}: {
  title: string;
  tone: 'muted' | 'hot';
  rows: Array<{ label: string; body: string }>;
}) {
  const hot = tone === 'hot';
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-7 ${
        hot
          ? 'border-emerald-400/25 bg-gradient-to-br from-emerald-400/[0.08] via-white/[0.02] to-sky-400/[0.06]'
          : 'border-white/10 bg-white/[0.03]'
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${hot ? 'text-white' : 'text-slate-300'}`}>{title}</h3>
        {hot ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5" /> What you actually want
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-400">
            <XCircle className="h-3.5 w-3.5" /> Status quo
          </span>
        )}
      </div>
      <ul className="mt-6 divide-y divide-white/5">
        {rows.map((r) => (
          <li key={r.label} className="grid grid-cols-12 gap-4 py-4">
            <div className={`col-span-4 text-sm font-semibold ${hot ? 'text-emerald-300' : 'text-slate-400'}`}>{r.label}</div>
            <div className="col-span-8 text-sm leading-relaxed text-slate-300">{r.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------------------- Bento ----------------------------- */
function BentoGrid() {
  const sentinelData = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        x: i,
        y: 50 + Math.sin(i / 1.7) * 12 + Math.random() * 4,
      })),
    []
  );

  return (
    <section id="features" className="mt-28">
      <SectionHeader
        eyebrow="Bento"
        title={
          <>
            One brain.{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">
              Many specialised agents.
            </span>
          </>
        }
        sub="Each card is a live capability. Mix, match, and orchestrate them from a single chat."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-6 lg:grid-cols-12">
        {/* Card 1 — Live Market Sentinel (Growth Green, wide) */}
        <div className="md:col-span-6 lg:col-span-7">
          <div className="group relative h-full overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/[0.08] via-[#0a0e14] to-[#0a0e14] p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300">
                  <LineChartIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Live Market Sentinel</h3>
                  <p className="text-xs text-slate-400">Multi-market ticker feed</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ul className="space-y-2">
                {TICKERS.map((t) => (
                  <li key={t.sym} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5">
                    <div>
                      <div className="text-sm font-semibold text-white">{t.sym}</div>
                      <div className="font-mono text-xs text-slate-400">{t.px}</div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                        t.up ? 'bg-emerald-400/10 text-emerald-300' : 'bg-rose-400/10 text-rose-300'
                      }`}
                    >
                      {t.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {t.chg}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="relative h-40 overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-2">
                <ResponsiveContainer>
                  <AreaChart data={sentinelData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10F0A8" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#10F0A8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="x" hide />
                    <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                    <Area type="monotone" dataKey="y" stroke="#10F0A8" strokeWidth={2} fill="url(#g1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-black/40 p-3">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Δ change formula</div>
              <div className="mt-1 font-mono text-sm text-emerald-300">
                Δ% = ((New − Old) / Old) × 100
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 — Autonomous Rebalancing (Tech Blue) */}
        <div className="md:col-span-6 lg:col-span-5">
          <div className="relative h-full overflow-hidden rounded-3xl border border-sky-400/25 bg-gradient-to-br from-sky-500/[0.10] via-[#0a0e14] to-[#0a0e14] p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-400/15 text-sky-300">
                <PieChartIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Autonomous Rebalancing</h3>
                <p className="text-xs text-slate-400">Intent-driven investing, visualised</p>
              </div>
            </div>

            <div className="relative mt-4 h-52">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={REBAL}
                    innerRadius={56}
                    outerRadius={92}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {REBAL.map((s) => (
                      <Cell key={s.name} fill={s.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Target</div>
                  <div className="font-mono text-lg font-semibold text-white">5 sleeves</div>
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-5 gap-2 text-[10px]">
              {REBAL.map((r) => (
                <div key={r.name} className="rounded-lg border border-white/5 bg-white/[0.03] p-2 text-center">
                  <div className="font-mono text-sm font-semibold text-white">{r.value}%</div>
                  <div className="mt-0.5 truncate text-slate-400">{r.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3 — Natural Language Logic (White / Light Glass) */}
        <div className="md:col-span-6 lg:col-span-12">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md">
            <div className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-white">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">Natural Language Logic</h3>
                    <p className="text-xs text-slate-300">Plain English in. Executable rules out.</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  No DSL, no JSON. Tell the copilot what you care about, and it compiles a
                  monitoring rule with thresholds, frequency, and a clear human-readable
                  decision log.
                </p>
              </div>

              <div className="md:col-span-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Input</div>
                  <div className="mt-1.5 font-mono text-sm text-white">
                    "Keep my gold at 10% of my portfolio."
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">Output · decision log</div>
                  <div className="mt-1.5 font-mono text-sm text-emerald-200">
                    Rule set: <span className="text-white">10% Gold rebalance</span>
                    <br />
                    Drift band: ±1.5% · Check: daily
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ Live Action Stream ------------------------ */
function LiveStream() {
  return (
    <section id="agents" className="mt-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Streaming
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Live Action Stream</h2>
        </div>
        <a
          href={APP_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 md:inline-flex"
        >
          Open agent console <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <ol className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
        {STREAM.map((s, i) => (
          <li
            key={i}
            className="grid grid-cols-12 items-center gap-4 border-b border-white/5 px-5 py-4 last:border-b-0 hover:bg-white/[0.02]"
          >
            <div className="col-span-1 font-mono text-xs text-slate-500">#{String(i + 1).padStart(3, '0')}</div>
            <div className="col-span-3 flex items-center gap-2">
              <span
                className={`grid h-7 w-7 place-items-center rounded-lg ${
                  s.tone === 'emerald'
                    ? 'bg-emerald-400/15 text-emerald-300'
                    : s.tone === 'blue'
                    ? 'bg-sky-400/15 text-sky-300'
                    : 'bg-amber-400/15 text-amber-300'
                }`}
              >
                <Zap className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-semibold text-white">{s.agent}</span>
            </div>
            <div className="col-span-6 font-mono text-sm text-slate-300">{s.action}</div>
            <div className="col-span-2 text-right text-xs text-slate-500">{s.time}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* --------------------------- Trust Section --------------------------- */
function TrustSection() {
  return (
    <section id="security" className="mt-28">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-300">
            <ShieldCheck className="h-3.5 w-3.5" /> Trust & Transparency
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Your defensible edge.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-400">
            Every action — quotes pulled, rebalances triggered, market responses, retries — is
            recorded with timestamps, inputs, model version, and the rule that fired it. Full,
            detailed audit log with complete traceability for all automated rebalancing,
            quotes, and market responses.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-slate-300">
            {[
              'Per-decision provenance: rule → inputs → output',
              'Replay any agent run with the exact market snapshot',
              'Exportable logs for compliance and audit teams',
            ].map((x) => (
              <li key={x} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between text-xs">
              <div className="font-semibold uppercase tracking-wider text-slate-400">Audit activity · last 24h</div>
              <div className="font-mono text-emerald-300">2,418 events · 0 anomalies</div>
            </div>
            <div className="mt-3 h-56">
              <ResponsiveContainer>
                <AreaChart data={AUDIT_SERIES} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="audit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip
                    contentStyle={{
                      background: '#0b1220',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 10,
                      color: '#e2e8f0',
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="v" stroke="#38BDF8" strokeWidth={2} fill="url(#audit)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
              {[
                ['Rebalances', '142'],
                ['Quotes pulled', '1,894'],
                ['Rules fired', '382'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-white/5 bg-black/30 p-3">
                  <div className="font-mono text-lg font-semibold text-white">{v}</div>
                  <div className="mt-0.5 text-slate-400">{k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Start Building --------------------------- */
function StartBuilding() {
  const partners = ['AWS', 'DiscvrAI', 'Microsoft', 'Web3', 'NSE', 'BSE'];
  return (
    <section id="pricing" className="mt-28">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/[0.10] via-[#0a0e14] to-sky-500/[0.10] px-8 py-14 text-center md:px-14">
        <div className="absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
        <h2 className="relative text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Start Building.
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-base text-slate-300 md:text-lg">
          Sleek, native-built dashboard, backend and partners.
        </p>
        <a
          href={APP_URL}
          target="_blank"
          rel="noreferrer"
          className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:opacity-95"
        >
          Launch Your Agent <ArrowRight className="h-4 w-4" />
        </a>

        <div className="relative mt-12">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Trusted stack</div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {partners.map((p) => (
              <span
                key={p}
                className="text-sm font-semibold tracking-wide text-slate-400 transition-colors hover:text-white"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Chat Bar ------------------------------ */
function ChatBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090d] via-[#07090d]/85 to-transparent" />
      <div className="relative mx-auto max-w-3xl px-6 pb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.open(APP_URL, '_blank');
          }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] p-1.5 pl-5 shadow-2xl shadow-black/40 backdrop-blur-xl"
        >
          <Sparkles className="h-4 w-4 shrink-0 text-emerald-300" />
          <input
            type="text"
            placeholder="Ask about funds, SIPs, goals, or anything…"
            className="flex-1 bg-transparent py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 text-slate-950 shadow-lg shadow-emerald-500/30 hover:opacity-95"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

/* ----------------------------- Section Header ----------------------------- */
function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 md:text-base">{sub}</p>
    </div>
  );
}
