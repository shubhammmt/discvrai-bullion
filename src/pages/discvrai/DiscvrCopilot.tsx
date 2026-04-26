import { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
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
  X,
  Phone,
  Calendar,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

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

export default function DiscvrCopilot() {
  const [persona, setPersona] = useState<Persona>('visitor');
  const [dark, setDark] = useState(true);
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);

  const bg = dark ? 'bg-[#111827]' : 'bg-[#f1f5f9]';
  const text = dark ? 'text-slate-100' : 'text-slate-900';

  const handleChoice = (choice: 'login' | 'register' | 'visitor') => {
    if (choice === 'visitor') {
      setPersona('visitor');
    } else {
      setAuthModal(choice);
    }
  };

  const handleAuthSuccess = (target: Persona) => {
    setPersona(target);
    setAuthModal(null);
  };

  return (
    <div className={`min-h-screen ${bg} ${text} antialiased selection:bg-emerald-400/30 transition-colors`}>
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className={`absolute -top-40 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full blur-3xl ${dark ? 'bg-emerald-500/10' : 'bg-emerald-300/30'}`} />
        <div className={`absolute top-[55vh] right-[-10%] h-[420px] w-[640px] rounded-full blur-3xl ${dark ? 'bg-sky-500/10' : 'bg-sky-300/30'}`} />
        <div className={`absolute top-[140vh] left-[-10%] h-[420px] w-[640px] rounded-full blur-3xl ${dark ? 'bg-violet-500/10' : 'bg-violet-300/30'}`} />
      </div>

      <TopNav persona={persona} dark={dark} onToggleDark={() => setDark((d) => !d)} onLogout={() => setPersona('visitor')} />
      <PersonaSwitcher persona={persona} onChange={setPersona} />

      <main className="mx-auto max-w-7xl px-6 pb-24">
        <Hero dark={dark} onChoice={handleChoice} />
      </main>

      {authModal === 'login' && (
        <LoginModal dark={dark} onClose={() => setAuthModal(null)} onSuccess={() => handleAuthSuccess('investor')} />
      )}
      {authModal === 'register' && (
        <RegisterModal dark={dark} onClose={() => setAuthModal(null)} onSuccess={() => handleAuthSuccess('new_user')} />
      )}
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
function TopNav({ persona, dark, onToggleDark, onLogout }: { persona: Persona; dark: boolean; onToggleDark: () => void; onLogout: () => void }) {
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
                onClick={onLogout}
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
function Hero({ dark, onChoice }: { dark: boolean; onChoice: (c: 'login' | 'register' | 'visitor') => void }) {
  const headingMain = dark ? 'text-white' : 'text-slate-900';
  const subText = dark ? 'text-slate-400' : 'text-slate-600';

  const choices: {
    key: 'login' | 'register' | 'visitor';
    title: string;
    desc: string;
    icon: typeof User;
    cta: string;
    accent: string;
  }[] = [
    {
      key: 'login',
      title: 'Already a User · Login',
      desc: 'Resume your portfolio, agents and rebalance rules.',
      icon: LogOut,
      cta: 'Login',
      accent: 'from-emerald-400 to-sky-500',
    },
    {
      key: 'register',
      title: 'New User · Register',
      desc: 'Create your account in under 2 minutes and start your first SIP.',
      icon: User,
      cta: 'Register',
      accent: 'from-sky-400 to-violet-500',
    },
    {
      key: 'visitor',
      title: 'Continue as Visitor',
      desc: 'Explore the platform without signing in.',
      icon: Sparkles,
      cta: 'Browse',
      accent: 'from-slate-400 to-slate-600',
    },
  ];

  return (
    <section className="grid items-center gap-10 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <h1 className={`text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl ${headingMain}`}>
          Your money never sleeps.
          <br />
          <span className="bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-500 bg-clip-text text-transparent dark:from-emerald-300 dark:via-sky-300 dark:to-violet-300">
            Now, neither does your strategy.
          </span>
        </h1>
      </div>

      {/* Auth choice card (replaces Live Portfolio) */}
      <div className="lg:col-span-5">
        <div className="relative">
          <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-emerald-400/20 via-sky-400/20 to-violet-400/20 blur-2xl" />
          <div className={`relative overflow-hidden rounded-3xl border p-6 shadow-2xl backdrop-blur-xl ${
            dark ? 'border-white/10 bg-white/[0.04]' : 'border-slate-900/10 bg-white/70'
          }`}>
            <div className="mb-5">
              <div className={`text-xs font-semibold uppercase tracking-wider ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                Get started
              </div>
              <div className={`mt-1 text-xl font-semibold ${headingMain}`}>How would you like to continue?</div>
            </div>

            <div className="space-y-3">
              {choices.map((c) => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.key}
                    onClick={() => onChoice(c.key)}
                    className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                      dark
                        ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.07]'
                        : 'border-slate-900/10 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${c.accent} text-slate-950 shadow-lg`}>
                      <Icon className="h-5 w-5" strokeWidth={2.4} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm font-semibold ${headingMain}`}>{c.title}</div>
                      <div className={`mt-0.5 text-xs ${subText}`}>{c.desc}</div>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                      dark ? 'bg-white/10 text-slate-100' : 'bg-slate-900 text-white'
                    }`}>
                      {c.cta} <ArrowRight className="h-3 w-3" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Auth Modals ----------------------------- */
function ModalShell({
  dark,
  onClose,
  title,
  subtitle,
  children,
}: {
  dark: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-2xl border shadow-2xl ${
          dark ? 'border-white/10 bg-[#0f172a] text-slate-100' : 'border-slate-900/10 bg-white text-slate-900'
        }`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full transition ${
            dark ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <X className="h-4 w-4" />
        </button>
        <div className="p-6">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className={`mt-1 text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{subtitle}</p>
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

function inputCls(dark: boolean) {
  return `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-400/40 ${
    dark
      ? 'border-white/10 bg-white/5 text-white placeholder:text-slate-500'
      : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400'
  }`;
}

function labelCls(dark: boolean) {
  return `mb-1.5 block text-xs font-medium ${dark ? 'text-slate-300' : 'text-slate-600'}`;
}

function LoginModal({ dark, onClose, onSuccess }: { dark: boolean; onClose: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOtp = () => {
    if (phone.replace(/\D/g, '').length !== 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 700);
  };

  const verifyOtp = () => {
    if (otp.length !== 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 700);
  };

  return (
    <ModalShell
      dark={dark}
      onClose={onClose}
      title="Login to your account"
      subtitle={step === 'phone' ? 'Enter your mobile number to receive an OTP.' : `Enter the 6-digit code sent to +91 ${phone}`}
    >
      {step === 'phone' && (
        <div className="space-y-4">
          <div>
            <label className={labelCls(dark)}>Mobile Number</label>
            <div className="flex gap-2">
              <div
                className={`grid place-items-center rounded-lg border px-3 text-sm font-medium ${
                  dark ? 'border-white/10 bg-white/5 text-slate-300' : 'border-slate-300 bg-slate-50 text-slate-600'
                }`}
              >
                +91
              </div>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className={inputCls(dark)}
              />
            </div>
          </div>
          <button
            onClick={sendOtp}
            disabled={loading || phone.length !== 10}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-400 to-sky-500 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:opacity-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Phone className="h-4 w-4" />}
            Send OTP
          </button>
        </div>
      )}

      {step === 'otp' && (
        <div className="space-y-4">
          <div>
            <label className={labelCls(dark)}>Enter OTP</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className={`${inputCls(dark)} text-center text-lg tracking-[0.5em]`}
            />
            <button
              onClick={() => setStep('phone')}
              className={`mt-2 text-xs ${dark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              ← Change number
            </button>
          </div>
          <button
            onClick={verifyOtp}
            disabled={loading || otp.length !== 6}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-400 to-sky-500 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:opacity-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
            Verify & Login
          </button>
        </div>
      )}
    </ModalShell>
  );
}

function RegisterModal({ dark, onClose, onSuccess }: { dark: boolean; onClose: () => void; onSuccess: () => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!name.trim() || phone.length !== 10 || !dob) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 800);
  };

  const valid = name.trim().length >= 2 && phone.length === 10 && !!dob;

  return (
    <ModalShell
      dark={dark}
      onClose={onClose}
      title="Create your account"
      subtitle="Get started in under 2 minutes."
    >
      <div className="space-y-4">
        <div>
          <label className={labelCls(dark)}>Full Name</label>
          <input
            type="text"
            placeholder="e.g. Aarav Mehta"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls(dark)}
          />
        </div>
        <div>
          <label className={labelCls(dark)}>Mobile Number</label>
          <div className="flex gap-2">
            <div
              className={`grid place-items-center rounded-lg border px-3 text-sm font-medium ${
                dark ? 'border-white/10 bg-white/5 text-slate-300' : 'border-slate-300 bg-slate-50 text-slate-600'
              }`}
            >
              +91
            </div>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className={inputCls(dark)}
            />
          </div>
        </div>
        <div>
          <label className={labelCls(dark)}>Date of Birth</label>
          <div className="relative">
            <Calendar className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 ${dark ? 'text-slate-400' : 'text-slate-500'}`} />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={inputCls(dark)}
            />
          </div>
        </div>
        <button
          onClick={submit}
          disabled={loading || !valid}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-400 to-violet-500 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:opacity-95 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
          Create Account
        </button>
      </div>
    </ModalShell>
  );
}
