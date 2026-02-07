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
          className="mb-3"
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
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
        >
          {slide.headline}
        </motion.h2>

        {/* Two-Column Layout */}
        <div className="flex-1 flex gap-8 min-h-0">
          {/* Left: Today's Systems */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Dalmia Today</h3>
            
            {/* Systems Grid - Compact */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {slide.bullets?.map((bullet, index) => {
                const IconComponent = systemIcons[index] || Users;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.08, duration: 0.3 }}
                    className="flex flex-col items-center p-3 bg-slate-50 rounded-lg border border-slate-200 border-dashed"
                  >
                    <IconComponent className="w-5 h-5 text-slate-500 mb-1" />
                    <span className="text-[10px] font-medium text-slate-600 text-center leading-tight">
                      {systemLabels[index]}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Dotted Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="w-full h-4 mb-3"
            >
              <svg className="w-full h-full" viewBox="0 0 400 16">
                <line x1="20" y1="8" x2="380" y2="8" 
                  stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 6" />
              </svg>
            </motion.div>

            {/* Gap Callout */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg"
            >
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wide">Gap</span>
                <p className="text-sm text-slate-700">{slide.gap}</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Benchmark Comparison */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Benchmark Gap</h3>
            
            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="h-32 mb-4"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 50 }}>
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} 
                    axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={80} 
                    axisLine={false} tickLine={false} tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
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
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-teal-50 rounded-lg border border-amber-100 mb-3"
            >
              <span className="text-xl font-bold text-amber-600">{slide.benchmarkData?.dalmia}%</span>
              <span className="text-slate-400">→</span>
              <span className="text-xl font-bold text-teal-600">{slide.benchmarkData?.benchmark}%</span>
              <span className="text-xs text-slate-500 ml-2">= 58 pts opportunity</span>
            </motion.div>

            {/* Value Callout */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="p-4 bg-teal-50 border border-teal-200 rounded-lg text-center"
            >
              <p className="text-sm font-semibold text-teal-800">
                Gap represents {slide.benchmarkData?.gapValue}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
