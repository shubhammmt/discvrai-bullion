import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, Mail, Phone } from 'lucide-react';
import { REASlide } from '@/data/reaProposalSlides';
import { REASlideLayout } from '../REASlideLayout';

interface Props {
  slide: REASlide;
  slideNumber: number;
  totalSlides: number;
}

export const DiscussionSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;

  return (
    <REASlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-base text-blue-600 font-medium">{slide.subtitle}</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-2 gap-5 min-h-0">
          {/* Left: Questions */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-900 text-base">Key Questions</h3>
            </div>
            <div className="space-y-3 flex-1">
              {content.questions.map((q: string, idx: number) => (
                <div key={idx} className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-gray-800 font-medium">{q}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-900 text-base">Proposed Timeline</h3>
            </div>
            <div className="space-y-3 flex-1">
              {content.timeline.map((t: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <span className="text-xs font-bold bg-gray-900 text-white px-3 py-1 rounded-full flex-shrink-0 min-w-[80px] text-center">
                    {t.week}
                  </span>
                  <p className="text-sm text-gray-700">{t.action}</p>
                </div>
              ))}
            </div>

            {/* Contact mini */}
            <div className="mt-4 bg-gray-900 rounded-xl p-4 text-white flex items-center justify-between flex-shrink-0">
              <div>
                <p className="font-bold text-sm">{content.contact.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <a href={`mailto:${content.contact.email}`} className="flex items-center gap-1.5 text-sm text-blue-300 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  {content.contact.email}
                </a>
                <a href={`tel:${content.contact.phone}`} className="flex items-center gap-1.5 text-sm text-blue-300 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  {content.contact.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </REASlideLayout>
  );
};
