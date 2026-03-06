import React from 'react';
import { NbfcSlideLayout } from './NbfcSlideLayout';
import { Bot, TrendingUp } from 'lucide-react';

export const NbfcCoverSlide: React.FC = () => {
  return (
    <NbfcSlideLayout>
      <div className="h-full flex flex-col justify-center items-center text-center">
        {/* Logo area */}
        <div className="flex items-center gap-3 mb-16">
          <Bot className="w-8 h-8 text-amber-400" />
          <span className="text-xl font-bold text-white tracking-tight">DiscvrAI</span>
          <span className="text-white/20 mx-3">|</span>
          <span className="text-lg text-white/60 tracking-tight">NBFC Digital Transformation</span>
        </div>

        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center mb-12 shadow-2xl shadow-amber-500/20">
          <TrendingUp className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white max-w-5xl leading-tight mb-6">
          AI-Enabled Digital Transformation for{' '}
          <span className="text-amber-400">India's NBFC Sector</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-white/50 max-w-3xl leading-relaxed">
          From Day-0 Digitalization to Intelligent Lending — Operational Elasticity, Risk Precision & Revenue Agility
        </p>

        {/* Stats bar */}
        <div className="mt-16 flex items-center gap-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-400">₹50L Cr+</p>
            <p className="text-xs text-white/30 mt-1">NBFC AUM by FY27</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-400">17%</p>
            <p className="text-xs text-white/30 mt-1">Credit Growth H1 FY26</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-400">190M</p>
            <p className="text-xs text-white/30 mt-1">New-to-Credit Users</p>
          </div>
        </div>

        {/* Date */}
        <div className="mt-12 text-sm text-white/25 font-mono">March 2026 | Confidential</div>
      </div>
    </NbfcSlideLayout>
  );
};
