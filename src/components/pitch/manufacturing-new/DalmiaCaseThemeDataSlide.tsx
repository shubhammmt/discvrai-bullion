import React from 'react';
import { DalmiaCaseThemeSlide } from './DalmiaCaseThemeSlide';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Database } from 'lucide-react';

interface Props {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCaseThemeDataSlide: React.FC<Props> = (props) => {
  const themeData = {
    caseStudyTitle: 'Enterprise Data Lake + Customer Master Data Platform',
    sectionLabel: 'Theme 1 — Data Foundation',
    customerProfile: {
      industry: 'Consumer Durables Manufacturing',
      revenue: '₹2,000+ Cr',
      scale: ['10,000+ field force', '20M+ customer records', 'Multi-channel sales'],
      systems: ['SAP S/4HANA', 'Dynamics 365', 'CRM', 'D2C channels']
    },
    problem: [
      'Fragmented customer lifecycle visibility across systems',
      'No single source of truth for customer identity',
      'Manual data reconciliation consuming analyst bandwidth',
      'Delayed insights due to batch processing'
    ],
    transformation: [
      'Enterprise data lake consolidating all sources',
      'Customer Master Data Platform (MDM)',
      'Real-time data pipelines and CDC',
      'Decision intelligence dashboards'
    ],
    impact: [
      'Single source of truth established',
      'Foundation for all AI capabilities',
      '70% reduction in data reconciliation time',
      'Real-time visibility for leadership'
    ],
    wireframe: {
      nodes: ['ERP', 'CRM', 'Apps', 'Data Lake', 'AI Layer', 'Dashboards'],
      flow: 'left-to-right'
    }
  };

  return (
    <DalmiaCaseThemeSlide
      {...props}
      themeData={themeData}
      themeIcon={Database}
      themeColor="blue"
    />
  );
};
