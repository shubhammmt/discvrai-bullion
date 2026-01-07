import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Users, Layers, TrendingDown } from 'lucide-react';

interface EnterpriseProblemSlideProps {
  slide: {
    title: string;
    subtitle: string;
    challenges: Array<{
      title: string;
      problem: string;
      impact: string;
    }>;
    bottomLine: string;
  };
}

const iconMap: Record<string, any> = {
  'Time & Cost': Clock,
  'Talent Gap': Users,
  'Integration Complexity': Layers,
  'Scale & Reliability': TrendingDown
};

export const EnterpriseProblemSlide: React.FC<EnterpriseProblemSlideProps> = ({ slide }) => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-12 relative overflow-hidden">
      {/* Red accent gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-3">{slide.title}</h2>
          <p className="text-xl text-white/50">{slide.subtitle}</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {slide.challenges.map((challenge, index) => {
            const Icon = iconMap[challenge.title] || AlertTriangle;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-xl p-6 hover:border-red-500/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-red-400/80" />
                  </div>
                  <h3 className="text-lg font-medium text-white">{challenge.title}</h3>
                </div>
                <p className="text-white/70 mb-3 text-sm leading-relaxed">{challenge.problem}</p>
                <p className="text-red-400/60 text-xs uppercase tracking-wider">
                  Impact: {challenge.impact}
                </p>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6 text-center"
        >
          <p className="text-lg text-white/90 font-light">{slide.bottomLine}</p>
        </motion.div>
      </div>
    </div>
  );
};
