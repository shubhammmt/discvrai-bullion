import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { DollarSign, Users, PieChart, Megaphone, BarChart3, FileCheck, LayoutDashboard, TrendingUp, Wallet, LucideIcon } from 'lucide-react';

interface DalmiaTotalOpportunitySlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

interface OpportunityItem {
  name: string;
  metric: string;
  range: string;
  icon: LucideIcon;
}

export const DalmiaTotalOpportunitySlide: React.FC<DalmiaTotalOpportunitySlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const revenueOpportunities: OpportunityItem[] = [
    { name: 'AI Pricing Engine', metric: '1-2% margin uplift', range: '₹180–350 Cr', icon: DollarSign },
    { name: 'Sales Copilot', metric: '8-15% productivity', range: '₹100–200 Cr', icon: Users },
    { name: 'Dealer 360', metric: 'Retention improvement', range: '₹80–160 Cr', icon: PieChart },
    { name: 'AI Marketing Radar', metric: '20-30% ROI', range: '₹60–120 Cr', icon: Megaphone }
  ];

  const savingsOpportunities: OpportunityItem[] = [
    { name: 'Demand Planning', metric: 'Forecast accuracy', range: '₹150–300 Cr', icon: BarChart3 },
    { name: 'Touchless O2C', metric: 'DSO reduction', range: '₹200–400 Cr', icon: FileCheck },
    { name: 'Dashboarding & Insights', metric: 'Decision velocity', range: '₹100–190 Cr', icon: LayoutDashboard }
  ];

  const TableRow = ({ item, index, colorClass }: { item: OpportunityItem; index: number; colorClass: string }) => {
    const IconComponent = item.icon;
    return (
      <motion.tr
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 + index * 0.04 }}
        className="border-b border-slate-100 last:border-0"
      >
        <td className="py-2 px-3">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded flex items-center justify-center ${colorClass}`}>
              <IconComponent className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-800">{item.name}</span>
          </div>
        </td>
        <td className="py-2 px-3 text-xs text-slate-600">{item.metric}</td>
        <td className="py-2 px-3 text-right text-sm font-semibold text-slate-900">{item.range}</td>
      </motion.tr>
    );
  };

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h1 className="text-2xl font-bold text-slate-900 mb-1">{slide.headline}</h1>
          <p className="text-sm text-slate-500">Value Calculation by Initiative</p>
        </motion.div>

        {/* Two Tables Side by Side */}
        <div className="grid grid-cols-2 gap-4 mb-4 flex-1">
          {/* Revenue Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wide">Revenue Uplift</h3>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl overflow-hidden flex-1">
              <table className="w-full">
                <thead>
                  <tr className="bg-amber-100/50 border-b border-amber-200">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-amber-800">Initiative</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-amber-800">Impact</th>
                    <th className="text-right py-2 px-3 text-xs font-semibold text-amber-800">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueOpportunities.map((item, index) => (
                    <TableRow 
                      key={index} 
                      item={item} 
                      index={index} 
                      colorClass="bg-gradient-to-br from-amber-500 to-orange-500"
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-amber-100 border-t border-amber-300">
                    <td colSpan={2} className="py-2 px-3 text-sm font-bold text-amber-800">Subtotal</td>
                    <td className="py-2 px-3 text-right text-lg font-bold text-amber-900">₹420–830 Cr</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>

          {/* Savings Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-teal-600" />
              <h3 className="text-sm font-bold text-teal-800 uppercase tracking-wide">Savings & Efficiency</h3>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-xl overflow-hidden flex-1">
              <table className="w-full">
                <thead>
                  <tr className="bg-teal-100/50 border-b border-teal-200">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-teal-800">Initiative</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-teal-800">Impact</th>
                    <th className="text-right py-2 px-3 text-xs font-semibold text-teal-800">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {savingsOpportunities.map((item, index) => (
                    <TableRow 
                      key={index} 
                      item={item} 
                      index={index + 4} 
                      colorClass="bg-gradient-to-br from-teal-500 to-emerald-500"
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-teal-100 border-t border-teal-300">
                    <td colSpan={2} className="py-2 px-3 text-sm font-bold text-teal-800">Subtotal</td>
                    <td className="py-2 px-3 text-right text-lg font-bold text-teal-900">₹450–890 Cr</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Total */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <p className="text-amber-400 text-sm font-medium uppercase tracking-wider">Total Opportunity</p>
            <p className="text-3xl font-bold text-white">₹870–1,720 Cr</p>
          </div>
          <div className="inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full">
            <span className="text-amber-400 font-bold text-lg">ROI: 50×</span>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
