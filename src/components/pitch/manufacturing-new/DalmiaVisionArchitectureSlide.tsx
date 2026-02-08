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
  Cloud
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
        { icon: TrendingUp, label: 'Revenue ↑' },
        { icon: TrendingDown, label: 'Cost ↓' },
        { icon: Zap, label: 'Speed ↑' },
        { icon: Users, label: 'Retention ↑' }
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

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0 items-center text-center">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-2"
        >
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Vision & Architecture
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"
        >
          {slide.headline}
        </motion.h2>

        {/* Execution Stack Diagram */}
        <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden">
          <ExecutionStackDiagram 
            layers={executionLayers} 
            animate={true}
            compact={true}
          />
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-3 text-center"
        >
          <p className="text-sm text-slate-600 italic">
            "Dalmia evolves from <span className="font-semibold text-slate-800">manufacturer</span> to{' '}
            <span className="font-semibold text-teal-600">commercial platform</span>"
          </p>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
