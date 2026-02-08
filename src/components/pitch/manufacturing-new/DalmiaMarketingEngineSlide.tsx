import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { MapPin, Users, Languages, MessageSquare } from 'lucide-react';

interface DalmiaMarketingEngineSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaMarketingEngineSlide: React.FC<DalmiaMarketingEngineSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const capabilities = [
    { icon: MapPin, title: 'Hyperlocal Demand Sensing', description: 'Construction hotspot identification' },
    { icon: Users, title: 'Contractor Intelligence', description: 'Influencer network tracking' },
    { icon: Languages, title: 'Regional Content', description: 'Auto-generated local language' },
    { icon: MessageSquare, title: 'WhatsApp Campaigns', description: 'Automated multi-channel delivery' }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col items-center justify-center h-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
        >
          {slide.headline}
        </motion.h1>

        <div className="grid grid-cols-2 gap-6 max-w-4xl w-full mb-10">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-xl shadow-md border border-slate-100 p-5 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <cap.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{cap.title}</h3>
                <p className="text-sm text-slate-500">{cap.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl px-8 py-4 text-center"
        >
          <p className="text-white/80 text-sm">Impact</p>
          <p className="text-white text-xl font-bold">20–30% marketing ROI improvement</p>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
