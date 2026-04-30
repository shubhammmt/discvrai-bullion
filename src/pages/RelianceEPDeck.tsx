import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Link2, Brain, Workflow, BarChart3, Shield, Zap, Users, ArrowRight, Target, Globe, Factory, Droplets, Cpu, Database, Activity, GitBranch, Layers, LineChart, Sigma } from 'lucide-react';

const TOTAL = 8;
const ACCENT = '#0D9488';

const slides = [
  {
    id: 1,
    type: 'title',
    headline: 'Deep tech, deep ML — engineered for digitally mature E&P operations',
    subhead: 'A co-build engineering partner for Reliance E&P: hard-core machine learning, physics-aware models, large-scale data engineering, and orchestration — built on top of your existing digital estate (SAP, PI, SCADA, engineering stack), not around it.',
    kicker: 'For digitally mature enterprises',
    microLine: 'Reliance Industries · E&P · Subsurface · Drilling · Production · HSE — engineered with your platforms, not replacing them',
  },
  {
    id: 2,
    type: 'why-now',
    title: 'You already have the platforms. The frontier is depth — physics-aware ML, large-scale optimisation, and decision automation on top.',
    bullets: [
      { label: 'Subsurface intelligence', text: 'Seismic interpretation with deep CNNs, geostatistical inversion, reservoir surrogate models (PINNs, neural operators), uncertainty quantification across realisations — beyond dashboards, into model-driven decisions.' },
      { label: 'Drilling & completions', text: 'Real-time anomaly detection on multivariate sensor streams, ROP / NPT forecasting (LSTM / Temporal Fusion Transformers), stuck-pipe and kick early warning, BHA / mud-program optimisation via Bayesian and RL methods.' },
      { label: 'Production & flow assurance', text: 'Virtual flow metering, ESP/gas-lift surrogate models, well-testing reconciliation, hydrate / wax / slugging risk scoring, MILP/OR-Tools-based production allocation and injection optimisation across networks.' },
      { label: 'Asset integrity & HSE', text: 'Corrosion / erosion remaining-life models, vibration-based rotating-equipment prognostics (survival analysis, DeepSurv), CV-based PPE / leak / flare monitoring, NLP over incident reports for systemic risk patterns.' },
    ],
  },
  {
    id: 3,
    type: 'capabilities',
    title: 'Hard-core engineering capability — what we bring to a Reliance-grade estate',
    cards: [
      { icon: Cpu, title: 'Classical & deep ML', desc: 'Time-series (N-BEATS, TFT, Prophet), gradient-boosted ensembles, Bayesian optimisation, Gaussian processes for sparse subsurface data — model choice driven by data physics, not hype.' },
      { icon: Brain, title: 'Physics-informed & scientific ML', desc: 'PINNs, neural operators (FNO/DeepONet) for reservoir & flow surrogates, hybrid first-principles + data-driven models, uncertainty quantification with reservoir & process engineers.' },
      { icon: Sigma, title: 'Optimisation & decision science', desc: 'MILP / OR-Tools for production allocation, scheduling and logistics; Reinforcement Learning for control loops; causal inference for intervention design; digital-twin-in-the-loop simulation.' },
      { icon: Activity, title: 'Anomaly, prognostics & risk', desc: 'Isolation Forests, autoencoders, change-point detection on PI / historian streams; survival models for asset RUL; multivariate early-warning across drilling, rotating equipment and facilities.' },
      { icon: Layers, title: 'Data & streaming engineering', desc: 'OPC-UA / PI / OSIsoft / SCADA / Kafka / Spark / lakehouse on ADLS / S3 — large-scale feature stores (Feast), low-latency inference, edge deployment for wellsite and platform compute.' },
      { icon: Database, title: 'GenAI grounded in your stack', desc: 'Multimodal RAG over well files, P&IDs, SOPs, regulatory standards; fine-tuning (LoRA / QLoRA), distillation, agentic graphs (LangGraph) — used where it beats classical ML, not as a default.' },
      { icon: GitBranch, title: 'MLOps & governance', desc: 'CI/CD for models, drift / bias monitoring, lineage, model cards, reproducible training, on-prem / VPC / India-region deployment — aligned to RIL security, audit and DGH/OISD obligations.' },
      { icon: Workflow, title: 'Orchestration & human-in-loop', desc: 'Workflow engine, approvals, SLAs, role-based actioning. Agents are used selectively; consequential actions always go through engineering review — built for an org that owns its risk.' },
    ],
    closing: 'Not "an AI vendor." A deep-tech engineering pod — ML scientists, data engineers, optimisation and domain specialists — working alongside Reliance teams on hard problems, with production discipline.',
  },
  {
    id: 4,
    type: 'gap',
    title: 'Your platforms are the foundation. We add the modelling depth and decision automation on top.',
    diagram: ['Reliance digital estate (SAP · PI/OSIsoft · SCADA/DCS · engineering apps · lakehouse)', 'DiscvrAI deep-tech layer (ML · optimisation · RAG · orchestration)', 'Engineering, ops & leadership decisions'],
    table: [
      { reality: 'PI / historian / SCADA streams at scale', breaks: 'Used for visualisation; little predictive or prescriptive intelligence on top', adds: 'Streaming ML — anomaly, forecasting, virtual sensors, early-warning at well / facility level' },
      { reality: 'Reservoir & subsurface models in specialist tools', breaks: 'Long simulation cycles; insights trapped on engineering desktops', adds: 'Surrogate models (PINNs / neural operators), faster what-ifs, governed RAG over well files & studies' },
      { reality: 'Production planning & injection allocation', breaks: 'Spreadsheets, heuristics, manual reconciliation across assets', adds: 'MILP / RL-based optimisation with constraints from facilities, contracts, HSE' },
      { reality: 'SAP PM, integrity, HSE & compliance', breaks: 'Reactive maintenance, manual audit prep, incident learnings lost', adds: 'Prognostics + NLP on incidents + automated DGH/OISD narratives with citations' },
    ],
  },
  {
    id: 5,
    type: 'clients',
    title: 'Where this depth has been built — industrial, asset-heavy and regulated environments',
    intro: '',
    rows: [
      { client: 'Deep Industries', domain: 'Oil & Gas (field services)', useCase: 'Field operations analytics, asset reliability ML, ESG visibility — direct upstream relevance' },
      { client: 'Bajaj Electricals', domain: 'Manufacturing', useCase: 'Demand forecasting, supply-chain optimisation, plant operations intelligence' },
      { client: 'Dalmia Tech', domain: 'Cement / Industrial', useCase: 'Process and energy optimisation, plant digital transformation' },
      { client: 'CMS Infosystems', domain: 'Cash logistics (large-scale ops)', useCase: 'Network optimisation, anomaly detection across 70k+ ATMs, route ML' },
      { client: 'CAMS', domain: 'BFSI / AMC', useCase: 'Distribution analytics, ML on investor behaviour' },
      { client: 'Bajaj Finserv', domain: 'NBFC', useCase: 'Risk and journey ML, decision automation at scale' },
      { client: 'ADF Foods', domain: 'Manufacturing / FMCG', useCase: 'Sales & margin analytics, forecasting, executive MIS' },
      { client: 'Drychem', domain: 'Specialty chemicals', useCase: 'Process and operations analytics' },
      { client: 'Aptech', domain: 'Education', useCase: 'NLP-driven counsellor, intent scoring, conversion ML' },
    ],
    footnote: 'Patterns from oil & gas (Deep Industries), heavy manufacturing, cement and large-scale logistics translate directly to E&P: high-frequency sensor data, asset criticality, regulatory load, and engineering-grade tolerance for error.',
  },
  {
    id: 6,
    type: 'patterns',
    title: 'Representative deep-tech patterns for Reliance E&P — domain × ML × optimisation',
    grid: [
      { pattern: 'Subsurface surrogate & UQ', tech: 'PINNs · Neural operators (FNO) · Bayesian inversion', demo: 'Replace slow forward simulations with surrogates for reservoir what-ifs and well placement; quantify uncertainty across realisations.' },
      { pattern: 'Drilling early-warning', tech: 'TFT / LSTM · Multivariate anomaly · Bayesian optimisation', demo: 'Stuck-pipe, kick, washout early warning on real-time mud-log + surface sensors; mud-program and BHA parameter optimisation.' },
      { pattern: 'Virtual flow metering & well allocation', tech: 'Hybrid physics + ML · Constrained MILP', demo: 'Per-well rates without continuous metering; reconciliation with test separators; allocation under facility and contract constraints.' },
      { pattern: 'Production optimisation', tech: 'Reinforcement Learning · OR-Tools · Causal inference', demo: 'Gas-lift / ESP setpoint optimisation, water/gas injection allocation across networks, intervention prioritisation with causal lift estimates.' },
      { pattern: 'Asset integrity & RUL', tech: 'Survival analysis · DeepSurv · Vibration ML', demo: 'Remaining-useful-life on rotating equipment, corrosion-loop prognostics, integrated with SAP PM for prescriptive maintenance.' },
      { pattern: 'HSE & compliance intelligence', tech: 'CV (PPE/flare/leak) · NLP over incidents · RAG', demo: 'Vision models on CCTV/drone feeds, NLP clustering of incident reports for systemic risk, auto-generated DGH/OISD narratives with citations.' },
    ],
    footnote: 'Each pattern is a co-build: Reliance brings the domain, asset and process truth; we bring the modelling, data engineering and MLOps depth.',
  },
  {
    id: 7,
    type: 'ep-extension',
    title: 'How we engage a digitally mature E&P organisation — co-build, not pilot-theatre',
    bullets: [
      { label: 'Architecture-first', text: 'Joint architecture review on integration points (SAP, PI/OSIsoft, SCADA/DCS, lakehouse, engineering apps), data residency, security and identity — before any model is trained.' },
      { label: 'Mixed engineering pods', text: 'Reliance domain experts + DiscvrAI ML scientists, data engineers, optimisation specialists and product engineers in one pod. Knowledge transfers as we build, not after.' },
      { label: 'Hard problems first', text: 'We start where conventional BI and packaged tools have hit a ceiling — physics-aware modelling, multivariate prognostics, large-scale optimisation, multimodal grounded GenAI — not generic dashboards.' },
      { label: 'Production engineering discipline', text: 'CI/CD for models, drift monitoring, lineage, reproducibility, on-prem / VPC / India-region deployment, security and observability — engineered to your CIO and CISO bar.' },
      { label: '8–12 week first build', text: 'One asset, one hard use case, KPIs fixed on day one (model performance, decision lift, cycle time, manual hours displaced, compliance coverage). Outcome-linked commercials available.' },
      { label: 'Clear exit path', text: 'You own the code, the data, the models, the pipelines. The platform is designed from day one to be run by Reliance teams independently.' },
    ],
    quote: 'A deep engineering partner for the parts of E&P where models, optimisation and data depth — not dashboards — change the outcome.',
  },
  {
    id: 8,
    type: 'team',
    title: 'Operator-led engineering — large-scale digital transformation, run by people who have done it',
    person: {
      name: 'Shubham Srivastava',
      role: 'Founder & CEO, DiscvrAI',
      cred: 'Two decades leading large-scale digital and data transformations at CXO scale — CIO (Eureka Forbes), CTO (Hindustan Times), Head of Technology (MakeMyTrip). Owned $100M+ digital programs and built engineering organisations across data, ML and platform.',
    },
    bullets: [
      'Engineering bench: ML scientists (classical + deep + scientific ML), optimisation specialists (OR / RL), data and streaming engineers, MLOps and security engineers, and domain SMEs in oil & gas, manufacturing and BFSI.',
      'Built for legacy stacks, fragmented data and compliance pressure — direct upstream experience via Deep Industries and large-scale industrial estates.',
      'Repeatable accelerators: connectors, feature stores, model routing, RAG, optimisation libraries, orchestration — production in weeks, not quarters.',
      'Positioned as a transformation enabler, not a startup pilot vendor — designed to sit alongside Reliance’s own engineering and digital teams as a co-builder.',
    ],
    cta: {
      primary: 'Pick one hard E&P problem — subsurface surrogate, drilling early-warning, virtual flow metering, production optimisation or integrity prognostics — we co-build a production-grade first version in 8–12 weeks on your data, your infrastructure and your KPIs.',
      secondary: 'Joint architecture & ML capability review with Reliance E&P digital, subsurface, drilling and production teams — integration points, data, security and target use-case shortlist before build commitments.',
    },
  },
];

