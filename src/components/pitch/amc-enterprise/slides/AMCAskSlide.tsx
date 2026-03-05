import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, CheckCircle } from 'lucide-react';

interface AMCAskSlideProps {
  slide: {
    title: string;
    subtitle: string;
    content: {
      raise: string;
      raiseUSD: string;
      valuation: string;
      valuationRange?: string;
      runway: string;
      valuationRationale?: string;
      priorCCD?: string;
      useOfFunds: Array<{
        category: string;
        percentage: number;
      }>;
      milestones: string[];
    };
  };
}

export const AMCAskSlide: React.FC<AMCAskSlideProps> = ({ slide }) => {
  return (
    <div className="flex-1 flex flex-col p-12">
      {/* Header */}
      <div className="mb-8">
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-4xl font-bold text-gray-900 mb-2"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600"
        >
          {slide.subtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-2 gap-8 flex-1">
        {/* Raise Details */}
        <div className="space-y-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-2xl text-center"
          >
            <Rocket className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <p className="text-5xl font-bold mb-2">{slide.content.raise}</p>
            <p className="text-orange-100">{slide.content.raiseUSD}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Pre-money Valuation</p>
              <p className="text-xl font-bold text-gray-900">{slide.content.valuation}</p>
              {slide.content.valuationRange && (
                <p className="text-xs text-gray-400 mt-1">Range: {slide.content.valuationRange}</p>
              )}
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Runway</p>
              <p className="text-xl font-bold text-gray-900">{slide.content.runway}</p>
            </div>
          </motion.div>

          {/* Valuation rationale & CCD */}
          {slide.content.valuationRationale && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800 space-y-1"
            >
              <p className="font-medium">{slide.content.valuationRationale}</p>
              {slide.content.priorCCD && <p className="text-blue-600">{slide.content.priorCCD}</p>}
            </motion.div>
          )}
        </div>

        {/* Use of Funds & Milestones */}
        <div className="space-y-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-gray-200 rounded-xl p-6"
          >
            <h4 className="font-semibold text-gray-900 mb-4">Use of Funds</h4>
            <div className="space-y-3">
              {slide.content.useOfFunds.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{item.category}</span>
                      <span className="text-sm font-semibold text-gray-900">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                        className="h-full bg-orange-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-green-50 border border-green-200 rounded-xl p-6"
          >
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Key Milestones
            </h4>
            <div className="space-y-3">
              {slide.content.milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{milestone}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
