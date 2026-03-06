import React from 'react';
import { DeepSlideLayout } from './DeepSlideLayout';
import { Shield, Bot } from 'lucide-react';

export const DeepCoverSlide: React.FC = () => {
  return (
    <DeepSlideLayout>
      <div className="h-full flex flex-col justify-center items-center text-center">
        {/* Logo area */}
        <div className="flex items-center gap-3 mb-16">
          <Bot className="w-8 h-8 text-teal-400" />
          <span className="text-xl font-bold text-white tracking-tight">DiscvrAI</span>
          <span className="text-white/20 mx-3">×</span>
          <span className="text-xl font-bold text-white tracking-tight">Deep Industries</span>
        </div>

        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mb-12 shadow-2xl shadow-teal-500/20">
          <Shield className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white max-w-4xl leading-tight mb-6">
          How Digital Tools Help Deep Industries{' '}
          <span className="text-teal-400">Sustain Growth</span> While Managing Risk
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-white/50 max-w-2xl">
          See Problems Before They Cost You — Less Firefighting, More Control
        </p>

        {/* Date */}
        <div className="mt-16 text-sm text-white/25 font-mono">March 2026 | Confidential</div>
      </div>
    </DeepSlideLayout>
  );
};
