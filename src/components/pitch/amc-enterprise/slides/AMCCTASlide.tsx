import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ArrowRight } from 'lucide-react';

interface AMCCTASlideProps {
  slide: {
    title: string;
    subtitle: string;
    content: {
      founder: {
        name: string;
        title: string;
        email: string;
        phone: string;
      };
      vision: string;
      nextSteps: string[];
    };
  };
}

export const AMCCTASlide: React.FC<AMCCTASlideProps> = ({ slide }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-bold text-white mb-4"
        >
          {slide.title}
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-400"
        >
          {slide.subtitle}
        </motion.p>

        {/* Vision */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-3xl mx-auto"
        >
          <p className="text-gray-300 leading-relaxed">
            {slide.content.vision}
          </p>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          {slide.content.nextSteps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full"
            >
              <ArrowRight className="w-4 h-4 text-orange-400" />
              <span className="text-orange-200 text-sm">{step}</span>
            </div>
          ))}
        </motion.div>

        {/* Founder Contact */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-8"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 inline-block">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                {slide.content.founder.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white">{slide.content.founder.name}</h3>
                <p className="text-gray-400 mb-3">{slide.content.founder.title}</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">{slide.content.founder.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">{slide.content.founder.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
