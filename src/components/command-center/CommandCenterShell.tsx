import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, Send, Sparkles, ChevronRight, Shield } from 'lucide-react';

export interface ModuleDef {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface CopilotQA {
  q: string;
  a: string;
}

export interface CommandCenterShellProps {
  brand: {
    short: string;
    name: string;
    tagline: string;
    accent: string;       // hex
    accentDark: string;   // hex (panel/dark accent)
  };
  modules: ModuleDef[];
  active: string;
  onChange: (id: string) => void;
  copilot: CopilotQA[];
  topKpis?: { label: string; value: string; sub?: string; tone?: 'green' | 'amber' | 'red' | 'neutral' }[];
  children: React.ReactNode;
}

const TONE: Record<string, string> = {
  green: '#16a34a',
  amber: '#f59e0b',
  red: '#dc2626',
  neutral: '#0f172a',
};

export const CommandCenterShell: React.FC<CommandCenterShellProps> = ({
  brand, modules, active, onChange, copilot, topKpis, children,
}) => {
  const [now, setNow] = useState(new Date());
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [chat, setChat] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: `Hi, I'm your ${brand.short} AI Copilot. Ask me anything about today's operations, exceptions, or pilot KPIs.` },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chat, copilotOpen]);

  const ask = (q?: string) => {
    const text = (q ?? input).trim();
    if (!text) return;
    const found = copilot.find(c => text.toLowerCase().includes(c.q.toLowerCase().slice(0, 12)) || c.q.toLowerCase().includes(text.toLowerCase()));
    setChat(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setTimeout(() => {
      setChat(prev => [...prev, {
        role: 'ai',
        text: found?.a ?? `Working on it — I'd pull this from the operational signals layer for ${brand.short}, cross-reference owners, and propose an action with one-click escalation.`,
      }]);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        <div className="px-4 py-4 border-b border-slate-200 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold" style={{ background: brand.accentDark }}>
            {brand.short.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-900 truncate">{brand.name}</div>
            <div className="text-[10px] text-slate-500 truncate">{brand.tagline}</div>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {modules.map(m => {
            const Icon = m.icon;
            const sel = m.id === active;
            return (
              <button
                key={m.id}
                onClick={() => onChange(m.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm transition-all ${
                  sel ? 'text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
                }`}
                style={sel ? { background: brand.accent } : {}}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{m.label}</span>
                {sel && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </button>
            );
          })}
        </nav>
        <button
          onClick={() => setCopilotOpen(true)}
          className="m-2 px-3 py-2.5 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90"
          style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentDark})` }}
        >
          <Sparkles className="w-4 h-4" /> AI Copilot
        </button>
        <div className="px-3 py-2 border-t border-slate-200 text-[10px] text-slate-500 flex items-center gap-1.5">
          <Shield className="w-3 h-3" /> SSO · MFA enforced
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="text-base font-semibold text-slate-900 truncate">
              {modules.find(m => m.id === active)?.label}
            </div>
            <div className="hidden md:flex items-center gap-2 ml-4 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input className="bg-transparent text-xs flex-1 outline-none" placeholder={`Ask ${brand.short} Copilot or search…`}
                onKeyDown={(e) => { if (e.key === 'Enter') { setCopilotOpen(true); ask((e.target as HTMLInputElement).value); (e.target as HTMLInputElement).value = ''; } }} />
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live · {now.toLocaleTimeString()}</span>
            <Bell className="w-4 h-4 text-slate-500" />
            <span className="text-slate-500">CXO Console</span>
          </div>
        </header>

        {/* KPI strip */}
        {topKpis && topKpis.length > 0 && (
          <div className="px-6 py-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 bg-white border-b border-slate-200">
            {topKpis.map((k, i) => (
              <div key={i} className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{k.label}</div>
                <div className="text-lg font-semibold mt-0.5" style={{ color: TONE[k.tone || 'neutral'] }}>{k.value}</div>
                {k.sub && <div className="text-[10px] text-slate-500">{k.sub}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Page body */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Copilot drawer */}
      {copilotOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-slate-900/30 backdrop-blur-sm" onClick={() => setCopilotOpen(false)} />
          <div className="w-full max-w-md bg-white border-l border-slate-200 flex flex-col">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between" style={{ background: brand.accentDark }}>
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="w-4 h-4" />
                <div>
                  <div className="text-sm font-semibold">{brand.short} AI Copilot</div>
                  <div className="text-[10px] opacity-80">Operational decision agent · v1.0</div>
                </div>
              </div>
              <button onClick={() => setCopilotOpen(false)} className="text-white/80 hover:text-white text-xs">Close</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chat.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    m.role === 'user' ? 'text-white' : 'bg-slate-100 text-slate-800'
                  }`} style={m.role === 'user' ? { background: brand.accent } : {}}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <div className="px-3 pt-2 border-t border-slate-200">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {copilot.slice(0, 4).map((c, i) => (
                  <button key={i} onClick={() => ask(c.q)} className="text-[10px] px-2 py-1 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50">
                    {c.q}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 pb-3">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && ask()}
                  placeholder="Ask about exceptions, owners, KPIs…"
                  className="flex-1 px-3 py-2 rounded-md text-sm bg-slate-50 border border-slate-200 outline-none" />
                <button onClick={() => ask()} className="w-9 h-9 rounded-md text-white flex items-center justify-center" style={{ background: brand.accent }}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============ Reusable card primitives ============
export const Panel: React.FC<{ title?: string; right?: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, right, children, className = '' }) => (
  <div className={`bg-white border border-slate-200 rounded-xl shadow-sm ${className}`}>
    {title && (
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">{title}</div>
        {right}
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

export const SevBadge: React.FC<{ sev: string }> = ({ sev }) => {
  const map: Record<string, string> = {
    High: 'bg-red-100 text-red-700',
    Med: 'bg-amber-100 text-amber-700',
    Low: 'bg-slate-100 text-slate-700',
  };
  return <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${map[sev] || map.Low}`}>{sev.toUpperCase()}</span>;
};

export const PilotPlan: React.FC<{ accent: string; weeks: { week: string; title: string; bullets: string[] }[]; outcomes: string[] }> = ({ accent, weeks, outcomes }) => (
  <div className="space-y-4">
    <Panel title="2–3 Week AI Pilot Engagement">
      <div className="grid md:grid-cols-3 gap-3">
        {weeks.map((w, i) => (
          <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: accent }}>{w.week}</div>
            <div className="text-sm font-semibold text-slate-900 mt-1">{w.title}</div>
            <ul className="mt-2 space-y-1.5">
              {w.bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-1.5 text-xs text-slate-700">
                  <span className="w-1 h-1 rounded-full mt-1.5" style={{ background: accent }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Panel>
    <Panel title="What You Walk Away With">
      <div className="grid md:grid-cols-2 gap-2">
        {outcomes.map((o, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: accent }} />
            {o}
          </div>
        ))}
      </div>
    </Panel>
  </div>
);
