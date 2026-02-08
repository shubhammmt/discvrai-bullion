import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Smartphone, Users, Gift, Truck, Database, AlertCircle } from 'lucide-react';

interface DalmiaTodaySlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaTodaySlide: React.FC<DalmiaTodaySlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const systems = [
    { name: 'SUVIDHA', metric: '~35% digital', icon: Smartphone },
    { name: 'SM@RT-D', metric: 'Sales App', icon: Users },
    { name: 'Dalmia Delight', metric: 'Loyalty', icon: Gift },
    { name: 'DriverSathi', metric: 'Logistics', icon: Truck }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col items-center justify-center h-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 text-center"
        >
          {slide.headline}
        </motion.h1>

        {/* Island Diagram */}
        <div className="relative max-w-4xl w-full mb-8">
          {/* System Islands */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {systems.map((system, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl shadow-md border-2 border-slate-200 p-4 text-center relative"
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <system.icon className="w-6 h-6 text-slate-600" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">{system.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{system.metric}</p>
                
                {/* Disconnected indicator */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-slate-200 border-2 border-white" />
              </motion.div>
            ))}
          </div>

          {/* SAP Backbone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
          >
            <div className="bg-slate-800 text-white rounded-xl px-8 py-3 flex items-center gap-3">
              <Database className="w-5 h-5" />
              <span className="font-bold">SAP Backbone</span>
            </div>
          </motion.div>
        </div>

        {/* Gap Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl px-8 py-5 max-w-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-bold text-red-700 mb-1">The Gap</h4>
              <p className="text-slate-700 text-sm">
                Tools exist but disconnected. <span className="font-semibold">No integrated AI intelligence layer.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
