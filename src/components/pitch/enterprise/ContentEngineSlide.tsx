import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Newspaper, Video, Globe, TrendingUp } from 'lucide-react';

interface ContentEngineSlideProps {
  slide: {
    title: string;
    subtitle: string;
    production: {
      text: { volume: string; types: string[] };
      video: { volume: string; platforms: string[] };
      vernacular: { languages: number; capability: string };
    };
    distribution: string[];
    outcomes: Array<{ metric: string; timeline?: string; description?: string }>;
  };
}

export const ContentEngineSlide: React.FC<ContentEngineSlideProps> = ({ slide }) => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-12 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 flex items-center justify-center">
            <FileText className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-white">{slide.title}</h2>
            <p className="text-xl text-white/50">{slide.subtitle}</p>
          </div>
        </motion.div>
        
        {/* Production Capabilities */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.03] border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Newspaper className="w-5 h-5 text-emerald-400" />
              <span className="text-2xl font-light text-white">{slide.production.text.volume}</span>
            </div>
            <div className="space-y-1">
              {slide.production.text.types.map((type, i) => (
                <p key={i} className="text-white/50 text-sm">• {type}</p>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.03] border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Video className="w-5 h-5 text-emerald-400" />
              <span className="text-2xl font-light text-white">{slide.production.video.volume}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {slide.production.video.platforms.map((platform, i) => (
                <span key={i} className="text-white/50 text-xs bg-white/5 px-2 py-1 rounded">{platform}</span>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/[0.03] border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-emerald-400" />
              <span className="text-2xl font-light text-white">{slide.production.vernacular.languages} Languages</span>
            </div>
            <p className="text-white/50 text-sm">{slide.production.vernacular.capability}</p>
          </motion.div>
        </div>
        
        {/* Outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h4 className="text-sm uppercase tracking-wider text-emerald-400/80">Outcomes</h4>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {slide.outcomes.map((outcome, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl font-light text-white mb-1">{outcome.metric}</p>
                <p className="text-white/40 text-sm">{outcome.timeline || outcome.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
