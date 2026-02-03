import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Shield, HelpCircle } from 'lucide-react';

interface StrategicQuestionSlideProps {
  slideNumber: number;
  totalSlides: number;
}

export const StrategicQuestionSlide: React.FC<StrategicQuestionSlideProps> = ({ slideNumber, totalSlides }) => {
  const contextPoints = [
    { icon: Target, label: 'Positioning', text: 'Curated alternative investment platform for HNIs/UHNIs and family offices' },
    { icon: Users, label: 'Strength', text: 'Deep curation, founder-led relationships, high trust with investors and deal partners' },
    { icon: Shield, label: 'Constraint', text: 'Manual processes in deal ingestion, investor communication, and compliance limit scale' },
  ];

  return (
    <div className="h-screen w-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-12 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-400">XALT × DiscvrAI</span>
          <span className="text-sm text-slate-400">{slideNumber}/{totalSlides}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-12 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
            The Strategic Question
          </h1>
        </motion.div>

        {/* Context Points */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {contextPoints.map((point, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <point.icon className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{point.label}</span>
              </div>
              <p className="text-slate-700">{point.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Strategic Question */}
        <motion.div 
          className="bg-amber-50 rounded-2xl p-8 border-2 border-amber-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-start gap-4">
            <HelpCircle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <p className="text-xl md:text-2xl font-medium text-slate-800">
              How can Xalt scale deal volume and investor engagement <span className="text-amber-700 font-bold">10–20x</span> over the next 12–18 months without growing the team or compromising on curation quality?
            </p>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div 
          className="bg-slate-900 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <p className="text-white italic mb-3">
            "I foresee the need to have a lean team, because I will be boutique. The only way I can not have major attrition headaches is if the team is lean. Hence, automation is a good idea. Agentic AI, process automation, etc etc - all will help."
          </p>
          <p className="text-amber-400 font-medium">— Niraj Shah, Co-Founder</p>
        </motion.div>
      </div>
    </div>
  );
};
