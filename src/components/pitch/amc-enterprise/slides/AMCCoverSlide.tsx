import React from 'react';
import { motion } from 'framer-motion';

interface AMCCoverSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    content: {
      tagline: string;
      companyName: string;
    };
  };
}

export const AMCCoverSlide: React.FC<AMCCoverSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="flex-1 flex items-center justify-center p-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20"
        >
          <IconComponent className="w-10 h-10 text-white" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="text-5xl font-bold text-white leading-tight">
            {slide.title}
          </h1>
          <p className="text-2xl text-orange-400 font-medium">
            {slide.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-3xl mx-auto"
        >
          <p className="text-lg text-gray-300 leading-relaxed">
            {slide.content.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-white font-semibold">{slide.content.companyName}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
