import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Landmark, Layers, Database, Cpu, Workflow,
  Shield, Sprout, HeartPulse, Users, HardHat, Building2, GraduationCap,
  Briefcase, Scale, AlertTriangle, CheckCircle2, ArrowRight, Zap
} from 'lucide-react';

const ACCENT = '#0B3D2E';        // deep gov green
const ACCENT2 = '#1E3A8A';       // navy
const FOOTER = 'For Government of India · State Governments · Secretaries · Ministers · Senior Bureaucrats';

// ---------- DATA ----------
const slides: any[] = [
  // Slide 1 — Why now
  {
    type: 'why-now',
    eyebrow: 'GovAI · Decision & Action Layer',
    title: 'India is moving from Digital Public Infrastructure to AI-led public outcomes.',
    subhead: 'The next layer on top of India\'s DPIs is AI for decisioning, monitoring, citizen service and execution — across ministries, states and districts.',
    anchors: [
      { name: 'IndiaAI Mission', desc: 'Compute, datasets, applications, future skills, startup financing and Safe & Trusted AI.' },
      { name: 'Digital Agriculture Mission', desc: 'AgriStack, Krishi Decision Support System and soil profile mapping as agriculture DPI.' },
      { name: 'Ayushman Bharat Digital Mission', desc: 'ABHA, health facility & professional registries and consented health records.' },
      { name: 'Bhashini · Digital India', desc: 'Multilingual citizen access and India-scale digital public goods.' },
    ],
    positioning: 'DiscvrAI helps government move from data and dashboards to decisioning, action workflows and measurable public outcomes.',
  },

  // Slide 2 — The gap
  {
    type: 'gap',
    title: 'Government systems have data. Decisioning and execution remain fragmented.',
    subtitle: 'Portals and MIS exist. Action still depends on manual review, Excel follow-ups and field calls.',
    current: [
      'Scheme databases, state MIS, department portals and field apps',
      'Grievance systems, payment rails and DBT data',
      'GIS layers, document repositories and inspection records',
    ],
    broken: [
      'Data fragmented across ministries, departments, states and districts',
      'Manual review, delayed reports and post-facto audits',
      'Officers depend on calls, WhatsApp and Excel for follow-up',
      'Field action disconnected from central dashboards',
    ],
    aiSolves: [
      'Real-time exception & leakage detection across schemes',
      'Multilingual citizen query resolution and service access',
      'Document verification and eligibility automation',
      'Field-inspection intelligence and officer tasking',
      'Forecasting, risk scoring and governance dashboards',
    ],
    role: 'Not replacing government systems. Building a GovAI Decision & Action Layer on top of existing DPIs, departmental databases and workflows.',
  },

  // Slide 3 — Architecture
  {
    type: 'architecture',
    title: 'DiscvrAI GovAI Decision & Action Layer',
    subtitle: 'Five layers on top of existing government systems — engineered for scale, audit and adoption.',
    layers: [
      {
        icon: Shield,
        name: 'Layer 5 · Governance',
        items: ['Role-based access', 'Model audit & explainability', 'Consent & data privacy', 'Safe AI checks', 'Escalation logs', 'Adoption analytics'],
      },
      {
        icon: Workflow,
        name: 'Layer 4 · Action layer',
        items: ['Workflow agents', 'Approvals & escalations', 'Field tasks', 'Audit trails & evidence packs', 'Dashboards', 'Human-in-the-loop controls'],
      },
      {
        icon: Cpu,
        name: 'Layer 3 · AI decision layer',
        items: ['Citizen copilot', 'Officer copilot', 'Scheme monitoring', 'Fraud / leakage detection', 'Project delay prediction', 'SLA & beneficiary intelligence'],
      },
      {
        icon: Layers,
        name: 'Layer 2 · Unified intelligence foundation',
        items: ['Data pipelines', 'Entity resolution', 'Document AI', 'Multilingual RAG', 'Geospatial intelligence', 'Anomaly detection & forecasting'],
      },
      {
        icon: Database,
        name: 'Layer 1 · Existing government systems',
        items: ['DPI · ABDM · AgriStack', 'Scheme databases & state MIS', 'Department portals & field apps', 'Grievance portals', 'GIS layers & document repos', 'Payment & DBT systems'],
      },
    ],
    closing: 'Command centres, agentic workflows and analytics that officers and citizens use daily.',
  },

  // Slide 4 — Verticals
  {
    type: 'verticals',
    title: 'High-impact verticals where DiscvrAI can be positioned',
    subtitle: 'Eight government verticals · target ministry → AI use case → administrative & political outcome',
    rows: [
      {
        icon: Sprout,
        vertical: 'Agriculture & Farmer Services',
        pitch: 'Agriculture Ministry · State Agriculture Depts · Cooperatives',
        useCases: 'Farmer intelligence cockpit · crop-risk alerts · scheme eligibility · pest/disease advisory · crop survey exception detection · procurement intelligence',
        outcome: 'Better farmer service delivery, faster benefits, crop loss reduction, better planning',
      },
      {
        icon: HeartPulse,
        vertical: 'Health & Public Hospitals',
        pitch: 'Health Ministry · State Health Missions · Public Hospital Networks',
        useCases: 'ABDM-linked patient service cockpit · hospital ops dashboard · claims/document intelligence · disease surveillance · public health command centre',
        outcome: 'Lower waiting time, better hospital visibility, faster claims, stronger public health response',
      },
      {
        icon: Users,
        vertical: 'Social Welfare & DBT Schemes',
        pitch: 'Rural Development · Social Justice · Women & Child · State Welfare Depts',
        useCases: 'Beneficiary intelligence · duplicate/anomaly detection · document verification · grievance triage · scheme leakage command centre',
        outcome: 'Reduced leakage, faster benefit delivery, better citizen trust',
      },
      {
        icon: HardHat,
        vertical: 'Infrastructure & Public Works',
        pitch: 'MoRTH · Railways · Urban Development · PWD · Smart Cities · State infra bodies',
        useCases: 'Project delay-risk control tower · contractor/vendor risk · drawing intelligence · cost overrun alerts · field progress verification',
        outcome: 'Faster execution, lower cost overruns, visible project governance',
      },
      {
        icon: Building2,
        vertical: 'Urban Governance & Citizen Services',
        pitch: 'State IT Depts · Municipal Corporations · Smart Cities',
        useCases: 'Multilingual citizen copilot · grievance prioritisation · SLA monitoring · field-team routing · permit/document automation',
        outcome: 'Better citizen experience, faster resolution, lower manual load',
      },
      {
        icon: Briefcase,
        vertical: 'Skilling, Employment & MSME',
        pitch: 'Skill India · MSME Ministry · State Industries Depts',
        useCases: 'AI career counsellor · skill-gap intelligence · MSME service copilot · credit/document readiness · scheme matching',
        outcome: 'Job-readiness, MSME support, better scheme uptake',
      },
      {
        icon: Scale,
        vertical: 'Law, Compliance & Inspections',
        pitch: 'State Revenue · Labour · Food Safety · Pollution Control · Local Bodies',
        useCases: 'Inspection intelligence · license renewal automation · document verification · risk-based prioritisation',
        outcome: 'Ease of doing business, transparent enforcement, lower backlog',
      },
      {
        icon: GraduationCap,
        vertical: 'Education & Language Access',
        pitch: 'Education Ministry · State Education Boards · Bhashini Ecosystem',
        useCases: 'Multilingual student/teacher copilot · learning analytics · dropout-risk signals · content translation workflows',
        outcome: 'Better learning support, regional-language inclusion, improved retention',
      },
    ],
  },
];

