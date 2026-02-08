import React from 'react';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { DalmiaCoverSlide } from './DalmiaCoverSlide';
import { DalmiaVisionArchitectureSlide } from './DalmiaVisionArchitectureSlide';
import { DalmiaSalesDealer360Slide } from './DalmiaSalesDealer360Slide';
import { DalmiaMarketingEngagementSlide } from './DalmiaMarketingEngagementSlide';
import { DalmiaSupplyChainSlide } from './DalmiaSupplyChainSlide';
import { DalmiaValueMapSlide } from './DalmiaValueMapSlide';
import { DalmiaRoadmapAskSlide } from './DalmiaRoadmapAskSlide';
// New strategy slides
import { DalmiaWhyNowSlide } from './DalmiaWhyNowSlide';
import { DalmiaTransformationSlide } from './DalmiaTransformationSlide';
import { DalmiaGlobalExamplesSlide } from './DalmiaGlobalExamplesSlide';
import { DalmiaTodaySlide } from './DalmiaTodaySlide';
import { DalmiaFutureVisionSlide } from './DalmiaFutureVisionSlide';
import { DalmiaValueStreamsSlide } from './DalmiaValueStreamsSlide';
import { DalmiaPricingEngineSlide } from './DalmiaPricingEngineSlide';
import { DalmiaSalesCopilotSlide } from './DalmiaSalesCopilotSlide';
import { DalmiaDealer360Slide } from './DalmiaDealer360Slide';
import { DalmiaMarketingEngineSlide } from './DalmiaMarketingEngineSlide';
import { DalmiaDemandSensingSlide } from './DalmiaDemandSensingSlide';
import { DalmiaO2CSlide } from './DalmiaO2CSlide';
import { DalmiaSuvidhaSlide } from './DalmiaSuvidhaSlide';
import { DalmiaCaseStudiesSlide } from './DalmiaCaseStudiesSlide';
// Theme slides
import { DalmiaThemeDataPlatformSlide } from './DalmiaThemeDataPlatformSlide';
import { DalmiaThemeSalesChannelSlide } from './DalmiaThemeSalesChannelSlide';
import { DalmiaThemeSupplyChainSlide } from './DalmiaThemeSupplyChainSlide';
import { DalmiaThemeDigitalTrustSlide } from './DalmiaThemeDigitalTrustSlide';
import { DalmiaThemeMarginIntelSlide } from './DalmiaThemeMarginIntelSlide';
// Case study slides
import { DalmiaCaseDataLakeSlide } from './DalmiaCaseDataLakeSlide';
import { DalmiaCaseCustomerMDPSlide } from './DalmiaCaseCustomerMDPSlide';
import { DalmiaCaseFieldForceSlide } from './DalmiaCaseFieldForceSlide';
import { DalmiaCaseCustomerLifecycleSlide } from './DalmiaCaseCustomerLifecycleSlide';
import { DalmiaCaseSupplyVisibilitySlide } from './DalmiaCaseSupplyVisibilitySlide';
import { DalmiaCaseDynamicCapacitySlide } from './DalmiaCaseDynamicCapacitySlide';
import { DalmiaCaseQRAuthSlide } from './DalmiaCaseQRAuthSlide';
import { DalmiaCaseCommodityCostingSlide } from './DalmiaCaseCommodityCostingSlide';
import { DalmiaCaseFinancialReconSlide } from './DalmiaCaseFinancialReconSlide';

