import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Layers, Cpu, Shield, Network, Workflow,
  Wallet, ShoppingCart, Boxes, Wrench, Factory, Truck, Building2, Zap,
  CheckCircle2, ArrowRight, Target, Users, FileCheck, Rocket, Database,
  GitBranch, Activity, BadgeCheck, XCircle, Layers3, Sparkles, Gauge
} from 'lucide-react';

// Aligned with /pitch/enterprise — navy dark + gold accent
const ACCENT = '#F5A623';        // enterprise gold
const ACCENT_SOFT = '#FFD27A';
const ACCENT_DARK = '#D98E10';
const INK = '#0B1428';           // enterprise navy dark
const NAVY = '#13213D';
const NAVY_LIGHT = '#1F3157';
const TOTAL = 7;

const SlideWrapper: React.FC<{ children: React.ReactNode; num: number }> = ({ children, num }) => (
  <div className="w-full h-screen flex flex-col relative overflow-hidden" style={{ background: INK, color: '#E8ECF4' }}>
    {/* subtle grid */}
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
        backgroundSize: '64px 64px'
      }} />
    <div className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full opacity-[0.08] pointer-events-none"
      style={{ background: `radial-gradient(circle, ${ACCENT}, transparent 70%)` }} />
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${ACCENT_DARK}, ${ACCENT}, ${ACCENT_SOFT}, ${ACCENT})` }} />

    {/* Brand: DiscvrAI × RAK Ceramics */}
    <div className="absolute top-5 left-8 z-20 flex items-center gap-3">
      <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: ACCENT }}>
        <Sparkles className="w-4 h-4" style={{ color: INK }} />
      </div>
      <div className="leading-tight">
        <div className="text-[13px] font-bold tracking-tight text-white">
          DiscvrAI <span style={{ color: ACCENT_SOFT }}>×</span> RAK Ceramics
        </div>
        <div className="text-[9px] uppercase tracking-[0.22em]" style={{ color: '#94A3B8' }}>
          SAP Joule & Business AI · Executive Briefing
        </div>
      </div>
    </div>
    <div className="absolute top-5 right-8 z-20 text-[10px] uppercase tracking-widest" style={{ color: '#94A3B8' }}>
      DiscvrAI · Decision & Execution Layer
    </div>

    <div className="flex-1 relative z-10 px-12 pt-20 pb-14 flex flex-col overflow-hidden" style={{ maxWidth: 1320, margin: '0 auto', width: '100%' }}>
      {children}
    </div>

    <div className="absolute bottom-0 left-0 right-0 px-12 pb-3 flex justify-between items-center text-[11px]" style={{ color: '#7B8CA8' }}>
      <span>Confidential — Prepared by DiscvrAI for RAK Ceramics CIO / CFO / Supply Chain leadership</span>
      <span className="font-mono" style={{ color: ACCENT_SOFT }}>{String(num).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}</span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}60, transparent)` }} />
  </div>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-[11px] font-semibold tracking-[0.24em] uppercase mb-2" style={{ color: ACCENT }}>{children}</div>
);

const Title: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h2 className={`text-[34px] leading-[1.1] font-bold mb-5 text-white ${className}`}>{children}</h2>
);

const Card: React.FC<{ children: React.ReactNode; className?: string; highlight?: boolean }> = ({ children, className = '', highlight }) => (
  <div className={`rounded-xl p-5 ${className}`}
    style={{
      background: highlight ? `linear-gradient(180deg, ${NAVY_LIGHT}, ${NAVY})` : NAVY,
      border: `1px solid ${highlight ? `${ACCENT}50` : '#243556'}`
    }}>
    {children}
  </div>
);

