import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Maximize, Minimize, ChevronRight, Shield, Users, Leaf, FileCheck, BookOpen, TrendingUp } from 'lucide-react';

const TOTAL_SLIDES = 11;

// ─── Palette ────────────────────────────────────────────────────────
const BG = 'hsl(192,45%,10%)';       // deep teal-navy
const ACCENT = 'hsl(32,80%,42%)';    // muted gold

// ─── Shared layout ──────────────────────────────────────────────────
const SlideShell: React.FC<{ children: React.ReactNode; num: number }> = ({ children, num }) => (
  <div className="w-full h-full flex flex-col text-white relative overflow-hidden" style={{ background: BG }}>
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${ACCENT}, hsl(32,70%,55%), ${ACCENT})` }} />
    <div className="absolute inset-0 opacity-[0.025]" style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)`,
      backgroundSize: '72px 72px'
    }} />
    <div className="flex-1 relative z-10 px-16 pt-14 pb-10 flex flex-col">{children}</div>
    <div className="absolute bottom-0 left-0 right-0 px-16 pb-4 flex justify-between items-center text-[11px] tracking-wide text-white/30 z-20">
      <span>Confidential &nbsp;|&nbsp; DiscvrAI &nbsp;|&nbsp; March 2026</span>
      <span className="font-mono">{String(num).padStart(2, '0')} / {String(TOTAL_SLIDES).padStart(2, '0')}</span>
    </div>
  </div>
);

const SectionTag: React.FC<{ text: string }> = ({ text }) => (
  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: ACCENT }}>{text}</span>
);

const GoldBar = () => <div className="w-20 h-1 rounded-full" style={{ background: ACCENT }} />;

// ─── Slide 1: Cover ────────────────────────────────────────────────
const CoverSlide = () => (
  <SlideShell num={1}>
    <div className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto gap-8">
      <GoldBar />
      <h1 className="text-[2.8rem] leading-tight font-bold tracking-tight">
        DiscvrAI × ECube India
      </h1>
      <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
        Agentic AI & Digital Operations for Assurance-Grade ESG, Capacity at Scale, and Climate Finance Discipline
      </p>
      <p className="text-sm text-white/35 mt-4">Context, credentials, and clients — Slides 2–3</p>
      <p className="text-sm text-white/25 mt-2">Confidential &nbsp;|&nbsp; March 2026</p>
    </div>
  </SlideShell>
);