interface MfgNewSlideRendererProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const MfgNewSlideRenderer: React.FC<MfgNewSlideRendererProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const baseProps = { slideNumber, totalSlides };

  switch (slide.type) {
    case 'dalmia-cover':
      return <DalmiaCoverSlide slide={slide} {...baseProps} />;
    case 'dalmia-why-now':
      return <DalmiaWhyNowSlide slide={slide} {...baseProps} />;
    case 'dalmia-transformation':
      return <DalmiaTransformationSlide slide={slide} {...baseProps} />;
    case 'dalmia-global-examples':
      return <DalmiaGlobalExamplesSlide slide={slide} {...baseProps} />;
    case 'dalmia-today':
      return <DalmiaTodaySlide slide={slide} {...baseProps} />;
    case 'dalmia-future-vision':
      return <DalmiaFutureVisionSlide slide={slide} {...baseProps} />;
    case 'dalmia-value-streams':
      return <DalmiaValueStreamsSlide slide={slide} {...baseProps} />;
    case 'dalmia-pricing-engine':
      return <DalmiaPricingEngineSlide slide={slide} {...baseProps} />;
    case 'dalmia-sales-copilot':
      return <DalmiaSalesCopilotSlide slide={slide} {...baseProps} />;
    case 'dalmia-dealer360':
      return <DalmiaDealer360Slide slide={slide} {...baseProps} />;
    case 'dalmia-marketing-engine':
      return <DalmiaMarketingEngineSlide slide={slide} {...baseProps} />;
    case 'dalmia-demand-sensing':
      return <DalmiaDemandSensingSlide slide={slide} {...baseProps} />;
    case 'dalmia-o2c':
      return <DalmiaO2CSlide slide={slide} {...baseProps} />;
    case 'dalmia-suvidha':
      return <DalmiaSuvidhaSlide slide={slide} {...baseProps} />;
    case 'dalmia-case-studies':
      return <DalmiaCaseStudiesSlide slide={slide} {...baseProps} />;
    case 'dalmia-vision-architecture':
      return <DalmiaVisionArchitectureSlide slide={slide} {...baseProps} />;
    case 'dalmia-sales-dealer360':
      return <DalmiaSalesDealer360Slide slide={slide} {...baseProps} />;
    case 'dalmia-marketing-engagement':
      return <DalmiaMarketingEngagementSlide slide={slide} {...baseProps} />;
    case 'dalmia-supply-chain':
      return <DalmiaSupplyChainSlide slide={slide} {...baseProps} />;
    case 'dalmia-valuemap':
      return <DalmiaValueMapSlide slide={slide} {...baseProps} />;
    case 'dalmia-roadmap-ask':
      return <DalmiaRoadmapAskSlide slide={slide} {...baseProps} />;
    // Theme slides
    case 'dalmia-theme-data-platform':
      return <DalmiaThemeDataPlatformSlide slide={slide} {...baseProps} />;
    case 'dalmia-theme-sales-channel':
      return <DalmiaThemeSalesChannelSlide slide={slide} {...baseProps} />;
    case 'dalmia-theme-supply-chain':
      return <DalmiaThemeSupplyChainSlide slide={slide} {...baseProps} />;
    case 'dalmia-theme-digital-trust':
      return <DalmiaThemeDigitalTrustSlide slide={slide} {...baseProps} />;
    case 'dalmia-theme-margin-intel':
      return <DalmiaThemeMarginIntelSlide slide={slide} {...baseProps} />;
    // Case study slides
    case 'dalmia-case-data-lake':
      return <DalmiaCaseDataLakeSlide slide={slide} {...baseProps} />;
    case 'dalmia-case-customer-mdp':
      return <DalmiaCaseCustomerMDPSlide slide={slide} {...baseProps} />;
    case 'dalmia-case-field-force':
      return <DalmiaCaseFieldForceSlide slide={slide} {...baseProps} />;
    case 'dalmia-case-customer-lifecycle':
      return <DalmiaCaseCustomerLifecycleSlide slide={slide} {...baseProps} />;
    case 'dalmia-case-supply-visibility':
      return <DalmiaCaseSupplyVisibilitySlide slide={slide} {...baseProps} />;
    case 'dalmia-case-dynamic-capacity':
      return <DalmiaCaseDynamicCapacitySlide slide={slide} {...baseProps} />;
    case 'dalmia-case-qr-auth':
      return <DalmiaCaseQRAuthSlide slide={slide} {...baseProps} />;
    case 'dalmia-case-commodity-costing':
      return <DalmiaCaseCommodityCostingSlide slide={slide} {...baseProps} />;
    case 'dalmia-case-financial-recon':
      return <DalmiaCaseFinancialReconSlide slide={slide} {...baseProps} />;
    default:
      return (
        <div className="h-screen w-full bg-white flex items-center justify-center">
          <p className="text-slate-800">Slide type not found: {slide.type}</p>
        </div>
      );
  }
};
