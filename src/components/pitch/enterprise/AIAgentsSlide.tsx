import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

interface AIAgentsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    capabilities: Array<{
      feature: string;
      details: string[];
    }>;
    useCases: string[];
  };
}

export const AIAgentsSlide: React.FC<AIAgentsSlideProps> = ({ slide }) => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-12 relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center">
            <MessageSquare className="w-7 h-7 text-blue-400" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-white">{slide.title}</h2>
            <p className="text-xl text-white/50">{slide.subtitle}</p>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {slide.capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-lg font-medium text-white mb-4">{cap.feature}</h3>
              <div className="space-y-2">
                {cap.details.map((detail, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400/70 flex-shrink-0" />
                    <span className="text-white/60 text-sm">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-6"
        >
          <h4 className="text-sm uppercase tracking-wider text-blue-400/80 mb-4">Use Cases</h4>
          <div className="flex flex-wrap gap-3">
            {slide.useCases.map((useCase, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2">
                <ArrowRight className="w-3 h-3 text-blue-400" />
                <span className="text-white/70 text-sm">{useCase}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
