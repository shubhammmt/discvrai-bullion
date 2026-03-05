import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface AMCValuationSlideProps {
  slide: {
    title: string;
    subtitle: string;
    content: {
      pillars: Array<{ title: string; support: string }>;
      logicChain: string;
      comparable: string;
      priorRound: string;
      amcFinancials: Array<{
        amc: string;
        revenueQtr: string;
        profitQtr: string;
        opm: string;
      }>;
      costContext: string;
    };
  };
}

export const AMCValuationSlide: React.FC<AMCValuationSlideProps> = ({ slide }) => {
  return (
    <div className="flex-1 flex flex-col p-12">
      <div className="mb-6">
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
        {/* Left: 5 Pillars */}
        <div className="space-y-5">
          <h4 className="font-semibold text-gray-900">5 Pillars</h4>
          <div className="space-y-3">
            {slide.content.pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ x: -15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3"
              >
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{p.title}</p>
                  <p className="text-gray-600 text-xs">{p.support}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Logic Chain */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-orange-50 border border-orange-200 rounded-xl p-4"
          >
            <p className="text-sm text-orange-900 font-medium flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              {slide.content.logicChain}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="text-xs text-gray-500 space-y-1"
          >
            <p>{slide.content.comparable}</p>
            <p>{slide.content.priorRound}</p>
          </motion.div>
        </div>

        {/* Right: AMC Financial Context */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-5"
        >
          <h4 className="font-semibold text-gray-900">AMC Financial Context</h4>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-gray-600 font-medium">AMC</th>
                  <th className="px-4 py-3 text-right text-gray-600 font-medium">Revenue (Qtr)</th>
                  <th className="px-4 py-3 text-right text-gray-600 font-medium">Profit (Qtr)</th>
                  <th className="px-4 py-3 text-center text-gray-600 font-medium">OPM</th>
                </tr>
              </thead>
              <tbody>
                {slide.content.amcFinancials.map((row, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{row.amc}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{row.revenueQtr}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{row.profitQtr}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded text-xs">
                        {row.opm}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center"
          >
            <p className="text-blue-900 font-medium text-sm">{slide.content.costContext}</p>
          </motion.div>

          {/* Phase 1 valuation path */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="bg-gray-50 border border-gray-200 rounded-xl p-4"
          >
            <h5 className="font-semibold text-gray-900 text-sm mb-2">Valuation Path</h5>
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 text-orange-800 rounded-lg px-3 py-2 text-center flex-1">
                <p className="text-xs text-orange-600">Pre-Revenue</p>
                <p className="font-bold text-sm">₹60–75 Cr</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div className="bg-green-100 text-green-800 rounded-lg px-3 py-2 text-center flex-1">
                <p className="text-xs text-green-600">Post First Revenue</p>
                <p className="font-bold text-sm">₹70–80 Cr</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div className="bg-blue-100 text-blue-800 rounded-lg px-3 py-2 text-center flex-1">
                <p className="text-xs text-blue-600">Year 2+</p>
                <p className="font-bold text-sm">40× ARR</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
