import React from 'react';
import { NbfcSlideLayout } from './NbfcSlideLayout';
import { Car, Home, Coins, Building2, ShieldCheck } from 'lucide-react';

const segments = [
  {
    icon: Car,
    label: 'Vehicle Finance',
    growth: '16-17%',
    share: '22% of NBFC AUM',
    aiUse: 'Predictive maintenance data for risk scoring; AI chatbots for customer service',
    players: 'Shriram Finance, Chola',
  },
  {
    icon: Home,
    label: 'Affordable Housing',
    growth: '22-23%',
    share: 'Loans < ₹25L',
    aiUse: 'Automated property valuation, title search automation, LOS digitization',
    players: 'BHFL, Chola Home Loans',
  },
  {
    icon: Coins,
    label: 'Gold Loans',
    growth: '38%',
    share: '3,000 new branches planned',
    aiUse: 'Instant valuation apps, AI-driven cross-selling, mobile appraiser geotagging',
    players: 'Muthoot, Manappuram',
  },
  {
    icon: Building2,
    label: 'MSME Lending',
    growth: '15-17%',
    share: 'GST-based scoring',
    aiUse: 'Cash flow analysis via digital trails, one-click onboarding via GSTIN API',
    players: 'Shriram, Capital Float',
  },
  {
    icon: ShieldCheck,
    label: 'Insurance Cross-Sell',
    growth: '$25B',
    share: 'New revenue opportunity',
    aiUse: 'NBA engine, 360° customer view, hyper-personalized offers, claims AI',
    players: 'Bajaj Finserv ecosystem',
  },
];

export const NbfcSegmentsSlide: React.FC = () => {
  return (
    <NbfcSlideLayout>
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Segment Deep Dive</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-8">
          AI Transformation by <span className="text-amber-400">Lending Vertical</span>
        </h2>

        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_3fr] gap-4 px-5 py-2">
            <span className="text-white/30 text-xs uppercase tracking-wider">Segment</span>
            <span className="text-white/30 text-xs uppercase tracking-wider">Growth FY26</span>
            <span className="text-white/30 text-xs uppercase tracking-wider">Scale</span>
            <span className="text-white/30 text-xs uppercase tracking-wider">AI Transformation Focus</span>
          </div>

          {segments.map((s, i) => (
            <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-xl grid grid-cols-[2fr_1fr_1fr_3fr] gap-4 px-5 py-4 items-center">
              <div className="flex items-center gap-3">
                <s.icon className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="text-white font-medium text-sm">{s.label}</p>
                  <p className="text-white/30 text-xs">{s.players}</p>
                </div>
              </div>
              <p className="text-amber-400 font-bold text-lg">{s.growth}</p>
              <p className="text-white/50 text-xs">{s.share}</p>
              <p className="text-white/60 text-xs leading-relaxed">{s.aiUse}</p>
            </div>
          ))}
        </div>
      </div>
    </NbfcSlideLayout>
  );
};
