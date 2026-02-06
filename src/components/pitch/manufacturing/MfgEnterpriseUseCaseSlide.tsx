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

// Visual diagrams for different use case types
const FlowDiagram = ({ nodes }: { nodes: string[] }) => (
  <div className="flex items-center justify-center gap-2 py-4">
    {nodes.map((node, i) => (
      <React.Fragment key={i}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          className="bg-gradient-to-br from-amber-500 to-orange-500 text-white px-4 py-3 rounded-lg text-sm font-semibold shadow-lg text-center min-w-[80px]"
        >
          {node}
        </motion.div>
        {i < nodes.length - 1 && (
          <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
        )}
      </React.Fragment>
    ))}
  </div>
);

const ArchitectureDiagram = ({ central, connected }: { central: string; connected: string[] }) => (
  <div className="relative py-4">
    {/* Central Hub */}
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="w-28 h-28 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl z-10 relative"
    >
      <div className="text-center">
        <Database className="w-8 h-8 text-white mx-auto mb-1" />
        <span className="text-white text-xs font-bold leading-tight block">{central}</span>
      </div>
    </motion.div>
    {/* Connected Systems */}
    <div className="flex justify-center gap-2 mt-4 flex-wrap">
      {connected.slice(0, 6).map((system, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.05 }}
          className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded text-sm text-slate-700 font-medium"
        >
          {system}
        </motion.div>
      ))}
    </div>
  </div>
);

const ComparisonDiagram = ({ before, after }: { before: string; after: string }) => (
  <div className="grid grid-cols-2 gap-4 py-4">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
    >
      <AlertTriangle className="w-6 h-6 text-red-500 mx-auto mb-2" />
      <p className="text-sm font-bold text-red-700">Before</p>
      <p className="text-sm text-red-600 mt-2">{before}</p>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center"
    >
      <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
      <p className="text-sm font-bold text-emerald-700">After</p>
      <p className="text-sm text-emerald-600 mt-2">{after}</p>
    </motion.div>
  </div>
);

const HubSpokeDiagram = ({ hub, spokes }: { hub: string; spokes: string[] }) => (
  <div className="py-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-4"
    >
      <div className="text-center">
        <Zap className="w-6 h-6 text-white mx-auto mb-1" />
        <span className="text-white text-xs font-bold">{hub}</span>
      </div>
    </motion.div>
    <div className="flex justify-center gap-2 flex-wrap">
      {spokes.map((spoke, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.05 }}
          className="bg-blue-100 border border-blue-200 px-3 py-1.5 rounded text-sm text-blue-700 font-medium"
        >
          {spoke}
        </motion.div>
      ))}
    </div>
  </div>
);

// Icon mapping for use cases
const getUseCaseIcon = (id: string) => {
  const icons: Record<string, React.ReactNode> = {
    'data-lake': <Database className="w-6 h-6" />,
    'customer-mdm': <Users className="w-6 h-6" />,
    'service-scheduling': <Calendar className="w-6 h-6" />,
    'erp-optimization': <Settings className="w-6 h-6" />,
    'd2c-subscription': <ShoppingBag className="w-6 h-6" />,
    'supply-chain-visibility': <Truck className="w-6 h-6" />,
    'product-authentication': <QrCode className="w-6 h-6" />,
  };
  return icons[id] || <Zap className="w-6 h-6" />;
};

