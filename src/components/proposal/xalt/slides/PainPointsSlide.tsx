import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, Shield, TrendingUp } from 'lucide-react';

interface PainPointsSlideProps {
  slideNumber: number;
  totalSlides: number;
}

const painPoints = [
  {
    icon: FileText,
    number: '1',
    title: 'Deal Ingestion is Manual and Slow',
    description: 'Unstructured inputs (decks, memos, emails) → spreadsheets → website content',
    metric: '4–6 hours per deal',
  },
  {
    icon: MessageSquare,
    number: '2',
    title: 'Investor Communication is RM-Heavy',
    description: 'RMs repeatedly explain same details to multiple investors',
    metric: 'High-value time on FAQs',
  },
  {
    icon: Shield,
    number: '3',
    title: 'Compliance is Person-Dependent',
    description: 'Manual eligibility checks, risk of errors, no audit trails',
    metric: 'Inconsistent disclosures',
  },
  {
    icon: TrendingUp,
    number: '4',
    title: 'Scale is Constrained by Bandwidth',
    description: 'With 10–12 active deals and lean team, every new deal adds friction',
    metric: 'Bottleneck: not demand',
  },
];

export const PainPointsSlide: React.FC<PainPointsSlideProps> = ({ slideNumber, totalSlides }) => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            Four Key Bottlenecks Limiting Scale
          </h1>
          <p className="text-lg text-slate-500 mb-8">Xalt Today — The Pain Points</p>
        </motion.div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-slate-50 rounded-xl p-6 border border-slate-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <point.icon className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {point.number}. {point.title}
                  </h3>
                  <p className="text-slate-600 mb-3">{point.description}</p>
                  <span className="inline-block px-3 py-1 bg-red-50 text-red-700 text-sm font-medium rounded-full">
                    {point.metric}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Insight */}
        <motion.div 
          className="mt-8 bg-slate-900 rounded-xl p-5 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="text-amber-400 font-bold text-lg">Key Insight:</div>
          <p className="text-white">
            To maintain boutique quality while scaling 10–20x, you need <span className="text-amber-400 font-semibold">automation—not more people</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
