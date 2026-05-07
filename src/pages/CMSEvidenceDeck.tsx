import React, { useState, useEffect, useCallback } from 'react';
import {
  Shield, Users, MapPin, Workflow, AlertTriangle, TrendingDown,
  Layers, Network, Brain, Target, Calendar, BarChart3, GitBranch,
  ArrowRight, CheckCircle2, FileText, Eye, Cpu, Database
} from 'lucide-react';

interface SlideProps { isActive: boolean; }

const wrap = (active: boolean) =>
  `transition-opacity duration-500 h-full ${active ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`;

const SectionHeader: React.FC<{ kicker: string; title: string; accent?: string }> = ({ kicker, title, accent = 'text-blue-400' }) => (
  <div className="mb-6">
    <p className={`text-xs uppercase tracking-widest mb-2 ${accent}`}>{kicker}</p>
    <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
  </div>
);

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => (
  <div className={`bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 ${className}`}>{children}</div>
);

// 1 — Title
const S1: React.FC<SlideProps> = ({ isActive }) => (
  <div className={wrap(isActive)}>
    <div className="h-full flex flex-col items-center justify-center text-center px-16 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-amber-500/10 rounded-3xl" />
      <div className="relative z-10 space-y-6 max-w-5xl">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          From reactive reconciliation to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">evidence-led operations</span>
        </h1>
        <p className="text-xl text-slate-300">National cash ATM network — vault-to-machine integrity programme</p>
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
          <span className="text-amber-300 text-sm uppercase tracking-widest">Indicative annual leakage band</span>
          <span className="text-3xl font-bold text-amber-300">₹40 Cr</span>
        </div>
        <p className="text-sm text-slate-500">Basis to be defined verbally · Confidential</p>
      </div>
    </div>
  </div>
);

