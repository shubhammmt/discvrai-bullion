import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, ChevronLeft, ChevronRight, Handshake, AlertTriangle, BarChart3,
  Eye, Zap, Users, Map, ShieldCheck, Fuel, Clock, FileText, ExternalLink,
  Target, TrendingUp, Layers, Radio, Truck, CalendarCheck, Award, ArrowRight
} from 'lucide-react';

const TOTAL_SLIDES = 8;

const PitchDeckDI = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= TOTAL_SLIDES) return;
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, goTo]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] mb-6"
      style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.25)' }}>
      {children}
    </span>
  );

  const slides = [
    // ── Slide 1: Title ──
    <div key="s1" className="flex flex-col items-center justify-center h-full text-center px-8 relative">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(34,197,94,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(59,130,246,0.2) 0%, transparent 50%)',
      }} />
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}>
            <Activity className="w-6 h-6" style={{ color: '#22C55E' }} />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: '#22C55E' }}>Rig-Sight</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4 tracking-tight">
          360° Operational<br />
          <span style={{ color: '#22C55E' }}>Control Tower</span>
        </h1>
        <p className="text-lg sm:text-xl mb-2" style={{ color: '#94A3B8' }}>Digital & AI Transformation Proposal</p>
        <div className="w-16 h-0.5 mx-auto my-6" style={{ background: 'linear-gradient(90deg, transparent, #22C55E, transparent)' }} />
        <p className="text-sm font-semibold mb-1">Prepared for: <span style={{ color: '#FFFFFF' }}>Deep Industries Limited</span></p>
        <p className="text-sm" style={{ color: '#94A3B8' }}>Presented by: <span className="font-semibold" style={{ color: '#3B82F6' }}>Discvr AI Team</span></p>
      </div>
    </div>,

    // ── Slide 2: Genesis ──
    <div key="s2" className="flex flex-col justify-center h-full px-8 sm:px-16 max-w-4xl mx-auto">
      <SectionLabel>Project Context</SectionLabel>
      <h2 className="text-3xl sm:text-4xl font-black mb-8">The Genesis</h2>
      <div className="p-6 rounded-2xl mb-8" style={{ background: 'rgba(148,163,184,0.06)', border: '1px solid rgba(148,163,184,0.1)' }}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}>
            <Handshake className="w-6 h-6" style={{ color: '#3B82F6' }} />
          </div>
          <div>
            <p className="text-sm font-bold mb-1" style={{ color: '#3B82F6' }}>Strategy Meeting — March 31st, 2026</p>
            <p className="text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>
              "Following our strategy meeting with <span className="font-semibold text-white">Sunny, RK Mishra,</span> and the <span className="font-semibold text-white">Leadership Team</span> — a clear need was identified for digital transformation of rig operations."
            </p>
          </div>
        </div>
      </div>
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4" style={{ color: '#F59E0B' }} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#F59E0B' }}>Key Finding</span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>
          Current logistics and rig operations require a transition from <span className="font-semibold text-white">manual oversight</span> to <span className="font-semibold" style={{ color: '#22C55E' }}>Digital & AI Transformation</span> to stay competitive.
        </p>
      </div>
    </div>,

    // ── Slide 3: Problem ──
    <div key="s3" className="flex flex-col justify-center h-full px-8 sm:px-16 max-w-4xl mx-auto">
      <SectionLabel>The Challenge</SectionLabel>
      <h2 className="text-3xl sm:text-4xl font-black mb-8">The Cost of <span style={{ color: '#EF4444' }}>Fragmented Data</span></h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: <Layers className="w-5 h-5" />, title: 'Data Silos', desc: 'Operational data scattered across multiple manual sources.', color: '#EF4444' },
          { icon: <Eye className="w-5 h-5" />, title: 'Visibility Gap', desc: 'Difficulty understanding real-time operational status.', color: '#F59E0B' },
          { icon: <TrendingUp className="w-5 h-5" />, title: 'Operational Drag', desc: 'Lack of control leads to unpredictable OpEx and frequent "surprises."', color: '#F97316' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
            className="p-5 rounded-2xl" style={{ background: 'rgba(148,163,184,0.05)', border: `1px solid ${item.color}20` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${item.color}15` }}>
              {React.cloneElement(item.icon, { style: { color: item.color } })}
            </div>
            <p className="text-sm font-bold mb-1">{item.title}</p>
            <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
        <AlertTriangle className="w-5 h-5 shrink-0" style={{ color: '#EF4444' }} />
        <p className="text-xs" style={{ color: '#CBD5E1' }}>
          <span className="font-bold" style={{ color: '#EF4444' }}>Impact:</span> Reduced predictability, higher maintenance costs, and unauthorized asset usage.
        </p>
      </div>
    </div>,

    // ── Slide 4: Solution I — Command Center ──
    <div key="s4" className="flex flex-col justify-center h-full px-8 sm:px-16 max-w-4xl mx-auto">
      <SectionLabel>Solution — Part I</SectionLabel>
      <h2 className="text-3xl sm:text-4xl font-black mb-4">The Unified <span style={{ color: '#22C55E' }}>Command Center</span></h2>
      <p className="text-sm mb-8 leading-relaxed" style={{ color: '#94A3B8' }}>
        Consolidating every data point — <span className="text-white font-semibold">GPS, Fuel, RTO, Vendors</span> — into a single "Management by Exception" dashboard.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[
          { icon: <Clock className="w-5 h-5" />, label: 'Total visibility in', value: '< 60 seconds', color: '#22C55E' },
          { icon: <Fuel className="w-5 h-5" />, label: 'Reduction in excess fuel/OpEx', value: '10–15%', color: '#3B82F6' },
        ].map((item, i) => (
          <div key={i} className="p-5 rounded-2xl flex items-center gap-4" style={{ background: 'rgba(148,163,184,0.05)', border: `1px solid ${item.color}20` }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.color}15` }}>
              {React.cloneElement(item.icon, { style: { color: item.color } })}
            </div>
            <div>
              <p className="text-2xl font-black" style={{ color: item.color }}>{item.value}</p>
              <p className="text-xs" style={{ color: '#94A3B8' }}>{item.label}</p>
            </div>
          </div>
        ))}
      </div>
      <a href="https://lovable.dev/projects/6df3a50c-a8c2-466b-b8bb-9d4f570e47e4" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] self-start"
        style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.3)' }}>
        <BarChart3 className="w-4 h-4" /> View Live Dashboard Mockup <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>,

    // ── Slide 5: Solution II — Automation ──
    <div key="s5" className="flex flex-col justify-center h-full px-8 sm:px-16 max-w-4xl mx-auto">
      <SectionLabel>Solution — Part II</SectionLabel>
      <h2 className="text-3xl sm:text-4xl font-black mb-4">Workflow Automation & <span style={{ color: '#3B82F6' }}>Help Desk</span></h2>
      <p className="text-sm mb-8 leading-relaxed" style={{ color: '#94A3B8' }}>
        Moving from verbal/WhatsApp requests to a <span className="text-white font-semibold">structured, automated</span> ticket-raising system.
      </p>
      <div className="space-y-4 mb-8">
        {[
          { icon: <Zap className="w-5 h-5" />, title: 'Proactive Alerts', desc: 'Auto-nudges for RTO expiry and SLA breaches.', color: '#F59E0B' },
          { icon: <Radio className="w-5 h-5" />, title: 'Field Support Portal', desc: 'Real-time query/issue raising for site personnel.', color: '#22C55E' },
          { icon: <FileText className="w-5 h-5" />, title: 'DSR Automation', desc: 'Daily Status Reports and Indents moved to a "Field-to-Office" digital flow.', color: '#3B82F6' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}
            className="p-4 rounded-xl flex items-center gap-4" style={{ background: 'rgba(148,163,184,0.05)', border: `1px solid ${item.color}20` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.color}15` }}>
              {React.cloneElement(item.icon, { style: { color: item.color } })}
            </div>
            <div>
              <p className="text-sm font-bold">{item.title}</p>
              <p className="text-xs" style={{ color: '#94A3B8' }}>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <a href="/help-desk-DI" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] self-start"
        style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.3)' }}>
        <Radio className="w-4 h-4" /> View Field Portal Mockup <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>,

    // ── Slide 6: Team ──
    <div key="s6" className="flex flex-col justify-center h-full px-8 sm:px-16 max-w-4xl mx-auto">
      <SectionLabel>Collaboration</SectionLabel>
      <h2 className="text-3xl sm:text-4xl font-black mb-8">Expertise & <span style={{ color: '#3B82F6' }}>Ownership</span></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.15)' }}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.15)' }}>
              <Zap className="w-4 h-4" style={{ color: '#22C55E' }} />
            </div>
            <span className="text-sm font-bold" style={{ color: '#22C55E' }}>Discvr AI Team</span>
          </div>
          {['1 Product Manager', '2 Engineers', '1 DevOps Specialist', '1 QA / Tester'].map((r, i) => (
            <div key={i} className="flex items-center gap-2 py-2 border-b" style={{ borderColor: 'rgba(148,163,184,0.08)' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: '#22C55E' }} />
              <span className="text-sm" style={{ color: '#CBD5E1' }}>{r}</span>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.15)' }}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.15)' }}>
              <Users className="w-4 h-4" style={{ color: '#3B82F6' }} />
            </div>
            <span className="text-sm font-bold" style={{ color: '#3B82F6' }}>Deep Industries</span>
          </div>
          {[
            { role: 'Project Lead', detail: '1 Business Head — Strategic Alignment' },
            { role: 'SPOC', detail: '1 Single Point of Contact — Daily Feedback' },
          ].map((r, i) => (
            <div key={i} className="py-3 border-b" style={{ borderColor: 'rgba(148,163,184,0.08)' }}>
              <p className="text-sm font-bold mb-0.5">{r.role}</p>
              <p className="text-xs" style={{ color: '#94A3B8' }}>{r.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // ── Slide 7: Roadmap ──
    <div key="s7" className="flex flex-col justify-center h-full px-8 sm:px-16 max-w-4xl mx-auto">
      <SectionLabel>Execution Plan</SectionLabel>
      <h2 className="text-3xl sm:text-4xl font-black mb-8">The Path to <span style={{ color: '#22C55E' }}>Go-Live</span></h2>
      <div className="space-y-4">
        {[
          { stage: '01', title: 'Input Gathering', desc: 'Deep-dive learnings from site meetings.', color: '#3B82F6', icon: <Handshake className="w-5 h-5" /> },
          { stage: '02', title: 'Specification & UI', desc: 'Detailed documentation and approved mockups.', color: '#8B5CF6', icon: <FileText className="w-5 h-5" /> },
          { stage: '03', title: 'Development', desc: 'Iterative coding with bi-weekly internal approvals.', color: '#F59E0B', icon: <Zap className="w-5 h-5" /> },
          { stage: '04', title: 'Promoter Review', desc: 'Status check with the Promoter every 2 weeks for strategic steering.', color: '#22C55E', icon: <ShieldCheck className="w-5 h-5" /> },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}
            className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'rgba(148,163,184,0.04)', border: `1px solid ${item.color}20` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.color}15` }}>
              {React.cloneElement(item.icon, { style: { color: item.color } })}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: item.color }}>Stage {item.stage}</span>
              </div>
              <p className="text-sm font-bold">{item.title}</p>
              <p className="text-xs" style={{ color: '#94A3B8' }}>{item.desc}</p>
            </div>
            {i < 3 && <ArrowRight className="w-4 h-4 shrink-0 hidden sm:block" style={{ color: 'rgba(148,163,184,0.3)' }} />}
          </motion.div>
        ))}
      </div>
    </div>,

    // ── Slide 8: ROI / Promise ──
    <div key="s8" className="flex flex-col items-center justify-center h-full text-center px-8 relative">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(34,197,94,0.4) 0%, transparent 50%)',
      }} />
      <div className="relative z-10 max-w-2xl">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}>
          <Award className="w-8 h-8" style={{ color: '#22C55E' }} />
        </div>
        <SectionLabel>The Promise</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-black mb-4">Systematic Guard for<br />Your <span style={{ color: '#22C55E' }}>Operations</span></h2>
        <p className="text-base leading-relaxed mb-6" style={{ color: '#CBD5E1' }}>
          "We don't just show data; we <span className="font-semibold text-white">protect your budget</span>, ensure <span className="font-semibold text-white">legal safety</span>, and maximize <span className="font-semibold" style={{ color: '#22C55E' }}>Rig Uptime</span>."
        </p>
        <div className="w-16 h-0.5 mx-auto my-6" style={{ background: 'linear-gradient(90deg, transparent, #22C55E, transparent)' }} />
        <p className="text-sm font-bold mb-6" style={{ color: '#F59E0B' }}>
          "Let's transform 'Messy Data' into a Competitive Advantage."
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#94A3B8' }}>
          <Activity className="w-3.5 h-3.5" style={{ color: '#3B82F6' }} />
          Contact: <span className="font-semibold text-white">Discvr AI Team</span>
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col" style={{ background: '#0B0F19', color: '#FFFFFF' }}>
      {/* Main slide area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            {slides[current]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation bar */}
      <div className="shrink-0 border-t px-4 py-3 flex items-center justify-between" style={{ background: 'rgba(11,15,25,0.95)', borderColor: 'rgba(148,163,184,0.1)' }}>
        <button onClick={() => goTo(current - 1)} disabled={current === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-95 disabled:opacity-30"
          style={{ background: 'rgba(148,163,184,0.08)', color: '#94A3B8' }}>
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold" style={{ color: '#94A3B8' }}>{current + 1} / {TOTAL_SLIDES}</span>
          <div className="flex gap-1">
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{ background: i === current ? '#22C55E' : 'rgba(148,163,184,0.2)', transform: i === current ? 'scale(1.3)' : 'scale(1)' }}
              />
            ))}
          </div>
        </div>

        <button onClick={() => goTo(current + 1)} disabled={current === TOTAL_SLIDES - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-95 disabled:opacity-30"
          style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E' }}>
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="shrink-0 h-1 w-full" style={{ background: 'rgba(148,163,184,0.1)' }}>
        <motion.div className="h-full" style={{ background: '#22C55E' }}
          animate={{ width: `${((current + 1) / TOTAL_SLIDES) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
};

export default PitchDeckDI;
