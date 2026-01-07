import React from 'react';
import { motion } from 'framer-motion';
import { Puzzle, Code, Layers, Box, ArrowRight } from 'lucide-react';

interface IntegrationPathsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    paths: Array<{
      type: string;
      description: string;
      examples: string[];
      timeline: string;
      effort: string;
    }>;
    guarantee: string;
  };
}

const pathIcons = [Code, Box, Layers];
const pathColors = [
  { bg: 'from-blue-500/20 to-blue-400/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  { bg: 'from-emerald-500/20 to-emerald-400/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  { bg: 'from-violet-500/20 to-violet-400/10', text: 'text-violet-400', border: 'border-violet-500/30' }
];

export const IntegrationPathsSlide: React.FC<IntegrationPathsSlideProps> = ({ slide }) => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-12 relative overflow-hidden">
      <div className="max-w-6xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
            <Puzzle className="w-7 h-7 text-white/70" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-white">{slide.title}</h2>
            <p className="text-xl text-white/50">{slide.subtitle}</p>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {slide.paths.map((path, index) => {
            const Icon = pathIcons[index];
            const colors = pathColors[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.15 }}
                className={`bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:${colors.border} transition-all`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                
                <h3 className="text-xl font-medium text-white mb-2">{path.type}</h3>
                <p className="text-white/60 text-sm mb-4">{path.description}</p>
                
                <div className="space-y-2 mb-4">
                  {path.examples.map((example, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <ArrowRight className={`w-3 h-3 ${colors.text} flex-shrink-0`} />
                      <span className="text-white/50 text-xs">{example}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider">Timeline</p>
                      <p className={`${colors.text} font-medium`}>{path.timeline}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/40 text-xs uppercase tracking-wider">Effort</p>
                      <p className="text-white/70 font-medium">{path.effort}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <p className="text-white/60 italic">{slide.guarantee}</p>
        </motion.div>
      </div>
    </div>
  );
};
