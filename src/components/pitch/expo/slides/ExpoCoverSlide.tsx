import React from 'react';
import { motion } from 'framer-motion';
import { ExpoSlide } from '@/data/expoPitchSlides';
import { Brain, Mail, Globe } from 'lucide-react';

interface ExpoCoverSlideProps {
  slide: ExpoSlide;
}

export const ExpoCoverSlide: React.FC<ExpoCoverSlideProps> = ({ slide }) => {
  const { title, subtitle, tagline, content } = slide;

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 px-8"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
            <Brain className="w-10 h-10 text-white" />
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-7xl md:text-8xl font-bold text-white mb-4 tracking-tight"
        >
          {title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl md:text-3xl text-blue-200 mb-4 font-light"
        >
          {subtitle}
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-white/60 mb-12 max-w-2xl mx-auto"
        >
          {tagline}
        </motion.p>
        
        {/* Presenter Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-2"
        >
          <p className="text-xl text-white font-medium">{content?.presenter?.name}</p>
          <p className="text-blue-300">{content?.presenter?.title}</p>
          <div className="flex items-center justify-center gap-6 mt-4 text-white/50 text-sm">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {content?.contact?.email}
            </span>
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {content?.contact?.website}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