// Visual configurations per use case
const getVisualConfig = (id: string, type: string) => {
  const configs: Record<string, any> = {
    'data-lake': {
      flow: ['Factory', 'ERP/SAP', 'Data Lake', 'Power BI', 'Decision'],
      architecture: { central: 'Enterprise Data Lake', connected: ['SAP', 'CRM', 'Service Systems', 'D2C', 'Channel Sales'] },
    },
    'customer-mdm': {
      hub: { hub: 'Customer MDM', spokes: ['UUID', 'Dedup', 'Governance', 'Sync', 'Validation'] },
      comparison: { before: '2.08 Cr+ fragmented records', after: 'Single trusted identity' },
    },
    'service-scheduling': {
      flow: ['Request', 'Auto Schedule', 'Slot Confirm', 'Dispatch', 'Complete'],
      comparison: { before: 'Manual call-center', after: 'Automated SLA engine' },
    },
    'erp-optimization': {
      comparison: { before: 'Slow ERP, rising costs', after: 'Optimized, ₹1Cr savings' },
      architecture: { central: 'ERP Core', connected: ['Archival', 'Performance', 'Governance', 'Licensing'] },
    },
    'd2c-subscription': {
      flow: ['Product', 'Service', 'Subscription', 'Renewal', 'CLTV'],
      comparison: { before: 'Product-only revenue', after: 'Recurring revenue streams' },
    },
    'supply-chain-visibility': {
      flow: ['Factory', 'Warehouse', 'Transport', 'Distributor', 'Customer'],
      architecture: { central: 'Control Tower', connected: ['Factory', 'Warehouse', 'Transport', 'Distributor', 'Alerts'] },
    },
    'product-authentication': {
      flow: ['Manufacture', 'QR Code', 'Scan', 'Validate', 'Authentic'],
      hub: { hub: 'Authentication', spokes: ['QR Gen', 'Validate', 'Alert', 'Track', 'Report'] },
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
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 flex-shrink-0"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white">
              {getUseCaseIcon(slide.useCaseId)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">{slide.headline}</h2>
              <p className="text-sm text-gray-500">{slide.subheadline}</p>
            </div>
          </div>
        </motion.div>

        {/* Executive Context */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-3 flex-shrink-0"
        >
          <p className="text-sm text-gray-700 leading-relaxed">{slide.executiveContext}</p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-12 gap-3 min-h-0">
          {/* Left: Challenge + Visual */}
          <div className="col-span-4 flex flex-col gap-3">
            {/* Core Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 flex-1"
            >
              <h3 className="text-base font-bold text-red-700 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {slide.coreChallenge.title}
              </h3>
              <div className="space-y-2">
                {slide.coreChallenge.points.slice(0, 4).map((point, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-red-700 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual Diagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-slate-200 rounded-lg p-3"
            >
              {renderVisual()}
            </motion.div>
          </div>

          {/* Center: Transformation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-5 bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex flex-col"
          >
            <h3 className="text-base font-bold text-emerald-700 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {slide.transformationDelivered.title}
            </h3>
            
            {slide.transformationDelivered.scope && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {slide.transformationDelivered.scope.slice(0, 5).map((item, i) => (
                  <span key={i} className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded">
                    {item}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex-1 space-y-3">
              {slide.transformationDelivered.keyCapabilities.slice(0, 3).map((capability, index) => (
                <div key={index}>
                  <h4 className="text-sm font-semibold text-emerald-800 mb-1.5">{capability.name}</h4>
                  <div className="space-y-1">
                    {capability.points.slice(0, 2).map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-emerald-700 leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Impact + Scale */}
          <div className="col-span-3 flex flex-col gap-3">
            {/* Business Impact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800 text-white rounded-lg p-4 flex-1"
            >
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <LineChart className="w-4 h-4" />
                Business Impact
              </h3>
              <div className="space-y-2">
                {slide.businessImpact.slice(0, 4).map((impact, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/90 leading-relaxed">{impact}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Scale & Complexity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-amber-50 border border-amber-200 rounded-lg p-4"
            >
              <h3 className="text-sm font-bold text-amber-700 mb-2">Scale & Complexity</h3>
              <div className="space-y-1.5">
                {slide.scaleComplexity.slice(0, 3).map((item, index) => (
                  <p key={index} className="text-sm text-amber-700 leading-relaxed">• {item}</p>
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
          className="mt-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg px-4 py-3 flex-shrink-0"
        >
          <p className="text-sm text-gray-800">
            <span className="font-bold text-amber-700">Relevance for Large Manufacturing Enterprises: </span>
            {slide.relevance}
          </p>
        </motion.div>
      </div>
    </MfgSlideLayout>
  );
};
