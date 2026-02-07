import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';

interface DalmiaBenchmarkSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaBenchmarkSlide: React.FC<DalmiaBenchmarkSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const chartData = [
    { name: 'Dalmia', value: 35, fill: '#f59e0b' },
    { name: 'CEMEX GO (Global)', value: 93, fill: '#14b8a6' }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Benchmark Gap
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-8"
        >
          {slide.headline}
        </motion.h2>

        {/* Chart and Content */}
        <div className="flex-1 flex items-center gap-12">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex-1 h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 60 }}>
                <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} 
                  axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis type="category" dataKey="name" width={120} 
                  axisLine={false} tickLine={false} tick={{ fill: '#334155', fontSize: 14, fontWeight: 600 }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                  <LabelList dataKey="value" position="right" 
                    formatter={(v: number) => `${v}%`} 
                    style={{ fill: '#334155', fontWeight: 700, fontSize: 16 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Gap Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="w-80 space-y-4"
          >
            {slide.content?.map((item, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${
                  index === 2 
                    ? 'bg-teal-50 border-teal-200' 
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <p className={`text-base ${index === 2 ? 'text-teal-800 font-semibold' : 'text-slate-700'}`}>
                  {item}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gap Visual Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center mt-4"
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-100 to-teal-100 rounded-full border border-amber-200">
            <span className="text-2xl font-bold text-amber-600">35%</span>
            <span className="text-slate-400">→</span>
            <span className="text-2xl font-bold text-teal-600">93%</span>
            <span className="text-sm text-slate-600 ml-2">= 58 pts opportunity</span>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
