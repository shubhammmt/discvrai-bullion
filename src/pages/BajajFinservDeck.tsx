import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Printer, Mail, Phone, ArrowRight, CheckCircle2, AlertTriangle, Shield, Layers, Search, GitBranch, FileCheck } from 'lucide-react';

const TOTAL_SLIDES = 8;
const FOOTER = "Confidential — Discvr × Bajaj Finserv | For discussion";
const RIBBON = "Next session: scope, metrics, data — and commercials.";

const Slide: React.FC<{ children: React.ReactNode; ribbon?: boolean }> = ({ children, ribbon }) => (
  <div className="w-full min-h-screen flex flex-col bg-white relative" style={{ pageBreakAfter: 'always' }}>
    {ribbon && (
      <div className="w-full bg-teal-600 text-white text-center text-xs tracking-wide py-1.5 font-medium print:py-1">
        {RIBBON}
      </div>
    )}
    <div className="flex-1 px-12 md:px-20 pt-10 pb-16 print:px-16 print:pt-8 print:pb-12">
      {children}
    </div>
    <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 px-12 md:px-20 py-3 flex justify-between items-center text-[11px] text-slate-400 print:px-16 print:py-2">
      <span>{FOOTER}</span>
      <span className="font-mono">Discvr</span>
    </div>
  </div>
);

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block text-teal-600 text-xs font-semibold tracking-widest uppercase mb-3">{children}</span>
);

const H1: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4 print:text-2xl print:mb-3">{children}</h1>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-2.5 text-slate-700 text-[15px] leading-relaxed print:text-[13px]">
    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
    <span>{children}</span>
  </li>
);

const Slide1 = () => (
  <Slide ribbon>
    <div className="flex flex-col lg:flex-row gap-10 mt-6">
      <div className="flex-1">
        <SectionLabel>Discvr × Bajaj Finserv</SectionLabel>
        <H1>Three AI workstreams. One governed program.</H1>
        <p className="text-slate-600 text-lg leading-relaxed mb-6 max-w-2xl print:text-sm print:mb-4">
          Discvr response to priority themes — richer risk features · agentic model lifecycle · fraud anomaly detection — grounded in your Databricks-led ML and swap discipline.
        </p>
        <ul className="space-y-3 mb-8">
          <Bullet>Pre-read for a working session (not a final commercial offer on its own).</Bullet>
          <Bullet>Assumes mature gradient-boosting credit models and monthly champion/challenger or swap cadence; we <strong>extend</strong> with governed AI features and orchestration.</Bullet>
        </ul>
      </div>
      <div className="lg:w-80 bg-slate-50 border border-slate-200 rounded-xl p-6 print:p-4 self-start">
        <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-teal-600" />
          Goal of next meeting
        </h3>
        <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside print:text-xs">
          <li>Prioritize first vertical slice.</li>
          <li>Agree success metrics, validator pack, latency constraints.</li>
          <li>Align commercials: discovery → Phase 1 → optional run-rate.</li>
        </ol>
      </div>
    </div>
  </Slide>
);

const Slide2 = () => (
  <Slide>
    <SectionLabel>Slide 2</SectionLabel>
    <H1>Your three themes → one delivery arc</H1>
    <div className="grid md:grid-cols-2 gap-8 mt-4">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 print:p-4">
        <h3 className="text-sm font-bold text-teal-700 mb-4 uppercase tracking-wide">Themes from discussion</h3>
        <ol className="space-y-3 text-[15px] text-slate-700 list-decimal list-inside print:text-[13px]">
          <li><strong>Feature creation</strong> for risk models — LLMs / deep learning for complex patterns.</li>
          <li><strong>Agentic framework</strong> — automate model development; swap-in/out with HITL.</li>
          <li><strong>Anomaly detection</strong> — fraud / abuse.</li>
        </ol>
      </div>
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 print:p-4">
        <h3 className="text-sm font-bold text-teal-700 mb-4 uppercase tracking-wide">How we frame delivery</h3>
        <ul className="space-y-3">
          <Bullet>One program, three workstreams; shared backbone: feature contracts, evaluation harness, registry/lineage, monitoring, HITL queues.</Bullet>
          <Bullet>Avoid three disconnected PoCs that duplicate plumbing and weaken governance story.</Bullet>
        </ul>
      </div>
    </div>
    <p className="mt-6 text-xs text-slate-400 border-t border-slate-100 pt-3 print:text-[10px]">
      Hybrid stance — LLMs primarily enrich <strong>features</strong> and <strong>workflow</strong>; production ranking stays on validated learners (GBM/GLM stacks) unless leadership explicitly expands scope.
    </p>
  </Slide>
);

