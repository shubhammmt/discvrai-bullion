import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Primary nav now mirrors the in-app modules
const MODULE_NAV = [
  { to: '/discvrai', label: 'Home', end: true },
  { to: '/discvrai/modules#portfolio', label: 'Portfolio' },
  { to: '/discvrai/modules#invest', label: 'Invest' },
  { to: '/discvrai/modules#sips', label: 'SIPs' },
  { to: '/discvrai/modules#goals', label: 'Goals' },
  { to: '/discvrai/modules#calculator', label: 'Calculator' },
  { to: '/discvrai/modules#statements', label: 'Statements' },
];

// Secondary links live in a "More" dropdown to keep the bar clean
const MORE_NAV = [
  { to: '/discvrai/modules', label: 'All modules' },
  { to: '/discvrai/features', label: 'Features' },
  { to: '/discvrai/security', label: 'Security' },
  { to: '/discvrai/pricing', label: 'Pricing' },
  { to: '/discvrai/about', label: 'About' },
  { to: '/discvrai/contact', label: 'Contact' },
];

const APP_URL = 'https://agent.discvr.ai/discovery?view=invest';

export default function DiscvrAILayout() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Smooth-scroll to module anchors when nav links jump within /discvrai/modules
  useEffect(() => {
    if (pathname === '/discvrai/modules' && hash) {
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [pathname, hash]);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-indigo-200/60">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-200 via-violet-200 to-sky-200 opacity-50 blur-3xl" />
        <div className="absolute top-[60vh] right-[-10%] h-[400px] w-[600px] rounded-full bg-gradient-to-tr from-fuchsia-200 to-indigo-200 opacity-40 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-900/5 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Link to="/discvrai" className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-lg shadow-indigo-500/30">
              <Sparkles className="h-4.5 w-4.5" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="text-[15px] font-semibold tracking-tight">DiscvrAI</div>
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">Wealth Platform</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {MODULE_NAV.map((n) => (
              <NavLink
                key={n.label}
                to={n.to}
                end={n.end as any}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive && !n.to.includes('#') ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen((p) => !p)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                More <ChevronDown className={`h-3.5 w-3.5 transition ${moreOpen ? 'rotate-180' : ''}`} />
              </button>
              {moreOpen && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-slate-900/5 bg-white shadow-lg shadow-slate-900/10">
                  {MORE_NAV.map((n) => (
                    <NavLink
                      key={n.to}
                      to={n.to}
                      onClick={() => setMoreOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-sm font-medium ${isActive ? 'bg-slate-50 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`
                      }
                    >
                      {n.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={APP_URL} target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Sign in
            </a>
            <Button asChild className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-white shadow-md shadow-indigo-500/20 hover:opacity-90">
              <a href={APP_URL} target="_blank" rel="noreferrer">
                Launch app <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </a>
            </Button>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 lg:hidden"
            onClick={() => setOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-slate-900/5 bg-white px-6 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end as any}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <a
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-2 text-center text-sm font-semibold text-white"
              >
                Launch app
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-slate-900/5 bg-white/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white">
                  <Sparkles className="h-4.5 w-4.5" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-sm font-semibold">DiscvrAI</div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Wealth Platform</div>
                </div>
              </div>
              <p className="mt-4 max-w-xs text-sm text-slate-600">
                Your AI Wealth Copilot for mutual funds, SIPs, savings and goals — all in one chat.
              </p>
            </div>
            <FooterCol title="Product" links={[
              ['Features', '/discvrai/features'],
              ['Modules', '/discvrai/modules'],
              ['Pricing', '/discvrai/pricing'],
              ['Security', '/discvrai/security'],
            ]} />
            <FooterCol title="Company" links={[
              ['About', '/discvrai/about'],
              ['Contact', '/discvrai/contact'],
              ['Launch app', APP_URL, true],
            ]} />
            <FooterCol title="Legal" links={[
              ['Terms', '/terms-and-conditions'],
              ['Privacy', '/privacy-policy'],
              ['Data deletion', '/data-deletion-policy'],
            ]} />
          </div>
          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-900/5 pt-6 text-xs text-slate-500 md:flex-row md:items-center">
            <div>© {new Date().getFullYear()} DiscvrAI. All rights reserved.</div>
            <div>Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: Array<[string, string, boolean?]> }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</div>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map(([label, href, ext]) => (
          <li key={label}>
            {ext ? (
              <a href={href} target="_blank" rel="noreferrer" className="text-slate-700 hover:text-indigo-600">{label}</a>
            ) : (
              <Link to={href} className="text-slate-700 hover:text-indigo-600">{label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
