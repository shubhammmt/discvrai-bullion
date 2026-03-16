import React from 'react';
import { AIAICSlideLayout } from './AIAICSlideLayout';
import { FileSearch, Bot, Plug, Satellite, Camera, Sprout } from 'lucide-react';

const PILLARS = [
  {
    icon: FileSearch,
    title: 'Document Intelligence',
    points: [
      'Scheme document extraction & verification — 95%+ accuracy',
      'Hours → minutes for manual processing',
    ],
    color: 'from-emerald-600 to-emerald-700',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
  },
  {
    icon: Bot,
    title: 'Agentic Orchestration',
    points: [
      'Multi-agent systems for FPOs and farmers',
      'Complex regulatory & marketing workflows — autonomous guidance',
    ],
    color: 'from-blue-600 to-blue-700',
    border: 'border-blue-200',
    bg: 'bg-blue-50',
  },
  {
    icon: Plug,
    title: 'Virtual Integration',
    points: [
      'Plug into Agri-MahaDBT, DBT, govt databases',
      'No total system overhaul required',
    ],
    color: 'from-indigo-600 to-indigo-700',
    border: 'border-indigo-200',
    bg: 'bg-indigo-50',
  },
];

const PRECISION_AG = [
  {
    icon: Satellite,
    title: 'Soil & Inputs',
    desc: 'Satellite + MAHAVEDH weather → fertilizer, pesticide, water timing (LSTM, deep learning)',
  },
  {
    icon: Camera,
    title: 'Weed & Plant Health',
    desc: 'Image → output — weed detection, disease/pest ID (CNN, vision AI)',
  },
  {
    icon: Sprout,
    title: 'Growth Monitoring',
    desc: 'Multi-modal (satellite + weather + ground images) → yield forecast, health alerts',
  },
];

export const AIAICPillarsSlide: React.FC = () => {
  return (
    <AIAICSlideLayout slideNumber={2} totalSlides={3}>
      {/* Title */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-1">
          AI-Native Execution Stack for MahaAgri-AI
        </p>
        <h2 className="text-3xl font-bold text-slate-800">
          Agentic Workflows + On-Farm AI
        </h2>
      </div>

      {/* Three pillars */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        {PILLARS.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className={`rounded-xl border ${p.border} ${p.bg} p-5 flex flex-col gap-3`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">{p.title}</h3>
              </div>
              <ul className="space-y-2">
                {p.points.map((pt, i) => (
                  <li key={i} className="text-[13px] text-slate-600 leading-snug flex gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Precision Ag extension */}
      <div className="rounded-xl border border-emerald-200 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
          Precision Ag Extension — Image + Data → Recommendations
        </p>
        <div className="grid grid-cols-3 gap-5">
          {PRECISION_AG.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                  <p className="text-[12px] text-slate-500 leading-snug mt-1">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tagline */}
      <p className="text-xs text-slate-400 mt-auto pt-3 font-medium tracking-wide">
        Production AI. Measurable outcomes. India-first.
      </p>
    </AIAICSlideLayout>
  );
};
