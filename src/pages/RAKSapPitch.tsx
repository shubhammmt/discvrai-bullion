import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Layers, Cpu, Shield, Network, Workflow,
  Wallet, ShoppingCart, Boxes, Wrench, Factory, Truck, Building2, Zap,
  CheckCircle2, ArrowRight, Target, Users, FileCheck, Rocket, Database,
  GitBranch, Activity, BadgeCheck
} from 'lucide-react';

// Palette: deep charcoal + warm white + muted terracotta/sand gold
const ACCENT = '#B8743D';        // muted terracotta / sand gold
const ACCENT_SOFT = '#E8C9A8';
const INK = '#1F2430';
const TOTAL = 6;

const SlideWrapper: React.FC<{ children: React.ReactNode; num: number }> = ({ children, num }) => (
  <div className="w-full h-screen flex flex-col relative overflow-hidden" style={{ background: '#FAF7F2' }}>
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_SOFT}, ${ACCENT})` }} />
    <div className="absolute top-5 left-8 z-20 flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: ACCENT }}>
        <Layers className="w-4 h-4 text-white" />
      </div>
      <div className="leading-tight">
        <div className="text-[13px] font-bold tracking-tight" style={{ color: INK }}>RAK Ceramics × DiscvrAI</div>
        <div className="text-[9px] uppercase tracking-[0.2em] text-slate-500">SAP Joule & Business AI</div>
      </div>
    </div>
    <div className="absolute top-5 right-8 z-20 text-[10px] uppercase tracking-widest text-slate-500">Executive Briefing</div>
    <div className="flex-1 relative z-10 px-12 pt-16 pb-14 flex flex-col overflow-hidden" style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
      {children}
    </div>
    <div className="absolute bottom-0 left-0 right-0 px-12 pb-3 flex justify-between items-center text-[11px] text-slate-500">
      <span>Confidential — Prepared for RAK Ceramics CIO / CFO / Supply Chain leadership</span>
      <span className="font-mono">{String(num).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}</span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}50, transparent)` }} />
  </div>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-2" style={{ color: ACCENT }}>{children}</div>
);

const Title: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h2 className={`text-[34px] leading-[1.1] font-bold mb-5 ${className}`} style={{ color: INK }}>{children}</h2>
);

// ---------- Slide 1 — Title ----------
const S1: React.FC = () => (
  <SlideWrapper num={1}>
    {/* abstract ceramic tile background */}
    <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(${INK} 1px, transparent 1px), linear-gradient(90deg, ${INK} 1px, transparent 1px)`,
        backgroundSize: '64px 64px'
      }} />
    <div className="absolute -right-32 -bottom-32 w-[520px] h-[520px] rounded-full opacity-20"
      style={{ background: `radial-gradient(circle, ${ACCENT_SOFT}, transparent 70%)` }} />
    <div className="flex-1 flex flex-col justify-center relative">
      <Eyebrow>RAK Ceramics × SAP Business AI</Eyebrow>
      <h1 className="text-[52px] leading-[1.05] font-bold max-w-4xl mb-5" style={{ color: INK }}>
        From Cloud ERP to <span style={{ color: ACCENT }}>Contextual Intelligence</span>
      </h1>
      <p className="text-lg text-slate-600 max-w-3xl mb-10">
        Turning RAK's RISE with SAP foundation into an active, governed system of execution — powered by Joule and SAP Business AI.
      </p>
      <div className="grid grid-cols-3 gap-4 max-w-5xl">
        {[
          { icon: Database, t: 'RISE with SAP & S/4HANA', d: 'Cloud ERP foundation already set' },
          { icon: Cpu, t: 'Joule & Business AI', d: 'ERP becomes a system of execution' },
          { icon: Shield, t: 'Clean Core + Governed Agents', d: 'Not shadow AI sprawl' }
        ].map((it, i) => (
          <div key={i} className="rounded-xl border bg-white p-5"
            style={{ borderColor: `${ACCENT}30` }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${ACCENT}18` }}>
              <it.icon className="w-4.5 h-4.5" style={{ color: ACCENT }} />
            </div>
            <p className="text-[14px] font-bold mb-1" style={{ color: INK }}>{it.t}</p>
            <p className="text-[12px] text-slate-600 leading-relaxed">{it.d}</p>
          </div>
        ))}
      </div>
      <p className="text-[12px] text-slate-500 mt-10 italic">Prepared for executive discussion — SAP Joule & agentic roadmap alignment.</p>
    </div>
  </SlideWrapper>
);

