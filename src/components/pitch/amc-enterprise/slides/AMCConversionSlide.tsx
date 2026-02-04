import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, CheckCircle } from 'lucide-react';

interface AMCConversionSlideProps {
  slide: {
    title: string;
    subtitle: string;
    content: {
      benchmarks: Array<{
        channel: string;
        rate: string;
        note: string;
        highlight?: boolean;
      }>;
      secondaryMetrics: Array<{
        metric: string;
        baseline: string;
        target: string;
      }>;
      whyItWorks: string[];
    };
  };
}

export const AMCConversionSlide: React.FC<AMCConversionSlideProps> = ({ slide }) => {
  return (
    <div className="flex-1 flex flex-col p-12">
      {/* Header */}
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
        {/* Benchmarks Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold text-gray-900 mb-4">Conversion Benchmarks</h3>
          <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-gray-600 font-medium">Channel</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-medium">Rate</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-medium">Note</th>
                </tr>
              </thead>
              <tbody>
                {slide.content.benchmarks.map((benchmark, index) => (
                  <tr 
                    key={index} 
                    className={benchmark.highlight ? 'bg-green-50' : 'bg-white'}
                  >
                    <td className="px-4 py-3 border-t border-gray-100">
                      {benchmark.channel}
                    </td>
                    <td className={`px-4 py-3 border-t border-gray-100 font-semibold ${benchmark.highlight ? 'text-green-600' : 'text-gray-900'}`}>
                      {benchmark.rate}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-100 text-gray-500">
                      {benchmark.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Secondary Metrics */}
          <div className="mt-6 space-y-3">
            {slide.content.secondaryMetrics.map((metric, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-lg">
                <span className="text-gray-700 flex-1 text-sm">{metric.metric}</span>
                <span className="text-red-500 text-sm">{metric.baseline}</span>
                <ArrowUp className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-semibold text-sm">{metric.target}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why It Works */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold text-gray-900 mb-4">Why This Works</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
            {slide.content.whyItWorks.map((reason, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{reason}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-6">
            <p className="text-orange-900 font-medium text-center">
              Conservative Estimate: Even at <span className="font-bold">10% conversion (2× baseline)</span>, the platform delivers significant ROI
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
