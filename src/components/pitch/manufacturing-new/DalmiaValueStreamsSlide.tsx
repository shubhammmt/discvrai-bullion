import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { DollarSign, Users, PieChart, Megaphone, BarChart3, FileCheck } from 'lucide-react';

interface DalmiaValueStreamsSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaValueStreamsSlide: React.FC<DalmiaValueStreamsSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const streams = [
    { name: 'AI Pricing Engine', description: 'Dynamic price optimization', icon: DollarSign, color: 'from-amber-500 to-orange-500' },
    { name: 'Sales Copilot', description: 'AI-powered sales intelligence', icon: Users, color: 'from-blue-500 to-indigo-500' },
    { name: 'Dealer 360', description: 'Unified dealer intelligence', icon: PieChart, color: 'from-emerald-500 to-teal-500' },
    { name: 'AI Marketing Radar', description: 'Hyperlocal demand sensing', icon: Megaphone, color: 'from-purple-500 to-pink-500' },
    { name: 'Demand Planning', description: 'Predictive forecasting', icon: BarChart3, color: 'from-cyan-500 to-blue-500' },
    { name: 'Touchless O2C', description: 'End-to-end automation', icon: FileCheck, color: 'from-rose-500 to-red-500' }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col items-center justify-center h-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
        >
          {slide.headline}
        </motion.h1>

        <div className="grid grid-cols-3 gap-6 max-w-5xl">
          {streams.map((stream, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stream.color} flex items-center justify-center mx-auto mb-4`}>
                <stream.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{stream.name}</h3>
              <p className="text-sm text-slate-500">{stream.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