const TOTAL = slides.length;

// ---------- LAYOUT ----------
const SlideWrapper: React.FC<{ children: React.ReactNode; num: number }> = ({ children, num }) => (
  <div className="w-full h-screen flex flex-col relative overflow-hidden bg-white">
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${ACCENT2}, ${ACCENT}, ${ACCENT2})` }} />
    <div className="absolute top-5 left-8 z-20 flex items-center gap-2">
      <Landmark className="w-5 h-5" style={{ color: ACCENT }} />
      <span className="text-base font-bold tracking-tight text-slate-800">DiscvrAI</span>
      <span className="text-[10px] font-semibold tracking-widest uppercase ml-2 px-2 py-0.5 rounded" style={{ color: ACCENT2, background: `${ACCENT2}12` }}>GovAI</span>
    </div>
    <div className="flex-1 relative z-10 px-12 pt-16 pb-14 flex flex-col overflow-hidden" style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
      {children}
    </div>
    <div className="absolute bottom-0 left-0 right-0 px-12 pb-3 flex justify-between items-center text-[11px] text-slate-400">
      <span>{FOOTER}</span>
      <span className="font-mono">{String(num).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}</span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}40, transparent)` }} />
  </div>
);

// ---------- SLIDES ----------
const WhyNowSlide: React.FC<{ s: any; num: number }> = ({ s, num }) => (
  <SlideWrapper num={num}>
    <div className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: ACCENT }}>{s.eyebrow}</div>
    <h1 className="text-[34px] md:text-[40px] font-bold text-slate-900 leading-tight mb-4 max-w-5xl">{s.title}</h1>
    <p className="text-base text-slate-600 leading-relaxed mb-6 max-w-4xl">{s.subhead}</p>
    <div className="text-[11px] font-semibold tracking-widest uppercase text-slate-500 mb-2">Policy & DPI anchors</div>
    <div className="grid grid-cols-2 gap-3 mb-5">
      {s.anchors.map((a: any, i: number) => (
        <div key={i} className="border border-slate-200 rounded-xl p-4 bg-slate-50/60">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4" style={{ color: ACCENT }} />
            <h3 className="font-bold text-slate-900 text-sm">{a.name}</h3>
          </div>
          <p className="text-slate-600 text-[12px] leading-snug">{a.desc}</p>
        </div>
      ))}
    </div>
    <div className="rounded-xl px-5 py-3 text-white" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}>
      <p className="text-sm font-medium leading-snug">{s.positioning}</p>
    </div>
  </SlideWrapper>
);

