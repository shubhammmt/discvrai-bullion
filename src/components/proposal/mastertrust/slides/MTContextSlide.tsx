import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { MessageSquare, Target, Users, Phone, Calendar, ArrowRight, Briefcase } from 'lucide-react';

interface MTContextSlideProps {
  slide: MasterTrustSlide;
}

export const MTContextSlide: React.FC<MTContextSlideProps> = ({ slide }) => {
  const { content } = slide;

  return (
    <div className="w-full h-full flex flex-col bg-white p-8">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{slide.title}</h1>
            <p className="text-xs text-slate-500">{slide.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-5 min-h-0">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          {/* Discussions */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-slate-700" />
              <h3 className="font-bold text-sm text-slate-800">Discussions So Far</h3>
            </div>
            <div className="space-y-2">
              {content?.discussions?.map((d: any, i: number) => (
                <div key={i} className="flex items-start gap-2.5 bg-white border border-slate-200 rounded-lg px-3 py-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {d.count}
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold text-slate-700">{d.names}</p>
                    <p className="text-[11px] text-slate-500">{d.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-4 h-4 text-slate-700" />
              <h3 className="font-bold text-sm text-slate-800">Our Team</h3>
            </div>
            <div className="space-y-2">
              {content?.team?.map((t: any, i: number) => (
                <div key={i} className="bg-white border border-slate-200 rounded-lg px-3 py-2">
                  <p className="text-[12px] font-bold text-slate-800">{t.name} <span className="font-normal text-slate-500">— {t.role}</span></p>
                  <p className="text-[11px] text-slate-500">{t.background}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {/* What We Understand */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-blue-700" />
              <h3 className="font-bold text-sm text-blue-800">What We Understand & Trying to Enable</h3>
            </div>
            <div className="space-y-2">
              {content?.understanding?.map((u: string, i: number) => (
                <div key={i} className="flex items-start gap-2 bg-white border border-blue-200 rounded-lg px-3 py-2">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] text-slate-700">{u}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-sm text-emerald-800">Agenda & Path Forward</h3>
            </div>
            <div className="space-y-2">
              {content?.agenda?.map((a: string, i: number) => (
                <div key={i} className="flex items-start gap-2 bg-white border border-emerald-200 rounded-lg px-3 py-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-[12px] text-slate-700">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-400">
        <span>DiscvrAI — B2B Arm for Large Scale Business Transformation through AI Stack</span>
        <span>February 2026</span>
      </div>
    </div>
  );
};