const Slide3 = () => (
  <Slide>
    <SectionLabel>Use Case A</SectionLabel>
    <H1>Richer features — hybrid AI, validator-grade</H1>
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 print:p-3 print:mb-4">
      <h3 className="text-sm font-bold text-amber-800 mb-1 flex items-center gap-2"><AlertTriangle size={14} /> Problem</h3>
      <p className="text-sm text-amber-900 print:text-xs">Feature throughput and novelty from unstructured + relational data; validators need interpretable drivers.</p>
    </div>
    <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Technical approach</h3>
    <ul className="space-y-2.5 mb-6">
      <Bullet><strong>Learners:</strong> XGBoost / LightGBM / CatBoost on tabular + engineered inputs.</Bullet>
      <Bullet><strong>LLMs:</strong> feature ideation; structured text extraction; optional embeddings with frozen model version + prompt hash + caching for train/serve parity.</Bullet>
      <Bullet><strong>Relational/graph:</strong> graph-derived features or GNN embeddings (e.g. shared devices, counterparties); consumed by GBM or ensemble.</Bullet>
      <Bullet><strong>Sequences:</strong> temporal/event models (Transformer or strong RNN baselines) only where behavioral history justifies complexity — benchmark vs aggregated features + GBM first.</Bullet>
      <Bullet><strong>Feature store:</strong> Feast / Databricks Feature Store / equivalent — offline/online parity, drift-ready definitions.</Bullet>
    </ul>
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 print:p-3">
      <h4 className="text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Deliverables</h4>
      <p className="text-sm text-slate-600 print:text-xs">Feature catalog · shadow challenger metrics (AUC/Gini, KS, PSI, calibration) · SHAP-aligned narrative · DPDP purpose/consent boundaries per feature class.</p>
    </div>
  </Slide>
);

const flowSteps = [
  { label: 'Data & Feature QA', sub: 'Leakage, population, consent, label windows' },
  { label: 'Train & Evaluate', sub: 'Champion vs challenger; fairness slices' },
  { label: 'Shadow Scoring', sub: 'Live inference logged; no customer action' },
  { label: 'Promote / Rollback', sub: 'Canary ramp; auto-rollback on drift' },
  { label: 'Evidence Pack', sub: 'Model card, thresholds, approvals log' },
];

const Slide4 = () => (
  <Slide>
    <SectionLabel>Use Case B</SectionLabel>
    <H1>Agentic orchestration for lifecycle & swap-in/out</H1>
    <p className="text-slate-600 text-[15px] mb-6 print:text-[13px]">
      Agents accelerate <strong>steps and documentation</strong>; humans retain <strong>promotion authority</strong> on material changes.
    </p>
    <div className="flex flex-wrap items-start gap-0 mb-8 print:mb-5">
      {flowSteps.map((s, i) => (
        <div key={i} className="flex items-start">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 w-40 print:w-36 print:p-2">
            <div className="text-xs font-bold text-teal-700 mb-1">{i + 1}</div>
            <div className="text-sm font-semibold text-slate-800 leading-snug print:text-xs">{s.label}</div>
            <div className="text-[11px] text-slate-500 mt-1 leading-tight print:text-[10px]">{s.sub}</div>
          </div>
          {i < flowSteps.length - 1 && <ArrowRight size={16} className="text-teal-400 mt-6 mx-1 shrink-0" />}
        </div>
      ))}
    </div>
    <h3 className="text-sm font-bold text-slate-800 mb-2 uppercase tracking-wide">Integration</h3>
    <ul className="space-y-2">
      <Bullet>Databricks Jobs; MLflow or equivalent registry; Git; artifact/version discipline for data cuts where policy allows.</Bullet>
      <Bullet><strong>HITL:</strong> LangGraph-style interrupts or equivalent — required stops for thresholds, new sources, sensitive features.</Bullet>
      <Bullet><strong>Audit:</strong> prompt/tool config, approvers, data snapshot references — aligned to RBI-style model risk expectations.</Bullet>
    </ul>
    <div className="mt-4 text-xs text-slate-500 print:text-[10px]">
      <strong>Success themes:</strong> faster shadow readiness · zero skipped validation gates · full promotion traceability.
    </div>
  </Slide>
);

const fraudLayers = [
  { n: 1, label: 'Rules / known typologies', desc: 'Fast, auditable baseline', icon: Shield },
  { n: 2, label: 'Supervised rankers', desc: 'Where labels exist; queue optimization', icon: Search },
  { n: 3, label: 'Unsupervised / ensemble', desc: 'Novelty detection; threshold governance critical', icon: Layers },
  { n: 4, label: 'Graph / network', desc: 'Rings, mules, instrument sharing; subgraph explanations', icon: GitBranch },
];

