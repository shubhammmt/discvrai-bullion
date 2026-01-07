import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, X, Check, Zap } from 'lucide-react';

interface EnterpriseROISlideProps {
  slide: {
    title: string;
    subtitle: string;
    comparison: {
      buildInHouse: {
        cost: string;
        timeline: string;
        team: string;
        risk: string;
      };
      withDiscvr: {
        cost: string;
        timeline: string;
        team: string;
        risk: string;
      };
    };
    savings: string[];
    valueDrivers: Array<{ driver: string; impact: string }>;
  };
}

export const EnterpriseROISlide: React.FC<EnterpriseROISlideProps> = ({ slide }) => {
  const comparisonRows = [
    { label: 'Cost', inHouse: slide.comparison.buildInHouse.cost, discvr: slide.comparison.withDiscvr.cost },
    { label: 'Timeline', inHouse: slide.comparison.buildInHouse.timeline, discvr: slide.comparison.withDiscvr.timeline },
    { label: 'Team Required', inHouse: slide.comparison.buildInHouse.team, discvr: slide.comparison.withDiscvr.team },
    { label: 'Risk', inHouse: slide.comparison.buildInHouse.risk, discvr: slide.comparison.withDiscvr.risk }
  ];
  
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-12 relative overflow-hidden">
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 flex items-center justify-center">
            <BarChart3 className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-white">{slide.title}</h2>
            <p className="text-xl text-white/50">{slide.subtitle}</p>
          </div>
        </motion.div>
        
        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden mb-8"
        >
          <div className="grid grid-cols-3 border-b border-white/10">
            <div className="p-4" />
            <div className="p-4 text-center border-x border-white/10 bg-red-500/5">
              <p className="text-white/50 text-sm uppercase tracking-wider">Build In-House</p>
            </div>
            <div className="p-4 text-center bg-emerald-500/5">
              <p className="text-emerald-400 text-sm uppercase tracking-wider">With DISCVR</p>
            </div>
          </div>
          
          {comparisonRows.map((row, index) => (
            <div key={index} className="grid grid-cols-3 border-b border-white/10 last:border-0">
              <div className="p-4 text-white/70 font-medium">{row.label}</div>
              <div className="p-4 text-center border-x border-white/10 text-white/50 text-sm">
                {row.inHouse}
              </div>
              <div className="p-4 text-center text-emerald-400/80 text-sm font-medium">
                {row.discvr}
              </div>
            </div>
          ))}
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Savings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl p-6"
          >
            <h4 className="text-sm uppercase tracking-wider text-emerald-400/80 mb-4">Your Savings</h4>
            <div className="space-y-3">
              {slide.savings.map((saving, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{saving}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Value Drivers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/[0.02] border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-amber-400" />
              <h4 className="text-sm uppercase tracking-wider text-white/50">Value Drivers</h4>
            </div>
            <div className="space-y-4">
              {slide.valueDrivers.map((vd, index) => (
                <div key={index}>
                  <p className="text-white font-medium mb-1">{vd.driver}</p>
                  <p className="text-white/50 text-sm">{vd.impact}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
