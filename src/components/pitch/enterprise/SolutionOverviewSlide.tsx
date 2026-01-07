import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, LineChart, Gamepad2, LucideIcon } from 'lucide-react';

interface SolutionOverviewSlideProps {
  slide: {
    title: string;
    subtitle: string;
    proposition: string;
    pillars: Array<{
      title: string;
      description: string;
      icon: LucideIcon;
    }>;
    differentiator: string;
  };
}

const iconColors = [
  'from-blue-500/20 to-blue-400/10',
  'from-emerald-500/20 to-emerald-400/10',
  'from-violet-500/20 to-violet-400/10',
  'from-amber-500/20 to-amber-400/10'
];

const textColors = ['text-blue-400', 'text-emerald-400', 'text-violet-400', 'text-amber-400'];

export const SolutionOverviewSlide: React.FC<SolutionOverviewSlideProps> = ({ slide }) => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-12 relative overflow-hidden">
      {/* Accent gradients */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-3">{slide.title}</h2>
          <p className="text-xl text-white/50">{slide.subtitle}</p>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-white/70 max-w-3xl mb-10 leading-relaxed"
        >
          {slide.proposition}
        </motion.p>
        
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {slide.pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconColors[index]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${textColors[index]}`} />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{pillar.title}</h3>
                <p className="text-sm text-white/50">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <div className="inline-block bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 rounded-full px-8 py-3">
            <p className="text-white/90 font-medium">{slide.differentiator}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
