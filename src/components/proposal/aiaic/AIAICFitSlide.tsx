import React from 'react';
import { AIAICSlideLayout } from './AIAICSlideLayout';
import { FileCheck, Sprout, Handshake } from 'lucide-react';

const FIT_POINTS = [
  {
    icon: FileCheck,
    title: 'DPI & Scheme Delivery',
    color: 'from-emerald-600 to-emerald-700',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    points: [
      'Document Intelligence on Agri-MahaDBT workflows',
      'Virtual integration — no system overhaul',
      'Low-bandwidth, voice-first for rural users',
    ],
  },
  {
    icon: Sprout,
    title: 'FPO & Farmer Orchestration',
    color: 'from-blue-600 to-blue-700',
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    points: [
      'Agentic workflows for regulatory & marketing',
      'Precision Ag: soil/water/fertilizer recos (satellite + MAHAVEDH)',
      'Weed detection, plant health — image to actionable output',
    ],
  },
  {
    icon: Handshake,
    title: 'Track 1 / Track 2 Partnership',
    color: 'from-indigo-600 to-indigo-700',
    border: 'border-indigo-200',
    bg: 'bg-indigo-50',
    points: [
      'Ready to pilot under AIAIC funding',
      'Document Intelligence or Precision Ag — measurable outcomes',
      'Production deployment, not pilots',
    ],
  },
];

export const AIAICFitSlide: React.FC = () => {
  return (
    <AIAICSlideLayout slideNumber={3} totalSlides={3}>
      {/* Title */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-1">
          Strategic Fit
        </p>
        <h2 className="text-3xl font-bold text-slate-800">
          Institutionalizing AI Capacity for Maharashtra Agriculture
        </h2>
      </div>

      {/* Three cards */}
      <div className="grid grid-cols-3 gap-6 flex-1">
        {FIT_POINTS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className={`rounded-xl border ${item.border} ${item.bg} p-6 flex flex-col`}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
              </div>
              <ul className="space-y-3 flex-1">
                {item.points.map((pt, i) => (
                  <li key={i} className="text-[13px] text-slate-600 leading-snug flex gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Tagline */}
      <p className="text-xs text-slate-400 mt-auto pt-4 font-medium tracking-wide">
        Outcome-driven roadmap. Execution discipline. Proven at scale.
      </p>
    </AIAICSlideLayout>
  );
};