// ---------- Slide 1 — Title ----------
const S1: React.FC = () => (
  <SlideWrapper num={1}>
    <div className="flex-1 flex flex-col justify-center relative">
      <Eyebrow>DiscvrAI for RAK Ceramics × SAP Business AI</Eyebrow>
      <h1 className="text-[54px] leading-[1.05] font-bold max-w-4xl mb-5 text-white">
        From Cloud ERP to <span style={{ color: ACCENT }}>Contextual Intelligence</span>
      </h1>
      <p className="text-lg max-w-3xl mb-3" style={{ color: '#CBD5E1' }}>
        DiscvrAI partners with RAK Ceramics to turn the existing RISE with SAP foundation
        into an active, governed system of execution — powered by Joule and SAP Business AI.
      </p>
      <p className="text-[13px] max-w-3xl mb-10 italic" style={{ color: ACCENT_SOFT }}>
        We do not replace SAP. We make SAP act — within Clean Core, AI Units economics and your existing licensing.
      </p>
      <div className="grid grid-cols-3 gap-4 max-w-5xl">
        {[
          { icon: Database, t: 'RISE with SAP & S/4HANA', d: 'RAK\u2019s cloud ERP foundation already in motion' },
          { icon: Cpu, t: 'Joule & Business AI', d: 'ERP becomes a system of execution, not just record' },
          { icon: Shield, t: 'Clean Core + Governed Agents', d: 'No shadow AI, no parallel platforms, no rip-and-replace' }
        ].map((it, i) => (
          <Card key={i}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${ACCENT}20` }}>
              <it.icon className="w-4 h-4" style={{ color: ACCENT }} />
            </div>
            <p className="text-[14px] font-bold mb-1 text-white">{it.t}</p>
            <p className="text-[12px] leading-relaxed" style={{ color: '#94A3B8' }}>{it.d}</p>
          </Card>
        ))}
      </div>
      <p className="text-[12px] mt-10 italic" style={{ color: '#7B8CA8' }}>Prepared by DiscvrAI for executive discussion — SAP Joule & agentic roadmap alignment.</p>
    </div>
  </SlideWrapper>
);

// ---------- Slide 2 — Why native SAP AI ----------
const S2: React.FC = () => (
  <SlideWrapper num={2}>
    <Eyebrow>Strategic Frame · DiscvrAI Point of View</Eyebrow>
    <Title>Why Joule Fits RAK\u2019s &ldquo;Stay on SAP&rdquo; Constraint</Title>
    <p className="text-[13px] mb-5 max-w-4xl" style={{ color: '#CBD5E1' }}>
      RAK has already chosen SAP as the system of record. The question is no longer <i>where</i> the data lives — it is whether
      AI runs <b>inside</b> that system or alongside it. DiscvrAI\u2019s position is unambiguous: stay native, govern centrally, and only extend at the edges.
    </p>
    <div className="grid grid-cols-2 gap-6 flex-1">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#243556' }}>
            <Activity className="w-4 h-4" style={{ color: '#94A3B8' }} />
          </div>
          <p className="text-[15px] font-bold text-white">Friction Today</p>
        </div>
        <ul className="space-y-3 text-[13px] leading-relaxed" style={{ color: '#CBD5E1' }}>
          <li className="flex gap-2"><span style={{ color: ACCENT }}>—</span><span><b>&ldquo;Toggle tax&rdquo;</b> across apps to complete one business outcome (PO → GR → invoice → payment)</span></li>
          <li className="flex gap-2"><span style={{ color: ACCENT }}>—</span><span>Generic LLMs lack <b>business object semantics</b> (supplier ↔ PO ↔ kiln schedule ↔ GL)</span></li>
          <li className="flex gap-2"><span style={{ color: ACCENT }}>—</span><span>External AI stacks add <b>integration debt, latency and governance gaps</b></span></li>
          <li className="flex gap-2"><span style={{ color: ACCENT }}>—</span><span>Hidden cost of <b>parallel master data</b> in vector stores outside SAP</span></li>
        </ul>
      </Card>
      <Card highlight>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}25` }}>
            <Cpu className="w-4 h-4" style={{ color: ACCENT }} />
          </div>
          <p className="text-[15px] font-bold text-white">Joule Differentiation</p>
        </div>
        <ul className="space-y-3 text-[13px] leading-relaxed" style={{ color: '#E2E8F0' }}>
          <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} /><span>Embedded across <b>S/4HANA, Ariba, SuccessFactors, BTP</b> — one assistant, all modules</span></li>
          <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} /><span>Reasoning grounded in <b>SAP Knowledge Graph</b> — every answer ties to a real business object</span></li>
          <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} /><span>Security, roles and audit trails <b>inherit SAP\u2019s authorization model</b></span></li>
          <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} /><span>Joule Studio extends — but every agent stays on the same governed substrate</span></li>
        </ul>
      </Card>
    </div>
    <div className="mt-5 rounded-lg p-4 flex items-start gap-3" style={{ background: `${ACCENT}10`, border: `1px dashed ${ACCENT}60` }}>
      <GitBranch className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
      <p className="text-[12.5px]" style={{ color: '#E2E8F0' }}>
        <b style={{ color: ACCENT }}>DiscvrAI rule of thumb:</b> heavy custom ML / vision on hyperscalers via BTP is fine — but the <b>core decision, transaction and audit trail must remain SAP-native</b>.
      </p>
    </div>
  </SlideWrapper>
);