// ─── Slide 2: Context Setting ───────────────────────────────────────
const ContextSlide = () => (
  <SlideShell num={2}>
    <SectionTag text="Why this conversation" />
    <h2 className="text-4xl font-bold mt-4">Peer-to-peer — execution at scale, governed AI</h2>
    <p className="text-[15px] text-white/50 mt-2 max-w-4xl">Not a generic vendor pitch — shared history, complementary capabilities.</p>

    <div className="grid grid-cols-2 gap-10 mt-10 flex-1">
      {/* Left — CIO timeline */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold" style={{ color: ACCENT }}>~Two decades CIO / technology leadership</h3>
          <div className="space-y-2 mt-3">
            {[
              { co: 'Eureka Forbes', desc: 'Enterprise systems & analytics for large revenue operations' },
              { co: 'Hindustan Times', desc: 'Media, content, distribution at scale' },
              { co: 'MakeMyTrip', desc: 'Personalization, high-volume digital transactions' },
            ].map(r => (
              <div key={r.co} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                <p className="text-[14px] text-white/50"><span className="text-white/70 font-medium">{r.co}</span> — {r.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold" style={{ color: ACCENT }}>Technical depth</h3>
          <div className="space-y-2 mt-3">
            {[
              'ML and digital transformation: supply chain, logistics, personalization, customer journeys',
              'Scale: High-QPS platforms, large data estates — business outcomes and engineering reality',
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                <p className="text-[14px] text-white/50">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Callout + DiscvrAI */}
      <div className="space-y-6">
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
          <h3 className="text-base font-semibold mb-3" style={{ color: ACCENT }}>DiscvrAI today</h3>
          <p className="text-[14px] text-white/50 leading-relaxed">
            Workflow automation + AI-enabled analytics that deploy in weeks on existing stacks. Same execution DNA — building for asset-heavy, regulated-adjacent industries.
          </p>
        </div>
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
          <p className="text-[14px] text-white/60 leading-relaxed italic">
            "ECube's reputation is trust with boards and investors. We only propose human-in-the-loop, evidence-grade paths — <span className="font-semibold text-white/80">agents as associates, partners sign.</span>"
          </p>
        </div>
      </div>
    </div>
  </SlideShell>
);

// ─── Slide 3: Platform + Clients ────────────────────────────────────
const ClientsSlide = () => {
  const clients = [
    { name: 'Bajaj Electricals', domain: 'Manufacturing', use: 'Supply chain analytics, operations intelligence' },
    { name: 'CAMS', domain: 'BFSI / AMC', use: 'Distribution, investor analytics' },
    { name: 'ADF Foods', domain: 'Manufacturing', use: 'CEO sales dashboard, analytics' },
    { name: 'Bajaj Finserv', domain: 'NBFC', use: 'AI transformation, digital journeys' },
    { name: 'Helios AMC', domain: 'Asset Management', use: 'Agentic commerce, distribution' },
    { name: 'Adani Cement', domain: 'Cement / Industrial', use: 'Digital transformation, operations intelligence' },
    { name: 'Drychem', domain: 'Manufacturing', use: 'Operations, analytics' },
    { name: 'Dalmia Tech', domain: 'Cement / Industrial', use: 'Digital transformation' },
    { name: 'Deep Industries', domain: 'Oil & Gas (field services)', use: 'Operations analytics, asset reliability, ESG / emissions visibility' },
    { name: 'Aptech', domain: 'Education', use: 'AI career counsellor, enrollment' },
  ];
  return (
    <SlideShell num={3}>
      <SectionTag text="Platform & proof points" />
      <h2 className="text-3xl font-bold mt-3">DiscvrAI — No rip-and-replace</h2>
      <p className="text-[14px] text-white/50 mt-2 max-w-4xl">
        Workflow automation + AI-enabled analytics on existing tools and data. Domain lives in agents, workflows, governance — approvals, audit trail, role-based control. Deploys in weeks, not months.
      </p>

      <div className="mt-6 border border-white/10 rounded-xl overflow-hidden flex-1">
        {/* header */}
        <div className="grid grid-cols-[200px_180px_1fr] bg-white/[0.04]">
          {['Client', 'Domain', 'Use Case'].map(h => (
            <div key={h} className="px-5 py-2.5 text-[11px] uppercase tracking-widest text-white/40 font-semibold">{h}</div>
          ))}
        </div>
        {clients.map((c, i) => (
          <div key={c.name} className={`grid grid-cols-[200px_180px_1fr] ${i % 2 === 0 ? 'bg-white/[0.015]' : ''} ${i < clients.length - 1 ? 'border-b border-white/[0.05]' : ''}`}>
            <div className="px-5 py-2.5 text-[13px] text-white/70 font-medium">{c.name}</div>
            <div className="px-5 py-2.5 text-[13px] text-white/40">{c.domain}</div>
            <div className="px-5 py-2.5 text-[13px] text-white/50">{c.use}</div>
          </div>
        ))}
      </div>
      <p className="text-[12px] text-white/30 mt-3">
        Asset-heavy, regulated-adjacent industries — same muscle we bring to assurance-grade ESG for ECube.
      </p>
    </SlideShell>
  );
};

// ─── Slide 4: ECube Three Verticals ─────────────────────────────────
const VerticalsSlide = () => {
  const verticals = [
    { icon: FileCheck, title: 'ESG Stewardship & Solutions (ESS)', desc: 'Materiality, strategy, reporting support — engagements that should become continuous, not episodic.' },
    { icon: BookOpen, title: 'Capacity Building', desc: 'Board & leadership development; FICCI-aligned programmes — knowledge that should compound digitally.' },
    { icon: TrendingUp, title: 'One Planet Partners (OPP)', desc: 'Climate-positive investing; due diligence and post-investment KPI discipline — carry linked to sustainability requires unimpeachable data.' },
  ];
  return (
    <SlideShell num={4}>
      <SectionTag text="ECube at the inflection" />
      <h2 className="text-4xl font-bold mt-4">Engage and Empower for ESG</h2>
      <p className="text-lg text-white/50 mt-2">World-class analog expertise; the bottleneck is now digital scale and auditability.</p>

      <div className="grid grid-cols-3 gap-6 mt-10 flex-1">
        {verticals.map(v => {
          const Icon = v.icon;
          return (
            <div key={v.title} className="bg-white/[0.04] border border-white/10 rounded-xl p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'hsla(32,80%,42%,0.1)', border: '1px solid hsla(32,80%,42%,0.25)' }}>
                <Icon className="w-6 h-6" style={{ color: ACCENT }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'hsl(32,70%,60%)' }}>{v.title}</h3>
              <p className="text-white/45 text-[14px] leading-relaxed">{v.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Foundation bar */}
      <div className="mt-6 bg-white/[0.04] border border-white/10 rounded-xl px-8 py-4 flex items-center justify-center gap-8">
        <p className="text-[14px] text-white/50">
          ECube's next chapter: same trust and brand, with <span className="font-semibold text-white/70">evidence lineage</span> and <span className="font-semibold text-white/70">operating leverage</span> — responsibly.
        </p>
      </div>
      <div className="flex justify-center gap-6 mt-3">
        {['Data', 'Evidence', 'Governance'].map(l => (
          <span key={l} className="text-xs uppercase tracking-widest font-semibold" style={{ color: ACCENT }}>{l}</span>
        ))}
      </div>
    </SlideShell>
  );
};

// ─── Slide 5: Regulatory Tailwind ───────────────────────────────────
const RegulatorySlide = () => {
  const stages = [
    { label: 'Voluntary BRR', year: '2012' },
    { label: 'Mandatory BRSR', year: '2023' },
    { label: 'BRSR Core (assurance-ready KPIs)', year: '2024–25' },
    { label: 'Value chain / Scope 3 pressure', year: 'Expanding' },
  ];
  return (
    <SlideShell num={5}>
      <SectionTag text="Why now" />
      <h2 className="text-4xl font-bold mt-4">Assurance, Not Just Disclosure</h2>
      <p className="text-lg text-white/50 mt-2 max-w-4xl">Markets moved from narrative to metrics; BRSR Core raises the bar to verification-ready data.</p>

      {/* Evolution staircase */}
      <div className="flex items-end gap-1 mt-12 px-4">
        {stages.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center flex-1">
            <div
              className="w-full rounded-t-lg flex flex-col items-center justify-end p-4 border border-white/10"
              style={{ height: `${100 + i * 50}px`, background: `hsla(32,80%,42%,${0.05 + i * 0.05})` }}
            >
              <p className="text-[13px] font-semibold text-center" style={{ color: 'hsl(32,70%,60%)' }}>{s.label}</p>
              <p className="text-[11px] text-white/30 mt-1">{s.year}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-8">
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
          <h3 className="text-base font-semibold" style={{ color: ACCENT }}>The gap</h3>
          <p className="text-[14px] text-white/50 mt-2 leading-relaxed">Many firms still run ESG on spreadsheets and manual chase — misaligned with reasonable assurance expectations.</p>
        </div>
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
          <h3 className="text-base font-semibold" style={{ color: ACCENT }}>For ECube</h3>
          <p className="text-[14px] text-white/50 mt-2 leading-relaxed">The wedge is audit-ready evidence — help clients own the data story, not just the PDF.</p>
        </div>
      </div>
      <p className="text-[11px] text-white/25 mt-4">Frame benchmarks as industry context; pilot KPIs to be agreed with ECube.</p>
    </SlideShell>
  );
};

// ─── Slide 6: Agentic AI ────────────────────────────────────────────
const AgenticSlide = () => {
  const spectrum = [
    { stage: 'Augmentation', desc: 'Summaries, drafts — human does the heavy reconciliation', highlight: false },
    { stage: 'Automation', desc: 'Rules-based mapping (e.g. bills → emission factors)', highlight: false },
    { stage: 'Agentic (target)', desc: 'Orchestrated pipelines: ingest → validate → gap detection → draft disclosure pack with HITL approvals', highlight: true },
    { stage: 'Future', desc: 'Multi-agent coordination for supply chain and portfolio decisions under strict policies', highlight: false },
  ];
  return (
    <SlideShell num={6}>
      <SectionTag text="What we mean by Agentic AI" />
      <h2 className="text-4xl font-bold mt-4">"Silicon Associate," Not a Chatbot</h2>
      <p className="text-[15px] text-white/50 mt-2 max-w-4xl">Systems that plan multi-step tasks, connect to sources, and stop at human gates for anything that affects filings or reputation.</p>

      <div className="grid grid-cols-4 gap-4 mt-10 flex-1">
        {spectrum.map(s => (
          <div key={s.stage} className={`rounded-xl p-6 flex flex-col gap-3 border ${s.highlight ? 'bg-white/[0.06] border-amber-500/30' : 'bg-white/[0.03] border-white/10'}`}>
            <div className="flex items-center gap-2">
              {s.highlight && <Shield className="w-4 h-4" style={{ color: ACCENT }} />}
              <h3 className={`text-base font-semibold ${s.highlight ? '' : 'text-white/70'}`} style={s.highlight ? { color: 'hsl(32,70%,60%)' } : {}}>
                {s.stage}
              </h3>
            </div>
            <p className="text-[13px] text-white/45 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border-l-2 pl-5" style={{ borderColor: ACCENT }}>
        <p className="text-[14px] text-white/50">
          <span className="text-white/70 font-semibold">Human-in-the-loop</span> for anything that touches assurance, GHG math, or investor-grade claims — ECube partners sign.
        </p>
      </div>
    </SlideShell>
  );
};

// ─── Slide 7: ESS Synergy ───────────────────────────────────────────
const ESSSlide = () => {
  const flow = ['Sources (ERP, utilities, travel, suppliers)', 'Validation & normalization', 'Factor application', 'Exception queues', 'Disclosure pack', 'Assurance'];
  return (
    <SlideShell num={7}>
      <SectionTag text="Synergy 1 — ESS" />
      <h2 className="text-4xl font-bold mt-4">From Project to Always-On Performance Intelligence</h2>
      <p className="text-lg text-white/50 mt-2 max-w-4xl">Reclaim senior time from chase and rework; give clients a living evidence base.</p>

      <div className="grid grid-cols-2 gap-10 mt-10 flex-1">
        <div className="space-y-5">
          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
            <h3 className="text-base font-semibold" style={{ color: ACCENT }}>Pain</h3>
            <p className="text-[14px] text-white/50 mt-2 leading-relaxed">~60–80% of cycle often lost to document chase and reconciliation (directional; validate in pilot).</p>
          </div>
          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
            <h3 className="text-base font-semibold" style={{ color: ACCENT }}>Remedy</h3>
            <p className="text-[14px] text-white/50 mt-2 leading-relaxed">Agentic workflows: ingest from ERP, utilities, travel, suppliers; normalization; factor application; exception queues for consultants.</p>
          </div>
          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
            <h3 className="text-base font-semibold" style={{ color: ACCENT }}>Dynamic materiality</h3>
            <p className="text-[14px] text-white/50 mt-2 leading-relaxed">Continuous scanning of regulatory & sector signals — optional module; governance required.</p>
          </div>
        </div>

        {/* Flow diagram */}
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-white/30 font-semibold mb-4">Evidence pipeline</p>
          <div className="space-y-2">
            {flow.map((step, i) => (
              <React.Fragment key={step}>
                <div className="bg-white/[0.04] border border-white/10 rounded-lg px-5 py-3 text-[13px] text-white/60 font-medium">{step}</div>
                {i < flow.length - 1 && <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90" style={{ color: ACCENT, opacity: 0.5 }} /></div>}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-4 bg-white/[0.04] border border-white/10 rounded-xl p-4">
            <p className="text-[13px] text-white/50 italic">"Disclosure that links every number to source — built for assurance conversations, not just annual reporting."</p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ─── Slide 8: Capacity + OPP ────────────────────────────────────────
const CapacityOPPSlide = () => (
  <SlideShell num={8}>
    <SectionTag text="Synergy 2 & 3" />
    <h2 className="text-4xl font-bold mt-4">Scale Learning; Strengthen Climate Finance</h2>

    <div className="grid grid-cols-2 gap-8 mt-10 flex-1">
      {/* Column A */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-8 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6" style={{ color: ACCENT }} />
          <h3 className="text-xl font-semibold" style={{ color: 'hsl(32,70%,60%)' }}>Capacity Building & FICCI</h3>
        </div>
        <div className="space-y-3">
          {[
            'Move from episodic workshops to persistent mentors: procurement, HR, ops ask just-in-time questions grounded in ECube methodology.',
            '"Navigator" concept: ESG readiness for MSME / long tail — structured gaps, next steps, pathway to ECube services (lead engine, done responsibly).',
          ].map((b, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
              <p className="text-[14px] text-white/50 leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Column B */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-8 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Leaf className="w-6 h-6" style={{ color: ACCENT }} />
          <h3 className="text-xl font-semibold" style={{ color: 'hsl(32,70%,60%)' }}>One Planet Partners</h3>
        </div>
        <div className="space-y-3">
          {[
            'Agent-assisted diligence: blend operational data with climate and transition lenses for grey-to-green narratives — more throughput, same quality bar.',
            'KPI-linked carry: continuous validation of sustainability metrics — reduce manual debate and reputation risk.',
            'Optional: circular-economy & asset traceability — reverse supply chain, LCA comparison, re-certification data flows.',
          ].map((b, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
              <p className="text-[14px] text-white/50 leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="mt-6 text-center">
      <p className="text-[15px] text-white/40 italic">"Scale without diluting ECube's brand."</p>
    </div>
  </SlideShell>
);

// ─── Slide 9: Circular Economy (Optional) ───────────────────────────
const CircularSlide = () => {
  const loop = ['Take-back & collection', 'Sort & assess', 'Refurbish / re-certify', 'Back to service'];
  return (
    <SlideShell num={9}>
      <SectionTag text="Optional depth" />
      <h2 className="text-4xl font-bold mt-4">Circular Economy & Complex Asset Operations</h2>
      <p className="text-lg text-white/50 mt-2 max-w-4xl">
        Where physical assets meet traceability, LCAs, and reverse logistics — computer vision + workflow can sit above existing operations.
      </p>

      <div className="grid grid-cols-2 gap-10 mt-10 flex-1">
        <div className="space-y-5">
          {[
            { title: 'Reverse supply chain', desc: 'Disassembly, testing, re-certification — structured data and decision support at every stage.' },
            { title: 'Lifecycle intelligence', desc: 'Comparative carbon avoided when reusing vs new production (methodology owner: ECube).' },
            { title: 'Position', desc: 'Optional OPP / industry programme extension — only if depth is valuable in-session.' },
          ].map(b => (
            <div key={b.title} className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
              <h3 className="text-base font-semibold" style={{ color: ACCENT }}>{b.title}</h3>
              <p className="text-[14px] text-white/50 mt-2 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Loop diagram */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-xs uppercase tracking-widest text-white/30 font-semibold mb-6">Circular flow</p>
          <div className="relative w-72 h-72">
            {loop.map((step, i) => {
              const angle = (i * 90 - 45) * (Math.PI / 180);
              const x = 50 + 38 * Math.cos(angle);
              const y = 50 + 38 * Math.sin(angle);
              return (
                <div key={step} className="absolute bg-white/[0.06] border border-white/15 rounded-lg px-4 py-3 text-[12px] text-white/60 font-medium text-center w-36 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}>
                  {step}
                </div>
              );
            })}
            {/* center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'hsla(32,80%,42%,0.15)', border: '1px solid hsla(32,80%,42%,0.3)' }}>
              <span className="text-2xl">♻️</span>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ─── Slide 10: Pilot & Partnership ──────────────────────────────────
const PilotSlide = () => {
  const phases = [
    { num: '01', title: 'Operational readiness', desc: 'Map ESS engagement workflows; identify mundane → agent-eligible tasks; data access and retention rules.', duration: 'Weeks' },
    { num: '02', title: 'Agentic pilot', desc: '2–3 clients in sectors ECube knows well (e.g. auto ancillaries, chemicals); measure time, error rate, auditor feedback.', duration: '8–12 weeks' },
    { num: '03', title: 'Productization', desc: 'ECube-branded assistant / readiness journeys; deeper OPP analytics integration.', duration: 'Quarter' },
  ];
  const governance = ['Human approval', 'Evidence lineage', 'Private AI option', 'ESG for AI'];
  return (
    <SlideShell num={10}>
      <SectionTag text="Practical partnership" />
      <h2 className="text-4xl font-bold mt-4">Weeks to Pilot, Governed by Design</h2>
      <p className="text-lg text-white/50 mt-2">No rip-and-replace — connect to existing systems; private / controlled deployment where needed.</p>

      <div className="grid grid-cols-3 gap-5 mt-10">
        {phases.map(p => (
          <div key={p.num} className="bg-white/[0.04] border border-white/10 rounded-xl p-7 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg" style={{ background: 'hsla(32,80%,42%,0.1)', border: '1px solid hsla(32,80%,42%,0.25)', color: ACCENT }}>
                {p.num}
              </div>
              <span className="text-xs uppercase tracking-widest text-white/30 font-semibold">{p.duration}</span>
            </div>
            <h3 className="text-lg font-semibold" style={{ color: 'hsl(32,70%,60%)' }}>{p.title}</h3>
            <p className="text-[14px] text-white/45 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Governance row */}
      <div className="mt-8 flex items-center gap-4 justify-center">
        <Shield className="w-5 h-5" style={{ color: ACCENT }} />
        {governance.map((g, i) => (
          <React.Fragment key={g}>
            <span className="px-4 py-2 rounded-full border text-[13px] font-medium" style={{ borderColor: 'hsla(32,80%,42%,0.25)', color: 'hsl(32,70%,60%)', background: 'hsla(32,80%,42%,0.05)' }}>{g}</span>
            {i < governance.length - 1 && <span className="text-white/15">·</span>}
          </React.Fragment>
        ))}
      </div>
    </SlideShell>
  );
};

// ─── Slide 11: Next Step ────────────────────────────────────────────
const NextStepSlide = () => (
  <SlideShell num={11}>
    <SectionTag text="Next step" />
    <h2 className="text-4xl font-bold mt-4">Proposed Next Step</h2>
    <p className="text-lg text-white/50 mt-2 max-w-4xl">
      90–120 minute working session with ESS lead, Capacity/FICCI owner, and OPP rep — pick one flagship pilot.
    </p>

    <div className="mt-10 space-y-6 max-w-3xl">
      {[
        'Choose pilot lane: ESS evidence pipeline vs FICCI navigator MVP vs OPP diligence acceleration.',
        'Define success: e.g. hours saved per report, reconciliation defects down, time-to-evidence-package.',
        'Align on data and risk: client data boundaries, HITL checkpoints, assurance narrative ownership.',
      ].map((b, i) => (
        <div key={i} className="flex items-start gap-5">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0" style={{ background: 'hsla(32,80%,42%,0.1)', border: '1px solid hsla(32,80%,42%,0.25)', color: ACCENT }}>
            {i + 1}
          </div>
          <p className="text-lg text-white/60 leading-relaxed pt-1.5">{b}</p>
        </div>
      ))}
    </div>

    <div className="mt-10 bg-white/[0.04] border border-white/10 rounded-xl p-6 max-w-3xl">
      <p className="text-xl font-semibold text-white/70 text-center">
        "Which lane do you want as first proof — <span style={{ color: ACCENT }}>ESS</span>, <span style={{ color: ACCENT }}>Capacity/FICCI</span>, or <span style={{ color: ACCENT }}>OPP</span>?"
      </p>
    </div>

    {/* Workshop → Pilot → Measure */}
    <div className="flex items-center justify-center gap-3 mt-10">
      {['Workshop', 'Pilot', 'Measure'].map((s, i) => (
        <React.Fragment key={s}>
          <div className="px-6 py-3 rounded-lg text-[14px] font-semibold" style={{ background: 'hsla(32,80%,42%,0.1)', border: '1px solid hsla(32,80%,42%,0.25)', color: 'hsl(32,70%,60%)' }}>{s}</div>
          {i < 2 && <ChevronRight className="w-5 h-5" style={{ color: ACCENT, opacity: 0.5 }} />}
        </React.Fragment>
      ))}
    </div>
  </SlideShell>
);

// ─── Slide array ─────────────────────────────────────────────────────
const SLIDES = [CoverSlide, ContextSlide, ClientsSlide, VerticalsSlide, RegulatorySlide, AgenticSlide, ESSSlide, CapacityOPPSlide, CircularSlide, PilotSlide, NextStepSlide];

// ─── Main page ───────────────────────────────────────────────────────
const EcubePitch: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [fs, setFs] = useState(false);

  const next = useCallback(() => setIdx(i => Math.min(i + 1, TOTAL_SLIDES - 1)), []);
  const prev = useCallback(() => setIdx(i => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key === 'Escape' && fs) { e.preventDefault(); document.exitFullscreen?.(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, fs]);

  useEffect(() => {
    const onChange = () => setFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFs = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  };

  const Slide = SLIDES[idx];

  return (
    <div className="w-screen h-screen relative overflow-hidden select-none" style={{ background: BG }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: '100%', height: '100%', maxWidth: '100vw', maxHeight: '100vh', aspectRatio: '16/9' }}>
          <div className="absolute inset-0 transition-opacity duration-200">
            <Slide />
          </div>
        </div>
      </div>


      {/* Top right controls */}
      <div className="absolute top-5 right-6 flex items-center gap-3 z-30">
        <span className="text-xs font-mono text-white/30">{idx + 1} / {TOTAL_SLIDES}</span>
        <button onClick={toggleFs} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          {fs ? <Minimize className="w-4 h-4 text-white/60" /> : <Maximize className="w-4 h-4 text-white/60" />}
        </button>
      </div>
    </div>
  );
};

export default EcubePitch;
