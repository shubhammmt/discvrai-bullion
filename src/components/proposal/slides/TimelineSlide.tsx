import React from 'react';
import { JindalSlide } from '@/data/jindalProposalSlides';
import { CheckCircle } from 'lucide-react';

interface TimelineSlideProps {
  slide: JindalSlide;
}

export const TimelineSlide: React.FC<TimelineSlideProps> = ({ slide }) => {
  const { content } = slide;

  const getPhaseColor = (index: number) => {
    const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-slate-800'];
    return colors[index % colors.length];
  };

  return (
    <div className="w-full h-full flex flex-col bg-white p-12">
      {/* Header */}
      <div className="mb-6">
        <div className="w-12 h-1 bg-slate-800 mb-4" />
        <h1 className="text-4xl font-light text-slate-800">{slide.title}</h1>
      </div>

      {/* Timeline Phases */}
      <div className="flex-1">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {content?.phases?.map((phase: any, index: number) => (
            <div key={index} className="relative">
              {/* Phase indicator */}
              <div className={`${getPhaseColor(index)} text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3`}>
                {phase.phase}: {phase.name}
              </div>
              
              {/* Timeline */}
              <p className="text-sm font-medium text-slate-700 mb-2">{phase.timeline}</p>
              
              {/* Card */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-sm text-slate-700 mb-3">{phase.deliverables}</p>
                <div className="pt-3 border-t border-slate-200">
                  <p className="text-xs text-slate-500">
                    <span className="font-medium">Success:</span> {phase.criteria}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Milestones */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Key Milestones</h3>
          <div className="grid grid-cols-4 gap-4">
            {content?.milestones?.map((milestone: any, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">{milestone.week}</p>
                  <p className="text-xs text-slate-400">{milestone.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