const GapSlide: React.FC<{ s: any; num: number }> = ({ s, num }) => (
  <SlideWrapper num={num}>
    <h2 className="text-[30px] font-bold text-slate-900 leading-tight mb-1">{s.title}</h2>
    <p className="text-base mb-5" style={{ color: ACCENT }}>{s.subtitle}</p>
    <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-4 h-4" style={{ color: ACCENT2 }} />
          <h3 className="font-bold text-slate-900 text-[13px]">Current reality</h3>
        </div>
        {s.current.map((t: string, i: number) => (
          <div key={i} className="flex gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: ACCENT2 }} />
            <p className="text-[12px] text-slate-700 leading-snug">{t}</p>
          </div>
        ))}
      </div>
      <div className="border border-amber-200 rounded-xl p-4 bg-amber-50/60 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          <h3 className="font-bold text-slate-900 text-[13px]">What still breaks</h3>
        </div>
        {s.broken.map((t: string, i: number) => (
          <div key={i} className="flex gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-amber-600" />
            <p className="text-[12px] text-slate-700 leading-snug">{t}</p>
          </div>
        ))}
      </div>
      <div className="border rounded-xl p-4 flex flex-col" style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}0D` }}>
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-4 h-4" style={{ color: ACCENT }} />
          <h3 className="font-bold text-slate-900 text-[13px]">What AI can solve</h3>
        </div>
        {s.aiSolves.map((t: string, i: number) => (
          <div key={i} className="flex gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: ACCENT }} />
            <p className="text-[12px] text-slate-700 leading-snug">{t}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-4 border-l-4 rounded-r-lg px-4 py-3 bg-slate-50" style={{ borderColor: ACCENT }}>
      <p className="text-sm text-slate-700"><span className="font-bold text-slate-900">DiscvrAI's role: </span>{s.role}</p>
    </div>
  </SlideWrapper>
);

const ArchitectureSlide: React.FC<{ s: any; num: number }> = ({ s, num }) => (
  <SlideWrapper num={num}>
    <h2 className="text-[28px] font-bold text-slate-900 leading-tight mb-1">{s.title}</h2>
    <p className="text-sm mb-4" style={{ color: ACCENT }}>{s.subtitle}</p>
    <div className="flex flex-col gap-2 flex-1 min-h-0">
      {s.layers.map((l: any, i: number) => {
        const Icon = l.icon;
        const isTop = i === 0;
        const isBase = i === s.layers.length - 1;
        return (
          <div key={i}
            className="rounded-xl p-3 border flex items-center gap-4"
            style={{
              borderColor: isBase ? '#cbd5e1' : `${ACCENT}30`,
              background: isTop ? `${ACCENT}10` : isBase ? '#f1f5f9' : 'white',
            }}>
            <div className="w-44 shrink-0 flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: isBase ? '#e2e8f0' : `${ACCENT}15` }}>
                <Icon className="w-4.5 h-4.5" style={{ color: isBase ? '#475569' : ACCENT }} />
              </div>
              <div className="text-[12.5px] font-bold text-slate-900 leading-tight">{l.name}</div>
            </div>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {l.items.map((it: string, j: number) => (
                <span key={j} className="text-[11px] px-2.5 py-1 rounded-md border bg-white text-slate-700"
                  style={{ borderColor: isBase ? '#cbd5e1' : `${ACCENT}25` }}>
                  {it}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
    <div className="mt-3 rounded-xl py-2.5 px-4 text-center text-white text-[12.5px] font-medium"
      style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}>
      {s.closing}
    </div>
  </SlideWrapper>
);

const VerticalsSlide: React.FC<{ s: any; num: number }> = ({ s, num }) => (
  <SlideWrapper num={num}>
    <h2 className="text-[26px] font-bold text-slate-900 leading-tight mb-1">{s.title}</h2>
    <p className="text-[13px] mb-4" style={{ color: ACCENT }}>{s.subtitle}</p>
    <div className="overflow-auto rounded-xl border border-slate-200 flex-1">
      <table className="w-full text-left">
        <thead className="sticky top-0">
          <tr className="bg-slate-50">
            <th className="px-3 py-2 font-bold text-slate-900 text-[10.5px] uppercase tracking-wider">Vertical</th>
            <th className="px-3 py-2 font-bold text-slate-900 text-[10.5px] uppercase tracking-wider">Who to pitch</th>
            <th className="px-3 py-2 font-bold text-slate-900 text-[10.5px] uppercase tracking-wider">AI use cases</th>
            <th className="px-3 py-2 font-bold text-[10.5px] uppercase tracking-wider" style={{ color: ACCENT }}>Administrative / political outcome</th>
          </tr>
        </thead>
        <tbody>
          {s.rows.map((r: any, i: number) => {
            const Icon = r.icon;
            return (
              <tr key={i} className="border-t border-slate-100 align-top hover:bg-slate-50/60">
                <td className="px-3 py-2.5 w-[18%]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: `${ACCENT}15` }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                    </div>
                    <span className="font-bold text-slate-900 text-[11.5px] leading-tight">{r.vertical}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-slate-600 text-[10.5px] leading-snug w-[20%]">{r.pitch}</td>
                <td className="px-3 py-2.5 text-slate-700 text-[10.5px] leading-snug w-[37%]">{r.useCases}</td>
                <td className="px-3 py-2.5 text-[10.5px] leading-snug font-medium w-[25%]" style={{ color: ACCENT }}>{r.outcome}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </SlideWrapper>
);

// ---------- ROUTER ----------
const renderSlide = (s: any, num: number) => {
  switch (s.type) {
    case 'why-now':      return <WhyNowSlide s={s} num={num} />;
    case 'gap':          return <GapSlide s={s} num={num} />;
    case 'architecture': return <ArchitectureSlide s={s} num={num} />;
    case 'verticals':    return <VerticalsSlide s={s} num={num} />;
    default: return <SlideWrapper num={num}><p>Unknown slide</p></SlideWrapper>;
  }
};

const GovEnterpriseDeck: React.FC = () => {
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
          {renderSlide(slides[current], current + 1)}
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

export default GovEnterpriseDeck;
