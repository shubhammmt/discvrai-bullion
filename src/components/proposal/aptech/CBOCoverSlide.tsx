import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';

interface Props { slide: AptechCBOSlide; }

export const CBOCoverSlide: React.FC<Props> = ({ slide }) => (
  <div className="w-full min-h-screen bg-slate-900 flex flex-col relative overflow-hidden font-sans">
    {/* Blue gradient top bar */}
    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500" />

    {/* Grid texture */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}
    />

    {/* Logo */}
    <div className="absolute top-6 right-8 flex items-center gap-3 z-20">
      <span className="text-sm font-bold text-blue-400 tracking-tight">DiscvrAI</span>
      <span className="text-slate-600 text-sm">×</span>
      <span className="text-sm font-bold text-slate-400 tracking-tight">Aptech</span>
    </div>

    {/* Main content */}
    <div className="flex-1 flex flex-col justify-center px-16 relative z-10">
      {/* Category label */}
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 border border-blue-800 rounded-full px-3 py-1">
          CBO Strategic Presentation · Feb 19, 2026
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-6xl font-bold text-white leading-tight mb-3 max-w-3xl">
        {slide.headline}
      </h1>
      <div className="w-20 h-1 bg-blue-500 mb-5" />
      <p className="text-2xl text-blue-300 font-medium mb-2">{slide.subheadline}</p>
      <p className="text-lg text-slate-400">{slide.tagline}</p>

      {/* Meta */}
      <div className="mt-12 flex items-start gap-16">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Presented to</p>
          <p className="text-white font-semibold">{slide.audience}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Presented by</p>
          <p className="text-white font-semibold">{slide.presenter}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Date</p>
          <p className="text-white font-semibold">{slide.date}</p>
        </div>
      </div>
    </div>

    {/* Confidential footer */}
    <div className="px-16 pb-6 text-xs text-slate-600 z-10">
      {slide.confidential}
    </div>

    {/* Bottom accent */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
  </div>
);
