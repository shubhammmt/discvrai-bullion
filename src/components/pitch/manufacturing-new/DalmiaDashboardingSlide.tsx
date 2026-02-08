import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { LayoutDashboard, TrendingUp, PieChart, FileBarChart, Eye, Zap } from 'lucide-react';

interface DalmiaDashboardingSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaDashboardingSlide: React.FC<DalmiaDashboardingSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const capabilities = [
    { icon: TrendingUp, label: 'Real-time KPIs', description: 'Live commercial metrics' },
    { icon: PieChart, label: 'Executive Dashboards', description: 'CXO-level insights' },
    { icon: FileBarChart, label: 'Predictive Analytics', description: 'AI-powered forecasts' },
    { icon: Eye, label: 'Custom Reports', description: 'Role-based views' }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center mx-auto mb-4">
            <LayoutDashboard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            {slide.headline}
          </h1>
          <p className="text-slate-500">End-to-end analytics for data-driven decisions</p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-4 gap-6 max-w-4xl mb-10">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-slate-100 p-5 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-100 to-violet-100 flex items-center justify-center mx-auto mb-3">
                <cap.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{cap.label}</h3>
              <p className="text-xs text-slate-500">{cap.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Impact Metric */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl px-8 py-5 flex items-center gap-4"
        >
          <Zap className="w-8 h-8 text-white" />
          <div>
            <p className="text-indigo-100 text-sm">Impact</p>
            <p className="text-white font-bold text-lg">100% visibility across commercial operations</p>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
