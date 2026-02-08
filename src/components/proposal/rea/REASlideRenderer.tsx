import React from 'react';
import { REASlide } from '@/data/reaProposalSlides';
import { CoverSlide } from './slides/CoverSlide';
import { TrackRecordSlide } from './slides/TrackRecordSlide';
import { PlatformCapabilitiesSlide } from './slides/PlatformCapabilitiesSlide';
import { AnalyticsSlide } from './slides/AnalyticsSlide';
import { ApproachSlide } from './slides/ApproachSlide';
import { REAUseCasesSlide } from './slides/REAUseCasesSlide';
import { REAVerticalsSlide } from './slides/REAVerticalsSlide';
import { NextStepsSlide } from './slides/NextStepsSlide';
import { DiscussionSlide } from './slides/DiscussionSlide';

interface REASlideRendererProps {
  slide: REASlide;
  slideNumber: number;
  totalSlides: number;
}

export const REASlideRenderer: React.FC<REASlideRendererProps> = ({ slide, slideNumber, totalSlides }) => {
  const props = { slide, slideNumber, totalSlides };

  switch (slide.type) {
    case 'cover':
      return <CoverSlide {...props} />;
    case 'track-record':
      return <TrackRecordSlide {...props} />;
    case 'platform-capabilities':
      return <PlatformCapabilitiesSlide {...props} />;
    case 'analytics':
      return <AnalyticsSlide {...props} />;
    case 'approach':
      return <ApproachSlide {...props} />;
    case 'rea-usecases':
      return <REAUseCasesSlide {...props} />;
    case 'rea-verticals':
      return <REAVerticalsSlide {...props} />;
    case 'next-steps':
      return <NextStepsSlide {...props} />;
    case 'discussion':
      return <DiscussionSlide {...props} />;
    default:
      return (
        <div className="h-screen w-full bg-white flex items-center justify-center">
          <p className="text-gray-500">Slide type not found: {slide.type}</p>
        </div>
      );
  }
};
