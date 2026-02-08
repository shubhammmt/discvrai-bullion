import React from 'react';
import { DalmiaCaseThemeSlide } from './DalmiaCaseThemeSlide';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Shield } from 'lucide-react';

interface Props {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCaseThemeTrustSlide: React.FC<Props> = (props) => {
  const themeData = {
    caseStudyTitle: 'QR Product Authentication & Channel Control',
    sectionLabel: 'Theme 4 — Digital Trust',
    customerProfile: {
      industry: 'High-Volume Distribution',
      revenue: '₹3,000+ Cr',
      scale: ['Nationwide distributor ecosystem', 'Millions of units shipped', 'Brand protection critical'],
      systems: ['Track & Trace', 'Channel Management', 'Analytics']
    },
    problem: [
      'Counterfeit products damaging brand reputation',
      'Proxy sales and channel leakage undetected',
      'No visibility into product journey post-dispatch',
      'Manual channel compliance monitoring'
    ],
    transformation: [
      'QR-based product authentication at every touchpoint',
      'Real-time channel monitoring and alerts',
      'Consumer engagement via scan rewards',
      'Automated compliance scoring for distributors'
    ],
    impact: [
      '100% product authenticity visibility',
      'Revenue protection from grey market',
      'Consumer trust and engagement boost',
      'Channel discipline improvement'
    ],
    wireframe: {
      nodes: ['QR Generation', 'Scan Events', 'Analytics Platform', 'Risk Alerts'],
      flow: 'left-to-right'
    }
  };

  return (
    <DalmiaCaseThemeSlide
      {...props}
      themeData={themeData}
      themeIcon={Shield}
      themeColor="amber"
    />
  );
};