// ---------- Slide 2 — Why native SAP AI ----------
const S2: React.FC = () => (
  <SlideWrapper num={2}>
    <Eyebrow>Strategic Frame</Eyebrow>
    <Title>Why Joule Fits RAK's "Stay on SAP" Constraint</Title>
    <div className="grid grid-cols-2 gap-6 flex-1">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <Activity className="w-4 h-4 text-slate-600" />
          </div>
          <p className="text-[15px] font-bold text-slate-800">Friction Today</p>
        </div>
        <ul className="space-y-3 text-[13px] text-slate-700 leading-relaxed">
          <li className="flex gap-2"><span className="text-slate-400">—</span><span><b>"Toggle tax"</b> across apps to complete one business outcome</span></li>
          <li className="flex gap-2"><span className="text-slate-400">—</span><span>Generic LLMs lack <b>business object semantics</b> (supplier ↔ PO ↔ kiln schedule ↔ GL)</span></li>
          <li className="flex gap-2"><span className="text-slate-400">—</span><span>External AI stacks add <b>integration debt, latency and governance gaps</b></span></li>
        </ul>
      </div>
      <div className="rounded-xl border-2 p-6" style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}06` }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}20` }}>
            <Cpu className="w-4 h-4" style={{ color: ACCENT }} />
          </div>
          <p className="text-[15px] font-bold" style={{ color: INK }}>Joule Differentiation</p>
        </div>
        <ul className="space-y-3 text-[13px] text-slate-700 leading-relaxed">
          <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} /><span>Embedded across <b>S/4HANA, Ariba, SuccessFactors, BTP</b></span></li>
          <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} /><span>Reasoning grounded in <b>SAP business context</b> (Knowledge Graph–style relationships)</span></li>
          <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} /><span>Security, roles and audit trails <b>inherit SAP's model</b></span></li>
        </ul>
      </div>
    </div>
    <div className="mt-5 rounded-lg p-4 flex items-start gap-3" style={{ background: `${INK}08`, border: `1px dashed ${ACCENT}50` }}>
      <GitBranch className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
      <p className="text-[12.5px] text-slate-700">
        <b>Hybrid when needed:</b> heavy custom ML / vision on hyperscalers via BTP — but core decisions stay SAP-native.
      </p>
    </div>
  </SlideWrapper>
);

