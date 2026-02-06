import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Users, Calendar, Settings, ShoppingBag, Truck, QrCode,
  ArrowRight, CheckCircle, AlertTriangle, LineChart, Zap
} from 'lucide-react';
import { MfgSlideLayout } from './MfgSlideLayout';

interface EnterpriseUseCaseSlideProps {
  slide: {
    headline: string;
    subheadline: string;
    useCaseId: string;
    executiveContext: string;
    coreChallenge: {
      title: string;
      points: string[];
    };
    transformationDelivered: {
      title: string;
      scope?: string[];
      keyCapabilities: Array<{
        name: string;
        points: string[];
      }>;
    };
    scaleComplexity: string[];
    businessImpact: string[];
    relevance: string;
    visualType: 'flow' | 'architecture' | 'comparison' | 'hub';
  };
  slideNumber: number;
  totalSlides: number;
}

// Compact visual diagrams
const FlowDiagram = ({ nodes }: { nodes: string[] }) => (
  <div className="flex items-center justify-center gap-1 py-2">
    {nodes.slice(0, 4).map((node, i) => (
      <React.Fragment key={i}>
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white px-2 py-1.5 rounded text-xs font-semibold text-center">
          {node}
        </div>
        {i < Math.min(nodes.length, 4) - 1 && (
          <ArrowRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
        )}
      </React.Fragment>
    ))}
  </div>
);

const ArchitectureDiagram = ({ central, connected }: { central: string; connected: string[] }) => (
  <div className="py-2">
    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-md z-10 relative">
      <div className="text-center">
        <Database className="w-5 h-5 text-white mx-auto" />
        <span className="text-white text-[9px] font-bold leading-tight block">{central}</span>
      </div>
    </div>
    <div className="flex justify-center gap-1 mt-2 flex-wrap">
      {connected.slice(0, 5).map((system, i) => (
        <span key={i} className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-xs text-slate-700 font-medium">
          {system}
        </span>
      ))}
    </div>
  </div>
);

const ComparisonDiagram = ({ before, after }: { before: string; after: string }) => (
  <div className="grid grid-cols-2 gap-2 py-2">
    <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-center">
      <AlertTriangle className="w-4 h-4 text-red-500 mx-auto mb-1" />
      <p className="text-xs font-bold text-red-700">Before</p>
      <p className="text-xs text-red-600 mt-1">{before}</p>
    </div>
    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-center">
      <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
      <p className="text-xs font-bold text-emerald-700">After</p>
      <p className="text-xs text-emerald-600 mt-1">{after}</p>
    </div>
  </div>
);

const HubSpokeDiagram = ({ hub, spokes }: { hub: string; spokes: string[] }) => (
  <div className="py-2">
    <div className="w-14 h-14 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md mb-2">
      <div className="text-center">
        <Zap className="w-4 h-4 text-white mx-auto" />
        <span className="text-white text-[9px] font-bold">{hub}</span>
      </div>
    </div>
    <div className="flex justify-center gap-1 flex-wrap">
      {spokes.slice(0, 4).map((spoke, i) => (
        <span key={i} className="bg-blue-100 border border-blue-200 px-2 py-0.5 rounded text-xs text-blue-700 font-medium">
          {spoke}
        </span>
      ))}
    </div>
  </div>
);

// Icon mapping
const getUseCaseIcon = (id: string) => {
  const icons: Record<string, React.ReactNode> = {
    'data-lake': <Database className="w-5 h-5" />,
    'customer-mdm': <Users className="w-5 h-5" />,
    'service-scheduling': <Calendar className="w-5 h-5" />,
    'erp-optimization': <Settings className="w-5 h-5" />,
    'd2c-subscription': <ShoppingBag className="w-5 h-5" />,
    'supply-chain-visibility': <Truck className="w-5 h-5" />,
    'product-authentication': <QrCode className="w-5 h-5" />,
  };
  return icons[id] || <Zap className="w-5 h-5" />;
};

// Visual configurations
const getVisualConfig = (id: string, type: string) => {
  const configs: Record<string, any> = {
    'data-lake': {
      flow: ['Factory', 'ERP/SAP', 'Data Lake', 'Decision'],
      architecture: { central: 'Data Lake', connected: ['SAP', 'CRM', 'Service', 'D2C', 'Sales'] },
    },
    'customer-mdm': {
      hub: { hub: 'MDM', spokes: ['UUID', 'Dedup', 'Govern', 'Sync'] },
      comparison: { before: '2.08 Cr+ fragmented', after: 'Single identity' },
    },
    'service-scheduling': {
      flow: ['Request', 'Schedule', 'Dispatch', 'Complete'],
      comparison: { before: 'Manual call-center', after: 'Auto SLA engine' },
    },
    'erp-optimization': {
      comparison: { before: 'Slow ERP, rising costs', after: 'Optimized, ₹1Cr saved' },
      architecture: { central: 'ERP', connected: ['Archive', 'Perf', 'Govern', 'License'] },
    },
    'd2c-subscription': {
      flow: ['Product', 'Service', 'Subscribe', 'CLTV'],
      comparison: { before: 'Product-only', after: 'Recurring revenue' },
    },
    'supply-chain-visibility': {
      flow: ['Factory', 'Warehouse', 'Transport', 'Customer'],
      architecture: { central: 'Control Tower', connected: ['Factory', 'Warehouse', 'Transport', 'Alerts'] },
    },
    'product-authentication': {
      flow: ['Manufacture', 'QR Code', 'Validate', 'Authentic'],
      hub: { hub: 'Auth', spokes: ['QR Gen', 'Validate', 'Alert', 'Track'] },
    },
  };
  return configs[id]?.[type] || configs[id]?.flow || configs[id]?.architecture;
};

