import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Clock } from 'lucide-react';

interface AMCCustomerROISlideProps {
  slide: {
    title: string;
    subtitle: string;
    content: {
      assumption: string;
      totalCost: Array<{ component: string; cost: string }>;
      totalCostLine: string;
      roiTable: Array<{
        amc: string;
        incrementalProfit: string;
        totalCost: string;
        roi: string;
        payback: string;
      }>;
      formula: string;
      pitchLine: string;
    };
  };
}

export const AMCCustomerROISlide: React.FC<AMCCustomerROISlideProps> = ({ slide }) => {
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

      {/* Assumption banner */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 mb-5 text-sm text-amber-900"
      >
        💡 <span className="font-medium">{slide.content.assumption}</span>
      </motion.div>

      <div className="grid grid-cols-5 gap-6 flex-1">
        {/* Left: Cost + Formula */}
        <div className="col-span-2 space-y-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 border border-gray-200 rounded-xl p-5"
          >
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              Total Cost to AMC (Year 1)
            </h4>
            <div className="space-y-2 text-sm">
              {slide.content.totalCost.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-gray-600">{item.component}</span>
                  <span className="font-medium text-gray-900">{item.cost}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-orange-600">{slide.content.totalCostLine}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-800"
          >
            <p className="font-mono">{slide.content.formula}</p>
          </motion.div>
        </div>

        {/* Right: ROI Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="col-span-3"
        >
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            ROI by AMC (Top 4 India)
          </h4>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-gray-600 font-medium">AMC</th>
                  <th className="px-4 py-3 text-right text-gray-600 font-medium">Incremental Profit</th>
                  <th className="px-4 py-3 text-right text-gray-600 font-medium">Cost</th>
                  <th className="px-4 py-3 text-center text-gray-600 font-medium">ROI</th>
                  <th className="px-4 py-3 text-center text-gray-600 font-medium">Payback</th>
                </tr>
              </thead>
              <tbody>
                {slide.content.roiTable.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.35 + i * 0.08 }}
                    className="border-t border-gray-100"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">{row.amc}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{row.incrementalProfit}</td>
                    <td className="px-4 py-3 text-right text-gray-500">{row.totalCost}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-block bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg text-sm">
                        {row.roi}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 flex items-center justify-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {row.payback}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Bottom pitch line */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-6 py-4 text-center"
      >
        <p className="font-medium text-lg">{slide.content.pitchLine}</p>
      </motion.div>
    </div>
  );
};