// ---------- Slide 3 — What to pitch first ----------
const S3: React.FC = () => {
  const cards = [
    { icon: Wallet, pillar: 'Finance & Working Capital', outcomes: 'Faster invoice / dispute handling · cash positioning · payment advice', sap: 'Finance agents, cash application patterns' },
    { icon: ShoppingCart, pillar: 'Procurement & Spend', outcomes: 'Bid analysis · supplier visibility · PO assistance', sap: 'Ariba + Joule; comparable to large materials spend programs' },
    { icon: Boxes, pillar: 'Planning & Fulfillment', outcomes: 'Demand sensing · inventory balance · risk to order promise', sap: 'IBP + embedded AI; "order reliability" monitoring' },
    { icon: Wrench, pillar: 'Maintenance & Asset Productivity', outcomes: 'Work order quality · proactive maintenance signals', sap: 'PM data + agents; analogous to utilities / asset-heavy peers' },
  ];
  return (
    <SlideWrapper num={3}>
      <Eyebrow>Prioritized Use Cases</Eyebrow>
      <Title>High-Confidence Use Cases to Pitch RAK First</Title>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {cards.map((c, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}15` }}>
                <c.icon className="w-5 h-5" style={{ color: ACCENT }} />
              </div>
              <p className="text-[15px] font-bold" style={{ color: INK }}>{c.pillar}</p>
            </div>
            <p className="text-[12.5px] text-slate-700 mb-3 leading-relaxed"><b className="text-slate-900">Outcomes:</b> {c.outcomes}</p>
            <p className="text-[11.5px] text-slate-600 mt-auto pt-3 border-t border-slate-100"><b style={{ color: ACCENT }}>SAP angle:</b> {c.sap}</p>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-slate-500 mt-4 italic">
        Phase-2 candidates (mention verbally): custom kiln ML and advanced computer vision via Digital Manufacturing or external ML fed back into SAP.
      </p>
    </SlideWrapper>
  );
};

// ---------- Slide 4 — Proof points ----------
const S4: React.FC = () => {
  const peers = [
    { icon: Building2, label: 'Industrial Services', metric: 'AI case routing', stat: '1000s of hrs saved' },
    { icon: Factory, label: 'Process Manufacturing', metric: 'AP & cash automation', stat: '2-digit % faster' },
    { icon: ShoppingCart, label: 'Beverage / CPG', metric: 'Demand planning', stat: '+ mid-single % accuracy' },
    { icon: Truck, label: 'Auto Supplier', metric: 'Packaging & logistics', stat: 'Plan-cycle compression' },
    { icon: Cpu, label: 'Discrete Plant', metric: 'AI visual quality (DM)', stat: 'In-line defect catch' },
  ];
  return (
    <SlideWrapper num={4}>
      <Eyebrow>Peer Proof</Eyebrow>
      <Title>Peers Are Moving — SAP-Centric AI, Measurable KPIs</Title>
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-5 gap-3">
          {peers.map((p, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ background: `${ACCENT}15` }}>
                <p.icon className="w-5 h-5" style={{ color: ACCENT }} />
              </div>
              <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-2 leading-tight">{p.label}</p>
              <p className="text-[12.5px] font-semibold mb-2 leading-snug" style={{ color: INK }}>{p.metric}</p>
              <div className="text-[12px] font-bold py-1.5 px-2 rounded" style={{ background: `${ACCENT}12`, color: ACCENT }}>{p.stat}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-8 text-slate-400">
          <div className="h-px flex-1 max-w-[120px] bg-slate-200" />
          <span className="text-[10px] uppercase tracking-widest">Pattern recognition across industrial peers</span>
          <div className="h-px flex-1 max-w-[120px] bg-slate-200" />
        </div>
      </div>
      <div className="rounded-xl p-5 mt-2" style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}30` }}>
        <p className="text-[13px] leading-relaxed" style={{ color: INK }}>
          <b>RAK's own narrative:</b> cloud transformation with explicit exploration of Joule. This deck is the
          <span style={{ color: ACCENT }}> "how"</span> — not the <span className="italic">"whether."</span>
        </p>
      </div>
    </SlideWrapper>
  );
};

