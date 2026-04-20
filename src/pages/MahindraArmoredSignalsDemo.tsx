import React, { useState } from 'react';
import {
  LayoutDashboard, Radar, Building2, FileText, ClipboardList, Database,
  Search, Filter, Bell, ChevronRight, ArrowUpRight, ArrowRight, AlertTriangle,
  Calendar, MapPin, Users, Target, Shield, Send, CheckCircle2, Clock, Info,
  TrendingUp, Network, ExternalLink, Tag
} from 'lucide-react';

const NAVY = '#0B2545';
const NAVY_SOFT = '#13315C';
const ACCENT = '#1E5BA8';
const INK = '#1A2238';
const MUTED = '#5A6478';
const LINE = '#E4E8EF';
const SOFT = '#F7F9FC';
const SUCCESS = '#1E7F4E';
const WARN = '#B45309';
const DANGER = '#B23A3A';

type Screen = 'dashboard' | 'signals' | 'account' | 'brief' | 'warroom' | 'crm' | 'appendix';

const SCREENS: { id: Screen; label: string; icon: any }[] = [
  { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
  { id: 'signals', label: 'Signal Feed', icon: Radar },
  { id: 'account', label: 'Account Profile', icon: Building2 },
  { id: 'brief', label: 'Pursuit Brief', icon: FileText },
  { id: 'warroom', label: 'War Room', icon: ClipboardList },
  { id: 'crm', label: 'CRM Handoff', icon: Database },
  { id: 'appendix', label: 'Demo Assumptions', icon: Info },
];

// ─── Mock data (synthetic) ───
const accounts = [
  { acct: 'Ministry of Interior — Eastern Region', seg: 'Government / MoI', country: 'KSA', trigger: 'New tender published — armored patrol fleet', score: 92, tier: 'P1', owner: 'A. Khalid', route: 'Direct', next: '14 Apr' },
  { acct: 'United Nations Field Mission', seg: 'Humanitarian', country: 'Sudan', trigger: 'Mission expansion + security advisory upgrade', score: 88, tier: 'P1', owner: 'R. Mansoor', route: 'Direct', next: '15 Apr' },
  { acct: 'GulfCash Logistics', seg: 'CIT operator', country: 'UAE', trigger: 'Fleet renewal cycle + RFI to two competitors', score: 84, tier: 'P1', owner: 'Partner — Al Madar', route: 'Partner', next: '16 Apr' },
  { acct: 'Embassy of [redacted]', seg: 'Diplomatic', country: 'Iraq', trigger: 'Replacement of B6 SUV fleet flagged', score: 79, tier: 'P2', owner: 'S. Iyer', route: 'Direct', next: '17 Apr' },
  { acct: 'TransOcean Energy — Field Ops', seg: 'Extractives', country: 'Mozambique', trigger: 'Project restart + insurer security clause', score: 76, tier: 'P2', owner: 'Partner — Saharan', route: 'Partner', next: '18 Apr' },
  { acct: 'Federal Police — Special Units', seg: 'Police', country: 'Jordan', trigger: 'Budget line item visible in 2025-26 cycle', score: 71, tier: 'P2', owner: 'A. Khalid', route: 'Direct', next: '19 Apr' },
  { acct: 'NGO Consortium (medical)', seg: 'Humanitarian', country: 'DRC', trigger: 'Donor funding round announced', score: 64, tier: 'P3', owner: 'R. Mansoor', route: 'Direct', next: '22 Apr' },
];

const signals = [
  { title: 'Tender notice — armored patrol vehicles, 24 units', source: 'Government e-procurement portal', time: '2h ago', accounts: 3, conf: 'High', sev: 'High', why: 'Specifications match B6/B7 patrol class; Eastern Region MoI is a known buyer with prior frame contracts.' },
  { title: 'Security advisory upgraded — Sahel corridor', source: 'Multilateral risk advisory', time: '5h ago', accounts: 6, conf: 'High', sev: 'High' },
  { title: 'Donor funding round closed — humanitarian logistics', source: 'Multilateral press release', time: '1d ago', accounts: 4, conf: 'Medium', sev: 'Medium' },
  { title: 'Project restart — offshore extractive operator', source: 'Operator quarterly statement', time: '1d ago', accounts: 2, conf: 'Medium', sev: 'Medium' },
  { title: 'Embassy relocation announcement', source: 'Government press release', time: '2d ago', accounts: 1, conf: 'High', sev: 'Low' },
  { title: 'Fleet RFI to two competitors — CIT operator', source: 'Industry network', time: '2d ago', accounts: 1, conf: 'Medium', sev: 'High' },
];

const board = {
  moved: [
    { acct: 'Ministry of Interior — Eastern Region', tier: 'P1', step: 'Pre-bid call scheduled', owner: 'A. Khalid' },
    { acct: 'GulfCash Logistics', tier: 'P1', step: 'Partner intro confirmed', owner: 'Al Madar' },
  ],
  decision: [
    { acct: 'United Nations Field Mission', tier: 'P1', step: 'Direct vs. partner route', owner: 'CCO' },
    { acct: 'TransOcean Energy', tier: 'P2', step: 'Spec sheet alignment', owner: 'Product' },
  ],
  blocked: [
    { acct: 'Embassy of [redacted]', tier: 'P2', blocker: 'Compliance review pending', owner: 'Legal' },
  ],
};

// ─── Layout shell ───
const Shell: React.FC<{ children: React.ReactNode; active: Screen; setActive: (s: Screen) => void }> = ({ children, active, setActive }) => (
  <div className="min-h-screen flex" style={{ background: SOFT }}>
    {/* Sidebar */}
    <aside className="w-[240px] flex-shrink-0 flex flex-col" style={{ background: NAVY, color: 'white' }}>
      <div className="px-5 py-5 border-b border-white/10">
        <div className="text-[11px] font-semibold tracking-[0.22em] uppercase opacity-80">Discvr.ai</div>
        <div className="text-[15px] font-semibold mt-1">Signal-to-Account</div>
        <div className="text-[11px] opacity-70 mt-0.5">Mahindra Armored — pilot mock</div>
      </div>
      <nav className="flex-1 py-3">
        {SCREENS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] transition-colors"
              style={{
                background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: isActive ? 'white' : 'rgba(255,255,255,0.75)',
                borderLeft: `3px solid ${isActive ? '#fff' : 'transparent'}`,
              }}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </button>
          );
        })}
      </nav>
      <div className="px-5 py-4 border-t border-white/10 text-[10px] opacity-60 leading-relaxed">
        Synthetic data · illustrative<br />Week-6 deliverable preview
      </div>
    </aside>

    {/* Topbar + content */}
    <div className="flex-1 flex flex-col min-w-0">
      <header className="h-14 px-8 flex items-center justify-between border-b" style={{ background: 'white', borderColor: LINE }}>
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-semibold tracking-wider uppercase" style={{ color: ACCENT }}>Pilot · week 6</span>
          <span className="text-[12px]" style={{ color: MUTED }}>·</span>
          <span className="text-[13px] font-medium" style={{ color: INK }}>{SCREENS.find(s => s.id === active)?.label}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: MUTED }} />
            <input placeholder="Search accounts, signals…" className="pl-9 pr-3 py-1.5 text-[12px] rounded border w-[260px]" style={{ borderColor: LINE, background: SOFT, color: INK }} />
          </div>
          <button className="relative w-8 h-8 rounded-full flex items-center justify-center" style={{ background: SOFT, border: `1px solid ${LINE}` }}>
            <Bell className="w-4 h-4" style={{ color: NAVY }} />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: DANGER }}>3</span>
          </button>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold text-white" style={{ background: NAVY }}>SI</div>
        </div>
      </header>
      <main className="flex-1 overflow-auto px-8 py-6">{children}</main>
      <footer className="h-9 px-8 flex items-center justify-between border-t text-[11px]" style={{ background: 'white', borderColor: LINE, color: MUTED }}>
        <span>Pilot objective: improve pursuit quality and speed, not lead volume.</span>
        <span>Synthetic data · illustrative · not a production system</span>
      </footer>
    </div>
  </div>
);

