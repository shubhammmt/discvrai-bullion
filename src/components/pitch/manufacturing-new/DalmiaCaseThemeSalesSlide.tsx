import React from 'react';
import { DalmiaCaseThemeSlide } from './DalmiaCaseThemeSlide';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Users } from 'lucide-react';

interface Props {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCaseThemeSalesSlide: React.FC<Props> = (props) => {
  const themeData = {
    caseStudyTitle: 'Field Force Enablement',
    sectionLabel: 'Theme 2 — Sales Intelligence',
    customerProfile: {
      industry: 'Large Enterprise',
      revenue: '₹2,000+ Cr',
      scale: ['10,000+ field agents', 'Manual order processes', 'Paper-based workflows'],
      systems: ['Legacy CRM', 'Manual reporting', 'Disconnected mobile']
    },
    problem: [
      'Paper-based workflows causing order delays',
      'No real-time visibility into field activities',
      'Manual performance tracking and reporting',
      'Limited coaching insights for managers'
    ],
    transformation: [
      'Digital ordering via mobile app',
      'AI-powered sales insights and recommendations',
      'Real-time performance dashboards',
      'Automated route optimization'
    ],
    impact: [
      'Orders from days → minutes',
      'Real-time execution visibility',
      '40% improvement in sales productivity',
      'Data-driven performance management'
    ],
    wireframe: {
      nodes: ['Field App', 'AI Engine', 'CRM', 'SAP'],
      flow: 'left-to-right'
    }
  };

  return (
    <DalmiaCaseThemeSlide
      {...props}
      themeData={themeData}
      themeIcon={Users}
      themeColor="teal"
    />
  );
};