const SlideWrapper: React.FC<{ children: React.ReactNode; num: number }> = ({ children, num }) => (
  <div className="w-full h-screen flex flex-col relative overflow-hidden bg-white">
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}88, ${ACCENT})` }} />
    <div className="absolute top-5 left-8 z-20 flex items-center gap-2">
      <Zap className="w-5 h-5" style={{ color: ACCENT }} />
      <span className="text-base font-bold tracking-tight text-slate-800">DiscvrAI</span>
    </div>
    <div className="flex-1 relative z-10 px-12 pt-16 pb-16 flex flex-col overflow-hidden" style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      {children}
    </div>
    <div className="absolute bottom-0 left-0 right-0 px-12 pb-3 flex justify-between items-center text-xs text-slate-400">
      <span>Confidential | DiscvrAI | April 2026</span>
      <span className="font-mono">{String(num).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}</span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}40, transparent)` }} />
  </div>
);

const TitleSlideContent: React.FC = () => {
  const s = slides[0] as any;
  return (
    <SlideWrapper num={1}>
      <div className="flex-1 flex flex-col justify-center">
        {s.kicker && <p className="text-sm font-medium mb-4" style={{ color: ACCENT }}>{s.kicker}</p>}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">{s.headline}</h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mb-8">{s.subhead}</p>
        <p className="text-sm text-slate-400">{s.microLine}</p>
      </div>
    </SlideWrapper>
  );
};

