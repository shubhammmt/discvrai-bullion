import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Brain, BarChart3, Database, Link2, Zap,
  Smartphone, MessageSquare, Headphones, Gift, AlertTriangle,
  ShieldCheck, Wrench, CheckCircle2, Clock, Sparkles, Repeat, Target,
  Rocket, Layers, Activity,
} from 'lucide-react';

const ACCENT = '#0F766E';        // teal accent
const NAVY = '#0B2545';          // deep blue
const CHARCOAL = '#1f2937';

const SlideWrapper: React.FC<{ children: React.ReactNode; num: number; total: number }> = ({ children, num, total }) => (
  <div className="w-full h-screen flex flex-col relative overflow-hidden bg-white">
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${NAVY}, ${ACCENT}, ${NAVY})` }} />
    <div className="absolute top-5 left-8 z-20 flex items-center gap-2">
      <Zap className="w-5 h-5" style={{ color: ACCENT }} />
      <span className="text-base font-bold tracking-tight text-slate-800">DiscvrAI</span>
      <span className="ml-2 text-[10px] uppercase tracking-widest text-slate-400 border border-slate-200 rounded-full px-2 py-0.5">Lite</span>
    </div>
    <div className="flex-1 relative z-10 px-12 pt-16 pb-16 flex flex-col overflow-hidden" style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
      {children}
    </div>
    <div className="absolute bottom-0 left-0 right-0 px-12 pb-3 flex justify-between items-center text-xs text-slate-400">
      <span>Confidential | DiscvrAI | April 2026</span>
      <span className="font-mono">{String(num).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}40, transparent)` }} />
  </div>
);

