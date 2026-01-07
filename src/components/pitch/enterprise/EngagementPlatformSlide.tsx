import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Trophy, Sparkles, Target, CheckCircle2 } from 'lucide-react';

interface EngagementPlatformSlideProps {
  slide: {
    title: string;
    subtitle: string;
    mechanics: Array<{
      type: string;
      examples: string[];
    }>;
    outcomes: string[];
    useCases: string[];
  };
}

export const EngagementPlatformSlide: React.FC<EngagementPlatformSlideProps> = ({ slide }) => {
  const icons = [Trophy, Sparkles, Target];
  
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-12 relative overflow-hidden">
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/10 flex items-center justify-center">
            <Gamepad2 className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-white">{slide.title}</h2>
            <p className="text-xl text-white/50">{slide.subtitle}</p>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {slide.mechanics.map((mechanic, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-medium text-white">{mechanic.type}</h3>
                </div>
                <div className="space-y-2">
                  {mechanic.examples.map((example, i) => (
                    <p key={i} className="text-white/50 text-sm">• {example}</p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl p-6"
          >
            <h4 className="text-sm uppercase tracking-wider text-amber-400/80 mb-4">Results</h4>
            <div className="space-y-2">
              {slide.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400/70 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{outcome}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/[0.02] border border-white/10 rounded-xl p-6"
          >
            <h4 className="text-sm uppercase tracking-wider text-white/50 mb-4">Perfect For</h4>
            <div className="flex flex-wrap gap-2">
              {slide.useCases.map((useCase, index) => (
                <span key={index} className="text-white/60 text-sm bg-white/5 px-3 py-1.5 rounded-full">
                  {useCase}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
