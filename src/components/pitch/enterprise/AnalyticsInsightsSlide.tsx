import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, CheckCircle2, Plug } from 'lucide-react';

interface AnalyticsInsightsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    capabilities: Array<{
      name: string;
      description: string;
      example: string;
    }>;
    integrations: string[];
  };
}

export const AnalyticsInsightsSlide: React.FC<AnalyticsInsightsSlideProps> = ({ slide }) => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-400/10 flex items-center justify-center">
            <LineChart className="w-7 h-7 text-violet-400" />
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
              <h3 className="text-lg font-medium text-white mb-2">{cap.name}</h3>
              <p className="text-white/60 text-sm mb-4">{cap.description}</p>
              <div className="bg-violet-500/10 rounded-lg p-3">
                <p className="text-violet-300/80 text-xs italic">"{cap.example}"</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-violet-500/10 to-transparent border border-violet-500/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Plug className="w-5 h-5 text-violet-400" />
            <h4 className="text-sm uppercase tracking-wider text-violet-400/80">Integrations</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {slide.integrations.map((integration, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2">
                <CheckCircle2 className="w-3 h-3 text-violet-400" />
                <span className="text-white/70 text-sm">{integration}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
