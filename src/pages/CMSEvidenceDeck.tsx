import React, { useState, useEffect, useCallback } from 'react';
import {
  Shield, Users, MapPin, Workflow, AlertTriangle, TrendingDown,
  Layers, Network, Brain, Target, Calendar, BarChart3, GitBranch,
  ArrowRight, CheckCircle2, FileText, Eye, Cpu, Database, ChevronLeft, ChevronRight
} from 'lucide-react';

interface SlideProps { isActive: boolean; }

const wrap = (active: boolean) =>
  `transition-opacity duration-500 h-full ${active ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`;

const SectionHeader: React.FC<{ kicker: string; title: string; accent?: string }> = ({ kicker, title, accent = 'text-blue-600' }) => (
  <div className="mb-6">
    <p className={`text-xs uppercase tracking-widest mb-2 font-semibold ${accent}`}>{kicker}</p>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{title}</h2>
  </div>
);

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => (
  <div className={`bg-white border border-slate-200 rounded-xl p-5 shadow-sm ${className}`}>{children}</div>
);

// 1 — Title
const S1: React.FC<SlideProps> = ({ isActive }) => (
  <div className={wrap(isActive)}>
    <div className="h-full flex flex-col items-center justify-center text-center px-16 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-amber-50 rounded-3xl" />
      <div className="relative z-10 space-y-6 max-w-5xl">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
          From reactive reconciliation to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">evidence-led operations</span>
        </h1>
        <p className="text-xl text-slate-600">National cash ATM network — vault-to-machine integrity programme</p>
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-amber-50 border border-amber-300">
          <span className="text-amber-700 text-sm uppercase tracking-widest font-semibold">Indicative annual leakage band</span>
          <span className="text-3xl font-bold text-amber-700">₹40 Cr</span>
        </div>
        <p className="max-w-3xl mx-auto text-slate-600 leading-relaxed text-base">
          Beyond visible penalties, a large <span className="font-semibold text-slate-800">unaccounted manual manpower load</span> (vault ops, field ops, checkers, reconciliation, audit follow-up) is absorbed daily to stitch root cause from fragmented records — a hidden cost that reduces operating agility.
        </p>
        <p className="text-xs text-slate-400 uppercase tracking-widest">Confidential — Internal</p>
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
            <Card key={i} className="hover:border-blue-400 transition-colors">
              <it.icon className="w-6 h-6 text-blue-600 mb-3" />
              <p className="text-slate-900 font-semibold mb-1">{it.t}</p>
              <p className="text-sm text-slate-500">{it.d}</p>
            </Card>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3 px-5 py-4 rounded-xl bg-blue-50 border border-blue-200">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="text-slate-700">Output: workflows, observations and findings documented in a <span className="text-blue-700 font-semibold">~50-page working document</span>.</span>
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
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-2">0{i + 1}</div>
                  <p className="text-slate-900 font-semibold mb-2">{s.t}</p>
                  <p className="text-sm text-slate-500">{s.d}</p>
                </Card>
                {i < 3 && <ArrowRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 w-5 h-5 text-slate-300" />}
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
        <SectionHeader kicker="Problem statement" title="Root-cause fracture points" accent="text-red-600" />
        <div className="grid grid-cols-2 gap-4 flex-1 content-start">
          {fractures.map((f, i) => (
            <Card key={i} className="border-l-4 border-l-red-500">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-900 font-semibold mb-1">{f.t}</p>
                  <p className="text-sm text-slate-500">{f.d}</p>
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
  const items = [
    { t: 'Direct commercial pressure', d: 'Shortages/claims, cash-out penalties, harmonizing/T+5 delays, and excess-cash carrying penalties hit P&L' },
    { t: 'Hidden people cost', d: 'Large cross-functional manual effort across vault, route ops, HO checkers, reconciliation, audit and escalation to reconstruct one ATM-day truth' },
    { t: 'Slow root-cause closure', d: 'Teams reconcile paper, Excel, slips, app logs and machine records before ownership is clear' },
    { t: 'Low agility cost', d: 'Supervisory bandwidth shifts from prevention to post-facto firefighting; intraday decision latency increases' },
    { t: 'Unit economics stress', d: '₹10k cash-out penalty can neutralize monthly ATM contribution; excess cash simultaneously locks capital and attracts penalty/interest deltas' },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Management-safe framing" title="Business impact" accent="text-amber-600" />
        <div className="grid grid-cols-2 gap-4 flex-1 content-start">
          {items.map((it, i) => (
            <Card key={i}>
              <div className="flex gap-3">
                <TrendingDown className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-900 font-semibold mb-1">{it.t}</p>
                  <p className="text-sm text-slate-500">{it.d}</p>
                </div>
              </div>
            </Card>
          ))}
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300">
            <Eye className="w-6 h-6 text-amber-600 mb-2" />
            <p className="text-slate-900 font-semibold mb-1">Core issue</p>
            <p className="text-slate-700 text-sm">It is <span className="text-amber-700 font-semibold">not effort</span>. It is <span className="text-amber-700 font-semibold">fragmented evidence and asynchronous control.</span></p>
          </Card>
        </div>
      </div>
    </div>
  );
};

// 6 — What changes in business control
const S6: React.FC<SlideProps> = ({ isActive }) => {
  const principles = [
    { t: 'Single source of operational truth', d: 'One joined view across vault handoff, trip execution, machine counters, bank/disbursement and closures', icon: Layers },
    { t: 'No closure without evidence', d: 'Every critical exception carries auditable proof — who, what, when, amount', icon: Shield },
    { t: 'Standardized decision flow', d: 'Same rulebook for alerts, ownership, SLA clocks and escalation paths across regions', icon: GitBranch },
    { t: 'Same-day indent truth', d: 'Sanctioned vs disbursed vs revised amount recorded in-system for CMS-MSP estate (no email-only bypass)', icon: CheckCircle2 },
    { t: 'Human effort moves up the value chain', d: 'Less time on re-key/reconstruction; more time on prevention and prioritized action', icon: Brain },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Simple operating model" title="What changes in business control" />
        <div className="grid grid-cols-2 gap-4 flex-1 content-start">
          {principles.map((p, i) => (
            <Card key={i} className="hover:border-cyan-400 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shrink-0">
                  <p.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold text-lg mb-1">{p.t}</p>
                  <p className="text-sm text-slate-500">{p.d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// 7 — Operating backbone
const S7: React.FC<SlideProps> = ({ isActive }) => {
  const steps = [
    { n: '01', t: 'Capture', d: 'Vault dispatch, app activity, slips/screens, switch/machine/FLM events captured in one operational spine', icon: Database },
    { n: '02', t: 'Reconcile', d: 'System compares bank-vs-machine-vs-vault positions and flags only material mismatches', icon: GitBranch },
    { n: '03', t: 'Assign', d: 'Each mismatch gets owner, severity, due-time and escalation route — no orphan cases', icon: Target },
    { n: '04', t: 'Resolve', d: 'Checkers and ops close through guided actions with mandatory evidence — not free-text approval', icon: CheckCircle2 },
    { n: '05', t: 'Govern', d: 'Command center shows live queue health, aging risk, audit coverage and high-risk ATM watchlist', icon: BarChart3 },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Operating backbone" title="How teams will run day-to-day" />
        <div className="grid grid-cols-5 gap-3 flex-1 content-start">
          {steps.map((s, i) => (
            <Card key={i}>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{s.n}</span>
              <s.icon className="w-5 h-5 text-blue-600 mt-2 mb-2" />
              <p className="text-slate-900 font-semibold mb-1">{s.t}</p>
              <p className="text-sm text-slate-500">{s.d}</p>
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
    { t: 'AI & risk intelligence', d: 'Predicts where loss/cash-out risk is likely — action becomes proactive' },
    { t: 'Digital evidence & vault automation', d: 'Removes paper/board dependency; reliable handoff from vault to field' },
    { t: 'Preemptive overage & recovery intelligence', d: 'Catches overage and penalty-risk early, before T+5 breach' },
    { t: 'Protocol enforcement & SOP hard-coding', d: 'Hard-codes non-negotiable controls (route, custody, HOTO, manual mode)' },
    { t: 'Automated indent & replenishment', d: 'CMS-MSP indent automation; same-day revised indent truth in first rollout' },
    { t: 'Operations command center / three-way truth', d: 'Unifies triage, resolution and governance in one command center' },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Landscape → solution map" title="Six workstreams" />
        <div className="grid grid-cols-3 gap-3 mb-5">
          {ws.map((w, i) => (
            <Card key={i} className="hover:border-blue-400 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{i + 1}</span>
                <span className="text-slate-900 font-semibold">{w.t}</span>
              </div>
              <p className="text-sm text-slate-500">{w.d}</p>
            </Card>
          ))}
        </div>
        <div className="px-5 py-4 rounded-xl bg-purple-50 border border-purple-200">
          <p className="text-slate-700 leading-relaxed">
            <span className="text-purple-700 font-semibold">Audit runs in parallel</span> on the same spine, with dedicated command-center visibility for planning, execution progress and risk-triggered candidate ATMs.
          </p>
        </div>
      </div>
    </div>
  );
};

// 9 — AI streams in business terms
const S9: React.FC<SlideProps> = ({ isActive }) => {
  const groups = [
    { t: 'Risk prioritization AI', d: 'Tells management where to focus audit and ops first — highest loss probability first', icon: Brain },
    { t: 'Demand & availability AI', d: 'Predicts likely cash-out or stress sites early, including neighbour-pressure effects', icon: Network },
    { t: 'Integrity AI', d: 'Detects mismatches between what systems say and what machine/field evidence shows', icon: Shield },
    { t: 'Evidence AI', d: 'Converts slips/screens/messages into structured data — checker quality up, cycle time down', icon: Eye },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="AI in business language" title="What each stream actually does" />
        <div className="grid grid-cols-2 gap-4 mb-5">
          {groups.map((g, i) => (
            <Card key={i}>
              <g.icon className="w-7 h-7 text-cyan-600 mb-3" />
              <p className="text-slate-900 font-semibold mb-1">{g.t}</p>
              <p className="text-sm text-slate-500">{g.d}</p>
            </Card>
          ))}
        </div>
        <Card className="border-amber-300 bg-amber-50">
          <p className="text-amber-700 text-xs uppercase tracking-widest font-semibold mb-1">Governance rule</p>
          <p className="text-slate-700">AI recommends priority; <span className="font-semibold">policy-driven human workflow remains accountable</span> for final operational action.</p>
        </Card>
      </div>
    </div>
  );
};

// 10 — AI outcomes
const S10: React.FC<SlideProps> = ({ isActive }) => {
  const outcomes = [
    { t: 'Audit productivity uplift', d: 'Fewer random visits, more high-yield audits, better hit-rate, lower post-audit incidents' },
    { t: 'Penalty reduction', d: 'Earlier cash-out prediction and overage/T+5 control reduce avoidable penalty exposure' },
    { t: 'Working-capital efficiency', d: 'Better load-sizing and excess-cash visibility reduce idle cash and carrying cost' },
    { t: 'Faster dispute turnaround', d: 'Evidence packaging shortens bank/customer resolution cycles' },
    { t: 'Lower risk concentration', d: 'ATM down/OOO and jam signals trigger faster recovery — reduces loot-risk + neighbour cascades' },
    { t: 'Leadership visibility', d: 'Command center tracks prevention, resolution velocity and unresolved high-risk aging in one screen' },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Stream → outcome" title="What each AI stream delivers" />
        <div className="grid grid-cols-3 gap-4 flex-1 content-start">
          {outcomes.map((o, i) => (
            <Card key={i} className="border-l-4 border-l-cyan-500">
              <p className="text-slate-900 font-semibold mb-1">{o.t}</p>
              <p className="text-sm text-slate-500">{o.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// 11 — 6-9 month execution visibility (phased AI deployment)
const S11: React.FC<SlideProps> = ({ isActive }) => {
  const phases = [
    { p: 'M0–3', t: 'Foundation', d: 'WS2 evidence spine live (capture + OCR #6); baseline variance rules; data contracts for model-ready signals', color: 'from-blue-600 to-cyan-500' },
    { p: 'M3–4', t: 'Control activation', d: 'WS5 indent truth live for CMS-MSP in-scope flows; WS6 command-center-lite + mismatch pipeline (#4) in production for exception triage', color: 'from-indigo-600 to-purple-500' },
    { p: 'M4–6', t: 'First AI go-live', d: 'WS1 deploys DRS #1 + risk mode #2 for audit/recon prioritization; WS5 starts cash demand #3 pilot in selected clusters', color: 'from-purple-600 to-pink-500' },
    { p: 'M6–7', t: 'AI expansion', d: 'WS3 adds overage ranking #7 and stuck-cash estimation #5 in assisted mode; WS6 adds claims/triangulation assist #8 for forensic packs', color: 'from-amber-500 to-orange-500' },
    { p: 'M7–9', t: 'Scale & harden', d: 'WS1/WS5 add neighbour-stress features #9; WS5 evaluates structured intake assist #10; expand regions and tighten SLA outcomes', color: 'from-emerald-500 to-teal-500' },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="6–9 month execution visibility" title="Phased rollout with AI deployment" />
        <div className="grid grid-cols-5 gap-3 content-start">
          {phases.map((p, i) => (
            <Card key={i}>
              <div className="mb-3">
                <span className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${p.color}`}>{p.p}</span>
              </div>
              <p className="text-slate-900 font-semibold mb-1">{p.t}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{p.d}</p>
            </Card>
          ))}
        </div>
        <div className="mt-5 px-5 py-3 rounded-xl bg-blue-50 border border-blue-200">
          <p className="text-sm text-slate-700"><span className="text-blue-700 font-semibold">Commercial alignment:</span> same core squad covers first 6 months; month-6 scale review decides +1–2 engineers only if AI and control KPIs clear agreed gates.</p>
        </div>
      </div>
    </div>
  );
};

// 12 — Commercial model
const S12Commercial: React.FC<SlideProps> = ({ isActive }) => {
  const team = [
    { r: '4 × AI/ML + Full-Stack Engineers', c: '₹4.5L / mo each' },
    { r: '1 × Product Manager', c: '₹3.5L / mo' },
    { r: '1 × QA', c: '₹2.5L / mo' },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="Start lean, scale with outcomes" title="Commercial model" />
        <div className="grid grid-cols-2 gap-4 flex-1 content-start">
          <Card>
            <p className="text-xs uppercase tracking-widest text-blue-600 font-semibold mb-3">Initial 6-month squad (fixed)</p>
            <div className="space-y-2">
              {team.map((t, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-sm text-slate-800 font-medium">{t.r}</span>
                  <span className="text-xs text-slate-600 font-mono">{t.c}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="px-3 py-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-xs text-blue-700 uppercase tracking-wider font-semibold">Monthly run-rate</p>
                <p className="text-2xl font-bold text-slate-900">₹24L<span className="text-sm text-slate-500"> / mo</span></p>
              </div>
              <div className="px-3 py-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-xs text-blue-700 uppercase tracking-wider font-semibold">6-month base</p>
                <p className="text-2xl font-bold text-slate-900">₹144L<span className="text-sm text-slate-500"> total</span></p>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">Before infra / tools / taxes</p>
          </Card>
          <div className="space-y-3">
            <Card className="border-l-4 border-l-amber-500">
              <p className="text-slate-900 font-semibold mb-1">Capacity position</p>
              <p className="text-sm text-slate-500">Sufficient for pilot + controlled phase-1; not a comfortable long-run shape for full multi-workstream 6–9 month scale without augmentation.</p>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <p className="text-slate-900 font-semibold mb-1">Planned augmentation</p>
              <p className="text-sm text-slate-500">Pre-plan <span className="font-semibold text-slate-700">+2 engineers around month 4–6</span> for AI deployment hardening, integration load and multi-workstream parallelization (minimum +1 if scope stays tightly controlled).</p>
            </Card>
            <Card className="border-l-4 border-l-emerald-500">
              <p className="text-slate-900 font-semibold mb-1">Commercial principle</p>
              <p className="text-sm text-slate-500">Stage-gated scaling tied to <span className="font-semibold text-emerald-700">delivered control outcomes</span>, not upfront headcount expansion.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// 13 — Deliverables phase-1
const S13Deliverables: React.FC<SlideProps> = ({ isActive }) => {
  const deliverables = [
    { t: 'Evidence stack live', d: 'Structured capture + OCR pipelines + auditable evidence IDs in pilot flows' },
    { t: 'Indent truth live', d: 'CMS-MSP in-scope: sanctioned vs disbursed vs revised indent persisted same day (no email-only bypass)' },
    { t: 'Exception operations live', d: 'Core mismatch rules + owner / SLA / escalation queue for high-impact exceptions' },
    { t: 'Audit visibility live', d: 'Command-center panels for planning coverage, execution progress, high-risk candidate ATM alerts' },
  ];
  const aiItems = [
    { n: '#1', t: 'DRS', d: 'ATM risk ranking in audit/recon queues' },
    { n: '#2', t: 'Risk mode classification', d: 'Theft vs overage vs cash-out playbooks' },
    { n: '#3', t: 'Cash demand prediction', d: 'Pilot clusters — proactive replenishment' },
    { n: '#6', t: 'OCR intelligence', d: 'Production evidence extractor feeding alerts' },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-6">
        <SectionHeader kicker="Aligned to commercial phase-1 (first 6 months)" title="Deliverables" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            {deliverables.map((d, i) => (
              <Card key={i} className="border-l-4 border-l-blue-500 py-3">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-900 font-semibold text-sm mb-0.5">{d.t}</p>
                    <p className="text-xs text-slate-500">{d.d}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-600 font-semibold mb-2">AI workstreams live by month 6–7 (V3 catalogue)</p>
            <div className="grid grid-cols-2 gap-2">
              {aiItems.map((a, i) => (
                <Card key={i} className="py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-cyan-600">{a.n}</span>
                    <span className="text-sm text-slate-900 font-semibold">{a.t}</span>
                  </div>
                  <p className="text-xs text-slate-500">{a.d}</p>
                </Card>
              ))}
            </div>
            <div className="mt-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-300">
              <p className="text-xs text-amber-700 uppercase tracking-wider font-semibold mb-1">Resourcing gate for phase-2</p>
              <p className="text-xs text-slate-700">Move to full-scale delivery only with augmented team in place (<span className="font-semibold">+2 engineers preferred</span>), then expand AI streams and regional coverage without delivery risk concentration.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 12 — Before vs after
const S12: React.FC<SlideProps> = ({ isActive }) => {
  const rows = [
    ['Root-cause cycle', 'Multi-team manual reconstruction across paper/Excel/slips/logs', 'Guided, evidence-linked closure with clear ownership'],
    ['Operational manpower', 'Heavy hidden workload across vault/ops/checkers/recon/audit', 'Lower validation load; manpower redeployed to prevention'],
    ['Indent management', 'Intraday revisions fragmented; email/manual bypass common', 'CMS-MSP indent truth captured in-system, auditable revisions'],
    ['Risk response', 'ATM down, jams, excess-cash, neighbour stress handled late', 'Early warning + prioritized playbooks + escalation SLAs'],
    ['Governance visibility', 'Siloed reports, delayed operational truth', 'Unified command-center view: planning, execution, risk aging'],
    ['Financial control', 'Penalty-heavy, slow recovery, poor agility', 'Reduced avoidable penalties, faster recovery, tighter capital control'],
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col px-12 py-8">
        <SectionHeader kicker="When all workstreams are operational" title="Before vs after" />
        <Card className="p-0 overflow-hidden flex-1">
          <div className="grid grid-cols-[1.1fr_2fr_2fr] px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-semibold">
            <span>Dimension</span><span>Before (as-is)</span><span>After (target state)</span>
          </div>
          {rows.map(([d, b, a], i) => (
            <div key={i} className="grid grid-cols-[1.1fr_2fr_2fr] px-6 py-3 border-b border-slate-100 items-start text-sm">
              <span className="text-slate-900 font-semibold">{d}</span>
              <span className="text-slate-500">{b}</span>
              <span className="text-emerald-700">{a}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// 13 — KPI tree
const S13: React.FC<SlideProps> = ({ isActive }) => {
  const kpis = [
    { t: 'Evidence completeness', d: '% trips with complete vault-to-field digital evidence bundle' },
    { t: 'Indent truth', d: '% revised indents persisted same day vs email-only/manual' },
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
              <BarChart3 className="w-6 h-6 text-blue-600 mb-3" />
              <p className="text-slate-900 font-semibold mb-1">{k.t}</p>
              <p className="text-sm text-slate-500">{k.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// 14 — Decisions
const S14: React.FC<SlideProps> = ({ isActive }) => {
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
        <SectionHeader kicker="To unblock scale" title="Decisions required from management" accent="text-amber-600" />
        <div className="grid grid-cols-2 gap-3 flex-1 content-start">
          {items.map((it, i) => (
            <Card key={i} className="border-l-4 border-l-amber-500">
              <div className="flex gap-3">
                <Target className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-slate-700">{it}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// 15 — Ask / next step
const S15: React.FC<SlideProps> = ({ isActive }) => {
  const steps = [
    { n: '01', t: 'Approve phase-1 scope', d: 'Lock pilot region and in-scope flows' },
    { n: '02', t: 'Lock baseline month', d: 'Metric definitions agreed with finance/ops' },
    { n: '03', t: 'Nominate sponsors', d: 'Sponsor, ops owner, data owner, policy approver' },
    { n: '04', t: '30-60-90-120 cadence', d: 'Gated go/no-go decisions at each checkpoint' },
  ];
  return (
    <div className={wrap(isActive)}>
      <div className="h-full flex flex-col items-center justify-center px-12 py-8 text-center">
        <div className="space-y-8 max-w-5xl">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900">Ask & next step</h2>
          <p className="text-xl text-slate-500">Four decisions to start the programme</p>
          <div className="grid grid-cols-4 gap-4 mt-6">
            {steps.map((s, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 text-left hover:border-amber-400 transition-colors shadow-sm">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">{s.n}</span>
                <h4 className="text-slate-900 font-bold mt-3 mb-2">{s.t}</h4>
                <p className="text-sm text-slate-500">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="pt-6">
            <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-500/20">
              <span>Begin the vault-to-machine integrity programme</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15];
const TITLES = [
  'Title', 'Discovery', 'Landscape', 'Root Causes', 'Business Impact',
  'Control Model', 'Operating Backbone', 'Workstreams', 'AI Streams',
  'AI Outcomes', 'Phasing', 'Before vs After', 'KPI Tree', 'Decisions', 'Ask'
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
    <div className="h-screen w-screen bg-slate-50 flex flex-col overflow-hidden">
      <div className="h-10 bg-white border-b border-slate-200 flex items-center px-4 shrink-0 gap-1 overflow-x-auto">
        <Shield className="w-4 h-4 text-blue-600 shrink-0 mr-2" />
        {TITLES.map((title, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`shrink-0 px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
              current === i ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}>
            {String(i + 1).padStart(2, '0')}. {title}
          </button>
        ))}
      </div>
      <div className="flex-1 relative min-h-0">
        {SLIDES.map((SlideComp, i) => (<SlideComp key={i} isActive={current === i} />))}
      </div>
      <div className="h-9 bg-white border-t border-slate-200 flex items-center justify-between px-4 text-xs text-slate-400 shrink-0">
        <button onClick={() => goTo(current - 1)} disabled={current === 0} className="flex items-center gap-1 disabled:opacity-30 hover:text-slate-700">
          <ChevronLeft className="w-3.5 h-3.5" /> Prev
        </button>
        <span>{String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')} · Confidential — Internal</span>
        <button onClick={() => goTo(current + 1)} disabled={current === SLIDES.length - 1} className="flex items-center gap-1 disabled:opacity-30 hover:text-slate-700">
          Next <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default CMSEvidenceDeck;
