import React from 'react';
import { motion } from 'framer-motion';
import { ExpoSlide } from '@/data/expoPitchSlides';
import { ExpoSlideLayout } from '../ExpoSlideLayout';
import { Brain, Mail, Globe, Phone, Linkedin } from 'lucide-react';

export const ExpoWhyNowSlide: React.FC<{ slide: ExpoSlide }> = ({ slide }) => (
  <ExpoSlideLayout title={slide.title} subtitle={slide.subtitle} icon={slide.icon} section="closing">
    <div className="grid grid-cols-4 gap-5">
      {slide.content?.drivers?.map((d: any, i: number) => {
        const Icon = d.icon;
        return (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
            className="bg-white border border-violet-100 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 bg-violet-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <Icon className="w-7 h-7 text-violet-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">{d.title}</h3>
            <p className="text-sm text-slate-500">{d.desc}</p>
          </motion.div>
        );
      })}
    </div>
    <div className="mt-8 bg-violet-600 rounded-xl p-5 text-center">
      <p className="text-lg text-white font-medium">{slide.content?.keyMessage}</p>
    </div>
  </ExpoSlideLayout>
);

export const ExpoNextStepsSlide: React.FC<{ slide: ExpoSlide }> = ({ slide }) => (
  <ExpoSlideLayout title={slide.title} icon={slide.icon} section="closing">
    <div className="grid grid-cols-4 gap-5">
      {slide.content?.steps?.map((s: any, i: number) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
          className="bg-white border border-slate-200 rounded-2xl p-6 text-center relative">
          <div className="w-10 h-10 bg-violet-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-lg">
            {s.step}
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">{s.title}</h3>
          <p className="text-sm text-slate-500 mb-3">{s.desc}</p>
          <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">{s.timeline}</span>
        </motion.div>
      ))}
    </div>
  </ExpoSlideLayout>
);

export const ExpoContactSlide: React.FC<{ slide: ExpoSlide }> = ({ slide }) => (
  <div className="h-full w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-12">
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl mx-auto mb-6 flex items-center justify-center">
        <Brain className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-2">{slide.content?.contact?.name}</h1>
      <p className="text-xl text-blue-300 mb-8">{slide.content?.contact?.title}</p>
      <div className="flex flex-col items-center gap-4 text-white/80">
        <div className="flex items-center gap-3"><Mail className="w-5 h-5" />{slide.content?.contact?.email}</div>
        <div className="flex items-center gap-3"><Phone className="w-5 h-5" />{slide.content?.contact?.phone}</div>
        <div className="flex items-center gap-3"><Globe className="w-5 h-5" />{slide.content?.contact?.website}</div>
      </div>
      <p className="text-blue-200 mt-8 max-w-lg">{slide.content?.keyMessage}</p>
    </motion.div>
  </div>
);

export const ExpoThankYouSlide: React.FC<{ slide: ExpoSlide }> = ({ slide }) => (
  <div className="h-full w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl mx-auto mb-8 flex items-center justify-center">
        <Brain className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-6xl font-bold text-white mb-4">{slide.title}</h1>
      <p className="text-2xl text-blue-200 mb-8">{slide.subtitle}</p>
      <div className="flex items-center justify-center gap-6 text-white/60">
        <span>{slide.content?.contact?.email}</span>
        <span>•</span>
        <span>{slide.content?.contact?.website}</span>
      </div>
    </motion.div>
  </div>
);

export const ExpoIndustriesSlide: React.FC<{ slide: ExpoSlide }> = ({ slide }) => (
  <ExpoSlideLayout title={slide.title} icon={slide.icon} section="closing">
    <div className="grid grid-cols-4 gap-5">
      {slide.content?.industries?.map((ind: any, i: number) => {
        const Icon = ind.icon;
        return (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
            className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <Icon className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">{ind.name}</h3>
            <p className="text-sm text-slate-500">{ind.highlight}</p>
          </motion.div>
        );
      })}
    </div>
    <div className="mt-8 bg-blue-600 rounded-xl p-5 text-center">
      <p className="text-lg text-white font-medium">{slide.content?.keyMessage}</p>
    </div>
  </ExpoSlideLayout>
);
