import React from 'react';
import { DalmiaCaseThemeSlide } from './DalmiaCaseThemeSlide';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Truck } from 'lucide-react';

interface Props {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCaseThemeSupplySlide: React.FC<Props> = (props) => {
  const themeData = {
    caseStudyTitle: 'Supply Chain Visibility + Dynamic Capacity Management',
    sectionLabel: 'Theme 3 — Supply Chain Intelligence',
    customerProfile: {
      industry: 'Manufacturing & Distribution',
      revenue: '₹5,000+ Cr',
      scale: ['Nationwide multi-factory network', 'High SKU volumes', '1000+ distributors'],
      systems: ['SAP SCM', 'TMS', 'WMS', 'Demand Planning']
    },
    problem: [
      'No real-time inventory visibility across network',
      'Reactive planning based on historical data',
      'Weather and demand volatility causing stockouts',
      'Manual transport coordination'
    ],
    transformation: [
      'Real-time visibility from plant to dealer',
      'AI-powered demand prediction with external signals',
      'Dynamic capacity rebalancing across plants',
      'Weather-driven forecasting integration'
    ],
    impact: [
      'Reduced delays by 35%',
      'Optimized inventory holding costs',
      '25% improvement in forecast accuracy',
      'Proactive supply chain decisions'
    ],
    wireframe: {
      nodes: ['Factory', 'Warehouse', 'Transport', 'Dealer', 'Real-time Data'],
      flow: 'left-to-right'
    }
  };

  return (
    <DalmiaCaseThemeSlide
      {...props}
      themeData={themeData}
      themeIcon={Truck}
      themeColor="purple"
    />
  );
};
