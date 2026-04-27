import React from 'react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { TitleSlide } from './TitleSlide';
import { FounderSlide } from './FounderSlide';
import { DefinitionSlide } from './DefinitionSlide';
import { SolutionSlide } from './SolutionSlide';
import { ConsultingSlide } from './ConsultingSlide';
import { AnalyticsSlide } from './AnalyticsSlide';
import { FinanceSlide } from './FinanceSlide';
import { HealthcareSlide } from './HealthcareSlide';
import { SalesSlide } from './SalesSlide';
import { HRSlide } from './HRSlide';
import { ComplianceSlide } from './ComplianceSlide';
import { FlywheelSlide } from './FlywheelSlide';
import { EnterpriseReadySlide } from './EnterpriseReadySlide';
import { RoadmapSlide } from './RoadmapSlide';
import { DifferentiatorsSlide } from './DifferentiatorsSlide';
import { CTASlide } from './CTASlide';
import { ArchitectureSlide } from './ArchitectureSlide';
import { ContactSlide } from './ContactSlide';
import { SupplyChainSlide } from './SupplyChainSlide';
import { PredictiveAnalyticsSlide } from './PredictiveAnalyticsSlide';
import { VedantaBuiltSlide } from './VedantaBuiltSlide';
import { CompanyRealitySlide } from './CompanyRealitySlide';
import { CompanyValueLeakSlide } from './CompanyValueLeakSlide';
import { CompanyCommandCenterSlide } from './CompanyCommandCenterSlide';
import { CompanyPilotSlide } from './CompanyPilotSlide';

interface TransformationSlideRendererProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const TransformationSlideRenderer: React.FC<TransformationSlideRendererProps> = ({ 
  slide, 
  slideNumber, 
  totalSlides 
}) => {
  const props = { slide, slideNumber, totalSlides };
  
  switch (slide.type) {
    case 'title':
      return <TitleSlide {...props} />;
    case 'founder':
      return <FounderSlide {...props} />;
    case 'definition':
      return <DefinitionSlide {...props} />;
    case 'solution':
      return <SolutionSlide {...props} />;
    case 'consulting':
      return <ConsultingSlide {...props} />;
    case 'analytics':
      return <AnalyticsSlide {...props} />;
    case 'finance':
      return <FinanceSlide {...props} />;
    case 'healthcare':
      return <HealthcareSlide {...props} />;
    case 'sales':
      return <SalesSlide {...props} />;
    case 'hr':
      return <HRSlide {...props} />;
    case 'compliance':
      return <ComplianceSlide {...props} />;
    case 'flywheel':
      return <FlywheelSlide {...props} />;
    case 'enterprise-ready':
      return <EnterpriseReadySlide {...props} />;
    case 'roadmap':
      return <RoadmapSlide {...props} />;
    case 'differentiators':
      return <DifferentiatorsSlide {...props} />;
    case 'cta':
      return <CTASlide {...props} />;
    case 'architecture':
      return <ArchitectureSlide {...props} />;
    case 'supply-chain':
      return <SupplyChainSlide {...props} />;
    case 'predictive-analytics':
      return <PredictiveAnalyticsSlide {...props} />;
    case 'vedanta-built':
      return <VedantaBuiltSlide {...props} />;
    case 'company-reality':
      return <CompanyRealitySlide {...props} />;
    case 'company-value-leak':
      return <CompanyValueLeakSlide {...props} />;
    case 'company-command-center':
      return <CompanyCommandCenterSlide {...props} />;
    case 'company-pilot':
      return <CompanyPilotSlide {...props} />;
    case 'contact':
      return <ContactSlide {...props} />;
    default:
      return (
        <div className="h-screen w-full bg-enterprise-navy flex items-center justify-center">
          <p className="text-white">Slide type not found: {slide.type}</p>
        </div>
      );
  }
};
