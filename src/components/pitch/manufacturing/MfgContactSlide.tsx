import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Building2, FileText, CheckCircle, ArrowRight, Factory } from 'lucide-react';
import { MfgSlideLayout } from './MfgSlideLayout';

interface MfgContactSlideProps {
  slide: {
    headline: string;
    contact: {
      name: string;
      title: string;
      email: string;
      phone: string;
      company: string;
    };
    resources: string[];
    actions: string[];
  };
  slideNumber: number;
  totalSlides: number;
}

export const MfgContactSlide: React.FC<MfgContactSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <MfgSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
            <Factory className="w-14 h-14 text-amber-400" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-gray-900 mb-10 text-center"
        >
          {slide.headline}
        </motion.h2>

        <div className="grid grid-cols-12 gap-6 w-full max-w-5xl">
          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white"
          >
            <h3 className="text-xl font-bold mb-5">Primary Contact</h3>
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-amber-400">{slide.contact.name}</p>
                <p className="text-white/60 text-base">{slide.contact.title}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <a href={`mailto:${slide.contact.email}`} className="text-lg text-white hover:text-amber-400 transition-colors">
                  {slide.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <a href={`tel:${slide.contact.phone}`} className="text-lg text-white hover:text-amber-400 transition-colors">
                  {slide.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-lg text-white">{slide.contact.company}</span>
              </div>
            </div>
          </motion.div>

          {/* Resources & Actions */}
          <div className="col-span-7 flex flex-col gap-5">
            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-slate-600" />
                <h3 className="font-bold text-gray-800 text-lg">Resources Provided</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {slide.resources.map((resource, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-base text-gray-700">{resource}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5 flex-1"
            >
              <h3 className="font-bold text-amber-700 text-lg mb-4">Requested Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {slide.actions.map((action, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 border border-amber-100 hover:border-amber-300 transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-5 h-5 text-amber-500" />
                    <p className="text-base font-medium text-amber-700">{action}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MfgSlideLayout>
  );
};