// ---------- SLIDE 1: Capabilities ----------
const CapabilitiesLiteSlide: React.FC<{ num: number; total: number }> = ({ num, total }) => {
  const blocks = [
    {
      icon: Database,
      title: 'One trusted data foundation',
      desc: 'Consolidate scattered systems into a single enterprise data lake — or enrich and transform an existing one — with golden records, lineage and a semantic layer. This baseline is the prerequisite that makes every AI, decisioning and integration outcome possible.',
      chips: ['Enterprise data lake', 'Consolidation & enrichment', 'Golden records', 'Lineage & quality', 'Semantic layer', 'CDC pipelines'],
    },
    {
      icon: Brain,
      title: 'Generative & agentic AI',
      desc: 'AI assistants and autonomous agents grounded in your knowledge — with citations, role-based access, guardrails and human checkpoints, so business users get reliable answers and actions, not generic chatbot replies.',
      chips: ['Multi-LLM routing', 'RAG + RBAC', 'LoRA / QLoRA', 'LangGraph agents', 'On-prem inference', 'Guardrails & evals'],
    },
    {
      icon: BarChart3,
      title: 'Decision intelligence & command centres',
      desc: 'Operator-grade dashboards and exception-first workflows that turn signals into action — predictive alerts, ask-in-plain-English, and every decision tied to a measurable business outcome.',
      chips: ['Exception-first workflows', 'NL-to-SQL', 'Predictive alerts', 'Operator dashboards', 'Signal → decision'],
    },
    {
      icon: Link2,
      title: 'MLOps & enterprise integration',
      desc: 'Reliable model lifecycle (training, serving, drift, explainability) plus battle-tested connectors into SAP, Oracle, Salesforce, core banking, MES, SCADA, Shopify and payment rails — so AI runs safely inside the systems your teams already use.',
      chips: ['MLflow / Kubeflow', 'Drift & SHAP/LIME', 'AWS · Azure · GCP', 'SAP · Oracle · Salesforce', 'MES · SCADA · historian', 'Payment rails'],
    },
  ];
  return (
    <SlideWrapper num={num} total={total}>
      <div className="mb-6">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold mb-3" style={{ color: ACCENT }}>What we bring to the table</div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">Four building blocks to turn your enterprise into an AI-ready, decision-led business</h2>
        <p className="text-slate-600 text-base md:text-lg max-w-4xl">Start with a trusted data foundation, then layer AI, decisioning and integration — engineered into the systems you already run.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
        {blocks.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }}
              className="border border-slate-200 rounded-2xl p-5 bg-white flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: ACCENT }} />
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${ACCENT}15` }}>
                  <Icon className="w-5 h-5" style={{ color: ACCENT }} />
                </div>
                <span className="ml-auto text-[11px] font-semibold tracking-wider text-slate-400">0{i + 1}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 leading-snug">{b.title}</h3>
              <p className="text-slate-600 text-[13px] leading-relaxed mb-4">{b.desc}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                {b.chips.map((chip, ci) => (
                  <span key={ci} className="text-[11px] font-medium px-2 py-1 rounded-md bg-slate-50 text-slate-700 border border-slate-200">{chip}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="text-slate-500 text-sm italic border-t border-slate-100 pt-4 mt-5">A real ML engineering bench (PhD/Masters depth) + GenAI engineers + data and platform engineers — delivered as one pod, on your stack, with full code and model ownership.</p>
    </SlideWrapper>
  );
};

// ---------- SLIDE 2: AWNIC – Orchestration ----------
const AwnicOrchestrationSlide: React.FC<{ num: number; total: number }> = ({ num, total }) => {
  const exists = [
    { icon: Smartphone, label: 'Mobile app & web portal' },
    { icon: MessageSquare, label: 'Chatbot & IVR' },
    { icon: ShieldCheck, label: 'Claims intake & workflow' },
    { icon: Headphones, label: 'Contact centre desk' },
    { icon: Gift, label: 'Loyalty & rewards programme' },
  ];
  const friction = [
    { icon: Repeat, label: 'Repeat queries across channels' },
    { icon: Clock, label: 'Delayed handoffs between teams' },
    { icon: Layers, label: 'Low context continuity per customer' },
    { icon: AlertTriangle, label: 'Avoidable churn at renewal' },
  ];
  return (
    <SlideWrapper num={num} total={total}>
      <div className="mb-5">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: ACCENT }}>AWNIC · Why orchestration matters now</div>
        <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: NAVY }}>From channel fragments to one AWNIC customer journey</h2>
      </div>
      <div className="grid grid-cols-2 gap-5 flex-1 min-h-0">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="border border-slate-200 rounded-2xl p-6 bg-white flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5" style={{ color: ACCENT }} />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700">What exists today</h3>
          </div>
          <ul className="space-y-3 flex-1">
            {exists.map((e, i) => (
              <li key={i} className="flex items-center gap-3 text-[14px] text-slate-700">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}12` }}>
                  <e.icon className="w-4 h-4" style={{ color: ACCENT }} />
                </div>
                {e.label}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="border border-slate-200 rounded-2xl p-6 bg-slate-50 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700">Friction today</h3>
          </div>
          <ul className="space-y-3 flex-1">
            {friction.map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-[14px] text-slate-700">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-amber-100 flex-shrink-0">
                  <f.icon className="w-4 h-4 text-amber-700" />
                </div>
                {f.label}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <div className="mt-5 px-5 py-3 rounded-lg border-l-4 bg-slate-50 text-sm italic text-slate-700" style={{ borderColor: ACCENT }}>
        Priority shift: service-first orchestration over adding isolated features.
      </div>
    </SlideWrapper>
  );
};

