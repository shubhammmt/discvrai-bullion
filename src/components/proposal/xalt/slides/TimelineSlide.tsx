import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, Code, TestTube, Rocket, Plus } from 'lucide-react';

interface TimelineSlideProps {
  slideNumber: number;
  totalSlides: number;
}

const phase1Steps = [
  { week: 'Weeks 1-2', label: 'Learn your processes', icon: BookOpen },
  { week: 'Weeks 3-5', label: 'Build your chosen assistants', icon: Code },
  { week: 'Weeks 6-7', label: 'Test with real deals', icon: TestTube },
  { week: 'Week 8', label: 'Launch', icon: Rocket },
];

export const TimelineSlide: React.FC<TimelineSlideProps> = ({ slideNumber, totalSlides }) => {
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
            8 weeks to launch, add more when ready
          </h1>
          <p className="text-lg text-slate-500 mb-10">Start lean. No pressure, no lock-in.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Phase 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-amber-50 rounded-2xl p-8 border-2 border-amber-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-200 rounded-xl">
                <Calendar className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Phase 1: Foundation</h3>
                <span className="text-sm text-amber-600">8 weeks</span>
              </div>
            </div>

            <div className="space-y-4">
              {phase1Steps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-24 text-sm font-medium text-slate-500">{step.week}</div>
                  <div className="p-2 bg-white rounded-lg">
                    <step.icon className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-slate-700">{step.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-50 rounded-2xl p-8 border-2 border-slate-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-slate-200 rounded-xl">
                <Plus className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Phase 2: Optional Add-ons</h3>
                <span className="text-sm text-slate-500">8 weeks each (start anytime)</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-1">RM Assistant</h4>
                <p className="text-sm text-slate-600">For your Dubai team of 30 RMs</p>
              </div>
              
              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-1">Compliance Assistant</h4>
                <p className="text-sm text-slate-600">If not included in Phase 1</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-900 rounded-xl">
              <p className="text-white text-sm">
                Add assistants when you need them. Each takes 8 weeks to implement.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