// ─── Helpers ───
const Tier: React.FC<{ t: string }> = ({ t }) => {
  const map: Record<string, string> = { P1: DANGER, P2: WARN, P3: ACCENT };
  return <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider" style={{ background: `${map[t]}15`, color: map[t] }}>{t}</span>;
};
const Sev: React.FC<{ s: string }> = ({ s }) => {
  const map: Record<string, string> = { High: DANGER, Medium: WARN, Low: ACCENT };
  return <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: `${map[s]}15`, color: map[s] }}>{s}</span>;
};

// ─── Screen 1 ───
const Dashboard = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-[22px] font-semibold" style={{ color: INK }}>Signal-to-Account Command Center</h1>
      <p className="text-[13px] mt-1" style={{ color: MUTED }}>Week 23 · 14 Apr 2025 · GCC + MENA pilot universe</p>
    </div>

    <div className="grid grid-cols-4 gap-4">
      {[
        { label: 'High-intent accounts surfaced', value: '37', delta: '+8 wk/wk', icon: Target },
        { label: 'Median signal → action time', value: '2.3 days', delta: '−1.4d', icon: Clock },
        { label: 'Qualified conversations', value: '12', delta: '+3', icon: Users },
        { label: 'Opportunities to bid review', value: '4', delta: '+2', icon: TrendingUp },
      ].map((k) => {
        const Icon = k.icon;
        return (
          <div key={k.label} className="rounded-lg p-5" style={{ background: 'white', border: `1px solid ${LINE}` }}>
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: SOFT, border: `1px solid ${LINE}` }}>
                <Icon className="w-4 h-4" style={{ color: NAVY }} />
              </div>
              <span className="text-[10px] font-semibold" style={{ color: SUCCESS }}>{k.delta}</span>
            </div>
            <div className="mt-4 text-[28px] font-semibold tracking-tight" style={{ color: INK }}>{k.value}</div>
            <div className="text-[11px] mt-1 leading-snug" style={{ color: MUTED }}>{k.label}</div>
          </div>
        );
      })}
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 rounded-lg" style={{ background: 'white', border: `1px solid ${LINE}` }}>
        <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: LINE }}>
          <h3 className="text-[14px] font-semibold" style={{ color: INK }}>Prioritized accounts — this week</h3>
          <button className="flex items-center gap-1 text-[11px]" style={{ color: ACCENT }}><Filter className="w-3 h-3" /> Filters</button>
        </div>
        <div className="overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr style={{ background: SOFT, color: NAVY_SOFT }} className="text-[10px] uppercase tracking-wider">
                <th className="text-left px-4 py-2 font-semibold">Account</th>
                <th className="text-left px-2 py-2 font-semibold">Segment</th>
                <th className="text-left px-2 py-2 font-semibold">Country</th>
                <th className="text-left px-2 py-2 font-semibold">Trigger</th>
                <th className="text-left px-2 py-2 font-semibold">Score</th>
                <th className="text-left px-2 py-2 font-semibold">Tier</th>
                <th className="text-left px-2 py-2 font-semibold">Owner</th>
                <th className="text-left px-2 py-2 font-semibold">Route</th>
                <th className="text-left px-2 py-2 font-semibold">Next</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a, i) => (
                <tr key={i} className="border-t hover:bg-slate-50 transition-colors" style={{ borderColor: LINE, color: INK }}>
                  <td className="px-4 py-3 font-medium">{a.acct}</td>
                  <td className="px-2 py-3" style={{ color: MUTED }}>{a.seg}</td>
                  <td className="px-2 py-3" style={{ color: MUTED }}>{a.country}</td>
                  <td className="px-2 py-3 max-w-[220px] truncate" style={{ color: MUTED }} title={a.trigger}>{a.trigger}</td>
                  <td className="px-2 py-3 font-mono font-semibold" style={{ color: a.score >= 85 ? DANGER : a.score >= 75 ? WARN : ACCENT }}>{a.score}</td>
                  <td className="px-2 py-3"><Tier t={a.tier} /></td>
                  <td className="px-2 py-3" style={{ color: MUTED }}>{a.owner}</td>
                  <td className="px-2 py-3"><span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ background: a.route === 'Direct' ? `${NAVY}10` : `${WARN}15`, color: a.route === 'Direct' ? NAVY : WARN }}>{a.route}</span></td>
                  <td className="px-2 py-3" style={{ color: MUTED }}>{a.next}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg" style={{ background: 'white', border: `1px solid ${LINE}` }}>
        <div className="px-5 py-3 border-b" style={{ borderColor: LINE }}>
          <h3 className="text-[14px] font-semibold" style={{ color: INK }}>Top movement this week</h3>
        </div>
        <div className="p-5 space-y-4">
          {[
            { txt: 'MoI Eastern Region jumped 12 points after tender publication.', tag: 'Signal' },
            { txt: 'GulfCash moved P2 → P1 on competitor RFI signal.', tag: 'Tier change' },
            { txt: 'Embassy [redacted] entered review — compliance hold.', tag: 'Hold' },
          ].map((m, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-1 rounded-full flex-shrink-0" style={{ background: NAVY }} />
              <div>
                <div className="text-[12px] leading-snug" style={{ color: INK }}>{m.txt}</div>
                <div className="text-[10px] mt-1 font-semibold tracking-wider uppercase" style={{ color: MUTED }}>{m.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Screen 2 ───
const Signals = () => {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[22px] font-semibold" style={{ color: INK }}>Signal Feed Explorer</h1>
          <p className="text-[13px] mt-1" style={{ color: MUTED }}>148 signals captured this week · 37 mapped to accounts</p>
        </div>
        <div className="flex gap-2">
          {['Source', 'Region', 'Segment', 'Severity', 'Recency'].map((f) => (
            <button key={f} className="px-3 py-1.5 text-[11px] rounded border flex items-center gap-1" style={{ borderColor: LINE, background: 'white', color: NAVY }}>
              {f} <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg overflow-hidden" style={{ background: 'white', border: `1px solid ${LINE}` }}>
        <div className="grid grid-cols-12 px-5 py-2.5 text-[10px] uppercase tracking-wider font-semibold" style={{ background: SOFT, color: NAVY_SOFT }}>
          <div className="col-span-5">Signal</div>
          <div className="col-span-2">Source</div>
          <div className="col-span-2">Detected</div>
          <div className="col-span-1 text-center">Accounts</div>
          <div className="col-span-1 text-center">Confidence</div>
          <div className="col-span-1 text-center">Severity</div>
        </div>
        {signals.map((s, i) => (
          <div key={i} className="border-t" style={{ borderColor: LINE }}>
            <div
              className="grid grid-cols-12 px-5 py-3.5 text-[12px] items-center hover:bg-slate-50 transition-colors cursor-pointer"
              style={{ color: INK }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="col-span-5 font-medium flex items-center gap-2">
                {s.title}
                {s.why && <Info className="w-3.5 h-3.5" style={{ color: ACCENT }} />}
              </div>
              <div className="col-span-2 flex items-center gap-1.5" style={{ color: MUTED }}>
                {s.source} <ExternalLink className="w-3 h-3" />
              </div>
              <div className="col-span-2" style={{ color: MUTED }}>{s.time}</div>
              <div className="col-span-1 text-center font-semibold" style={{ color: NAVY }}>{s.accounts}</div>
              <div className="col-span-1 text-center text-[11px]" style={{ color: MUTED }}>{s.conf}</div>
              <div className="col-span-1 flex justify-center"><Sev s={s.sev} /></div>
            </div>
            {hover === i && s.why && (
              <div className="px-5 pb-4 text-[12px] flex gap-2 items-start" style={{ background: SOFT, color: NAVY_SOFT }}>
                <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                <span><span className="font-semibold">Why this matters:</span> {s.why}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Screen 3 ───
const Account = () => (
  <div className="space-y-5">
    <div className="flex items-center gap-2 text-[12px]" style={{ color: MUTED }}>
      <span>Accounts</span><ChevronRight className="w-3 h-3" /><span style={{ color: INK }} className="font-medium">Ministry of Interior — Eastern Region</span>
    </div>

    <div className="rounded-lg p-6" style={{ background: 'white', border: `1px solid ${LINE}` }}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: ACCENT }}>Account · Synthetic</div>
          <h1 className="text-[24px] font-semibold mt-1" style={{ color: INK }}>Ministry of Interior — Eastern Region</h1>
          <div className="flex items-center gap-4 mt-2 text-[12px]" style={{ color: MUTED }}>
            <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> Government / MoI</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> KSA — Eastern Region</span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Direct route</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider" style={{ color: MUTED }}>Priority score</div>
          <div className="text-[40px] font-semibold leading-none mt-1" style={{ color: DANGER }}>92</div>
          <div className="mt-1"><Tier t="P1" /></div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-4">
        <div className="rounded-lg" style={{ background: 'white', border: `1px solid ${LINE}` }}>
          <div className="px-5 py-3 border-b" style={{ borderColor: LINE }}>
            <h3 className="text-[14px] font-semibold" style={{ color: INK }}>Active signal timeline — last 30 days</h3>
          </div>
          <div className="p-5 space-y-3">
            {[
              { d: 'Apr 14', txt: 'Tender notice published — 24 patrol units, B6/B7 class', sev: 'High' },
              { d: 'Apr 09', txt: 'Pre-tender industry consultation referenced in trade press', sev: 'Medium' },
              { d: 'Apr 02', txt: 'Budget line item visible in regional fiscal release', sev: 'Medium' },
              { d: 'Mar 24', txt: 'Senior procurement appointment confirmed', sev: 'Low' },
            ].map((e, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="text-[11px] font-mono w-16 flex-shrink-0 mt-0.5" style={{ color: MUTED }}>{e.d}</div>
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: e.sev === 'High' ? DANGER : e.sev === 'Medium' ? WARN : ACCENT }} />
                <div className="flex-1 text-[13px]" style={{ color: INK }}>{e.txt}</div>
                <Sev s={e.sev} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg p-5" style={{ background: 'white', border: `1px solid ${LINE}` }}>
          <h3 className="text-[14px] font-semibold mb-3" style={{ color: INK }}>Account summary</h3>
          <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>
            Federal government buyer with prior frame contracts for armored mobility. Procurement runs through a structured tender
            committee with recurring fleet renewal cycles. Known interest in B6/B7 patrol class and protected SUV variants for
            command-grade transport.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg p-5" style={{ background: 'white', border: `1px solid ${LINE}` }}>
          <div className="text-[10px] font-semibold tracking-wider uppercase mb-3" style={{ color: MUTED }}>Recommended product families</div>
          <div className="flex flex-wrap gap-2">
            {['Police Patrol B6/B7', 'VIP SUV B6', 'Command Vehicle', 'Tactical APC'].map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1" style={{ background: `${NAVY}10`, color: NAVY }}>
                <Tag className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg p-5" style={{ background: 'white', border: `1px solid ${DANGER}30` }}>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4" style={{ color: DANGER }} />
            <h4 className="text-[13px] font-semibold" style={{ color: INK }}>Risks & constraints</h4>
          </div>
          <ul className="space-y-2 text-[12px]" style={{ color: NAVY_SOFT }}>
            <li className="flex gap-2"><span className="text-[10px] mt-1" style={{ color: DANGER }}>●</span> Sensitive segment — outreach requires legal review</li>
            <li className="flex gap-2"><span className="text-[10px] mt-1" style={{ color: WARN }}>●</span> Compliance check required before commercial engagement</li>
            <li className="flex gap-2"><span className="text-[10px] mt-1" style={{ color: ACCENT }}>●</span> No-go: third-party export restrictions to be confirmed</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// ─── Screen 4 ───
const Brief = () => (
  <div className="max-w-[920px] mx-auto">
    <div className="rounded-lg overflow-hidden" style={{ background: 'white', border: `1px solid ${LINE}`, boxShadow: '0 1px 2px rgba(11,37,69,0.04)' }}>
      <div className="px-7 py-5 flex items-start justify-between" style={{ background: NAVY, color: 'white' }}>
        <div>
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-80">Pursuit brief · P1</div>
          <h1 className="text-[22px] font-semibold mt-1">Ministry of Interior — Eastern Region</h1>
          <div className="text-[12px] opacity-80 mt-1">Owner: A. Khalid · Due: 14 Apr · Synthetic</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider opacity-70">Score</div>
          <div className="text-[32px] font-semibold leading-none">92</div>
        </div>
      </div>

      <div className="p-7 space-y-6">
        <div>
          <div className="text-[10px] font-semibold tracking-wider uppercase mb-2" style={{ color: ACCENT }}>Why now</div>
          <p className="text-[14px] leading-relaxed" style={{ color: INK }}>
            A formal tender for 24 armored patrol units published 2 hours ago, on top of a known fleet renewal cycle and a recently
            confirmed senior procurement appointment. Window for influence is short.
          </p>
        </div>

        <div>
          <div className="text-[10px] font-semibold tracking-wider uppercase mb-2" style={{ color: ACCENT }}>Trigger stack</div>
          <ul className="space-y-2 text-[13px]" style={{ color: INK }}>
            {[
              'Tender notice — 24 patrol units, B6/B7 class (today, high confidence)',
              'Pre-tender industry consultation referenced in trade press (5 days ago)',
              'Budget line visible in regional fiscal release (12 days ago)',
              'Senior procurement appointment confirmed (3 weeks ago)',
            ].map((b, i) => (
              <li key={i} className="flex gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: NAVY }} /><span>{b}</span></li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-lg p-4" style={{ background: SOFT, border: `1px solid ${LINE}` }}>
            <div className="text-[10px] font-semibold tracking-wider uppercase mb-1" style={{ color: MUTED }}>Recommended first move</div>
            <p className="text-[13px] font-medium" style={{ color: INK }}>Direct call from MEVA commercial lead to procurement contact within 48 hours; offer pre-bid technical walkthrough.</p>
          </div>
          <div className="rounded-lg p-4" style={{ background: SOFT, border: `1px solid ${LINE}` }}>
            <div className="text-[10px] font-semibold tracking-wider uppercase mb-1" style={{ color: MUTED }}>Suggested outreach angle</div>
            <p className="text-[13px]" style={{ color: INK }}>Reference patrol-class certification and prior regional deployments. Stay technical, mission-fit framing — no commercial pricing in first contact.</p>
          </div>
        </div>

        <div className="rounded-lg p-4 flex items-center justify-between" style={{ background: `${NAVY}06`, border: `1px solid ${NAVY}20` }}>
          <div>
            <div className="text-[11px]" style={{ color: MUTED }}>Success condition</div>
            <p className="text-[13px] font-medium mt-0.5" style={{ color: INK }}>Confirmed pre-bid technical meeting on calendar within 7 days.</p>
          </div>
          <button className="px-4 py-2 rounded-md text-[12px] font-semibold flex items-center gap-2" style={{ background: NAVY, color: 'white' }}>
            Accept & assign <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── Screen 5 ───
const WarRoom = () => (
  <div className="space-y-5">
    <div>
      <h1 className="text-[22px] font-semibold" style={{ color: INK }}>Weekly war room — 14 Apr</h1>
      <p className="text-[13px] mt-1" style={{ color: MUTED }}>Owner, date, decision. No items left undecided.</p>
    </div>

    <div className="grid grid-cols-3 gap-4">
      {[
        { title: 'Moved forward', items: board.moved, color: SUCCESS },
        { title: 'Needs decision', items: board.decision, color: WARN },
        { title: 'Blocked', items: board.blocked, color: DANGER },
      ].map((col) => (
        <div key={col.title} className="rounded-lg" style={{ background: 'white', border: `1px solid ${LINE}` }}>
          <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: LINE }}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: col.color }} />
              <h3 className="text-[13px] font-semibold" style={{ color: INK }}>{col.title}</h3>
            </div>
            <span className="text-[11px] font-mono" style={{ color: MUTED }}>{col.items.length}</span>
          </div>
          <div className="p-3 space-y-2 min-h-[200px]">
            {col.items.map((it: any, i: number) => (
              <div key={i} className="rounded-md p-3" style={{ background: SOFT, border: `1px solid ${LINE}` }}>
                <div className="flex items-start justify-between mb-1">
                  <div className="text-[12px] font-semibold leading-snug" style={{ color: INK }}>{it.acct}</div>
                  <Tier t={it.tier} />
                </div>
                <div className="text-[11px] mt-1" style={{ color: MUTED }}>
                  <span className="font-medium" style={{ color: NAVY_SOFT }}>{it.step || it.blocker}</span> · {it.owner}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div className="rounded-lg p-5" style={{ background: 'white', border: `1px solid ${LINE}` }}>
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4" style={{ color: WARN }} />
        <h3 className="text-[14px] font-semibold" style={{ color: INK }}>Leadership actions needed this week</h3>
      </div>
      <ol className="space-y-2 text-[13px]" style={{ color: INK }}>
        <li className="flex gap-3"><span className="font-mono text-[11px] mt-0.5" style={{ color: ACCENT }}>01</span> Approve direct vs. partner route for UN Field Mission engagement.</li>
        <li className="flex gap-3"><span className="font-mono text-[11px] mt-0.5" style={{ color: ACCENT }}>02</span> Confirm legal sign-off on Embassy [redacted] outreach pathway.</li>
        <li className="flex gap-3"><span className="font-mono text-[11px] mt-0.5" style={{ color: ACCENT }}>03</span> Decide on dedicated tender-response capacity for KSA Eastern Region.</li>
      </ol>
    </div>
  </div>
);

// ─── Screen 6 ───
const CRMHandoff = () => (
  <div className="space-y-5">
    <div>
      <h1 className="text-[22px] font-semibold" style={{ color: INK }}>CRM handoff — mapped object view</h1>
      <p className="text-[13px] mt-1" style={{ color: MUTED }}>One pursuit brief, mapped cleanly into your CRM model.</p>
    </div>

    <div className="grid grid-cols-2 gap-5">
      <div className="rounded-lg overflow-hidden" style={{ background: 'white', border: `1px solid ${LINE}` }}>
        <div className="px-5 py-3 border-b flex items-center gap-2" style={{ borderColor: LINE }}>
          <Network className="w-4 h-4" style={{ color: NAVY }} />
          <h3 className="text-[14px] font-semibold" style={{ color: INK }}>Opportunity object</h3>
        </div>
        <div className="divide-y" style={{ borderColor: LINE }}>
          {[
            ['Opportunity name', 'MoI Eastern Region — Patrol Fleet 24u'],
            ['Account', 'Ministry of Interior — Eastern Region'],
            ['Source signal IDs', 'SIG-23041, SIG-23018, SIG-22994'],
            ['Priority score', '92 / 100'],
            ['Tier', 'P1'],
            ['Assigned owner', 'A. Khalid'],
            ['Partner involved', '— (Direct route)'],
            ['Stage', 'Pre-bid engagement'],
            ['Next step', 'Schedule pre-bid technical walkthrough'],
            ['Follow-up task', 'Auto-created · due 16 Apr · A. Khalid'],
          ].map(([k, v], i) => (
            <div key={i} className="grid grid-cols-3 px-5 py-2.5 text-[12px]" style={{ borderColor: LINE }}>
              <div className="col-span-1 font-medium" style={{ color: MUTED }}>{k}</div>
              <div className="col-span-2 font-mono" style={{ color: INK }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg p-5" style={{ background: 'white', border: `1px solid ${LINE}` }}>
          <h3 className="text-[14px] font-semibold mb-3 flex items-center gap-2" style={{ color: INK }}>
            <Send className="w-4 h-4" style={{ color: NAVY }} /> Auto-generated follow-up task
          </h3>
          <div className="rounded-md p-4" style={{ background: SOFT, border: `1px solid ${LINE}` }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: ACCENT }}>Task · Pre-bid call</span>
              <span className="text-[11px] font-mono" style={{ color: MUTED }}>Due 16 Apr</span>
            </div>
            <p className="text-[13px]" style={{ color: INK }}>Schedule and confirm 30-min technical walkthrough with procurement contact. Reference patrol-class certification and regional deployment history.</p>
            <div className="mt-3 flex items-center gap-2 text-[11px]" style={{ color: MUTED }}>
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: SUCCESS }} /> Linked to opportunity · owner notified
            </div>
          </div>
        </div>

        <div className="rounded-lg p-4 flex gap-3" style={{ background: `${ACCENT}08`, border: `1px solid ${ACCENT}30` }}>
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
          <p className="text-[12px] leading-relaxed" style={{ color: NAVY_SOFT }}>
            Can integrate via light CRM fields (Salesforce / HubSpot / Dynamics) or a structured CSV export during pilot phase.
            No heavy IT project required for week-6 readout.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ─── Screen 7 (appendix) ───
const Appendix = () => (
  <div className="max-w-[820px] space-y-6">
    <div>
      <h1 className="text-[22px] font-semibold" style={{ color: INK }}>Demo data assumptions</h1>
      <p className="text-[13px] mt-1" style={{ color: MUTED }}>This demo is an illustrative mock of week-6 deliverables — not a production system.</p>
    </div>

    <div className="rounded-lg p-6 space-y-5" style={{ background: 'white', border: `1px solid ${LINE}` }}>
      {[
        { title: 'Synthetic sample accounts', body: 'All account names, contacts, and identifiers are fabricated. They are intended to represent realistic buyer classes (government, humanitarian, CIT, diplomatic, extractives) without referencing actual customers, partners, or competitors of Mahindra Armored.' },
        { title: 'Public-signal simulation', body: 'Signals shown (tender notices, advisories, project updates) are stylized examples. In a live pilot they would be sourced from agreed public and institutional channels with full source attribution and audit logging.' },
        { title: 'Scoring & tiering logic', body: 'Priority scores and tiers are illustrative. Production scoring would be calibrated with MEVA commercial leadership during the discovery & design sprint.' },
        { title: 'Not a production system', body: 'This mock is intended to communicate the operating output of the proposed pilot. No integrations, data flows, or third-party tools are connected behind it.' },
      ].map((s, i) => (
        <div key={i} className="flex gap-4">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono flex-shrink-0" style={{ background: NAVY, color: 'white' }}>{i + 1}</div>
          <div>
            <h3 className="text-[14px] font-semibold mb-1" style={{ color: INK }}>{s.title}</h3>
            <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>{s.body}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="rounded-lg p-5" style={{ background: NAVY, color: 'white' }}>
      <div className="text-[11px] font-semibold tracking-wider uppercase opacity-80 mb-1">Pilot objective</div>
      <p className="text-[15px] font-medium">Improve pursuit quality and speed — not lead volume.</p>
    </div>
  </div>
);

const MahindraArmoredSignalsDemo: React.FC = () => {
  const [active, setActive] = useState<Screen>('dashboard');
  return (
    <Shell active={active} setActive={setActive}>
      {active === 'dashboard' && <Dashboard />}
      {active === 'signals' && <Signals />}
      {active === 'account' && <Account />}
      {active === 'brief' && <Brief />}
      {active === 'warroom' && <WarRoom />}
      {active === 'crm' && <CRMHandoff />}
      {active === 'appendix' && <Appendix />}
    </Shell>
  );
};

export default MahindraArmoredSignalsDemo;