const WhyNowSlide: React.FC = () => {
  const s = slides[1] as any;
  return (
    <SlideWrapper num={2}>
      <h2 className="text-3xl font-bold text-slate-900 mb-8">{s.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
        {s.bullets.map((b: any, i: number) => {
          const icons = [Globe, Factory, Droplets, Shield];
          const Icon = icons[i];
          return (
            <div key={i} className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}18` }}>
                  <Icon className="w-5 h-5" style={{ color: ACCENT }} />
                </div>
                <span className="font-bold text-slate-900 text-lg">{b.label}</span>
              </div>
              <p className="text-slate-600 text-base leading-relaxed">{b.text}</p>
            </div>
          );
        })}
      </div>
    </SlideWrapper>
  );
};

const CapabilitiesSlide: React.FC = () => {
  const s = slides[2] as any;
  return (
    <SlideWrapper num={3}>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {s.cards.map((c: any, i: number) => {
          const Icon = c.icon;
          return (
            <div key={i} className="border border-slate-200 rounded-xl p-4 bg-white">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ background: `${ACCENT}15` }}>
                <Icon className="w-4.5 h-4.5" style={{ color: ACCENT }} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5 leading-tight">{c.title}</h3>
              <p className="text-slate-600 text-xs leading-snug">{c.desc}</p>
            </div>
          );
        })}
      </div>
      <p className="text-slate-500 text-sm italic border-t border-slate-100 pt-3">{s.closing}</p>
    </SlideWrapper>
  );
};

const GapSlide: React.FC = () => {
  const s = slides[3] as any;
  return (
    <SlideWrapper num={4}>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
      <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
        {s.diagram.map((node: string, i: number) => (
          <React.Fragment key={i}>
            <div className={`px-5 py-3 rounded-xl text-sm font-semibold text-center max-w-[280px] ${i === 1 ? 'text-white' : 'bg-slate-100 text-slate-800 border border-slate-200'}`}
              style={i === 1 ? { background: ACCENT } : {}}>
              {node}
            </div>
            {i < 2 && <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />}
          </React.Fragment>
        ))}
      </div>
      <div className="overflow-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-5 py-3 font-bold text-slate-900">Their reality</th>
              <th className="px-5 py-3 font-bold text-slate-900">What breaks</th>
              <th className="px-5 py-3 font-bold text-slate-900">What we add</th>
            </tr>
          </thead>
          <tbody>
            {s.table.map((r: any, i: number) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-5 py-3 text-slate-700">{r.reality}</td>
                <td className="px-5 py-3 text-slate-500">{r.breaks}</td>
                <td className="px-5 py-3 font-medium" style={{ color: ACCENT }}>{r.adds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SlideWrapper>
  );
};

const ClientsSlide: React.FC = () => {
  const s = slides[4] as any;
  return (
    <SlideWrapper num={5}>
      <h2 className="text-3xl font-bold text-slate-900 mb-5">{s.title}</h2>
      <div className="overflow-auto rounded-xl border border-slate-200 mb-4">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-5 py-3 font-bold text-slate-900">Client</th>
              <th className="px-5 py-3 font-bold text-slate-900">Domain</th>
              <th className="px-5 py-3 font-bold text-slate-900">Use Case</th>
            </tr>
          </thead>
          <tbody>
            {s.rows.map((r: any, i: number) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-5 py-3 font-semibold text-slate-800">{r.client}</td>
                <td className="px-5 py-3 text-slate-600">{r.domain}</td>
                <td className="px-5 py-3 text-slate-600">{r.useCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-400 italic">{s.footnote}</p>
    </SlideWrapper>
  );
};

const PatternsSlide: React.FC = () => {
  const s = slides[5] as any;
  return (
    <SlideWrapper num={6}>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{s.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
        {s.grid.map((g: any, i: number) => (
          <div key={i} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col">
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">{g.pattern}</h3>
            <span className="inline-block self-start text-[11px] font-semibold px-2 py-0.5 rounded-md mb-2" style={{ background: `${ACCENT}15`, color: ACCENT }}>{g.tech}</span>
            <p className="text-slate-600 text-xs leading-snug">{g.demo}</p>
          </div>
        ))}
      </div>
      {s.footnote && <p className="text-xs text-slate-400 italic mt-3">{s.footnote}</p>}
    </SlideWrapper>
  );
};

const EPExtensionSlide: React.FC = () => {
  const s = slides[6] as any;
  return (
    <SlideWrapper num={7}>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
      <div className="space-y-4 mb-8">
        {s.bullets.map((b: any, i: number) => (
          <div key={i} className="flex gap-4">
            <div className="w-2 h-2 rounded-full mt-2.5 shrink-0" style={{ background: ACCENT }} />
            <div>
              <span className="font-bold text-slate-900">{b.label}: </span>
              <span className="text-slate-600">{b.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-l-4 rounded-r-xl bg-slate-50 px-6 py-5" style={{ borderColor: ACCENT }}>
        <p className="text-lg font-medium text-slate-800 italic">"{s.quote}"</p>
      </div>
    </SlideWrapper>
  );
};

const TeamSlideContent: React.FC = () => {
  const s = slides[7] as any;
  return (
    <SlideWrapper num={8}>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div>
          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50 mb-5">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: `${ACCENT}18` }}>
              <Users className="w-7 h-7" style={{ color: ACCENT }} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{s.person.name}</h3>
            <p className="font-medium mb-3" style={{ color: ACCENT }}>{s.person.role}</p>
            <p className="text-sm text-slate-600 leading-relaxed">{s.person.cred}</p>
          </div>
          <ul className="space-y-2">
            {s.bullets.map((b: string, i: number) => (
              <li key={i} className="flex gap-3 text-sm text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: ACCENT }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-xl p-6 text-white flex-1" style={{ background: ACCENT }}>
            <Target className="w-6 h-6 mb-3 text-white/80" />
            <h4 className="font-bold text-lg mb-2">Next step</h4>
            <p className="text-white/90 text-sm leading-relaxed">{s.cta.primary}</p>
          </div>
          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
            <Shield className="w-5 h-5 mb-2 text-slate-400" />
            <h4 className="font-bold text-slate-900 mb-2">Architecture alignment</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{s.cta.secondary}</p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
};

const slideRenderers = [
  TitleSlideContent, WhyNowSlide, CapabilitiesSlide, GapSlide,
  ClientsSlide, PatternsSlide, EPExtensionSlide, TeamSlideContent,
];

const RelianceEPDeck: React.FC = () => {
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
    <div className="w-full h-screen overflow-hidden relative bg-white">
      <div className="fixed top-0 left-0 right-0 z-50 flex">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className="flex-1 h-1 transition-colors duration-300"
            style={{ background: i <= current ? ACCENT : '#e2e8f0' }} />
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
          className="w-10 h-10 rounded-full border border-slate-200 bg-white/90 backdrop-blur flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all shadow-sm">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => go(1)} disabled={current === TOTAL - 1}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white/90 backdrop-blur flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all shadow-sm">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default RelianceEPDeck;
