import React from 'react';
import { motion } from 'framer-motion';
import { ExpoSlide } from '@/data/expoPitchSlides';
import { ExpoSlideLayout } from '../ExpoSlideLayout';

export const ExpoHealthcareValueSlide: React.FC<{ slide: ExpoSlide }> = ({ slide }) => (
  <ExpoSlideLayout title={slide.title} subtitle={slide.subtitle} icon={slide.icon} section="healthcare">
    <div className="grid grid-cols-5 gap-3">
      {slide.content?.capabilities?.map((cap: any, i: number) => {
        const Icon = cap.icon;
        return (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
            className="bg-white border border-rose-100 rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-rose-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Icon className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="font-medium text-slate-800 text-sm">{cap.label}</h3>
            <p className="text-xs text-slate-500 mt-1">{cap.desc}</p>
          </motion.div>
        );
      })}
    </div>
    <div className="mt-6 bg-rose-50 border border-rose-200 rounded-xl p-4 text-center">
      <p className="text-rose-800">{slide.content?.keyMessage}</p>
    </div>
  </ExpoSlideLayout>
);

export const ExpoHealthcareUseCasesSlide: React.FC<{ slide: ExpoSlide }> = ({ slide }) => (
  <ExpoSlideLayout title={slide.title} icon={slide.icon} section="healthcare">
    <div className="space-y-3">
      {slide.content?.agents?.map((a: any, i: number) => (
        <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
          className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
          <span className="font-semibold text-slate-800">{a.name}</span>
          <span className="text-rose-600 font-medium">{a.outcome}</span>
        </motion.div>
      ))}
    </div>
  </ExpoSlideLayout>
);

export const ExpoHealthcareIntegrationSlide: React.FC<{ slide: ExpoSlide }> = ({ slide }) => (
  <ExpoSlideLayout title={slide.title} icon={slide.icon} section="healthcare">
    <div className="grid grid-cols-2 gap-4">
      {slide.content?.systems?.map((sys: any, i: number) => (
        <div key={i} className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-semibold text-rose-600 mb-2">{sys.type}</h3>
          <div className="flex flex-wrap gap-2">
            {sys.examples?.map((e: string, j: number) => (
              <span key={j} className="bg-rose-50 text-rose-700 px-2 py-1 rounded text-xs">{e}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </ExpoSlideLayout>
);

export const ExpoHealthcareTimelineSlide: React.FC<{ slide: ExpoSlide }> = ({ slide }) => (
  <ExpoSlideLayout title={slide.title} subtitle={slide.subtitle} icon={slide.icon} section="healthcare">
    <div className="flex items-center justify-between gap-2">
      {slide.content?.phases?.map((p: any, i: number) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
          className="flex-1 bg-white border border-slate-200 rounded-xl p-4 text-center">
          <div className="text-rose-600 font-bold mb-1">Week {p.weeks}</div>
          <div className="font-semibold text-slate-800 text-sm">{p.phase}</div>
          <div className="text-xs text-slate-500 mt-1">{p.detail}</div>
        </motion.div>
      ))}
    </div>
  </ExpoSlideLayout>
);

export const ExpoHealthcareMetricsSlide: React.FC<{ slide: ExpoSlide }> = ({ slide }) => (
  <ExpoSlideLayout title={slide.title} subtitle={slide.subtitle} icon={slide.icon} section="healthcare">
    <div className="space-y-3">
      {slide.content?.metrics?.map((m: any, i: number) => (
        <div key={i} className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-4 flex items-center justify-between">
          <span className="font-medium text-slate-800">{m.area}</span>
          <span className="text-rose-700">{m.result}</span>
        </div>
      ))}
    </div>
  </ExpoSlideLayout>
);
