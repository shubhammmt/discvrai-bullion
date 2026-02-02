import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageCircle, Users, Shield, Star, Briefcase, Scale } from 'lucide-react';

interface AssistantsSlideProps {
  slideNumber: number;
  totalSlides: number;
}

const assistants = [
  {
    id: 1,
    name: 'Deal Assistant',
    icon: FileText,
    recommended: true,
    description: 'Turns any deal document into standardized Xalt deal',
    impact: '4-6 hours → 15 minutes per deal',
    cost: '~₹5L one-time + ~₹50K/month'
  },
  {
    id: 2,
    name: 'Investor Assistant',
    icon: MessageCircle,
    recommended: true,
    description: 'Answers investor questions 24/7 automatically',
    impact: '60-70% fewer FAQs to RMs',
    cost: '~₹5L one-time + ~₹1L/month'
  },
  {
    id: 3,
    name: 'RM Assistant',
    icon: Users,
    recommended: false,
    label: 'For Dubai Team (30 RMs)',
    description: 'Prepares call briefs, drafts emails, prioritizes investors',
    impact: '15-20% conversion uplift, 10-20x coverage',
    cost: '~₹6L one-time + ~₹1L/month'
  },
  {
    id: 4,
    name: 'Compliance Assistant',
    icon: Shield,
    recommended: false,
    label: 'Optional (DFSA Regulated)',
    description: 'Auto-checks eligibility, flags issues, creates audit trails',
    impact: 'Zero violations, audit-ready in one click',
    cost: '~₹3L one-time + ~₹65K/month'
  }
];

export const AssistantsSlide: React.FC<AssistantsSlideProps> = ({ slideNumber, totalSlides }) => {
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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Choose what you need, when you need it
          </h1>
          <p className="text-lg text-slate-500 mb-8">Modular AI assistants—start small, add more anytime</p>
        </motion.div>

        {/* Assistants Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {assistants.map((assistant, index) => (
            <motion.div
              key={assistant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl p-6 border-2 ${
                assistant.recommended 
                  ? 'bg-amber-50 border-amber-300' 
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${assistant.recommended ? 'bg-amber-200' : 'bg-slate-200'}`}>
                    <assistant.icon className={`w-5 h-5 ${assistant.recommended ? 'text-amber-700' : 'text-slate-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{assistant.name}</h3>
                    {assistant.label && (
                      <span className="text-xs text-slate-500">{assistant.label}</span>
                    )}
                  </div>
                </div>
                {assistant.recommended && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-200 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3" /> Recommended
                  </span>
                )}
              </div>
              
              <p className="text-sm text-slate-600 mb-3">{assistant.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-900">{assistant.impact}</span>
                <span className="text-slate-500">{assistant.cost}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p 
          className="text-sm text-slate-400 mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Start with Deal + Investor (foundation). Add RM for Dubai. Add Compliance when ready.
        </motion.p>
      </div>
    </div>
  );
};
