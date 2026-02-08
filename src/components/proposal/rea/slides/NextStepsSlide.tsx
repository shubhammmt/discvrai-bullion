import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, User } from 'lucide-react';
import { REASlide } from '@/data/reaProposalSlides';
import { REASlideLayout } from '../REASlideLayout';

interface Props {
  slide: REASlide;
  slideNumber: number;
  totalSlides: number;
}

export const NextStepsSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;

  return (
    <REASlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-base text-blue-600 font-medium">{slide.subtitle}</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Left: Phases */}
          <div className="col-span-7 space-y-3">
            {content.phases.map((phase: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.08 }}
                className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-blue-700">{phase.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm">{phase.title}</h3>
                  <p className="text-xs text-gray-600">{phase.detail}</p>
                </div>
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold border border-blue-200 flex-shrink-0">
                  {phase.timeline}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Right: Contact */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-5 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-6 text-white flex flex-col justify-center"
          >
            <h3 className="font-bold text-lg mb-5">Let's Get Started</h3>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-base">{content.contact.name}</p>
                <p className="text-blue-200 text-sm">{content.contact.title}</p>
              </div>
            </div>

            <div className="space-y-3">
              <a href={`mailto:${content.contact.email}`} className="flex items-center gap-2.5 text-white hover:text-blue-200 transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{content.contact.email}</span>
              </a>
              <a href={`tel:${content.contact.phone}`} className="flex items-center gap-2.5 text-white hover:text-blue-200 transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{content.contact.phone}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </REASlideLayout>
  );
};
