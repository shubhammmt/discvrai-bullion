import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { MapPin, Users, Languages, MessageSquare, Sparkles, Gift, Gamepad2, Trophy, ArrowRight } from 'lucide-react';

interface DalmiaMarketingEngagementSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaMarketingEngagementSlide: React.FC<DalmiaMarketingEngagementSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const marketingCaps = [
    { icon: MapPin, title: 'Hyperlocal Detection', description: 'Construction hotspots', color: 'bg-blue-50 border-blue-200 text-blue-600' },
    { icon: Users, title: 'Contractor Intelligence', description: 'Influencer tracking', color: 'bg-purple-50 border-purple-200 text-purple-600' },
    { icon: Languages, title: 'Regional Content', description: 'Local languages', color: 'bg-teal-50 border-teal-200 text-teal-600' },
    { icon: MessageSquare, title: 'WhatsApp Campaigns', description: 'Auto delivery', color: 'bg-emerald-50 border-emerald-200 text-emerald-600' }
  ];

  const loyaltyFeatures = [
    { icon: Sparkles, label: 'AI tier upgrades' },
    { icon: Gift, label: 'Personalized rewards' },
    { icon: Gamepad2, label: 'Gamification' },
    { icon: Users, label: 'Contractor tracking' }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-3"
        >
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Marketing & Loyalty
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
        >
          {slide.headline}
        </motion.h2>

        {/* Two-Column Layout */}
        <div className="flex-1 flex gap-8 min-h-0">
          {/* Left: Marketing Capabilities */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">AI Marketing Demand Engine</h3>
            
            {/* 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3 flex-1">
              {marketingCaps.map((cap, index) => {
                const IconComponent = cap.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    className={`p-4 rounded-xl border ${cap.color}`}
                  >
                    <IconComponent className="w-6 h-6 mb-2" />
                    <h4 className="text-sm font-bold text-slate-800 mb-1">{cap.title}</h4>
                    <p className="text-xs text-slate-600">{cap.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Marketing Impact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center"
            >
              <span className="text-lg font-bold text-emerald-700">20–30%</span>
              <span className="text-xs text-slate-600 ml-2">marketing ROI improvement</span>
            </motion.div>
          </div>

          {/* Right: Loyalty Evolution */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Loyalty 2.0</h3>
            
            {/* Evolution Visual */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              {/* Before */}
              <div className="flex flex-col items-center p-3 bg-slate-100 rounded-lg border border-slate-200">
                <Trophy className="w-6 h-6 text-slate-500 mb-1" />
                <span className="text-xs font-semibold text-slate-700">Points Program</span>
                <span className="text-[10px] text-slate-500">Transactional</span>
              </div>

              {/* Arrow */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex items-center"
              >
                <div className="w-8 h-0.5 bg-gradient-to-r from-slate-300 to-amber-500" />
                <ArrowRight className="w-5 h-5 text-amber-500 -ml-1" />
              </motion.div>

              {/* After */}
              <div className="flex flex-col items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                <Sparkles className="w-6 h-6 text-amber-600 mb-1" />
                <span className="text-xs font-semibold text-amber-800">Engagement</span>
                <span className="text-[10px] text-amber-600">Relationship-Driven</span>
              </div>
            </motion.div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 flex-1">
              {loyaltyFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.08, duration: 0.3 }}
                    className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <IconComponent className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span className="text-xs font-medium text-slate-700">{feature.label}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Loyalty Impact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-center"
            >
              <span className="text-xs text-slate-600">Loyalty value: </span>
              <span className="text-sm font-bold text-amber-700">₹40–80 Cr</span>
            </motion.div>
          </div>
        </div>

        {/* Combined Impact Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-4 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <span className="text-xs font-medium text-slate-600">Combined Impact:</span>
            <span className="text-base font-bold text-emerald-700">{slide.loyaltyImpact}</span>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