// 2 — Discovery depth
const S2: React.FC<SlideProps> = ({ isActive }) => {
  const items = [
    { icon: Users, t: '3-day Mumbai workshop', d: 'Audit and Reconciliation teams' },
    { icon: MapPin, t: '2-day vault workshops', d: 'Faridabad and Gurugram — process & controls' },
    { icon: Eye, t: 'Field ATM visits — Gurugram', d: 'Validated on-ground operating realities' },
    { icon: Cpu, t: 'Tech walkthrough (virtual)', d: 'Systems, data, integration constraints' },
    { icon: Workflow, t: 'Indent deep-dive', d: '2–3 hr session with Sahil & Satish' },
    { icon: GitBranch, t: 'Roadmap reviews', d: 'Arindam, Ruchira & leadership (Rajeev)' },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Ground-up discovery" title="Depth of engagement completed" />
        <div className="grid grid-cols-3 gap-4 flex-1 content-start">
          {items.map((it, i) => (
            <Card key={i} className="hover:border-blue-500/40 transition-colors">
              <it.icon className="w-6 h-6 text-blue-400 mb-3" />
              <p className="text-white font-semibold mb-1">{it.t}</p>
              <p className="text-sm text-slate-400">{it.d}</p>
            </Card>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3 px-5 py-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
          <FileText className="w-5 h-5 text-blue-300" />
          <span className="text-slate-200">Output: workflows, observations and findings documented in a <span className="text-blue-300 font-semibold">~50-page working document</span>.</span>
        </div>
      </div>
    </div>
  );
};

// 3 — Landscape
const S3: React.FC<SlideProps> = ({ isActive }) => {
  const stages = [
    { t: 'Night vault count', d: 'Creates tentative VCB; morning indent begins before fully firm physical position' },
    { t: 'Trip / CMO build', d: 'Central plan; intraday revised indents handled at vault edge' },
    { t: 'Custodian execution', d: 'App + CBR closure; vault EOD and checker paths partially manual' },
    { t: 'Truth mismatch', d: 'Planned vs executed vs centrally visible state diverges on time and amount' },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Landscape" title="How cash actually moves today (end-to-end)" />
        <div className="flex-1 flex items-center">
          <div className="grid grid-cols-4 gap-3 w-full">
            {stages.map((s, i) => (
              <div key={i} className="relative">
                <Card className="h-full">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">0{i + 1}</div>
                  <p className="text-white font-semibold mb-2">{s.t}</p>
                  <p className="text-sm text-slate-400">{s.d}</p>
                </Card>
                {i < 3 && <ArrowRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 w-5 h-5 text-slate-600" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 4 — Root cause
const S4: React.FC<SlideProps> = ({ isActive }) => {
  const fractures = [
    { t: 'Vault-to-custodian dispatch proof gap', d: 'Weak digital attestation of who took what, when' },
    { t: 'System vs machine counter divergence', d: 'High-value anomaly often detected late' },
    { t: 'Intraday indent bypass', d: 'Revised amounts via email/manual path, not system-of-record' },
    { t: 'Checker bandwidth + design gap', d: 'Slip/image review without divergence prompts → false pass-through' },
    { t: 'In-transit blind window', d: 'Cash moves through gray zone before unified, trusted closure' },
    { t: 'Unbalanced cash posture', d: 'Idle excess in some ATMs; cash-out and neighbour stress elsewhere' },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Problem statement" title="Root-cause fracture points" accent="text-red-400" />
        <div className="grid grid-cols-2 gap-4 flex-1 content-start">
          {fractures.map((f, i) => (
            <Card key={i} className="border-l-4 border-l-red-500/60">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold mb-1">{f.t}</p>
                  <p className="text-sm text-slate-400">{f.d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// 5 — Business impact
const S5: React.FC<SlideProps> = ({ isActive }) => {
  const stats = [
    { v: '₹10k', l: 'Cash-out penalty', d: 'Wipes out monthly machine economics' },
    { v: '4 hr', l: 'SLA window', d: 'Magnifies routing & dispatch pressure' },
    { v: 'T+5', l: 'Harmonizing slippage', d: 'Inflates dispute and recovery overhead' },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Management-safe framing" title="Business impact" accent="text-amber-400" />
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map((s, i) => (
            <Card key={i} className="text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">{s.v}</div>
              <p className="text-white font-semibold">{s.l}</p>
              <p className="text-sm text-slate-400 mt-1">{s.d}</p>
            </Card>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <Card>
            <TrendingDown className="w-6 h-6 text-red-400 mb-3" />
            <p className="text-white font-semibold mb-2">Where pressure shows up</p>
            <ul className="text-sm text-slate-300 space-y-1.5 list-disc pl-5">
              <li>Shortages and customer claims</li>
              <li>Cash-out penalties</li>
              <li>Harmonizing / T+5 slippages</li>
              <li>Delayed root-cause assignment</li>
            </ul>
          </Card>
          <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/30">
            <Eye className="w-6 h-6 text-amber-300 mb-3" />
            <p className="text-white font-semibold mb-2">Core issue</p>
            <p className="text-slate-200 leading-relaxed">It is <span className="text-amber-300 font-semibold">not effort</span>. It is <span className="text-amber-300 font-semibold">fragmented evidence and asynchronous control.</span></p>
          </Card>
        </div>
      </div>
    </div>
  );
};

// 6 — Design principles
const S6: React.FC<SlideProps> = ({ isActive }) => {
  const principles = [
    { t: 'Evidence before verdict', d: 'No exception without traceable evidence_id', icon: Shield },
    { t: 'One variance core', d: 'Single diff engine for reconciliation, overage and command-center consumers', icon: Layers },
    { t: 'Rules before ML', d: 'Deterministic detection first; AI for ranking/prediction once labels stabilize', icon: Brain },
    { t: 'Indent truth in train 1', d: 'Sanctioned vs disbursed reconciles same day — no email-only bypass', icon: CheckCircle2 },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Solution design principle" title="Control before complexity" />
        <div className="grid grid-cols-2 gap-4 flex-1 content-start">
          {principles.map((p, i) => (
            <Card key={i} className="hover:border-cyan-500/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
                  <p.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg mb-1">{p.t}</p>
                  <p className="text-sm text-slate-400">{p.d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// 7 — Control architecture
const S7: React.FC<SlideProps> = ({ isActive }) => {
  const layers = [
    { t: 'Unified spine', d: 'Vault / App / Switch / FLM / Bank feeds normalized by atm_day + trip_id', icon: Database, color: 'from-blue-500 to-cyan-500' },
    { t: 'variance_core', d: 'Computes bank vs machine vs vault diffs; publishes exception events', icon: GitBranch, color: 'from-purple-500 to-pink-500' },
    { t: 'OCR service', d: 'Slip/screen field extraction with confidence + fallback workflow', icon: Eye, color: 'from-amber-500 to-orange-500' },
    { t: 'Ops queue', d: 'Owner, SLA clock, escalation, structured closure reasons', icon: Workflow, color: 'from-emerald-500 to-teal-500' },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Control architecture" title="What changes operationally" />
        <div className="grid grid-cols-4 gap-3 flex-1 content-start">
          {layers.map((l, i) => (
            <Card key={i}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${l.color} flex items-center justify-center mb-3`}>
                <l.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-semibold mb-1">{l.t}</p>
              <p className="text-sm text-slate-400">{l.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// 8 — Six workstreams
const S8: React.FC<SlideProps> = ({ isActive }) => {
  const ws = [
    'AI & risk intelligence',
    'Digital evidence & vault automation',
    'Preemptive overage & recovery intelligence',
    'Protocol enforcement & SOP hard-coding',
    'Automated indent & replenishment logic',
    'Operations command center / three-way truth',
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Landscape → solution map" title="Six workstreams" />
        <div className="grid grid-cols-3 gap-4 mb-6">
          {ws.map((w, i) => (
            <Card key={i} className="hover:border-blue-500/40 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{i + 1}</span>
                <span className="text-white font-medium">{w}</span>
              </div>
            </Card>
          ))}
        </div>
        <div className="px-5 py-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
          <p className="text-slate-200 leading-relaxed">
            <span className="text-purple-300 font-semibold">Audit programme runs in parallel</span> — process enforcement + predictive targeting on the same signal spine, with an <span className="text-purple-300 font-semibold">audit command center</span> for planning, execution tracking and high-risk ATM alerting.
          </p>
        </div>
      </div>
    </div>
  );
};

// 9 — AI catalogue
const S9: React.FC<SlideProps> = ({ isActive }) => {
  const groups = [
    { t: 'Core risk AI', d: 'DRS + risk-mode classification (theft, overage, cash-out stress)', icon: Brain },
    { t: 'Flow AI', d: 'Cash demand prediction, mismatch/variance detection, stuck-cash estimation', icon: Network },
    { t: 'Evidence AI', d: 'OCR for screen/slip, claims/triangulation assist, structured intake assist', icon: Eye },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Master catalogue" title="AI streams" />
        <div className="grid grid-cols-3 gap-4 mb-5">
          {groups.map((g, i) => (
            <Card key={i}>
              <g.icon className="w-7 h-7 text-cyan-300 mb-3" />
              <p className="text-white font-semibold mb-1">{g.t}</p>
              <p className="text-sm text-slate-400">{g.d}</p>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 flex-1">
          <Card className="border-amber-500/30">
            <p className="text-amber-300 text-xs uppercase tracking-widest mb-2">Boundary</p>
            <p className="text-slate-200">No shadow models beyond catalogue. Each model maps to a consumer workflow and KPI.</p>
          </Card>
          <Card className="border-blue-500/30">
            <p className="text-blue-300 text-xs uppercase tracking-widest mb-2">Shared base</p>
            <p className="text-slate-200">Reconciliation (WS1) and Audit (WS2) consume the same DRS feature backbone.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

// 10 — Stream → outcome map
const S10: React.FC<SlideProps> = ({ isActive }) => {
  const rows = [
    ['DRS / risk mode', 'Smarter audit scheduling, risk queues, escalations'],
    ['Demand + neighbour stress', 'Proactive replenishment, fewer cash-out incidents'],
    ['Mismatch + overage inference', 'Early exception detection before EOD drift'],
    ['OCR + structured intake', 'Same-day indent correction, lower checker re-key error'],
    ['Claims assist', 'Faster dispute packs, tighter forensic turnaround'],
    ['OOC/jam + excess-cash signals', 'Prioritized recovery; reduced loot-risk + sibling cash-out cascades'],
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Stream-by-stream" title="AI outcome mapping" />
        <Card className="p-0 overflow-hidden flex-1">
          <div className="grid grid-cols-[1.2fr_2fr] px-6 py-3 border-b border-slate-700/50 text-xs uppercase tracking-wider text-slate-400">
            <span>AI signal</span><span>Operational outcome</span>
          </div>
          {rows.map(([a, b], i) => (
            <div key={i} className="grid grid-cols-[1.2fr_2fr] px-6 py-4 border-b border-slate-700/30 items-center hover:bg-slate-700/20">
              <span className="text-cyan-300 font-medium">{a}</span>
              <span className="text-slate-200">{b}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// 11 — Phased execution
const S11: React.FC<SlideProps> = ({ isActive }) => {
  const phases = [
    { p: 'P1', w: '0–8 wks', t: 'Evidence contracts', d: 'OCR for pilot templates; mandatory capture on in-scope flows', color: 'from-blue-500 to-cyan-500' },
    { p: 'P2', w: '4–12 wks', t: 'Variance core + rules', d: 'First rule-set + indent automation lite (revised indent persistence)', color: 'from-purple-500 to-pink-500' },
    { p: 'P3', w: '8–16 wks', t: 'Ops dashboard & queue', d: 'Ownership, SLA tracking, exception-first workflows', color: 'from-amber-500 to-orange-500' },
    { p: 'P4', w: '10–16 wks', t: 'Hardening & expansion', d: 'Baseline month lock, second-region expansion, DRS scale-up', color: 'from-emerald-500 to-teal-500' },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Phased execution" title="Practical, low-footprint rollout" />
        <div className="grid grid-cols-4 gap-3 flex-1 content-start">
          {phases.map((p, i) => (
            <Card key={i}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${p.color}`}>{p.p}</span>
                <span className="text-xs text-slate-400 px-2 py-1 rounded bg-slate-700/50">{p.w}</span>
              </div>
              <p className="text-white font-semibold mb-1">{p.t}</p>
              <p className="text-sm text-slate-400">{p.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// 12 — KPI tree
const S12: React.FC<SlideProps> = ({ isActive }) => {
  const kpis = [
    { t: 'Evidence completeness', d: '% trips with complete vault-to-field digital evidence bundle' },
    { t: 'Indent truth', d: '% revised indents persisted same day vs email-only/manual path' },
    { t: 'Exception quality', d: 'True-positive critical diffs caught before EOD' },
    { t: 'Audit yield', d: 'DRS-driven hit rate, post-audit incident rate, LMR trend' },
    { t: 'SLA / commercial', d: 'Cash-out incidence, harmonizing/T+5 exposure, dispute TAT' },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Monthly governance" title="KPI tree" />
        <div className="grid grid-cols-5 gap-3 flex-1 content-start">
          {kpis.map((k, i) => (
            <Card key={i}>
              <BarChart3 className="w-6 h-6 text-blue-400 mb-3" />
              <p className="text-white font-semibold mb-1">{k.t}</p>
              <p className="text-sm text-slate-400">{k.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// 13 — Decisions
const S13: React.FC<SlideProps> = ({ isActive }) => {
  const items = [
    'MSP vs non-MSP operating boundary and liability split',
    'Alert RACI and escalation policy (who acts, by when, with what authority)',
    'Third-party penalty flow ownership and contractual interpretation',
    'HOTO physical cash validation protocol and enforcement thresholds',
    'Excess-cash guardrails and ATM-down playbook (loot-risk + neighbour-stress response)',
    'KPI and baseline definitions (especially reconciliation % and leakage accounting basis)',
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="To unblock scale" title="Decisions required from management" accent="text-amber-400" />
        <div className="grid grid-cols-2 gap-3 flex-1 content-start">
          {items.map((it, i) => (
            <Card key={i} className="border-l-4 border-l-amber-500/60">
              <div className="flex gap-3">
                <Target className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <p className="text-slate-200">{it}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// 14 — Ask / next step
const S14: React.FC<SlideProps> = ({ isActive }) => {
  const steps = [
    { n: '01', t: 'Approve phase-1 scope', d: 'Lock pilot region and in-scope flows' },
    { n: '02', t: 'Lock baseline month', d: 'Metric definitions agreed with finance/ops' },
    { n: '03', t: 'Nominate sponsors', d: 'Sponsor, ops owner, data owner, policy approver' },
    { n: '04', t: '30-60-90-120 cadence', p: 'review cadence', d: 'Gated go/no-go decisions at each checkpoint' },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col items-center justify-center px-12 py-8 text-center">
        <div className="space-y-8 max-w-5xl">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white">Ask & next step</h2>
          <p className="text-xl text-slate-400">Four decisions to start the programme</p>
          <div className="grid grid-cols-4 gap-4 mt-6">
            {steps.map((s, i) => (
              <div key={i} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 text-left hover:border-amber-500/30 transition-colors">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">{s.n}</span>
                <h4 className="text-white font-bold mt-3 mb-2">{s.t}</h4>
                <p className="text-sm text-slate-400">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="pt-6">
            <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-500/20">
              <span>Begin the vault-to-machine integrity programme</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14];
const TITLES = [
  'Title', 'Discovery', 'Landscape', 'Root Causes', 'Business Impact',
  'Design Principles', 'Control Architecture', 'Workstreams', 'AI Catalogue',
  'AI Outcomes', 'Phasing', 'KPI Tree', 'Decisions', 'Next Step'
];

const CMSEvidenceDeck: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const goTo = useCallback((i: number) => { if (i >= 0 && i < SLIDES.length) setCurrent(i); }, []);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, goTo]);

  return (
    <div className="h-screen w-screen bg-[#0B1120] flex flex-col overflow-hidden">
      <div className="h-10 bg-slate-900/80 border-b border-slate-800/50 flex items-center px-4 shrink-0 gap-1 overflow-x-auto">
        <Shield className="w-4 h-4 text-blue-400 shrink-0 mr-2" />
        {TITLES.map((title, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`shrink-0 px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
              current === i ? 'bg-blue-500/20 text-blue-300 font-medium' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
            }`}>
            {String(i + 1).padStart(2, '0')}. {title}
          </button>
        ))}
      </div>
      <div className="flex-1 relative min-h-0">
        {SLIDES.map((SlideComp, i) => (<SlideComp key={i} isActive={current === i} />))}
      </div>
    </div>
  );
};

export default CMSEvidenceDeck;