const Slide5 = () => (
  <Slide>
    <SectionLabel>Use Case C</SectionLabel>
    <H1>Fraud: layered detection + operations reality</H1>
    <div className="grid md:grid-cols-4 gap-4 mb-6 print:gap-3 print:mb-4">
      {fraudLayers.map(l => {
        const Icon = l.icon;
        return (
          <div key={l.n} className="bg-slate-50 border border-slate-200 rounded-lg p-4 print:p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">{l.n}</span>
              <Icon size={14} className="text-teal-600" />
            </div>
            <div className="text-sm font-semibold text-slate-800 mb-1 print:text-xs">{l.label}</div>
            <div className="text-xs text-slate-500 print:text-[10px]">{l.desc}</div>
          </div>
        );
      })}
    </div>
    <h3 className="text-sm font-bold text-slate-800 mb-2 uppercase tracking-wide">Operations</h3>
    <ul className="space-y-2 mb-4">
      <Bullet>Streaming vs batch and <strong>target latency</strong> per channel — explicit discovery output with Infosec/ops.</Bullet>
      <Bullet>Event path (e.g. Kafka-compatible) → feature materialization → score → case tooling; degrade/fail-safe behavior TBD.</Bullet>
      <Bullet>Buy vs build: optional specialist fraud stack in parallel if speed/consortium data beats pure internal build — program stays modular.</Bullet>
    </ul>
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 print:p-3">
      <h4 className="text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Metrics to agree in session</h4>
      <p className="text-sm text-slate-600 print:text-xs">Precision@k in investigations · alert volumes · false-positive burden · time-to-detect · loss-impact methodology with Finance.</p>
    </div>
  </Slide>
);

const backboneSteps = ['Sources', 'Feature Plane', 'Models', 'Registry & Monitoring', 'HITL', 'Feedback Loop'];

const Slide6 = () => (
  <Slide>
    <SectionLabel>Architecture</SectionLabel>
    <H1>One backbone across all three workstreams</H1>
    <div className="flex flex-wrap items-center gap-0 mb-8 print:mb-5">
      {backboneSteps.map((s, i) => (
        <div key={i} className="flex items-center">
          <div className="bg-slate-800 text-white rounded-lg px-4 py-3 text-sm font-medium text-center min-w-[120px] print:text-xs print:px-3 print:py-2">
            {s}
          </div>
          {i < backboneSteps.length - 1 && <ArrowRight size={16} className="text-teal-500 mx-1 shrink-0" />}
        </div>
      ))}
    </div>
    <p className="text-xs text-slate-500 mb-6 print:text-[10px]">Sources: tabular / text / events / graph → feature plane (store + modules) → models → registry & monitoring → HITL → feedback loop.</p>
    <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 print:p-4">
      <h3 className="text-sm font-bold text-teal-800 mb-3 flex items-center gap-2"><FileCheck size={14} /> Confirm in workshop</h3>
      <ul className="space-y-2">
        <Bullet>Databricks workspaces, secrets, network zones, job standards.</Bullet>
        <Bullet>Feature store choice + online serving path.</Bullet>
        <Bullet>Shadow logging schema; champion/challenger routing mechanics.</Bullet>
        <Bullet>External LLM policy (if any); PII minimization; DPDP-aligned retention.</Bullet>
      </ul>
    </div>
  </Slide>
);

const phases = [
  { phase: 'Phase 0 — Discovery', time: '~2–4 weeks', detail: 'Scope, anonymized data inventory, metric contract, validator checklist, architecture sketch, risk register → readout + draft SOW for Phase 1.' },
  { phase: 'Phase 1 — Vertical slice', time: '8–14 weeks (indicative)', detail: 'Choose ONE primary path — (a) credit: new features + shadow challenger, (b) fraud: anomaly MVP + triage UX wireframe, (c) orchestration: one gated swap with automated evidence pack. Exit: shadow running, comparison narrative, promotion playbook with named owners.' },
  { phase: 'Phase 2 — Scale', time: 'Ongoing', detail: 'More models/segments, streaming harden, deeper automation.' },
];

const Slide7 = () => (
  <Slide>
    <SectionLabel>Engagement</SectionLabel>
    <H1>Phased, provable, governable</H1>
    <div className="space-y-4 mb-6 print:space-y-3 print:mb-4">
      {phases.map((p, i) => (
        <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-5 print:p-3">
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="text-base font-bold text-slate-800 print:text-sm">{p.phase}</h3>
            <span className="text-xs text-teal-600 font-semibold">{p.time}</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed print:text-xs">{p.detail}</p>
        </div>
      ))}
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <h4 className="text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Roles</h4>
        <p className="text-sm text-slate-600 print:text-xs"><strong>Discvr:</strong> architecture, ML/feature eng, workflow, docs. <strong>Bajaj:</strong> data stewards, validation, Infosec, ops, business owner.</p>
      </div>
      <div>
        <h4 className="text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Out of scope</h4>
        <p className="text-sm text-slate-500 print:text-xs">Core banking replacement; unapproved third-party data; production go-live without validator sign-off; bypassing security review.</p>
      </div>
    </div>
    <p className="mt-4 text-xs text-slate-400 italic print:text-[10px]">Duration and fee for Phase 1 finalized post Discovery.</p>
  </Slide>
);

