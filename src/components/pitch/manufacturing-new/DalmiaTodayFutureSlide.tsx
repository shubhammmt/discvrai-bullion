import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { 
  Database, 
  Smartphone, 
  Users, 
  Truck, 
  AlertTriangle,
  ArrowRight,
  Brain,
  Layers
} from 'lucide-react';

interface DalmiaTodayFutureSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaTodayFutureSlide: React.FC<DalmiaTodayFutureSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const todayItems = [
    { icon: Database, label: 'SAP Backbone', desc: 'Core ERP system' },
    { icon: Smartphone, label: 'SUVIDHA App', desc: 'Dealer ordering' },
    { icon: Users, label: 'Sales Teams', desc: 'Field force' },
    { icon: Truck, label: 'Logistics', desc: 'Transport systems' },
    { icon: AlertTriangle, label: 'Fragmented Intelligence', desc: 'Siloed insights' }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0 px-8 py-4">
        {/* Header */}
        <div className="mb-4">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
            Dalmia Opportunity
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {slide.headline}
          </h2>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center gap-6">
          {/* Today Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-5"
          >
            <div className="text-center mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Today</span>
              <h3 className="text-lg font-bold text-slate-800 mt-1">Disconnected Systems</h3>
            </div>
            
            <div className="space-y-3">
              {todayItems.map((item, index) => {
                const IconComponent = item.icon;
                const isWarning = item.icon === AlertTriangle;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      isWarning ? 'bg-amber-50 border border-amber-200' : 'bg-white border border-slate-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isWarning ? 'bg-amber-100' : 'bg-slate-100'
                    }`}>
                      <IconComponent className={`w-4 h-4 ${isWarning ? 'text-amber-600' : 'text-slate-600'}`} />
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${isWarning ? 'text-amber-700' : 'text-slate-800'}`}>
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-500">{item.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Future Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex-1 bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 rounded-xl p-5"
          >
            <div className="text-center mb-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Future</span>
              <h3 className="text-lg font-bold text-slate-800 mt-1">Unified AI Platform</h3>
            </div>
            
            {/* Architecture Visualization */}
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="bg-white/80 border border-blue-200 rounded-lg p-4 text-center"
              >
                <Layers className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-slate-800">Unified Data Layer</div>
                <div className="text-xs text-slate-500">Single source of truth</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="bg-gradient-to-r from-blue-100 to-teal-100 border-2 border-dashed border-blue-400 rounded-lg p-4 text-center"
              >
                <Brain className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-blue-700">AI Intelligence Layer</div>
                <div className="text-xs text-blue-600">Discvr AI</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="bg-white/80 border border-teal-200 rounded-lg p-4 text-center"
              >
                <Users className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-slate-800">Connected Ecosystem</div>
                <div className="text-xs text-slate-500">Sales, Dealers, Partners</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
