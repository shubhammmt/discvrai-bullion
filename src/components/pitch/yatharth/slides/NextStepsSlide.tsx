import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Phone, Linkedin, Globe, User } from 'lucide-react';
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
      <div className="flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
          <h2 className="text-xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-sm text-emerald-700 font-medium">{slide.subtitle}</p>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Left: Journey Steps */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            {content?.steps?.map((step: any, idx: number) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 bg-white rounded-lg p-2 border border-gray-200"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-xs">{step.title}</p>
                  <p className="text-xs text-gray-600 leading-tight">{step.description}</p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded flex-shrink-0">{step.timeline}</span>
              </div>
            ))}
            
            {/* Outcomes */}
            <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-200">
              <p className="font-semibold text-gray-900 text-xs mb-1.5">What Success Looks Like:</p>
              <div className="space-y-1">
                {content?.outcomes?.map((outcome: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <CheckCircle className="w-3 h-3 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-800">{outcome}</span>
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
          >
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-4 text-white">
              <h3 className="font-bold text-base mb-3">Ready to Transform?</h3>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm">{content?.contact?.name}</p>
                  <p className="text-emerald-100 text-xs">{content?.contact?.title}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <a href={`mailto:${content?.contact?.email}`} className="flex items-center gap-2 text-white hover:text-emerald-100 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs">{content?.contact?.email}</span>
                </a>
                <a href={`tel:${content?.contact?.phone}`} className="flex items-center gap-2 text-white hover:text-emerald-100 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs">{content?.contact?.phone}</span>
                </a>
                <a href={content?.contact?.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-emerald-100 transition-colors">
                  <Linkedin className="w-4 h-4" />
                  <span className="text-xs">LinkedIn Profile</span>
                </a>
                <a href={`https://${content?.contact?.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-emerald-100 transition-colors">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs">{content?.contact?.website}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </YatharthSlideLayout>
  );
};