// ---------- Slide 3 — NEW: Platform-first philosophy (CEO concern) ----------
const S3: React.FC = () => (
  <SlideWrapper num={3}>
    <Eyebrow>DiscvrAI Operating Principle</Eyebrow>
    <Title>We Extend Your Platform — We Do Not Replace It</Title>
    <p className="text-[13px] mb-5 max-w-4xl" style={{ color: '#CBD5E1' }}>
      RAK has invested in a robust, scalable platform: <b>RISE with SAP, S/4HANA, BTP and now Joule</b>.
      DiscvrAI\u2019s explicit commitment is to <b>build on top of that investment</b> — not to introduce a parallel custom AI stack
      that creates lock-in to us. This is how we resolve the CEO\u2019s concern about &ldquo;another custom solution.&rdquo;
    </p>

    <div className="grid grid-cols-2 gap-6 mb-5">
      <div className="rounded-xl p-5" style={{ background: NAVY, border: '1px solid #3a2a2a' }}>
        <div className="flex items-center gap-2 mb-3">
          <XCircle className="w-5 h-5 text-red-400" />
          <p className="text-[14px] font-bold text-white">What we will NOT do</p>
        </div>
        <ul className="space-y-2.5 text-[12.5px] leading-relaxed" style={{ color: '#CBD5E1' }}>
          <li className="flex gap-2"><span className="text-red-400">✕</span><span>Build a parallel orchestration layer outside SAP</span></li>
          <li className="flex gap-2"><span className="text-red-400">✕</span><span>Copy SAP master data into a private vector store as a long-term dependency</span></li>
          <li className="flex gap-2"><span className="text-red-400">✕</span><span>Sell a proprietary &ldquo;DiscvrAI engine&rdquo; that needs lifetime license to keep running</span></li>
          <li className="flex gap-2"><span className="text-red-400">✕</span><span>Deliver bespoke ABAP add-ons that violate Clean Core</span></li>
          <li className="flex gap-2"><span className="text-red-400">✕</span><span>Recommend rip-and-replace where SAP standard already covers 80% of value</span></li>
        </ul>
      </div>

      <div className="rounded-xl p-5" style={{ background: `linear-gradient(180deg, ${NAVY_LIGHT}, ${NAVY})`, border: `1px solid ${ACCENT}55` }}>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-5 h-5" style={{ color: ACCENT }} />
          <p className="text-[14px] font-bold text-white">What we WILL do</p>
        </div>
        <ul className="space-y-2.5 text-[12.5px] leading-relaxed" style={{ color: '#E2E8F0' }}>
          <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: ACCENT }} /><span>Activate <b>standard Joule capabilities first</b>; measure value before custom skills</span></li>
          <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: ACCENT }} /><span>Build only on <b>BTP, Joule Studio and Build Process Automation</b> — SAP-native, portable to any SAP partner</span></li>
          <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: ACCENT }} /><span>Honour <b>Clean Core</b> — extensions live in side-by-side, not in S/4 core</span></li>
          <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: ACCENT }} /><span>Hand over <b>full IP ownership and runbooks</b> — RAK can run, change vendors, or insource</span></li>
          <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: ACCENT }} /><span>Track <b>AI Units consumption</b> jointly with SAP — no hidden meter from us</span></li>
        </ul>
      </div>
    </div>

    <div className="grid grid-cols-4 gap-3">
      {[
        { icon: Layers3, t: 'Platform-first', d: 'Joule + BTP + S/4 are the runtime' },
        { icon: Shield, t: 'Clean Core', d: 'No core ABAP modifications' },
        { icon: GitBranch, t: 'Portable IP', d: 'Any SAP partner can take over' },
        { icon: Gauge, t: 'Measured spend', d: 'AI Units transparency from day 1' },
      ].map((p, i) => (
        <div key={i} className="rounded-lg p-3 text-center" style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}30` }}>
          <p.icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: ACCENT }} />
          <p className="text-[12px] font-bold text-white">{p.t}</p>
          <p className="text-[10.5px] leading-tight mt-0.5" style={{ color: '#94A3B8' }}>{p.d}</p>
        </div>
      ))}
    </div>
  </SlideWrapper>
);

// ---------- Slide 4 — What to pitch first ----------
const S4: React.FC = () => {
  const cards = [
    { icon: Wallet, pillar: 'Finance & Working Capital', outcomes: 'Faster invoice / dispute handling, cash positioning, payment advice automation', sap: 'Joule Finance agents · cash application patterns', kpi: 'DSO ↓ · close cycle ↓' },
    { icon: ShoppingCart, pillar: 'Procurement & Spend', outcomes: 'Bid analysis, supplier visibility, PO assistance, three-way match exceptions', sap: 'Ariba + Joule, comparable to large materials spend programs', kpi: 'Cycle time ↓ · maverick spend ↓' },
    { icon: Boxes, pillar: 'Planning & Fulfillment', outcomes: 'Demand sensing, inventory balance, risk-to-promise alerts on order book', sap: 'IBP + embedded AI · &ldquo;order reliability&rdquo; monitoring', kpi: 'Forecast accuracy ↑ · OTIF ↑' },
    { icon: Wrench, pillar: 'Maintenance & Asset Productivity', outcomes: 'Work order quality, technician copilot, proactive failure signals on kilns & glaze lines', sap: 'PM data + Joule agents · utilities / asset-heavy peer pattern', kpi: 'Unplanned downtime ↓' },
  ];
  return (
    <SlideWrapper num={4}>
      <Eyebrow>Prioritized Use Cases</Eyebrow>
      <Title>Where DiscvrAI Recommends RAK Starts — Highest Confidence, Lowest Custom</Title>
      <p className="text-[13px] mb-4 max-w-4xl" style={{ color: '#CBD5E1' }}>
        Each candidate below is delivered using <b>standard SAP Joule + Business AI capabilities</b>, with DiscvrAI configuring,
        not coding. Custom skills are introduced only after the standard agent has produced measurable value.
      </p>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {cards.map((c, i) => (
          <Card key={i} className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}20` }}>
                <c.icon className="w-5 h-5" style={{ color: ACCENT }} />
              </div>
              <p className="text-[15px] font-bold text-white">{c.pillar}</p>
            </div>
            <p className="text-[12.5px] mb-3 leading-relaxed" style={{ color: '#CBD5E1' }}><b className="text-white">Outcomes:</b> {c.outcomes}</p>
            <div className="mt-auto pt-3 border-t" style={{ borderColor: '#243556' }}>
              <p className="text-[11.5px] mb-1" style={{ color: '#94A3B8' }}><b style={{ color: ACCENT }}>SAP angle:</b> {c.sap}</p>
              <p className="text-[11.5px]" style={{ color: '#94A3B8' }}><b style={{ color: ACCENT }}>KPI focus:</b> {c.kpi}</p>
            </div>
          </Card>
        ))}
      </div>
      <p className="text-[11px] mt-4 italic" style={{ color: '#7B8CA8' }}>
        Phase-2 candidates (mention verbally): custom kiln ML and computer-vision tile inspection via Digital Manufacturing or external ML, fed back into SAP — never replacing it.
      </p>
    </SlideWrapper>
  );
};

