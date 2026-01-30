import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Phone, Linkedin, User } from 'lucide-react';
import { YatharthSlide } from '@/data/yatharthHealthcareSlides';
import { YatharthSlideLayout } from '../YatharthSlideLayout';

interface FounderSlideProps {
  slide: YatharthSlide;
  slideNumber: number;
  totalSlides: number;
}

export const FounderSlide: React.FC<FounderSlideProps> = ({ slide, slideNumber, totalSlides }) => {
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
          {/* Left: Credentials & Experience */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
            {/* Stats */}
            <div className="flex gap-4">
              {content?.credentials?.map((cred: any, idx: number) => (
                <div key={idx} className="text-center px-4 py-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="text-3xl font-bold text-emerald-600">{cred.value}</div>
                  <div className="text-xs text-gray-600">{cred.label}</div>
                </div>
              ))}
            </div>
            
            {/* Transformation Experience */}
            {content?.transformations?.map((trans: any, idx: number) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900 text-sm">{trans.domain}</span>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">{trans.scale}</span>
                </div>
                <div className="space-y-1">
                  {trans.highlights?.slice(0, 4).map((highlight: string, hidx: number) => (
                    <div key={hidx} className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Right: Promise & Contact */}
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex flex-col">
            {/* Promise */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700 italic leading-relaxed">"{content?.promise}"</p>
            </div>
            
            {/* Founder card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mt-auto">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{content?.founder?.name}</p>
                  <p className="text-sm text-gray-500">{content?.founder?.title}</p>
                </div>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span>{content?.founder?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>{content?.founder?.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Linkedin className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs truncate">{content?.founder?.linkedin}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </YatharthSlideLayout>
  );
};
