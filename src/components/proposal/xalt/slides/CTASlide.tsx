import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MessageCircle, FileText } from 'lucide-react';

interface CTASlideProps {
  slideNumber: number;
  totalSlides: number;
}

export const CTASlide: React.FC<CTASlideProps> = ({ slideNumber, totalSlides }) => {
  return (
    <div className="h-screen w-full bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="px-12 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500">XALT × DiscvrAI</span>
          <span className="text-sm text-slate-500">{slideNumber}/{totalSlides}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-12 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to scale <span className="text-amber-400">10-20x</span>?
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl">
            Let's start with a quick call to finalize your path and kick off Week 1.
          </p>
        </motion.div>

        {/* Next Steps */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 w-full max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <Calendar className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">30-Min Alignment</h3>
            <p className="text-sm text-slate-400">Finalize scope, confirm path, set timeline</p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <FileText className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">SOW + Kick-off</h3>
            <p className="text-sm text-slate-400">Contract signed, Week 1 begins</p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <MessageCircle className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Live in 8 Weeks</h3>
            <p className="text-sm text-slate-400">Your first assistants go live</p>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-slate-500 mb-2">Questions? Let's talk.</p>
          <p className="text-xl font-bold text-white">Shubham Srivastava</p>
          <p className="text-amber-400">Founder & CEO, DiscvrAI</p>
        </motion.div>
      </div>
    </div>
  );
};