// ---------- SLIDE 3: Claims trust engine ----------
const AwnicClaimsSlide: React.FC<{ num: number; total: number }> = ({ num, total }) => {
  const milestones = [
    { label: 'FNOL', icon: AlertTriangle, status: 'done' },
    { label: 'Assessment', icon: Wrench, status: 'done' },
    { label: 'Workshop', icon: Wrench, status: 'active' },
    { label: 'Approval', icon: ShieldCheck, status: 'pending' },
    { label: 'Completion', icon: CheckCircle2, status: 'pending' },
  ];
  const workbench = [
    { icon: Clock, color: 'amber', label: 'SLA alert: claim #C-48211 nearing breach (2h left)' },
    { icon: Wrench, color: 'teal', label: 'Workshop capacity: Bani Yas at 92% — reroute suggested' },
    { icon: AlertTriangle, color: 'red', label: 'Fraud flag: photo mismatch on claim #C-48189' },
    { icon: Sparkles, color: 'navy', label: 'Auto-assign rationale: surveyor S-12 (skill match 0.91)' },
  ];
  const bullets = [
    'STP for low-value motor claims with guardrails',
    'Proactive milestone updates on every status change',
    'Next-step CTA in app to deflect inbound status calls',
  ];
  const colorMap: Record<string, string> = { amber: 'bg-amber-100 text-amber-700', teal: 'bg-teal-100 text-teal-700', red: 'bg-red-100 text-red-700', navy: 'bg-blue-100 text-blue-700' };
  return (
    <SlideWrapper num={num} total={total}>
      <div className="mb-5">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: ACCENT }}>AWNIC · Claims trust engine</div>
        <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: NAVY }}>Claims as the retention moment: fast, transparent, predictable</h2>
      </div>
      <div className="grid grid-cols-3 gap-5 flex-1 min-h-0">
        {/* Customer tracker */}
        <div className="col-span-2 border border-slate-200 rounded-2xl p-5 bg-white flex flex-col">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Customer claim tracker</div>
          <div className="flex items-center justify-between relative mb-6">
            <div className="absolute top-5 left-5 right-5 h-0.5 bg-slate-200" />
            <div className="absolute top-5 left-5 h-0.5" style={{ background: ACCENT, width: '45%' }} />
            {milestones.map((m, i) => {
              const Icon = m.icon;
              const bg = m.status === 'done' ? ACCENT : m.status === 'active' ? NAVY : '#e2e8f0';
              const text = m.status === 'pending' ? 'text-slate-400' : 'text-white';
              return (
                <div key={i} className="relative z-10 flex flex-col items-center gap-2" style={{ width: 80 }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: bg }}>
                    <Icon className={`w-4 h-4 ${text}`} />
                  </div>
                  <span className="text-[11px] font-medium text-center text-slate-700">{m.label}</span>
                </div>
              );
            })}
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 mt-2">Claims workbench (internal)</div>
          <div className="space-y-2 flex-1">
            {workbench.map((w, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className={`w-7 h-7 rounded-md flex items-center justify-center ${colorMap[w.color]}`}>
                  <w.icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[12.5px] text-slate-700">{w.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Bullets */}
        <div className="border border-slate-200 rounded-2xl p-5 flex flex-col" style={{ background: `${ACCENT}08` }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: ACCENT }}>How we make it real</div>
          <ul className="space-y-4 flex-1">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: ACCENT }}>
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </div>
                <span className="text-[13px] text-slate-700 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideWrapper>
  );
};

