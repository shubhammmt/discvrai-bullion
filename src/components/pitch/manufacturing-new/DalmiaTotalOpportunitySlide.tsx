import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { DollarSign, Users, PieChart, Megaphone, BarChart3, FileCheck, LayoutDashboard, TrendingUp, Wallet } from 'lucide-react';

interface DalmiaTotalOpportunitySlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaTotalOpportunitySlide: React.FC<DalmiaTotalOpportunitySlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const opportunities = [
    { name: 'AI Pricing Engine', metric: '1-2% margin uplift', range: '₹140–280 Cr', icon: DollarSign, type: 'revenue' },
    { name: 'Sales Copilot', metric: '8-15% productivity', range: '₹80–150 Cr', icon: Users, type: 'revenue' },
    { name: 'Dealer 360', metric: 'Retention improvement', range: '₹60–120 Cr', icon: PieChart, type: 'revenue' },
    { name: 'AI Marketing Radar', metric: '20-30% ROI', range: '₹40–80 Cr', icon: Megaphone, type: 'revenue' },
    { name: 'Demand Planning', metric: 'Forecast accuracy', range: '₹100–200 Cr', icon: BarChart3, type: 'savings' },
    { name: 'Touchless O2C', metric: 'DSO reduction', range: '₹150–300 Cr', icon: FileCheck, type: 'savings' },
    { name: 'Dashboarding', metric: 'Decision velocity', range: '₹50–90 Cr', icon: LayoutDashboard, type: 'savings' }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{slide.headline}</h1>
          <p className="text-slate-500">Value Calculation by Initiative</p>
        </motion.div>

        {/* Value Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Initiative</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Impact Metric</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Value Range</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        item.type === 'revenue' 
                          ? 'bg-gradient-to-br from-amber-500 to-orange-500' 
                          : 'bg-gradient-to-br from-teal-500 to-emerald-500'
                      }`}>
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-slate-800">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{item.metric}</td>
                  <td className="py-3 px-4 text-right font-semibold text-slate-900">{item.range}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Subtotals */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-medium text-amber-800 uppercase tracking-wide">Revenue Uplift</span>
            </div>
            <p className="text-2xl font-bold text-amber-900">₹320–530 Cr</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55 }}
            className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-teal-600" />
              <span className="text-sm font-medium text-teal-800 uppercase tracking-wide">Savings & Efficiency</span>
            </div>
            <p className="text-2xl font-bold text-teal-900">₹340–650 Cr</p>
          </motion.div>
        </div>

        {/* Total */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl p-6 text-center"
        >
          <p className="text-amber-400 text-sm font-medium uppercase tracking-wider mb-2">Total Opportunity</p>
          <p className="text-4xl font-bold text-white mb-3">₹870–1,720 Cr</p>
          <div className="inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full">
            <span className="text-amber-400 font-bold text-lg">ROI: 50×</span>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
