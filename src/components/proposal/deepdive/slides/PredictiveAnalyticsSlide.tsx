import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
}

export const PredictiveAnalyticsSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { clients, totalImpact, distributor } = slide.content;

  const riskColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
    High: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-600' },
    Medium: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-600' },
    Low: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-600' },
  };

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="Distributor" sectionColor="bg-teal-600">
      <div className="mb-2">
        <div className="w-10 h-0.5 bg-slate-800 mb-1" />
        <h1 className="text-2xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-base text-slate-500">{slide.subtitle} — <span className="font-semibold">{distributor}</span></p>
      </div>

      {/* Client cards */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {clients.map((client: any, i: number) => {
          const colors = riskColors[client.risk];
          return (
            <div key={i} className={`${colors.bg} border ${colors.border} rounded-lg p-3`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-800">{client.name}</span>
                <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${colors.badge}`}>
                  {client.risk} Risk — {client.probability}
                </span>
              </div>
              <div className="space-y-0.5 text-[11px] text-slate-600">
                <p>AUM: <span className="font-bold">{client.aum}</span></p>
                <p>Last login: {client.lastLogin}</p>
                <p>Portfolio: {client.portfolio}</p>
                <p>Email opens: {client.emailOpens}</p>
              </div>
              <div className="mt-2 bg-white rounded p-2 border border-slate-200">
                <p className="text-[10px] text-slate-500">Recommended Action:</p>
                <p className="text-[11px] font-semibold text-slate-700">{client.action}</p>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-[11px] font-semibold text-emerald-600">{client.outcome}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Impact */}
      <div className="bg-slate-800 rounded-lg p-4">
        <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Total Impact After 30 Days</p>
        <div className="grid grid-cols-5 gap-4 text-center">
          {Object.entries(totalImpact).map(([key, value], i) => (
            <div key={i}>
              <p className="text-[11px] text-slate-400">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              <p className="text-base font-bold text-white">{value as string}</p>
            </div>
          ))}
        </div>
      </div>
    </DeepDiveSlideLayout>
  );
};
