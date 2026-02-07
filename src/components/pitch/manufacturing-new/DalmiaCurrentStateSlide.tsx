import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Users, Smartphone, Gift, Truck, ShoppingCart, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';

interface DalmiaCurrentStateSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCurrentStateSlide: React.FC<DalmiaCurrentStateSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const systemIcons = [Users, ShoppingCart, Smartphone, Gift, Truck];
  const systemLabels = ['Channel Partners', 'SUVIDHA', 'SM@RT-D', 'Dalmia Delight', 'DriverSathi'];

  const chartData = [
    { name: 'Dalmia', value: slide.benchmarkData?.dalmia || 35, fill: '#f59e0b' },
    { name: 'CEMEX GO', value: slide.benchmarkData?.benchmark || 93, fill: '#14b8a6' }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-2"
        >
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Current State & Gap
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"
        >
          {slide.headline}
        </motion.h2>

        {/* Vertical Layout */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Top: Dalmia Today */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Dalmia Today</h3>
            
            <div className="flex items-center gap-4">
              {/* Systems Grid - Horizontal */}
              <div className="flex gap-2 flex-1">
                {slide.bullets?.map((bullet, index) => {
                  const IconComponent = systemIcons[index] || Users;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.06, duration: 0.3 }}
                      className="flex flex-col items-center p-3 bg-slate-50 rounded-lg border border-slate-200 border-dashed flex-1"
                    >
                      <IconComponent className="w-5 h-5 text-slate-500 mb-1" />
                      <span className="text-[10px] font-medium text-slate-600 text-center leading-tight">
                        {systemLabels[index]}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Gap Callout - Inline */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg min-w-[280px]"
              >
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-semibold text-amber-800 uppercase tracking-wide">Gap</span>
                  <p className="text-xs text-slate-700">{slide.gap}</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom: Benchmark Gap */}
          <div className="flex-1 flex flex-col min-h-0">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Benchmark Gap</h3>
            
            <div className="flex items-center gap-6 flex-1">
              {/* Bar Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="h-28 flex-1 max-w-md"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 50 }}>
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} 
                      axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" width={80} 
                      axisLine={false} tickLine={false} tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                      {chartData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                      <LabelList dataKey="value" position="right" 
                        formatter={(v: number) => `${v}%`} 
                        style={{ fill: '#334155', fontWeight: 700, fontSize: 14 }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Gap Arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-amber-50 to-teal-50 rounded-xl border border-amber-100"
              >
                <span className="text-2xl font-bold text-amber-600">{slide.benchmarkData?.dalmia}%</span>
                <span className="text-slate-400 text-xl">→</span>
                <span className="text-2xl font-bold text-teal-600">{slide.benchmarkData?.benchmark}%</span>
                <span className="text-sm text-slate-500 ml-2">= 58 pts opportunity</span>
              </motion.div>

              {/* Value Callout */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="p-4 bg-teal-50 border border-teal-200 rounded-xl"
              >
                <p className="text-sm font-semibold text-teal-800">
                  Gap represents
                </p>
                <p className="text-lg font-bold text-teal-700 mt-1">
                  {slide.benchmarkData?.gapValue}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