// ---------- Slide 5 — 90-day path ----------
const S5: React.FC = () => {
  const phases = [
    {
      tag: 'Phase A', name: 'Foundation', weeks: 'Weeks 1–4', icon: Shield,
      points: ['BTP / landscape registration; security & AI governance guardrails', 'Master data & integration hygiene for pilot scope only', 'Enable Joule Base for navigation, help and low-risk queries']
    },
    {
      tag: 'Phase B', name: 'Dual Pilots', weeks: 'Weeks 5–12', icon: Workflow,
      points: ['Pilot 1 — Finance / AP-cash workflow (minutes saved per case)', 'Pilot 2 — Procurement or maintenance / work-order assistance', 'KPIs: time-to-complete, first-pass quality, adoption, AI Units burn']
    },
    {
      tag: 'Phase C', name: 'Decision Gate', weeks: 'Week 13+', icon: Rocket,
      points: ['Scale winners; Joule Studio for custom skills only after standard agents prove ROI', 'Optional: Teams / M365 touchpoints via managed SAP–Copilot patterns', 'Industrialize governance, expand to second geography / company code']
    },
  ];
  return (
    <SlideWrapper num={5}>
      <Eyebrow>90-Day Path</Eyebrow>
      <Title>Start Small, Prove Value, Then Scale Agents</Title>
      <div className="flex-1 grid grid-cols-3 gap-4">
        {phases.map((p, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col relative">
            <div className="absolute -top-2 left-5 px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest text-white"
              style={{ background: ACCENT }}>{p.tag}</div>
            <div className="flex items-center gap-2 mb-1 mt-2">
              <p.icon className="w-5 h-5" style={{ color: ACCENT }} />
              <p className="text-[16px] font-bold" style={{ color: INK }}>{p.name}</p>
            </div>
            <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-3">{p.weeks}</p>
            <ul className="space-y-2.5 text-[12.5px] text-slate-700 leading-relaxed">
              {p.points.map((pt, j) => (
                <li key={j} className="flex gap-2">
                  <ArrowRight className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: ACCENT }} />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-[11px]">
        {['Time-to-complete', 'First-pass quality', 'User adoption', 'AI Units burn forecast'].map((k, i) => (
          <div key={i} className="rounded-lg py-2 px-3 text-center font-semibold"
            style={{ background: `${INK}06`, color: INK, border: `1px solid ${ACCENT}25` }}>{k}</div>
        ))}
      </div>
    </SlideWrapper>
  );
};

// ---------- Slide 6 — Team & Ask ----------
const S6: React.FC = () => {
  const team = [
    { role: 'Executive Sponsor (CIO / COO)', resp: 'Priorities, unblock budget & vendor alignment' },
    { role: 'Program Lead / PM', resp: 'Roadmap, RAID, AI Units tracking' },
    { role: 'SAP Functional Lead (FI/CO + MM/PP/PM)', resp: 'Process truth, UAT, sign-off' },
    { role: 'BTP & Integration Engineer', resp: 'Cloud Connector / APIs, destinations, security' },
    { role: 'AI / Joule Builder', resp: 'Joule Studio / Build skills, prompts, evaluations' },
    { role: 'Data Steward', resp: 'Pilot-scope master data quality' },
    { role: 'Change + Security (0.25 FTE)', resp: 'Communications, role design, logging review' },
  ];
  return (
    <SlideWrapper num={6}>
      <Eyebrow>Lean Core Team & The Ask</Eyebrow>
      <Title>Lean Core Team — and What We Need From RAK This Quarter</Title>
      <div className="flex-1 grid grid-cols-5 gap-5">
        <div className="col-span-3 rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4" style={{ color: ACCENT }} />
            <p className="text-[13px] font-bold" style={{ color: INK }}>Starter Team (part-time acceptable)</p>
          </div>
          <div className="divide-y divide-slate-100">
            {team.map((t, i) => (
              <div key={i} className="grid grid-cols-5 gap-2 py-2">
                <p className="col-span-2 text-[12px] font-semibold text-slate-800">{t.role}</p>
                <p className="col-span-3 text-[12px] text-slate-600">{t.resp}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 rounded-xl p-5 flex flex-col" style={{ background: INK }}>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
            <p className="text-[13px] font-bold tracking-widest uppercase" style={{ color: ACCENT_SOFT }}>The Ask</p>
          </div>
          <div className="space-y-3.5 flex-1">
            {[
              { icon: FileCheck, t: '1 workshop (½ day)', d: 'Confirm pilot candidates and success metrics' },
              { icon: BadgeCheck, t: 'Pilot charter signed', d: 'Two workflows, one geography or one company code' },
              { icon: Cpu, t: 'AI Units & licensing session', d: 'Joint planning with SAP account team' },
            ].map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: `${ACCENT}30` }}>
                  <a.icon className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white">{a.t}</p>
                  <p className="text-[11.5px] text-slate-300 leading-relaxed">{a.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-[11.5px] italic" style={{ color: ACCENT_SOFT }}>
              Built in, not bolted on — autonomous enterprise, governed and incremental.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
};

const slideRenderers = [S1, S2, S3, S4, S5, S6];

const RAKSapPitch: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [entered, setEntered] = useState(false);
  useEffect(() => { setEntered(true); }, []);

  const go = useCallback((dir: number) => {
    setCurrent(c => Math.max(0, Math.min(TOTAL - 1, c + dir)));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go]);

  const Slide = slideRenderers[current];
  return (
    <div className="w-full h-screen overflow-hidden relative" style={{ background: '#FAF7F2' }}>
      <div className="fixed top-0 left-0 right-0 z-50 flex">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className="flex-1 h-1 transition-colors duration-300"
            style={{ background: i <= current ? ACCENT : '#e2e1dd' }} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current}
          initial={entered ? { opacity: 0, x: 30 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <Slide />
        </motion.div>
      </AnimatePresence>
      <div className="fixed bottom-6 right-8 z-50 flex gap-2">
        <button onClick={() => go(-1)} disabled={current === 0}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white/95 backdrop-blur flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => go(1)} disabled={current === TOTAL - 1}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white/95 backdrop-blur flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default RAKSapPitch;
