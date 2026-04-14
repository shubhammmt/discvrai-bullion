import React, { useState, useEffect, useCallback } from 'react';
import { 
  Shield, TrendingUp, AlertTriangle, Eye, Database, Cpu, 
  Camera, Smartphone, Zap, Clock, CheckCircle2, ArrowRight,
  ChevronLeft, ChevronRight, Target, BarChart3, Lock,
  FileWarning, Banknote, Users, Layers, Brain
} from 'lucide-react';

// ─── TYPES ───
interface SlideProps { isActive: boolean; }

// ─── CONSTANTS ───
const TOTAL_SLIDES = 10;
const SLIDE_TITLES = [
  'Vision', 'Financial Crisis', 'Blind Window', 'Phase 1: Data Lake',
  'Phase 2: Field Digitalization', 'Phase 3: Automation',
  'As-Is vs To-Be', 'Resources', 'KPI Summary', 'Call to Action'
];

// ─── SLIDE 1: TITLE ───
const Slide1: React.FC<SlideProps> = ({ isActive }) => (
  <div className={`h-full transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
    <div className="h-full flex flex-col items-center justify-center text-center px-16 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-500/10 rounded-3xl" />
      <div className="relative z-10 space-y-8">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">₹43 Crore</span> Opportunity
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Transitioning from Mechanical Blindness to AI-Driven Certainty
        </p>
        <div className="flex items-center gap-3 justify-center pt-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-400" />
          <span className="text-sm text-slate-400 uppercase tracking-widest">ATM Operational Transformation</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400" />
        </div>
        <p className="text-base text-slate-500">Powered by DiscvrAI | Confidential</p>
      </div>
    </div>
  </div>
);

// ─── SLIDE 2: FINANCIAL CRISIS ───
const Slide2: React.FC<SlideProps> = ({ isActive }) => {
  const leakages = [
    { category: 'Physical Shortage', amount: '₹24 Cr', pct: '56%', root: 'Pilferage', icon: Banknote, color: 'from-red-500 to-red-600', barW: '56%' },
    { category: 'Shortage Queries', amount: '₹6 Cr', pct: '14%', root: 'Manual Entries', icon: FileWarning, color: 'from-orange-500 to-amber-500', barW: '14%' },
    { category: 'Customer Claims', amount: '₹13 Cr', pct: '30%', root: 'Hardware Jams', icon: AlertTriangle, color: 'from-yellow-500 to-yellow-600', barW: '30%' },
  ];
  return (
    <div className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      <div className="h-full flex flex-col px-12 py-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-widest text-red-400 mb-2">Annual Cash Leakage Breakdown</p>
          <h2 className="text-4xl font-bold text-white">The Financial Crisis</h2>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_1fr_2fr_2fr] gap-0 px-6 py-4 border-b border-slate-700/50 text-xs uppercase tracking-wider text-slate-400">
              <span>Category</span><span className="text-right">Amount</span><span className="text-right">Share</span><span className="pl-6">Core Root Cause</span><span className="pl-6">Impact</span>
            </div>
            {leakages.map((l, i) => (
              <div key={i} className="grid grid-cols-[2fr_1fr_1fr_2fr_2fr] gap-0 px-6 py-5 border-b border-slate-700/30 items-center hover:bg-slate-700/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${l.color} flex items-center justify-center`}>
                    <l.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium">{l.category}</span>
                </div>
                <span className="text-right text-2xl font-bold text-white">{l.amount}</span>
                <span className="text-right text-slate-400">{l.pct}</span>
                <div className="pl-6">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/15 text-red-300 border border-red-500/20">{l.root}</span>
                </div>
                <div className="pl-6">
                  <div className="w-full bg-slate-700/50 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full bg-gradient-to-r ${l.color}`} style={{ width: l.barW }} />
                  </div>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-[2fr_1fr_1fr_2fr_2fr] gap-0 px-6 py-5 bg-slate-700/30">
              <span className="text-white font-bold text-lg">Total Annual Leakage</span>
              <span className="text-right text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">₹43 Cr</span>
              <span className="text-right text-slate-300 font-medium">100%</span>
              <span /><span />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SLIDE 3: BLIND WINDOW ───
const Slide3: React.FC<SlideProps> = ({ isActive }) => {
  const days = [
    { day: 'Day 0', label: 'Cash Loading', desc: 'Custodian loads ATM. Last known state.', status: 'known', icon: CheckCircle2 },
    { day: 'Day 1', label: 'BLIND', desc: 'No visibility. Cash dispensed, jams, errors — all unknown.', status: 'blind', icon: Eye },
    { day: 'Day 2', label: 'BLIND', desc: 'Potential pilferage, overage drift, silent failures.', status: 'blind', icon: Eye },
    { day: 'Day 3', label: 'BLIND', desc: 'Accumulated discrepancies grow. Claims pile up.', status: 'blind', icon: Eye },
    { day: 'Day 4', label: 'Next Visit', desc: 'Physical audit reveals shortages. Too late to prevent.', status: 'late', icon: AlertTriangle },
  ];
  return (
    <div className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      <div className="h-full flex flex-col px-12 py-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-widest text-amber-400 mb-2">The Core Problem</p>
          <h2 className="text-4xl font-bold text-white">The "Blind Window" Problem</h2>
          <p className="text-lg text-slate-400 mt-2">A 4-day information vacuum where ₹43 Cr leaks undetected</p>
        </div>
        <div className="flex-1 flex items-center">
          <div className="w-full flex items-stretch gap-3">
            {days.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className={`w-full rounded-2xl border p-5 flex flex-col items-center text-center gap-3 h-full
                  ${d.status === 'known' ? 'bg-emerald-500/10 border-emerald-500/30' : ''}
                  ${d.status === 'blind' ? 'bg-red-500/10 border-red-500/30 animate-pulse' : ''}
                  ${d.status === 'late' ? 'bg-amber-500/10 border-amber-500/30' : ''}
                `}>
                  <d.icon className={`w-8 h-8 ${d.status === 'known' ? 'text-emerald-400' : d.status === 'blind' ? 'text-red-400' : 'text-amber-400'}`} />
                  <span className="text-xs uppercase tracking-wider text-slate-500">{d.day}</span>
                  <span className={`text-lg font-bold ${d.status === 'blind' ? 'text-red-400' : 'text-white'}`}>{d.label}</span>
                  <p className="text-sm text-slate-400 leading-relaxed">{d.desc}</p>
                </div>
                {i < days.length - 1 && (
                  <ArrowRight className="text-slate-600 mt-4 w-5 h-5 hidden lg:block absolute" style={{ display: 'none' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SLIDE 4: PHASE 1 ───
const Slide4: React.FC<SlideProps> = ({ isActive }) => {
  const features = [
    { title: '0–100 Risk Scoring', desc: 'ML model scores every ATM daily based on transaction anomalies, balance drift, and site persona.', icon: Target },
    { title: 'Balance Drift Analysis', desc: 'Continuous comparison of Switch Balance vs. EJ Logs to detect discrepancies before physical audits.', icon: BarChart3 },
    { title: 'ML-Driven Indent Optimization', desc: 'Predict optimal cash loading amounts per denomination to reduce overstocking and idle cash.', icon: Brain },
  ];
  return (
    <div className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      <div className="h-full flex flex-col px-12 py-8">
        <div className="flex items-center gap-4 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">PHASE 1</span>
          <span className="text-sm text-slate-500">Months 1–6</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">Unified Data Lake & ML Engine</h2>
        <p className="text-lg text-slate-400 mb-8">Machine Learning for "Risk-Ranked Auditing"</p>
        <div className="flex-1 grid grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8 flex flex-col gap-4 hover:border-blue-500/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <f.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl px-6 py-4 flex items-center justify-between">
          <span className="text-blue-300 font-medium">Target KPI</span>
          <span className="text-2xl font-bold text-white">&gt;70% Audit Hit Rate</span>
        </div>
      </div>
    </div>
  );
};

// ─── SLIDE 5: PHASE 2 ───
const Slide5: React.FC<SlideProps> = ({ isActive }) => {
  const features = [
    { title: 'OCR Slip Capture', desc: 'Optical Character Recognition replaces manual entry of loading slips, eliminating human transcription errors.', icon: Camera },
    { title: 'Digital Birth Certificates', desc: 'Every cassette gets a digital identity via Handheld Terminals — seal number, vault-pack verification, chain of custody.', icon: Smartphone },
    { title: 'Geo-Tagged Evidence', desc: 'All field activities are geo-tagged and timestamped, creating an immutable digital audit trail.', icon: Lock },
  ];
  return (
    <div className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      <div className="h-full flex flex-col px-12 py-8">
        <div className="flex items-center gap-4 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">PHASE 2</span>
          <span className="text-sm text-slate-500">Months 4–9</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">Secure Field Digitalization</h2>
        <p className="text-lg text-slate-400 mb-8">"Digital Visual Record" — Eliminating Manual Data Entry</p>
        <div className="flex-1 grid grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8 flex flex-col gap-4 hover:border-emerald-500/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <f.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-6 py-4 flex items-center justify-between">
          <span className="text-emerald-300 font-medium">Target KPI</span>
          <span className="text-2xl font-bold text-white">60% Reduction in MIR</span>
        </div>
      </div>
    </div>
  );
};

// ─── SLIDE 6: PHASE 3 ───
const Slide6: React.FC<SlideProps> = ({ isActive }) => {
  const features = [
    { title: 'Automated Tie-Breaker', desc: 'System Verdict logic auto-resolves disputes between Bank Switch, Machine EJ, and Physical Count.', icon: Cpu },
    { title: 'Real-Time Shutter Jam Alerts', desc: 'Instant notifications when hardware jams occur, enabling same-day field response instead of T+4 discovery.', icon: Zap },
    { title: 'Harmonizing Penalty Shield', desc: 'Automated EOD compliance tracking prevents late-reporting fines — saving an estimated ₹1 Cr annually.', icon: Shield },
  ];
  return (
    <div className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      <div className="h-full flex flex-col px-12 py-8">
        <div className="flex items-center gap-4 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">PHASE 3</span>
          <span className="text-sm text-slate-500">Months 7–12</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">Agile Automation</h2>
        <p className="text-lg text-slate-400 mb-8">"System Verdict" & Real-Time Alerts</p>
        <div className="flex-1 grid grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8 flex flex-col gap-4 hover:border-purple-500/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                <f.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-purple-500/10 border border-purple-500/20 rounded-xl px-6 py-4 flex items-center justify-between">
          <span className="text-purple-300 font-medium">Penalty Shield Savings</span>
          <span className="text-2xl font-bold text-white">₹1 Cr / Year</span>
        </div>
      </div>
    </div>
  );
};

// ─── SLIDE 7: COMPARISON ───
const Slide7: React.FC<SlideProps> = ({ isActive }) => {
  const rows = [
    { dimension: 'Cash Visibility', asIs: '4-Day Blind Window', toBe: 'Real-Time Dashboard', icon: Eye },
    { dimension: 'Audit Strategy', asIs: 'Random / Calendar-Based', toBe: 'ML Risk-Ranked', icon: Target },
    { dimension: 'Overage Reporting', asIs: 'Delayed (T+4 minimum)', toBe: 'Instant Alerts', icon: Zap },
    { dimension: 'Data Entry', asIs: 'Manual / Paper-Based', toBe: 'OCR + Digital Capture', icon: Camera },
    { dimension: 'Dispute Resolution', asIs: 'Manual 3-Way Match', toBe: 'Automated System Verdict', icon: Cpu },
    { dimension: 'Penalty Management', asIs: 'Reactive / Post-Facto', toBe: 'Proactive Shield', icon: Shield },
  ];
  return (
    <div className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      <div className="h-full flex flex-col px-12 py-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-widest text-cyan-400 mb-2">Transformation Impact</p>
          <h2 className="text-4xl font-bold text-white">As-Is vs. To-Be</h2>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[2fr_3fr_3fr] px-6 py-4 border-b border-slate-700/50 text-xs uppercase tracking-wider text-slate-400">
              <span>Dimension</span>
              <span className="text-center text-red-400">Current State (As-Is)</span>
              <span className="text-center text-emerald-400">Future State (To-Be)</span>
            </div>
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-[2fr_3fr_3fr] px-6 py-4 border-b border-slate-700/30 items-center hover:bg-slate-700/20 transition-colors">
                <div className="flex items-center gap-3">
                  <r.icon className="w-5 h-5 text-slate-400" />
                  <span className="text-white font-medium">{r.dimension}</span>
                </div>
                <div className="text-center">
                  <span className="px-3 py-1.5 rounded-lg text-sm bg-red-500/10 text-red-300 border border-red-500/20">{r.asIs}</span>
                </div>
                <div className="text-center">
                  <span className="px-3 py-1.5 rounded-lg text-sm bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">{r.toBe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SLIDE 8: RESOURCES ───
const Slide8: React.FC<SlideProps> = ({ isActive }) => {
  const champions = [
    { role: 'Audit Liaison Officer', responsibility: 'Primary point of contact between DiscvrAI team and internal audit division', count: '1' },
    { role: 'Reconciliation Expert(s)', responsibility: 'Domain expertise on 3-way match, dispute resolution, and EOD processes', count: '2' },
    { role: 'IT Security Lead', responsibility: 'API access, data governance, network security clearances', count: '1' },
  ];
  const ops = [
    { role: 'OCR Exception Desk', responsibility: 'Handle OCR misreads, validate edge-case slip formats during Phase 2 rollout', count: '2–3' },
    { role: 'Field Training Coordinator', responsibility: 'Train custodians on Handheld Terminals, geo-tagging SOPs, digital cassette registration', count: '1' },
  ];
  const TableSection = ({ title, color, data }: { title: string; color: string; data: typeof champions }) => (
    <div className="space-y-3">
      <h3 className={`text-lg font-bold ${color}`}>{title}</h3>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[2fr_4fr_1fr] px-5 py-3 border-b border-slate-700/50 text-xs uppercase tracking-wider text-slate-400">
          <span>Role</span><span>Responsibility</span><span className="text-center">Headcount</span>
        </div>
        {data.map((d, i) => (
          <div key={i} className="grid grid-cols-[2fr_4fr_1fr] px-5 py-4 border-b border-slate-700/30 items-center">
            <span className="text-white font-medium">{d.role}</span>
            <span className="text-slate-400 text-sm">{d.responsibility}</span>
            <span className="text-center text-white font-bold">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      <div className="h-full flex flex-col px-12 py-8">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-widest text-blue-400 mb-2">Engagement Model</p>
          <h2 className="text-4xl font-bold text-white">Resource & Personnel Requirements</h2>
        </div>
        <div className="flex-1 flex flex-col gap-6 justify-center">
          <TableSection title="Client Champions" color="text-blue-300" data={champions} />
          <TableSection title="Operational Support" color="text-emerald-300" data={ops} />
        </div>
      </div>
    </div>
  );
};

// ─── SLIDE 9: KPI SUMMARY ───
const Slide9: React.FC<SlideProps> = ({ isActive }) => {
  const kpis = [
    { label: 'Manual Intervention Rate', from: '85%', to: '<15%', improvement: '82% reduction', color: 'from-red-500 to-emerald-500' },
    { label: 'Audit Hit Rate', from: '10%', to: '75%', improvement: '7.5x increase', color: 'from-amber-500 to-emerald-500' },
    { label: 'Blind Window Duration', from: '4 Days', to: '<4 Hours', improvement: '96% reduction', color: 'from-red-500 to-blue-500' },
    { label: 'Dispute Resolution Time', from: '14 Days', to: '48 Hours', improvement: '85% faster', color: 'from-orange-500 to-cyan-500' },
  ];
  return (
    <div className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      <div className="h-full flex flex-col px-12 py-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-widest text-emerald-400 mb-2">Executive Summary</p>
          <h2 className="text-4xl font-bold text-white">KPI Transformation</h2>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-6">
          {kpis.map((k, i) => (
            <div key={i} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8 flex flex-col gap-6">
              <h3 className="text-lg font-medium text-slate-300">{k.label}</h3>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-400">{k.from}</p>
                  <p className="text-xs text-slate-500 mt-1">Current</p>
                </div>
                <ArrowRight className="w-8 h-8 text-slate-500" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-400">{k.to}</p>
                  <p className="text-xs text-slate-500 mt-1">Target</p>
                </div>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-3">
                <div className={`h-3 rounded-full bg-gradient-to-r ${k.color}`} style={{ width: '100%' }} />
              </div>
              <span className="text-sm font-bold text-emerald-300">{k.improvement}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── SLIDE 10: CTA ───
const Slide10: React.FC<SlideProps> = ({ isActive }) => {
  const steps = [
    { step: '01', title: 'Identify High-Risk Region', desc: 'Select a 500-ATM cluster with highest balance drift and shortage history.' },
    { step: '02', title: 'Deploy Data Lake', desc: 'Integrate EOD, MSP, and EJ data streams into the unified intelligence layer.' },
    { step: '03', title: 'Activate ML Scoring', desc: 'Run risk-ranked auditing for 60 days to establish baseline hit rates.' },
    { step: '04', title: 'Measure & Scale', desc: 'Validate ROI against KPIs and plan national rollout.' },
  ];
  return (
    <div className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      <div className="h-full flex flex-col items-center justify-center px-12 py-8 text-center">
        <div className="space-y-8 max-w-4xl">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white">90-Day Pilot Proposal</h2>
          <p className="text-xl text-slate-400">High-Risk Region | 500 ATMs | Proof of Value</p>
          <div className="grid grid-cols-4 gap-4 mt-8">
            {steps.map((s, i) => (
              <div key={i} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 text-left hover:border-amber-500/30 transition-colors">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">{s.step}</span>
                <h4 className="text-white font-bold mt-3 mb-2">{s.title}</h4>
                <p className="text-sm text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="pt-6">
            <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-500/20">
              <span>Let's Begin the Transformation</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN DECK ───
const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10];

const CMSPitchDeck: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((i: number) => {
    if (i >= 0 && i < TOTAL_SLIDES) setCurrent(i);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, goTo]);

  return (
    <div className="h-screen w-screen bg-[#0B1120] flex flex-col overflow-hidden">
      {/* Top timeline bar */}
      <div className="h-10 bg-slate-900/80 border-b border-slate-800/50 flex items-center px-4 shrink-0 gap-1 overflow-x-auto">
        <Shield className="w-4 h-4 text-blue-400 shrink-0 mr-2" />
        {SLIDE_TITLES.map((title, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`shrink-0 px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
              current === i
                ? 'bg-blue-500/20 text-blue-300 font-medium'
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            {String(i + 1).padStart(2, '0')}. {title}
          </button>
        ))}
      </div>

      {/* Slide area */}
      <div className="flex-1 relative min-h-0">
        {SLIDES.map((SlideComp, i) => (
          <SlideComp key={i} isActive={current === i} />
        ))}
      </div>
    </div>
  );
};

export default CMSPitchDeck;