const Slide8 = () => (
  <Slide ribbon>
    <SectionLabel>Next Steps</SectionLabel>
    <H1>Commercial path & proposed session</H1>
    <div className="grid md:grid-cols-3 gap-6 mb-6 print:gap-4 print:mb-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 print:p-3">
        <h3 className="text-sm font-bold text-slate-800 mb-3">Commercial principles</h3>
        <ul className="space-y-2">
          <Bullet>Fixed <strong>Discovery</strong> fee → readout + SOW draft.</Bullet>
          <Bullet><strong>Phase 1</strong> via milestones or capped T&M + change control.</Bullet>
          <Bullet>Optional <strong>run-rate</strong>: monitoring/eval harness/HITL playbook — after Phase 1.</Bullet>
        </ul>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 print:p-3">
        <h3 className="text-sm font-bold text-slate-800 mb-3">Inputs needed for Phase 1 pricing</h3>
        <p className="text-sm text-slate-600 print:text-xs">Slice priority · schemas (anonymized) · labels · infra constraints · validator non-negotiables · fraud latency targets · LLM/data residency policy.</p>
      </div>
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-5 print:p-3">
        <h3 className="text-sm font-bold text-teal-800 mb-3">Proposed agenda (60–90 min)</h3>
        <ol className="space-y-1.5 text-sm text-slate-700 list-decimal list-inside print:text-xs">
          <li>First slice + explicit non-goals.</li>
          <li>Metrics & validator pack for that slice.</li>
          <li>Data access / security path + timeline.</li>
          <li><strong>Commercials</strong> — discovery, Phase 1 map, billing rhythm, PO path.</li>
          <li>Actions, owners, target SOW date.</li>
        </ol>
      </div>
    </div>
    <p className="text-slate-600 text-sm italic mb-6 print:text-xs print:mb-4">
      "Figures and calendar commit in session — this deck is intentionally pre-decision."
    </p>
    <div className="flex flex-wrap items-center gap-4">
      <a
        href="mailto:shubham@discvr.ai?subject=Bajaj%20Finserv%20%E2%80%94%20AI%20workstreams%20follow-on%20session"
        className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors print:bg-teal-600"
      >
        <Mail size={16} /> shubham@discvr.ai
      </a>
      <a href="tel:+919873961591" className="inline-flex items-center gap-2 text-slate-700 text-sm font-medium">
        <Phone size={16} className="text-teal-600" /> +91 98739 61591
      </a>
    </div>
  </Slide>
);

const allSlides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8];

const BajajFinservDeck: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    setCurrent(Math.max(0, Math.min(TOTAL_SLIDES - 1, i)));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, goTo]);

  const handlePrint = () => window.print();
  const CurrentSlide = allSlides[current];

  return (
    <>
      <div className="hidden print:block" ref={containerRef}>
        {allSlides.map((S, i) => <S key={i} />)}
      </div>

      <div className="print:hidden relative">
        <CurrentSlide />
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur border border-slate-200 shadow-lg rounded-full px-4 py-2 flex items-center gap-3 z-50">
          <button onClick={() => goTo(current - 1)} disabled={current === 0} className="p-1.5 rounded-full hover:bg-slate-100 disabled:opacity-30 transition-colors" aria-label="Previous slide">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-1.5">
            {allSlides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-teal-600' : 'bg-slate-300 hover:bg-slate-400'}`} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
          <button onClick={() => goTo(current + 1)} disabled={current === TOTAL_SLIDES - 1} className="p-1.5 rounded-full hover:bg-slate-100 disabled:opacity-30 transition-colors" aria-label="Next slide">
            <ChevronRight size={18} />
          </button>
          <div className="w-px h-5 bg-slate-200 mx-1" />
          <button onClick={handlePrint} className="p-1.5 rounded-full hover:bg-slate-100 transition-colors" aria-label="Print / Export PDF">
            <Printer size={16} />
          </button>
          <span className="text-xs text-slate-500 font-mono ml-1">{current + 1}/{TOTAL_SLIDES}</span>
        </div>
      </div>

      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          body { margin: 0 !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>
    </>
  );
};

export default BajajFinservDeck;
