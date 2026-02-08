import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { 
  Database, 
  Smartphone, 
  Users, 
  Truck,
  Brain,
  Layers,
  TrendingUp,
  Target,
  Bell,
  LineChart,
  Boxes,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface DalmiaTodayFutureSlideV2Props {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaTodayFutureSlideV2: React.FC<DalmiaTodayFutureSlideV2Props> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const todayItems = [
    { icon: Database, label: 'SAP Backbone', desc: 'Transactional core system' },
    { icon: Smartphone, label: 'SUVIDHA Dealer App', desc: 'Digital dealer interactions' },
    { icon: Users, label: 'Relationship-Driven Sales', desc: 'Field team operations' },
    { icon: Truck, label: 'Logistics & Dispatch', desc: 'Transport systems' },
    { icon: Boxes, label: 'Fragmented Data', desc: 'Siloed across systems' },
    { icon: AlertTriangle, label: 'Manual Intelligence', desc: 'Reactive decision-making' }
  ];

  const futureCapabilities = [
    { icon: Users, label: 'Dealer Intelligence Platform', desc: 'Unified dealer view' },
    { icon: LineChart, label: 'AI Demand Forecasting', desc: 'Predictive planning' },
    { icon: Target, label: 'Dynamic Pricing & Margins', desc: 'Real-time optimization' },
    { icon: Truck, label: 'Predictive Logistics', desc: 'Proactive planning' },
    { icon: TrendingUp, label: 'AI Sales Recommendations', desc: 'Intelligent copilots' },
    { icon: Bell, label: 'Autonomous Alerts', desc: 'Decision support' }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0 px-8 py-3">
        {/* Header */}
        <div className="mb-3">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
            Dalmia Opportunity
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Dalmia Today vs AI-Centric Future
          </h2>
        </div>

        {/* Main Content - Two Columns with Center Arrow */}
        <div className="flex-1 flex gap-3 min-h-0">
          {/* Left Column - Dalmia Today */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col"
          >
            <div className="text-center mb-3 pb-2 border-b border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Current State
              </span>
              <h3 className="text-sm font-bold text-slate-700 mt-0.5">
                Dalmia Today
              </h3>
            </div>
            
            {/* Today Items */}
            <div className="space-y-1.5 mb-3">
              {todayItems.map((item, index) => {
                const IconComponent = item.icon;
                const isWarning = item.icon === AlertTriangle;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.04, duration: 0.3 }}
                    className={`flex items-center gap-2 p-1.5 rounded-md ${
                      isWarning ? 'bg-amber-50 border border-amber-200' : 'bg-white border border-slate-100'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                      isWarning ? 'bg-amber-100' : 'bg-slate-100'
                    }`}>
                      <IconComponent className={`w-3 h-3 ${isWarning ? 'text-amber-600' : 'text-slate-500'}`} />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-[11px] font-medium leading-tight ${isWarning ? 'text-amber-700' : 'text-slate-700'}`}>
                        {item.label}
                      </div>
                      <div className="text-[9px] text-slate-400 leading-tight">{item.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Disconnected Architecture Diagram */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="mt-auto bg-white rounded-lg border border-slate-200 p-2"
            >
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide text-center mb-2">
                Disconnected Systems
              </div>
              <div className="flex justify-center gap-1.5 flex-wrap">
                {['SAP', 'Dealer App', 'Sales Teams', 'Logistics'].map((system, idx) => (
                  <div key={idx} className="px-2 py-1 bg-slate-100 rounded text-[9px] text-slate-600 border border-dashed border-slate-300">
                    {system}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Center Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center shadow-lg">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          {/* Right Column - AI-Centric Future */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex-1 bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 rounded-xl p-4 flex flex-col"
          >
            <div className="text-center mb-3 pb-2 border-b border-blue-200">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                Target State
              </span>
              <h3 className="text-sm font-bold text-slate-800 mt-0.5">
                AI-Centric Future
              </h3>
            </div>
            
            {/* Future Capabilities */}
            <div className="space-y-1.5 mb-3">
              {futureCapabilities.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.04, duration: 0.3 }}
                    className="flex items-center gap-2 p-1.5 bg-white/80 rounded-md border border-blue-100"
                  >
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-3 h-3 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-medium text-slate-800 leading-tight">{item.label}</div>
                      <div className="text-[9px] text-blue-600/70 leading-tight">{item.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Unified Architecture Diagram */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
              className="mt-auto bg-white/80 rounded-lg border border-blue-200 p-2"
            >
              <div className="text-[9px] font-bold text-blue-600 uppercase tracking-wide text-center mb-2">
                Unified AI Platform
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-center gap-1">
                  {['All Systems'].map((item, idx) => (
                    <div key={idx} className="px-2 py-0.5 bg-slate-100 rounded text-[8px] text-slate-600">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-3 h-3 text-slate-400 rotate-90" />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Layers className="w-3 h-3 text-blue-500" />
                  <span className="text-[8px] text-blue-600 font-medium">Unified Data Layer</span>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-3 h-3 text-slate-400 rotate-90" />
                </div>
                <div className="flex items-center justify-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-100 to-teal-100 rounded border border-dashed border-blue-400">
                  <Brain className="w-3 h-3 text-blue-600" />
                  <span className="text-[8px] text-blue-700 font-semibold">AI Intelligence Layer</span>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-3 h-3 text-slate-400 rotate-90" />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Target className="w-3 h-3 text-teal-500" />
                  <span className="text-[8px] text-teal-600 font-medium">Commercial Decision Engine</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Transformation Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="mt-3 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg p-3"
        >
          <div className="flex items-center justify-center gap-3">
            <Brain className="w-5 h-5 text-white/80" />
            <p className="text-xs text-white font-medium">
              Dalmia has already digitized operations. The next leap is <span className="font-bold">AI-driven commercial intelligence</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