// ---------- Slide 5 — Proof points ----------
const S5: React.FC = () => {
  const peers = [
    { icon: Building2, label: 'Industrial Services', metric: 'AI case routing', stat: '1000s of hrs saved' },
    { icon: Factory, label: 'Process Manufacturing', metric: 'AP & cash automation', stat: '2-digit % faster' },
    { icon: ShoppingCart, label: 'Beverage / CPG', metric: 'Demand planning', stat: '+ mid-single % accuracy' },
    { icon: Truck, label: 'Auto Supplier', metric: 'Packaging & logistics', stat: 'Plan-cycle compression' },
    { icon: Cpu, label: 'Discrete Plant', metric: 'AI visual quality (DM)', stat: 'In-line defect catch' },
  ];
  return (
    <SlideWrapper num={5}>
      <Eyebrow>Peer Proof</Eyebrow>
      <Title>Peers Are Moving — SAP-Centric AI, Measurable KPIs</Title>
      <p className="text-[13px] mb-5 max-w-4xl" style={{ color: '#CBD5E1' }}>
        Industrial peers running RISE with SAP have already deployed Joule and Business AI in production.
        DiscvrAI tracks these reference patterns continuously so RAK does not have to discover them by trial.
      </p>
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-5 gap-3">
          {peers.map((p, i) => (
            <Card key={i} className="text-center">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ background: `${ACCENT}18` }}>
                <p.icon className="w-5 h-5" style={{ color: ACCENT }} />
              </div>
              <p className="text-[11px] uppercase tracking-wider mb-2 leading-tight" style={{ color: '#94A3B8' }}>{p.label}</p>
              <p className="text-[12.5px] font-semibold mb-2 leading-snug text-white">{p.metric}</p>
              <div className="text-[12px] font-bold py-1.5 px-2 rounded" style={{ background: `${ACCENT}18`, color: ACCENT }}>{p.stat}</div>
            </Card>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-8" style={{ color: '#7B8CA8' }}>
          <div className="h-px flex-1 max-w-[120px]" style={{ background: '#243556' }} />
          <span className="text-[10px] uppercase tracking-widest">Pattern recognition across industrial peers</span>
          <div className="h-px flex-1 max-w-[120px]" style={{ background: '#243556' }} />
        </div>
      </div>
      <div className="rounded-xl p-5 mt-2" style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}40` }}>
        <p className="text-[13px] leading-relaxed" style={{ color: '#E2E8F0' }}>
          <b className="text-white">RAK\u2019s own narrative:</b> public commitment to RISE with SAP, with explicit exploration of Joule.
          DiscvrAI\u2019s deck is the <span style={{ color: ACCENT }}>&ldquo;how&rdquo;</span> — not the <span className="italic">&ldquo;whether.&rdquo;</span>
        </p>
      </div>
    </SlideWrapper>
  );
};

// ---------- Slide 6 — 90-day path ----------
const S6: React.FC = () => {
  const phases = [
    {
      tag: 'Phase A', name: 'Foundation', weeks: 'Weeks 1–4', icon: Shield,
      points: [
        'BTP / landscape registration; security & AI governance guardrails',
        'Master data & integration hygiene for pilot scope only — no boil-the-ocean',
        'Enable Joule Base for navigation, help and low-risk queries across pilot users',
        'Joint AI Units forecast with SAP account team — agreed run-rate ceiling'
      ]
    },
    {
      tag: 'Phase B', name: 'Dual Pilots', weeks: 'Weeks 5–12', icon: Workflow,
      points: [
        'Pilot 1 — Finance / AP-cash workflow (minutes saved per case, exception reduction)',
        'Pilot 2 — Procurement or maintenance / work-order assistance',
        'KPIs: time-to-complete, first-pass quality, adoption, AI Units burn vs. forecast',
        'Weekly steerco; bi-weekly demo to RAK CIO / business owner'
      ]
    },
    {
      tag: 'Phase C', name: 'Decision Gate', weeks: 'Week 13+', icon: Rocket,
      points: [
        'Scale winners; Joule Studio for custom skills only after standard agents prove ROI',
        'Optional: Teams / M365 touchpoints via managed SAP–Copilot patterns',
        'Industrialize governance, expand to second geography / company code',
        'Hand over runbooks & training so RAK can operate independently of DiscvrAI'
      ]
    },
  ];
  return (
    <SlideWrapper num={6}>
      <Eyebrow>90-Day Path · DiscvrAI Delivery Model</Eyebrow>
      <Title>Start Small, Prove Value, Then Scale Agents</Title>
      <div className="flex-1 grid grid-cols-3 gap-4">
        {phases.map((p, i) => (
          <Card key={i} className="flex flex-col relative">
            <div className="absolute -top-2 left-5 px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest"
              style={{ background: ACCENT, color: INK }}>{p.tag}</div>
            <div className="flex items-center gap-2 mb-1 mt-2">
              <p.icon className="w-5 h-5" style={{ color: ACCENT }} />
              <p className="text-[16px] font-bold text-white">{p.name}</p>
            </div>
            <p className="text-[11px] uppercase tracking-wider mb-3" style={{ color: '#94A3B8' }}>{p.weeks}</p>
            <ul className="space-y-2.5 text-[12.5px] leading-relaxed" style={{ color: '#CBD5E1' }}>
              {p.points.map((pt, j) => (
                <li key={j} className="flex gap-2">
                  <ArrowRight className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: ACCENT }} />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-[11px]">
        {['Time-to-complete', 'First-pass quality', 'User adoption', 'AI Units burn vs. forecast'].map((k, i) => (
          <div key={i} className="rounded-lg py-2 px-3 text-center font-semibold"
            style={{ background: `${ACCENT}10`, color: ACCENT_SOFT, border: `1px solid ${ACCENT}30` }}>{k}</div>
        ))}
      </div>
    </SlideWrapper>
  );
};

// ---------- Slide 7 — Team & Ask ----------
const S7: React.FC = () => {
  const team = [
    { role: 'Executive Sponsor (CIO / COO)', resp: 'Priorities, unblock budget & vendor alignment' },
    { role: 'Program Lead / PM', resp: 'Roadmap, RAID, AI Units tracking' },
    { role: 'SAP Functional Lead (FI/CO + MM/PP/PM)', resp: 'Process truth, UAT, sign-off' },
    { role: 'BTP & Integration Engineer', resp: 'Cloud Connector / APIs, destinations, security' },
    { role: 'AI / Joule Builder (DiscvrAI)', resp: 'Joule Studio / Build skills, prompts, evaluations' },
    { role: 'Data Steward', resp: 'Pilot-scope master data quality' },
    { role: 'Change + Security (0.25 FTE)', resp: 'Communications, role design, logging review' },
  ];
  return (
    <SlideWrapper num={7}>
      <Eyebrow>Lean Core Team & The Ask</Eyebrow>
      <Title>Lean Core Team — and What DiscvrAI Needs From RAK This Quarter</Title>
      <div className="flex-1 grid grid-cols-5 gap-5">
        <Card className="col-span-3">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4" style={{ color: ACCENT }} />
            <p className="text-[13px] font-bold text-white">Starter Team (part-time acceptable)</p>
          </div>
          <div className="divide-y" style={{ borderColor: '#243556' }}>
            {team.map((t, i) => (
              <div key={i} className="grid grid-cols-5 gap-2 py-2 border-t first:border-t-0" style={{ borderColor: '#243556' }}>
                <p className="col-span-2 text-[12px] font-semibold text-white">{t.role}</p>
                <p className="col-span-3 text-[12px]" style={{ color: '#94A3B8' }}>{t.resp}</p>
              </div>
            ))}
          </div>
        </Card>
        <div className="col-span-2 rounded-xl p-5 flex flex-col" style={{ background: `linear-gradient(180deg, ${ACCENT}, ${ACCENT_DARK})`, color: INK }}>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4" style={{ color: INK }} />
            <p className="text-[13px] font-bold tracking-widest uppercase">The Ask</p>
          </div>
          <div className="space-y-3.5 flex-1">
            {[
              { icon: FileCheck, t: '1 workshop (½ day)', d: 'Confirm pilot candidates and success metrics with DiscvrAI' },
              { icon: BadgeCheck, t: 'Pilot charter signed', d: 'Two workflows, one geography or one company code' },
              { icon: Cpu, t: 'AI Units & licensing session', d: 'Joint planning with SAP account team — full transparency' },
            ].map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: `${INK}20` }}>
                  <a.icon className="w-4 h-4" style={{ color: INK }} />
                </div>
                <div>
                  <p className="text-[13px] font-bold">{a.t}</p>
                  <p className="text-[11.5px] leading-relaxed" style={{ color: `${INK}cc` }}>{a.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t" style={{ borderColor: `${INK}30` }}>
            <p className="text-[11.5px] italic font-semibold">
              Built in, not bolted on — DiscvrAI extends SAP, never replaces it.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
};

const slideRenderers = [S1, S2, S3, S4, S5, S6, S7];

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
    <div className="w-full h-screen overflow-hidden relative" style={{ background: INK }}>
      <div className="fixed top-0 left-0 right-0 z-50 flex">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className="flex-1 h-1 transition-colors duration-300"
            style={{ background: i <= current ? ACCENT : '#243556' }} />
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
          className="w-10 h-10 rounded-full backdrop-blur flex items-center justify-center disabled:opacity-30 transition-all shadow-sm"
          style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}50`, color: ACCENT }}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => go(1)} disabled={current === TOTAL - 1}
          className="w-10 h-10 rounded-full backdrop-blur flex items-center justify-center disabled:opacity-30 transition-all shadow-sm"
          style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}50`, color: ACCENT }}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default RAKSapPitch;
