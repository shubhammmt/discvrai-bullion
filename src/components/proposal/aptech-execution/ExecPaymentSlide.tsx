import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

const milestones = [
  { pct: '30%', label: 'At start of scoping (kick-off)', color: 'bg-blue-600' },
  { pct: '20%', label: 'On scoping completion (end of 4-week scoping)', color: 'bg-blue-500' },
  { pct: '20%', label: 'On Milestone 1 (as defined in detailed plan post scoping)', color: 'bg-blue-400' },
  { pct: '20%', label: 'On Milestone 2 (as defined in detailed plan post scoping)', color: 'bg-blue-400' },
  { pct: '10%', label: 'On development completion', color: 'bg-slate-700' },
];

export const ExecPaymentSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Commercials</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-8 max-w-3xl">
      Payment terms
    </h2>

    <div className="max-w-2xl mx-auto">
      <div className="space-y-3 mb-8">
        {milestones.map((m, i) => (
          <div key={i} className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <span className={`w-16 h-10 rounded-lg ${m.color} text-white flex items-center justify-center font-bold text-lg`}>{m.pct}</span>
            <span className="text-sm text-slate-800 font-medium">{m.label}</span>
          </div>
        ))}
      </div>

      {/* Visual bar */}
      <div className="mb-6">
        <div className="flex rounded-lg overflow-hidden h-8">
          <div className="bg-blue-600 flex-[3] flex items-center justify-center text-white text-xs font-bold">30%</div>
          <div className="bg-blue-500 flex-[2] flex items-center justify-center text-white text-xs font-bold">20%</div>
          <div className="bg-blue-400 flex-[2] flex items-center justify-center text-white text-xs font-bold">20%</div>
          <div className="bg-blue-300 flex-[2] flex items-center justify-center text-blue-800 text-xs font-bold">20%</div>
          <div className="bg-slate-700 flex-[1] flex items-center justify-center text-white text-xs font-bold">10%</div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-sm text-slate-700 leading-relaxed">
          Payment terms are applicable <strong>per track</strong> unless otherwise agreed (e.g. single contract for both tracks).
        </p>
      </div>
    </div>
  </ExecSlideLayout>
);
