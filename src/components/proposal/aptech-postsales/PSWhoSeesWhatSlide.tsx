import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';
import { User, Headset, Building } from 'lucide-react';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

const iconMap: Record<string, any> = { user: User, headset: Headset, building: Building };
const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
  user:     { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600' },
  headset:  { bg: 'bg-blue-50',    border: 'border-blue-200',    icon: 'text-blue-600' },
  building: { bg: 'bg-violet-50',  border: 'border-violet-200',  icon: 'text-violet-600' },
};

export const PSWhoSeesWhatSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Visibility Matrix</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6">{slide.headline}</h2>

    <div className="grid grid-cols-3 gap-5 mb-5">
      {slide.personas?.map((p: any, i: number) => {
        const Icon = iconMap[p.icon] || User;
        const colors = colorMap[p.icon] || colorMap.user;
        return (
          <div key={i} className={`${colors.bg} border ${colors.border} rounded-xl p-5`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${colors.icon}`} />
              </div>
              <p className="text-lg font-bold text-slate-800">{p.who}</p>
            </div>
            <ul className="space-y-2">
              {p.sees?.map((item: string, ii: number) => (
                <li key={ii} className="flex items-start gap-2">
                  <span className="text-blue-500 text-xs font-bold flex-shrink-0 mt-0.5">•</span>
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>

    <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
      <p className="text-sm text-slate-600">{slide.message}</p>
    </div>
  </PSSlideLayout>
);
