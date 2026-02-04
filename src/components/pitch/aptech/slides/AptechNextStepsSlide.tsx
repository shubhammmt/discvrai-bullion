import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, User, CheckCircle2 } from 'lucide-react';
import { AptechSlideLayout } from '../AptechSlideLayout';

interface AptechNextStepsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    steps: Array<{
      step: number;
      actor: string;
      action: string;
    }>;
    cta: string;
    contact: {
      name: string;
      role: string;
      email: string;
      phone: string;
    };
  };
  slideNumber: number;
  totalSlides: number;
}

export const AptechNextStepsSlide: React.FC<AptechNextStepsSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <AptechSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <h2 className="text-4xl font-bold text-slate-800 mb-2">{slide.title}</h2>
          <p className="text-lg text-slate-500 italic">"{slide.subtitle}"</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-2 gap-8">
          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-6">After This Meeting</h3>
            <div className="space-y-4">
              {slide.steps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-orange-600">{item.actor}:</span>
                    <span className="text-slate-600 ml-2">{item.action}</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-slate-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            {/* CTA */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-xl p-6 mb-6 shadow-lg shadow-orange-500/20">
              <p className="text-xl font-semibold text-center">{slide.cta}</p>
            </div>
            
            {/* Contact Card */}
            <div className="bg-slate-800 rounded-xl p-6 text-white">
              <h4 className="text-sm uppercase tracking-wider text-slate-400 mb-4">Contact</h4>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{slide.contact.name}</p>
                  <p className="text-sm text-slate-400">{slide.contact.role}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <a href={`mailto:${slide.contact.email}`} className="flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>{slide.contact.email}</span>
                </a>
                <a href={`tel:${slide.contact.phone}`} className="flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>{slide.contact.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AptechSlideLayout>
  );
};
