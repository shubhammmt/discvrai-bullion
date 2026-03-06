import React from 'react';
import { NbfcSlideLayout } from './NbfcSlideLayout';
import { TrendingUp, Landmark, BarChart3, ArrowUpRight } from 'lucide-react';

const metrics = [
  {
    icon: TrendingUp,
    label: 'Credit Growth',
    value: '17%',
    detail: 'NBFC YoY vs 12% Banking',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: Landmark,
    label: 'NIM Advantage',
    value: '6.6%',
    detail: 'vs 3.0% Banking; 20-80 bps expansion expected',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: BarChart3,
    label: 'PAT Growth',
    value: '11%',
    detail: 'vs 3% Banking; Cost-to-Income at 36.5%',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: ArrowUpRight,
    label: 'Balance Sheet',
    value: '₹30.8L Cr',
    detail: 'Projected ₹50L Cr AUM by Mar 2027',
    color: 'from-violet-500 to-violet-600',
  },
];

const kpiRows = [
  { label: 'Aggregate Credit Growth (YoY)', nbfc: '17%', bank: '12%' },
  { label: 'Net Interest Margin (NIM)', nbfc: '6.6%', bank: '3.0%' },
  { label: 'Cost-to-Income Ratio', nbfc: '36.5%', bank: '45-52%' },
  { label: 'PAT Growth', nbfc: '11%', bank: '3%' },
];

export const NbfcOpportunitySlide: React.FC = () => {
  return (
    <NbfcSlideLayout>
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">The Macro Opportunity</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-8">
          NBFCs Are Outpacing Banks — <span className="text-amber-400">The Question Is Sustainability</span>
        </h2>

        <div className="grid grid-cols-4 gap-5 mb-8">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5 flex flex-col">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-4`}>
                <m.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-white/40 text-xs font-medium mb-1">{m.label}</p>
              <p className="text-2xl font-bold text-white mb-1">{m.value}</p>
              <p className="text-white/50 text-xs mt-auto">{m.detail}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden flex-1">
          <div className="grid grid-cols-3 px-6 py-3 border-b border-white/[0.06]">
            <span className="text-white/30 text-xs uppercase tracking-wider">KPI</span>
            <span className="text-amber-400 text-xs uppercase tracking-wider text-center">NBFC H1 FY26</span>
            <span className="text-white/30 text-xs uppercase tracking-wider text-center">Banking H1 FY26</span>
          </div>
          {kpiRows.map((row, i) => (
            <div key={i} className="grid grid-cols-3 px-6 py-3 border-b border-white/[0.04] last:border-b-0">
              <span className="text-white/70 text-sm">{row.label}</span>
              <span className="text-amber-400 text-sm font-semibold text-center">{row.nbfc}</span>
              <span className="text-white/40 text-sm text-center">{row.bank}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-xl px-6 py-3">
          <p className="text-white/70 text-sm">
            <span className="text-amber-400 font-semibold">RBI rate cuts (100 bps in 2025)</span> create margin tailwinds —
            but sustaining growth requires digital infrastructure, not just favorable macro.
          </p>
        </div>
      </div>
    </NbfcSlideLayout>
  );
};
