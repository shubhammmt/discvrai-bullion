import React from 'react';
import { motion } from 'framer-motion';
import { ExpoSlide } from '@/data/expoPitchSlides';
import { ExpoSlideLayout } from '../ExpoSlideLayout';

export const ExpoAMCValueSlide: React.FC<{ slide: ExpoSlide }> = ({ slide }) => (
  <ExpoSlideLayout title={slide.title} subtitle={slide.subtitle} icon={slide.icon} section="amc">
    <div className="grid grid-cols-2 gap-6">
      {slide.content?.capabilities?.map((cap: any, i: number) => {
        const Icon = cap.icon;
        return (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
            className="bg-white border border-emerald-100 rounded-xl p-5 flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{cap.label}</h3>
              <p className="text-emerald-600 font-medium">{cap.metric}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
    <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
      <p className="text-emerald-800">{slide.content?.keyMessage}</p>
    </div>
  </ExpoSlideLayout>
);

export const ExpoAMCAnalyticsSlide: React.FC<{ slide: ExpoSlide }> = ({ slide }) => (
  <ExpoSlideLayout title={slide.title} subtitle={slide.subtitle} icon={slide.icon} section="amc">
    <div className="grid grid-cols-2 gap-4">
      {slide.content?.features?.map((f: any, i: number) => (
        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 * i }}
          className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-semibold text-slate-800 mb-2">{f.title}</h3>
          <p className="text-sm text-slate-500">{f.desc}</p>
        </motion.div>
      ))}
    </div>
    <div className="mt-6 bg-emerald-600 rounded-xl p-4 text-center">
      <p className="text-white font-medium">{slide.content?.outcome}</p>
    </div>
  </ExpoSlideLayout>
);

export const ExpoAMCComparisonSlide: React.FC<{ slide: ExpoSlide }> = ({ slide }) => (
  <ExpoSlideLayout title={slide.title} subtitle={slide.subtitle} icon={slide.icon} section="amc">
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="grid grid-cols-3 bg-slate-100 p-4 font-semibold text-slate-700">
        <div>Capability</div><div className="text-center">CleverTap/MoEngage</div><div className="text-center">DiscvrAI</div>
      </div>
      {slide.content?.comparison?.map((c: any, i: number) => (
        <div key={i} className="grid grid-cols-3 p-4 border-t border-slate-100">
          <div className="text-slate-700">{c.feature}</div>
          <div className="text-center text-red-500">✗</div>
          <div className="text-center text-green-500">✓</div>
        </div>
      ))}
    </div>
    <div className="mt-4 text-center text-emerald-700 font-medium">{slide.content?.keyMessage}</div>
  </ExpoSlideLayout>
);

export const ExpoAMCDashboardsSlide: React.FC<{ slide: ExpoSlide }> = ({ slide }) => (
  <ExpoSlideLayout title={slide.title} subtitle={slide.subtitle} icon={slide.icon} section="amc">
    <div className="grid grid-cols-2 gap-4">
      {slide.content?.dashboards?.map((d: any, i: number) => (
        <div key={i} className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-lg font-semibold text-emerald-600 mb-2">{d.role} Dashboard</div>
          <p className="text-sm text-slate-600">{d.focus}</p>
        </div>
      ))}
    </div>
  </ExpoSlideLayout>
);

export const ExpoAMCMetricsSlide: React.FC<{ slide: ExpoSlide }> = ({ slide }) => (
  <ExpoSlideLayout title={slide.title} icon={slide.icon} section="amc">
    <div className="grid grid-cols-5 gap-4">
      {slide.content?.metrics?.map((m: any, i: number) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * i }}
          className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-center text-white">
          <div className="text-3xl font-bold mb-1">{m.value}</div>
          <div className="text-sm text-emerald-100">{m.label}</div>
        </motion.div>
      ))}
    </div>
  </ExpoSlideLayout>
);
