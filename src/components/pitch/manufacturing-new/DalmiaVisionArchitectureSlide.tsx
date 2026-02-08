import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { ExecutionStackDiagram, StackLayer } from '../shared/ExecutionStackDiagram';
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Users,
  Smartphone,
  Monitor,
  MessageCircle,
  Globe,
  DollarSign,
  UserCheck,
  Megaphone,
  FileCheck,
  Brain,
  AlertTriangle,
  CreditCard,
  Heart,
  Database,
  ShoppingCart,
  Award,
  Cloud,
  ArrowRight,
  Layers,
  LayoutGrid
} from 'lucide-react';

interface DalmiaVisionArchitectureSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaVisionArchitectureSlide: React.FC<DalmiaVisionArchitectureSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const executionLayers: StackLayer[] = [
    {
      label: 'Business Outcomes',
      colorScheme: 'amber',
      items: [
        { icon: TrendingUp, label: '₹320–530 Cr', description: 'Revenue Growth' },
        { icon: TrendingDown, label: '₹340–650 Cr', description: 'Cost Savings' },
        { icon: Zap, label: '80% Faster', description: 'Decisions' },
        { icon: Users, label: '25% Better', description: 'Retention' }
      ]
    },
    {
      label: 'Platform Ecosystem',
      colorScheme: 'teal',
      items: [
        { icon: Smartphone, label: 'SUVIDHA 2.0' },
        { icon: Monitor, label: 'SM@RT-D' },
        { icon: MessageCircle, label: 'WhatsApp' },
        { icon: Globe, label: 'Dealer Portal' }
      ]
    },
    {
      label: 'Agentic Workflows',
      colorScheme: 'purple',
      items: [
        { icon: DollarSign, label: 'Pricing' },
        { icon: UserCheck, label: 'Sales' },
        { icon: Megaphone, label: 'Marketing' },
        { icon: FileCheck, label: 'O2C' }
      ]
    },
    {
      label: 'AI Intelligence',
      colorScheme: 'blue',
      items: [
        { icon: Brain, label: 'Demand' },
        { icon: AlertTriangle, label: 'Churn' },
        { icon: CreditCard, label: 'Credit' },
        { icon: Heart, label: 'Sentiment' }
      ]
    },
    {
      label: 'Data Foundation',
      colorScheme: 'slate',
      items: [
        { icon: Database, label: 'SAP' },
        { icon: ShoppingCart, label: 'SUVIDHA' },
        { icon: Award, label: 'Loyalty' },
        { icon: Cloud, label: 'External' }
      ]
    }
  ];

  const themeNavigation = [
    { name: 'Data Platform', slide: 20 },
    { name: 'Sales & Channel', slide: 21 },
    { name: 'Supply Chain', slide: 22 },
    { name: 'Digital Trust', slide: 23 },
    { name: 'Margin Intel', slide: 24 }
  ];

  const fromSystems = ['SUVIDHA', 'SM@RT-D', 'Loyalty', 'Drivers'];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0 items-center text-center px-4">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-1"
        >
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">
            Vision & Architecture
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-xl md:text-2xl font-bold text-slate-900 mb-2"
        >
          {slide.headline}
        </motion.h2>

        {/* Total Value Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-3 w-full max-w-xl"
        >
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-300 rounded-lg px-4 py-2 shadow-sm">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="text-center">
                <span className="text-lg md:text-xl font-bold text-amber-700">₹870–1,720 Cr</span>
                <span className="text-xs text-amber-600 ml-1">/ year</span>
              </div>
              <div className="h-6 w-px bg-amber-300 hidden sm:block" />
              <div className="flex gap-4 text-xs">
                <div className="text-center">
                  <div className="font-semibold text-slate-700">Investment</div>
                  <div className="text-amber-600 font-medium">₹106–202 Cr</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-slate-700">ROI</div>
                  <div className="text-amber-600 font-bold">8–10×</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* From → To Bridge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-3 w-full max-w-lg"
        >
          <div className="flex items-center justify-center gap-3">
            {/* From State */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex-1 max-w-[180px]"
            >
              <div className="bg-slate-100 border border-slate-300 rounded-lg p-2">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <LayoutGrid className="w-3 h-3 text-slate-500" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase">Today</span>
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                  {fromSystems.map((system, i) => (
                    <span key={i} className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                      {system}
                    </span>
                  ))}
                </div>
                <div className="text-[9px] text-slate-500 mt-1">4 Disconnected Tools</div>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="flex-shrink-0"
            >
              <div className="bg-teal-500 rounded-full p-1.5">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </motion.div>

            {/* To State */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="flex-1 max-w-[180px]"
            >
              <div className="bg-teal-50 border-2 border-teal-400 rounded-lg p-2">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Layers className="w-3 h-3 text-teal-600" />
                  <span className="text-[10px] font-bold text-teal-700 uppercase">Tomorrow</span>
                </div>
                <div className="text-xs font-semibold text-teal-700">Unified AI Platform</div>
                <div className="text-[9px] text-teal-600 mt-0.5">Single Intelligence Layer</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Execution Stack Diagram */}
        <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden w-full">
          <ExecutionStackDiagram 
            layers={executionLayers} 
            animate={true}
            compact={true}
            showPulse={true}
          />
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-2 text-center"
        >
          <p className="text-xs text-slate-600 italic">
            "Dalmia evolves from <span className="font-semibold text-slate-800">manufacturer</span> to{' '}
            <span className="font-semibold text-teal-600">commercial platform</span>"
          </p>
        </motion.div>

        {/* Navigation Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="mt-2 mb-1"
        >
          <div className="flex items-center justify-center gap-1 flex-wrap">
            <span className="text-[9px] text-slate-500 mr-1">Deep Dives:</span>
            {themeNavigation.map((theme, i) => (
              <React.Fragment key={theme.slide}>
                <span className="text-[9px] text-slate-600">
                  <span className="font-medium">{theme.name}</span>
                  <span className="text-slate-400 ml-0.5">({theme.slide})</span>
                </span>
                {i < themeNavigation.length - 1 && (
                  <span className="text-slate-300 mx-0.5">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
