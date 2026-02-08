import React from 'react';
import { DalmiaCaseThemeSlide } from './DalmiaCaseThemeSlide';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { TrendingUp } from 'lucide-react';

interface Props {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCaseThemeMarginSlide: React.FC<Props> = (props) => {
  const themeData = {
    caseStudyTitle: 'Commodity Costing AI + Financial Reconciliation Automation',
    sectionLabel: 'Theme 5 — Margin Intelligence',
    customerProfile: {
      industry: 'Enterprise Operations',
      revenue: '₹2,000+ Cr',
      scale: ['Large vendor ecosystem', 'Complex pricing structures', 'High transaction volumes'],
      systems: ['SAP Finance', 'Treasury', 'Commodity Trading', 'AP/AR']
    },
    problem: [
      'Manual 4-way reconciliation consuming weeks',
      'Commodity price impact on margins unknown in real-time',
      'Revenue leakage from pricing errors undetected',
      'Delayed financial decisions'
    ],
    transformation: [
      'AI-powered cost tracking with commodity APIs',
      'Automated 4-way matching and exception handling',
      'Real-time margin simulation dashboards',
      'Proactive leakage detection'
    ],
    impact: [
      'Faster financial close cycles',
      'Leakage reduction of 2-3% of revenue',
      'Real-time margin visibility for CFO',
      'Automated exception resolution'
    ],
    wireframe: {
      nodes: ['Commodity APIs', 'ERP Finance', 'AI Model', 'Margin Dashboard'],
      flow: 'left-to-right'
    }
  };

  return (
    <DalmiaCaseThemeSlide
      {...props}
      themeData={themeData}
      themeIcon={TrendingUp}
      themeColor="emerald"
    />
  );
};
