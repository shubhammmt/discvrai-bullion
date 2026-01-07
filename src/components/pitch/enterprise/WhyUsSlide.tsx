import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';

interface WhyUsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    differentiators: Array<{
      category: string;
      points: string[];
    }>;
    vsAlternatives: Array<{
      alternative: string;
      edge: string;
    }>;
  };
}

const categoryColors = [
  { bg: 'from-blue-500/20 to-blue-400/10', text: 'text-blue-400' },
  { bg: 'from-emerald-500/20 to-emerald-400/10', text: 'text-emerald-400' },
  { bg: 'from-violet-500/20 to-violet-400/10', text: 'text-violet-400' }
];

export const WhyUsSlide: React.FC<WhyUsSlideProps> = ({ slide }) => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-12 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/10 flex items-center justify-center">
            <Lightbulb className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-white">{slide.title}</h2>
            <p className="text-xl text-white/50">{slide.subtitle}</p>
          </div>
        </motion.div>
        
        {/* Differentiators */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {slide.differentiators.map((diff, index) => {
            const colors = categoryColors[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-6"
              >
                <div className={`inline-block bg-gradient-to-r ${colors.bg} rounded-full px-4 py-1 mb-4`}>
                  <span className={`${colors.text} text-sm font-medium`}>{diff.category}</span>
                </div>
                <div className="space-y-3">
                  {diff.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                      <span className="text-white/60 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* VS Alternatives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-white/[0.03] to-transparent border border-white/10 rounded-xl p-6"
        >
          <h4 className="text-sm uppercase tracking-wider text-white/50 mb-4">vs. Alternatives</h4>
          <div className="grid md:grid-cols-3 gap-6">
            {slide.vsAlternatives.map((vs, index) => (
              <div key={index} className="space-y-2">
                <p className="text-white/40 text-xs uppercase tracking-wider">{vs.alternative}</p>
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white/70 text-sm">{vs.edge}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
