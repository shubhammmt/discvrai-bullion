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
      <div className="flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
          <h2 className="text-xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-sm text-emerald-700 font-medium">{slide.subtitle}</p>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Left: Credentials & Experience */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-3">
            {/* Stats */}
            <div className="flex gap-3">
              {content?.credentials?.map((cred: any, idx: number) => (
                <div key={idx} className="text-center px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-2xl font-bold text-emerald-700">{cred.value}</div>
                  <div className="text-xs text-gray-700">{cred.label}</div>
                </div>
              ))}
            </div>
            
            {/* Transformation Experience */}
            {content?.transformations?.map((trans: any, idx: number) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-gray-900 text-xs">{trans.domain}</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">{trans.scale}</span>
                </div>
                <div className="space-y-1">
                  {trans.highlights?.slice(0, 4).map((highlight: string, hidx: number) => (
                    <div key={hidx} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3 h-3 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-800">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Right: Promise & Contact */}
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex flex-col">
            {/* Promise */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-3 mb-3">
              <p className="text-xs text-gray-800 italic leading-relaxed">"{content?.promise}"</p>
            </div>
            
            {/* Founder card */}
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm mt-auto">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{content?.founder?.name}</p>
                  <p className="text-xs text-gray-600">{content?.founder?.title}</p>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2 text-gray-800">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{content?.founder?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{content?.founder?.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <Linkedin className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="truncate">{content?.founder?.linkedin}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </YatharthSlideLayout>
  );
};