// ---------- SLIDE 4: Service-first growth playbook ----------
const AwnicGrowthSlide: React.FC<{ num: number; total: number }> = ({ num, total }) => {
  const flow = [
    { label: 'Service event', icon: Headphones },
    { label: 'Recovery trigger', icon: Sparkles },
    { label: 'Renewal save', icon: ShieldCheck },
    { label: 'Contextual offer', icon: Target },
  ];
  const rules = [
    'Suppress cross-sell / upsell if any open claim or complaint',
    'Enforce frequency caps and consent windows by channel',
    'Limit to 1–2 high-confidence offers per customer per cycle',
  ];
  const examples = [
    { tag: 'Cross-sell', text: 'Motor → Travel · Home · Cyber' },
    { tag: 'Upsell', text: 'Motor: coverage tier, roadside tier, add-ons' },
  ];
  return (
    <SlideWrapper num={num} total={total}>
      <div className="mb-5">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: ACCENT }}>AWNIC · Service-first growth playbook</div>
        <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: NAVY }}>Grow without spamming: recovery, renewal, contextual offers</h2>
      </div>

      {/* Flow */}
      <div className="border border-slate-200 rounded-2xl p-6 bg-white mb-5">
        <div className="flex items-center justify-between gap-3">
          {flow.map((f, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: i === 0 ? `${NAVY}12` : `${ACCENT}15` }}>
                  <f.icon className="w-6 h-6" style={{ color: i === 0 ? NAVY : ACCENT }} />
                </div>
                <span className="text-[12.5px] font-semibold text-slate-700">{f.label}</span>
              </div>
              {i < flow.length - 1 && <ChevronRight className="w-5 h-5 text-slate-300 flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 flex-1 min-h-0">
        <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4" style={{ color: ACCENT }} />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700">Suppression rules</h3>
          </div>
          <ul className="space-y-2.5 flex-1">
            {rules.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: ACCENT }} />
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-slate-200 rounded-2xl p-5 bg-white flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4" style={{ color: ACCENT }} />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700">Examples</h3>
          </div>
          <div className="space-y-3 flex-1">
            {examples.map((e, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md text-white mr-2" style={{ background: NAVY }}>{e.tag}</span>
                <span className="text-[13px] text-slate-700">{e.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
};

// ---------- SLIDE 5: Roadmap ----------
const AwnicRoadmapSlide: React.FC<{ num: number; total: number }> = ({ num, total }) => {
  const phases = [
    {
      label: '0–3 months', tag: 'Quick wins', color: ACCENT,
      items: ['Suppression guardrails live', 'Proactive notifications', 'Renewal journey refresh', 'Service ops dashboards'],
    },
    {
      label: '3–6 months', tag: 'Unify', color: NAVY,
      items: ['Customer 360 view', 'Unified case timeline', 'Claims transparency portal', 'Expanded STP'],
    },
    {
      label: '6–12 months', tag: 'Decisioning', color: '#7c3aed',
      items: ['Next-best-action engine', 'Churn & propensity models', 'Broker / corporate risk prompts', 'Closed-loop measurement'],
    },
  ];
  const kpis = ['FCR', 'Claim cycle time', 'SLA adherence', 'Renewal retention', 'Bundle attach rate'];
  return (
    <SlideWrapper num={num} total={total}>
      <div className="mb-5">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: ACCENT }}>AWNIC · 0–12 month execution roadmap</div>
        <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: NAVY }}>Execution plan: quick wins to intelligent decisioning</h2>
      </div>

      <div className="grid grid-cols-3 gap-5 flex-1 min-h-0">
        {phases.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
            className="border border-slate-200 rounded-2xl p-5 bg-white flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: p.color }} />
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-md text-white" style={{ background: p.color }}>{p.label}</span>
              <Rocket className="w-4 h-4 text-slate-300" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-3">{p.tag}</h3>
            <ul className="space-y-2 flex-1">
              {p.items.map((it, ii) => (
                <li key={ii} className="flex items-start gap-2 text-[13px] text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: p.color }} />
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 border border-slate-200 rounded-2xl p-4 bg-slate-50 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4" style={{ color: ACCENT }} />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">KPIs we track</span>
        </div>
        {kpis.map((k, i) => (
          <span key={i} className="text-[12px] font-medium px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700">{k}</span>
        ))}
      </div>

      <div className="mt-4 px-5 py-3 rounded-lg border-l-4 text-sm italic text-slate-700" style={{ borderColor: ACCENT, background: `${ACCENT}08` }}>
        Start with service trust, then scale to measurable retention and wallet-share growth.
      </div>
    </SlideWrapper>
  );
};

const slideRenderers = [CapabilitiesLiteSlide, AwnicOrchestrationSlide, AwnicClaimsSlide, AwnicGrowthSlide, AwnicRoadmapSlide];
const TOTAL = slideRenderers.length;

const EnterpriseDeckLite: React.FC = () => {
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
          className="w-full h-full">
          <Slide num={current + 1} total={TOTAL} />
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

export default EnterpriseDeckLite;
