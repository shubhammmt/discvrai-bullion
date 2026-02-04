import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, HelpCircle, ArrowRight } from 'lucide-react';
import { AptechSlideLayout } from '../AptechSlideLayout';

interface AptechExplorationSlideProps {
  slide: {
    title: string;
    subtitle: string;
    questions: string[];
    approach: Array<{
      step: string;
      description: string;
    }>;
  };
  slideNumber: number;
  totalSlides: number;
}

export const AptechExplorationSlide: React.FC<AptechExplorationSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <AptechSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <MessageSquare className="w-8 h-8 text-orange-500" />
            <h2 className="text-4xl font-bold text-slate-800">{slide.title}</h2>
          </div>
          <p className="text-lg text-slate-500 italic">"{slide.subtitle}"</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-2 gap-8">
          {/* Questions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 border border-slate-200 rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-orange-500" />
              Questions for Discussion
            </h3>
            <ul className="space-y-4">
              {slide.questions.map((question, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-slate-600">{question}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Our Approach */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-5">How We Work Together</h3>
            <div className="space-y-4">
              {slide.approach.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white border border-orange-200 rounded-lg p-4 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.step}</h4>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AptechSlideLayout>
  );
};
