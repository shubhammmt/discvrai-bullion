import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Users, Check } from 'lucide-react';

interface PathsSlideProps {
  slideNumber: number;
  totalSlides: number;
}

const paths = [
  {
    id: 1,
    name: 'Foundation Only',
    icon: Star,
    recommended: true,
    label: 'Recommended Start',
    includes: 'Deal + Investor Assistants',
    investment: '₹10L setup + ₹1.5L/month',
    yearOne: '₹28L Year 1',
    payback: '1.9 years',
    timeline: '8 weeks',
    bestFor: 'Starting lean, validate approach'
  },
  {
    id: 2,
    name: 'Foundation + Compliance',
    icon: Shield,
    recommended: false,
    label: 'For DFSA',
    includes: 'Deal + Investor + Compliance',
    investment: '₹13L setup + ₹2.15L/month',
    yearOne: '₹40L Year 1',
    payback: '> 2 years',
    timeline: '8 weeks',
    bestFor: 'DFSA regulated from Day 1'
  },
  {
    id: 3,
    name: 'Add RM Assistant',
    icon: Users,
    recommended: false,
    label: 'Dubai Team (30 RMs)',
    includes: 'Add to Path 1 or 2',
    investment: '+₹6L setup + ₹1L/month',
    yearOne: 'Additional investment',
    payback: '15-20% conversion uplift',
    timeline: '+8 weeks',
    bestFor: '10-20x investor coverage'
  }
];

export const PathsSlide: React.FC<PathsSlideProps> = ({ slideNumber, totalSlides }) => {
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
            Pick your path, see your investment
          </h1>
          <p className="text-lg text-slate-500 mb-8">No lock-in—add agents anytime</p>
        </motion.div>

        {/* Paths Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {paths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl p-6 border-2 flex flex-col ${
                path.recommended 
                  ? 'bg-amber-50 border-amber-300' 
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${path.recommended ? 'bg-amber-200' : 'bg-slate-200'}`}>
                  <path.icon className={`w-5 h-5 ${path.recommended ? 'text-amber-700' : 'text-slate-600'}`} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{path.name}</h3>
                  <span className={`text-xs ${path.recommended ? 'text-amber-600' : 'text-slate-500'}`}>
                    {path.label}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4">{path.includes}</p>

              <div className="space-y-2 flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Investment</span>
                  <span className="font-medium text-slate-900">{path.investment}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Year 1 Total</span>
                  <span className="font-bold text-slate-900">{path.yearOne}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Payback</span>
                  <span className="font-medium text-amber-600">{path.payback}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Timeline</span>
                  <span className="text-slate-700">{path.timeline}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500">
                  <span className="font-medium">Best for:</span> {path.bestFor}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Suite */}
        <motion.div 
          className="mt-6 bg-slate-900 rounded-xl p-4 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="text-white font-medium">Full Suite (All 4 Assistants)</span>
          <span className="text-amber-400 font-bold">₹19L setup + ₹3.15L/month = ₹58L Year 1</span>
        </motion.div>
      </div>
    </div>
  );
};
