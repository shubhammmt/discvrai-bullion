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

// 11 — Phased execution
const S11: React.FC<SlideProps> = ({ isActive }) => {
  const phases = [
    { p: 'P1', w: '0–8 wks', t: 'Evidence contracts', d: 'OCR for pilot templates; mandatory capture on in-scope flows', color: 'from-blue-600 to-cyan-500' },
    { p: 'P2', w: '4–12 wks', t: 'Variance core + rules', d: 'First rule-set + indent automation lite (revised indent persistence)', color: 'from-purple-600 to-pink-500' },
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
                <span className="text-xs text-slate-500 px-2 py-1 rounded bg-slate-100">{p.w}</span>
              </div>
              <p className="text-slate-900 font-semibold mb-1">{p.t}</p>
              <p className="text-sm text-slate-500">{p.d}</p>
            </Card>
          ))}
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
