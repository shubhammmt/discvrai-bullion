import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { TrendingUp, ArrowRight } from 'lucide-react';

interface Props {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
}

export const LearningOptimizationSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { phases, sipExample } = slide.content;

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="AI Nudges" sectionColor="bg-blue-600">
      <div className="mb-2">
        <div className="w-10 h-0.5 bg-slate-800 mb-1" />
        <h1 className="text-2xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-base text-slate-500">{slide.subtitle}</p>
      </div>

      {/* Phases */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {phases.map((phase: any, i: number) => (
          <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <p className="text-sm font-bold text-slate-800 mb-0.5">{phase.phase}</p>
            <p className="text-[11px] text-slate-500 mb-2">{phase.period}</p>
            
            {phase.variants && (
              <div className="space-y-1 mb-2">
                {phase.variants.map((v: any, j: number) => (
                  <div key={j} className={`text-[11px] p-1.5 rounded ${v.name === phase.winner?.split(' ')[0] + ' ' + phase.winner?.split(' ')[1] ? 'bg-emerald-50 border border-emerald-200' : 'bg-white border border-slate-100'}`}>
                    <span className="font-bold text-slate-700">{v.name}:</span>
                    <span className="text-slate-500 ml-1">{v.open} open, {v.click} click, {v.conversion} conv</span>
                  </div>
                ))}
                {phase.winner && <p className="text-[11px] font-bold text-emerald-600">Winner: {phase.winner}</p>}
              </div>
            )}

            {phase.improvements && (
              <div className="space-y-0.5 mb-2">
                {phase.improvements.map((imp: string, j: number) => (
                  <p key={j} className="text-[11px] text-slate-600">✓ {imp}</p>
                ))}
              </div>
            )}

            {phase.patterns && (
              <div className="space-y-0.5 mb-2">
                {phase.patterns.map((p: string, j: number) => (
                  <p key={j} className="text-[11px] text-slate-600">💡 {p}</p>
                ))}
              </div>
            )}

            {phase.results && (
              <div className="space-y-0.5">
                {phase.results.map((r: any, j: number) => (
                  <div key={j} className="flex items-center gap-1 text-[11px]">
                    <span className="text-slate-500">{r.metric}:</span>
                    <span className="text-red-500">{r.before}</span>
                    <ArrowRight className="w-2.5 h-2.5 text-slate-400" />
                    <span className="font-bold text-emerald-600">{r.after}</span>
                    <span className="text-emerald-500">({r.change})</span>
                  </div>
                ))}
              </div>
            )}

            {phase.overall && <p className="text-xs font-bold text-emerald-700 mt-2">{phase.overall}</p>}
          </div>
        ))}
      </div>

      {/* SIP Example */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-4">
        <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
          <TrendingUp className="w-4 h-4 inline mr-1" />
          Case Study: SIP Failure Prevention
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[11px] text-slate-400 mb-1">Baseline (Week 1):</p>
            <p className="text-[11px] text-slate-300 italic">"{sipExample.baseline.message}"</p>
            <p className="text-[11px] text-red-400 mt-1">Open: {sipExample.baseline.openRate} | Action: {sipExample.baseline.actionRate}</p>
          </div>
          <div>
            <p className="text-[11px] text-emerald-400 mb-1">Optimized (Week 8):</p>
            <p className="text-[11px] text-slate-300 italic">"{sipExample.optimized.message}"</p>
            <p className="text-[11px] text-emerald-400 mt-1">Open: {sipExample.optimized.openRate} | Action: {sipExample.optimized.actionRate}</p>
            <div className="flex gap-2 mt-1.5">
              {sipExample.improvements.map((imp: string, i: number) => (
                <span key={i} className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">{imp}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DeepDiveSlideLayout>
  );
};
