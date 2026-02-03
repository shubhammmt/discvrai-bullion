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
      <div className="h-full flex flex-col items-center justify-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
            <Factory className="w-12 h-12 text-amber-400" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-slate-800 mb-8 text-center"
        >
          {slide.headline}
        </motion.h2>

        <div className="grid grid-cols-12 gap-6 w-full max-w-4xl">
          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white"
          >
            <h3 className="text-lg font-bold mb-4">Primary Contact</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xl font-bold text-amber-400">{slide.contact.name}</p>
                <p className="text-white/60 text-sm">{slide.contact.title}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                <a href={`mailto:${slide.contact.email}`} className="text-white hover:text-amber-400 transition-colors">
                  {slide.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-amber-400" />
                </div>
                <a href={`tel:${slide.contact.phone}`} className="text-white hover:text-amber-400 transition-colors">
                  {slide.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-white">{slide.contact.company}</span>
              </div>
            </div>
          </motion.div>

          {/* Resources & Actions */}
          <div className="col-span-7 space-y-4">
            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-slate-600" />
                <h3 className="font-semibold text-slate-700">Resources Provided</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {slide.resources.map((resource, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600">{resource}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4"
            >
              <h3 className="font-semibold text-amber-700 mb-3">Requested Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                {slide.actions.map((action, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-amber-100 hover:border-amber-300 transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4 text-amber-500" />
                    <p className="text-sm font-medium text-amber-700">{action}</p>
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