export const MfgEnterpriseUseCaseSlide: React.FC<EnterpriseUseCaseSlideProps> = ({ 
  slide, 
  slideNumber, 
  totalSlides 
}) => {
  const visualConfig = getVisualConfig(slide.useCaseId, slide.visualType);

  const renderVisual = () => {
    switch (slide.visualType) {
      case 'flow':
        return <FlowDiagram nodes={visualConfig || ['Start', 'Process', 'End']} />;
      case 'architecture':
        return <ArchitectureDiagram central={visualConfig?.central || 'Hub'} connected={visualConfig?.connected || []} />;
      case 'comparison':
        return <ComparisonDiagram before={visualConfig?.before || 'Before'} after={visualConfig?.after || 'After'} />;
      case 'hub':
        return <HubSpokeDiagram hub={visualConfig?.hub || 'Hub'} spokes={visualConfig?.spokes || []} />;
      default:
        return <FlowDiagram nodes={['Factory', 'Transform', 'Outcome']} />;
    }
  };

  return (
    <MfgSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 flex-shrink-0"
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white flex-shrink-0">
              {getUseCaseIcon(slide.useCaseId)}
            </div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">{slide.headline}</h2>
          </div>
          <p className="text-sm text-gray-500 ml-11">{slide.subheadline}</p>
        </motion.div>

        {/* Executive Context */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 mb-2 flex-shrink-0"
        >
          <p className="text-xs text-gray-700 leading-relaxed">{slide.executiveContext}</p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-12 gap-2 min-h-0 overflow-hidden">
          {/* Left: Challenge + Visual */}
          <div className="col-span-4 flex flex-col gap-2 min-h-0 overflow-hidden">
            {/* Core Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-red-50 border border-red-200 rounded-lg p-3 flex-1 min-h-0 overflow-hidden"
            >
              <h3 className="text-sm font-bold text-red-700 mb-2 flex items-center gap-1.5 flex-shrink-0">
                <AlertTriangle className="w-4 h-4" />
                {slide.coreChallenge.title}
              </h3>
              <div className="space-y-1.5">
                {slide.coreChallenge.points.slice(0, 4).map((point, index) => (
                  <div key={index} className="flex items-start gap-1.5">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-red-700 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual Diagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-slate-200 rounded-lg p-2 flex-shrink-0"
            >
              {renderVisual()}
            </motion.div>
          </div>

          {/* Center: Transformation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-5 bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex flex-col min-h-0 overflow-hidden"
          >
            <h3 className="text-sm font-bold text-emerald-700 mb-2 flex items-center gap-1.5 flex-shrink-0">
              <CheckCircle className="w-4 h-4" />
              {slide.transformationDelivered.title}
            </h3>
            
            {slide.transformationDelivered.scope && (
              <div className="flex flex-wrap gap-1 mb-2 flex-shrink-0">
                {slide.transformationDelivered.scope.slice(0, 4).map((item, i) => (
                  <span key={i} className="bg-emerald-100 text-emerald-700 text-[10px] font-medium px-1.5 py-0.5 rounded">
                    {item}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex-1 space-y-2 min-h-0 overflow-hidden">
              {slide.transformationDelivered.keyCapabilities.slice(0, 3).map((capability, index) => (
                <div key={index}>
                  <h4 className="text-xs font-semibold text-emerald-800 mb-1">{capability.name}</h4>
                  <div className="space-y-0.5">
                    {capability.points.slice(0, 2).map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-emerald-700 leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Impact + Scale */}
          <div className="col-span-3 flex flex-col gap-2 min-h-0 overflow-hidden">
            {/* Business Impact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800 text-white rounded-lg p-3 flex-1 min-h-0 overflow-hidden"
            >
              <h3 className="text-xs font-bold mb-2 flex items-center gap-1.5 flex-shrink-0">
                <LineChart className="w-3.5 h-3.5" />
                Business Impact
              </h3>
              <div className="space-y-1.5">
                {slide.businessImpact.slice(0, 4).map((impact, index) => (
                  <div key={index} className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-white/90 leading-relaxed">{impact}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Scale & Complexity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex-shrink-0"
            >
              <h3 className="text-xs font-bold text-amber-700 mb-1.5">Scale & Complexity</h3>
              <div className="space-y-1">
                {slide.scaleComplexity.slice(0, 3).map((item, index) => (
                  <p key={index} className="text-xs text-amber-700 leading-relaxed">• {item}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Relevance Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg px-4 py-2 flex-shrink-0"
        >
          <p className="text-xs text-gray-800">
            <span className="font-bold text-amber-700">Relevance: </span>
            {slide.relevance}
          </p>
        </motion.div>
      </div>
    </MfgSlideLayout>
  );
};
