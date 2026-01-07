import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Building2 } from 'lucide-react';

interface CaseStudySlideProps {
  slide: {
    title: string;
    subtitle: string;
    highlights: Array<{
      metric: string;
      description: string;
      context: string;
    }>;
    industries: string[];
  };
}

export const CaseStudySlide: React.FC<CaseStudySlideProps> = ({ slide }) => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-12 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/10 flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-white">{slide.title}</h2>
            <p className="text-xl text-white/50">{slide.subtitle}</p>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {slide.highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-xl p-6 text-center"
            >
              <div className="text-4xl md:text-5xl font-light text-white mb-2">
                {highlight.metric}
              </div>
              <p className="text-white/70 font-medium mb-2">{highlight.description}</p>
              <p className="text-white/40 text-sm">{highlight.context}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/[0.02] border border-white/10 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-white/50" />
            <h4 className="text-sm uppercase tracking-wider text-white/50">Industries Served</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {slide.industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-full px-5 py-2"
              >
                <span className="text-white/70">{industry}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
