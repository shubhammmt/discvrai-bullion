import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Mail, Phone, Linkedin, Globe, User } from 'lucide-react';
import { YatharthSlide } from '@/data/yatharthHealthcareSlides';
import { YatharthSlideLayout } from '../YatharthSlideLayout';

interface NextStepsSlideProps {
  slide: YatharthSlide;
  slideNumber: number;
  totalSlides: number;
}

export const NextStepsSlide: React.FC<NextStepsSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;
  
  return (
    <YatharthSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-base text-emerald-600">{slide.subtitle}</p>
        </motion.div>
        
        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Left: Journey Steps */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            {content?.steps?.map((step: any, idx: number) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                  {step.step}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{step.timeline}</span>
              </div>
            ))}
            
            {/* Outcomes */}
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200 mt-4">
              <p className="font-semibold text-gray-900 text-sm mb-2">What Success Looks Like:</p>
              <div className="space-y-1">
                {content?.outcomes?.map((outcome: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right: Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-5 text-white flex-1 flex flex-col">
              <h3 className="font-bold text-lg mb-4">Ready to Transform?</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">{content?.contact?.name}</p>
                  <p className="text-emerald-100 text-sm">{content?.contact?.title}</p>
                </div>
              </div>
              
              <div className="space-y-3 mt-auto">
                <a href={`mailto:${content?.contact?.email}`} className="flex items-center gap-3 text-white hover:text-emerald-100 transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{content?.contact?.email}</span>
                </a>
                <a href={`tel:${content?.contact?.phone}`} className="flex items-center gap-3 text-white hover:text-emerald-100 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">{content?.contact?.phone}</span>
                </a>
                <a href={content?.contact?.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-emerald-100 transition-colors">
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm">LinkedIn Profile</span>
                </a>
                <a href={`https://${content?.contact?.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-emerald-100 transition-colors">
                  <Globe className="w-5 h-5" />
                  <span className="text-sm">{content?.contact?.website}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </YatharthSlideLayout>
  );
};
