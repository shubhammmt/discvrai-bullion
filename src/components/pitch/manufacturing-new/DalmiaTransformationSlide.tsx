import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { 
  ArrowRight, 
  Calculator, 
  TrendingUp, 
  Users, 
  Brain, 
  Megaphone, 
  Target, 
  Clock, 
  Network,
  LucideIcon
} from 'lucide-react';

interface DalmiaTransformationSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

interface Transformation {
  old: string;
  new: string;
  oldIcon: LucideIcon;
  newIcon: LucideIcon;
}

export const DalmiaTransformationSlide: React.FC<DalmiaTransformationSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const transformations: Transformation[] = [
    {
      old: 'Manual pricing',
      new: 'Dynamic pricing',
      oldIcon: Calculator,
      newIcon: TrendingUp
    },
    {
      old: 'Relationship-driven sales',
      new: 'Predictive sales intelligence',
      oldIcon: Users,
      newIcon: Brain
    },
    {
      old: 'Mass marketing',
      new: 'AI marketing',
      oldIcon: Megaphone,
      newIcon: Target
    },
    {
      old: 'Reactive demand planning',
      new: 'Digital ecosystems',
      oldIcon: Clock,
      newIcon: Network
    }
  ];

  const metrics = [
    { value: '2-3%', label: 'Margin uplift' },
    { value: '40%', label: 'Sales productivity' },
    { value: '80%+', label: 'Digital adoption' }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col h-full">
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-4"
        >
          <span className="px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest rounded-full">
            Transformation
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center"
        >
          {slide.headline}
        </motion.h1>

        {/* Transformation Table */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
          {/* Header Row */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">
                Old Model
              </span>
            </motion.div>
            <div className="w-12" />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <span className="text-sm font-bold text-amber-600 uppercase tracking-wide">
                New Model
              </span>
            </motion.div>
          </div>

          {/* Transformation Rows */}
          <div className="space-y-3">
            {transformations.map((item, index) => {
              const OldIcon = item.oldIcon;
              const NewIcon = item.newIcon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center"
                >
                  {/* Old Model Item */}
                  <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-300 flex items-center justify-center flex-shrink-0">
                      <OldIcon className="w-5 h-5 text-slate-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-600">{item.old}</span>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-md"
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </motion.div>

                  {/* New Model Item */}
                  <div className="flex items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl px-4 py-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <NewIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{item.new}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Metrics Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-6 mt-6"
          >
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="text-center bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm"
              >
                <div className="text-xl font-bold text-amber-600">{metric.value}</div>
                <div className="text-xs text-slate-500 font-medium">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-4 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl px-6 py-3 text-center"
        >
          <p className="text-white font-medium text-sm">
            The leaders are already operating in the new model.
          </p>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
