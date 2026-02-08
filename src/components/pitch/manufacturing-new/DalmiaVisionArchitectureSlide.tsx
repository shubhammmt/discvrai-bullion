import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Users,
  Smartphone,
  Monitor,
  MessageCircle,
  Globe,
  DollarSign,
  UserCheck,
  Megaphone,
  FileCheck,
  Brain,
  AlertTriangle,
  CreditCard,
  Heart,
  Database,
  ShoppingCart,
  Award,
  Cloud,
  ArrowRight,
  LucideIcon
} from 'lucide-react';

interface DalmiaVisionArchitectureSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

interface LayerItem {
  icon: LucideIcon;
  label: string;
  value?: string;
}

interface StackLayer {
  label: string;
  items: LayerItem[];
  colorClass: string;
  isDiscvrLayer?: boolean;
}

export const DalmiaVisionArchitectureSlide: React.FC<DalmiaVisionArchitectureSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const layers: StackLayer[] = [
    {
      label: 'Value',
      colorClass: 'orange',
      items: [
        { icon: TrendingUp, label: 'Total Opportunity', value: '₹870–1,720 Cr' }
      ]
    },
    {
      label: 'Outcomes',
      colorClass: 'amber',
      items: [
        { icon: TrendingUp, label: 'Revenue', value: '₹420–830 Cr' },
        { icon: TrendingDown, label: 'Savings', value: '₹450–890 Cr' },
        { icon: Zap, label: 'Speed', value: '80% ↑' },
        { icon: Users, label: 'Retention', value: '25% ↑' }
      ]
    },
    {
      label: 'Channels',
      colorClass: 'teal',
      items: [
        { icon: Smartphone, label: 'Dealer Ordering App' },
        { icon: Monitor, label: 'Mobile App' },
        { icon: MessageCircle, label: 'WhatsApp' },
        { icon: Globe, label: 'Dealer Portal' }
      ]
    },
    {
      label: 'Intelligence',
      colorClass: 'blue',
      isDiscvrLayer: true,
      items: [
        { icon: DollarSign, label: 'AI Pricing Engine' },
        { icon: UserCheck, label: 'Sales Copilot' },
        { icon: Users, label: 'Dealer 360' },
        { icon: Megaphone, label: 'AI Marketing Radar' },
        { icon: Brain, label: 'Demand Planning' },
        { icon: FileCheck, label: 'Touchless O2C' },
        { icon: Monitor, label: 'Dashboarding & Insights' }
      ]
    },
    {
      label: 'Data',
      colorClass: 'slate',
      items: [
        { icon: Database, label: 'SAP' },
        { icon: ShoppingCart, label: 'Order Data' },
        { icon: Award, label: 'Loyalty' },
        { icon: Cloud, label: 'External' }
      ]
    }
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
    orange: { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700', iconBg: 'bg-orange-100' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', iconBg: 'bg-amber-100' },
    teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', iconBg: 'bg-teal-100' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', iconBg: 'bg-purple-100' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', iconBg: 'bg-blue-100' },
    slate: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', iconBg: 'bg-slate-100' }
  };

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0 px-8 py-4">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">
              Vision & Architecture
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
              {slide.headline}
            </h2>
          </div>
        </div>

        {/* From → To Bridge - Horizontal Compact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center justify-center gap-6 mb-6"
        >
          <div className="flex items-center gap-3 bg-slate-100 border border-slate-200 rounded-xl px-5 py-2.5">
            <span className="text-xs font-medium text-slate-500">TODAY:</span>
            <span className="text-sm text-slate-700">Disconnected Tools, Data and Insights</span>
          </div>
          <ArrowRight className="w-6 h-6 text-teal-500" />
          <div className="flex items-center gap-3 bg-teal-50 border border-teal-300 rounded-xl px-5 py-2.5">
            <span className="text-xs font-medium text-teal-600">TOMORROW:</span>
            <span className="text-sm font-semibold text-teal-700">Unified AI Platform</span>
          </div>
        </motion.div>

        {/* Horizontal Stack - Wide Layout */}
        <div className="flex-1 flex flex-col justify-center gap-3 min-h-0 relative pl-24">
          {layers.map((layer, layerIndex) => {
            const colors = colorMap[layer.colorClass];
            return (
              <motion.div
                key={layerIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + layerIndex * 0.08, duration: 0.3 }}
                className={`flex items-center gap-4 relative ${layer.isDiscvrLayer ? 'border-2 border-dashed border-blue-400 rounded-xl p-3 -ml-3' : ''}`}
              >
                {/* Discvr AI badge for Intelligence layer */}
                {layer.isDiscvrLayer && (
                  <div className="absolute -left-20 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[9px] font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                      Discvr AI
                    </div>
                  </div>
                )}
                
                {/* Layer Label */}
                <div className={`w-24 text-right text-xs font-bold uppercase tracking-wide ${colors.text}`}>
                  {layer.label}
                </div>
                
                {/* Items Row - Full Width, Two rows for Intelligence layer */}
                {layer.isDiscvrLayer ? (
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      {layer.items.slice(0, 4).map((item, itemIndex) => {
                        const IconComponent = item.icon;
                        return (
                          <motion.div
                            key={itemIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.45 + layerIndex * 0.08 + itemIndex * 0.03, duration: 0.2 }}
                            className={`flex-1 flex items-center gap-2 px-4 py-2 rounded-lg ${colors.bg} border ${colors.border}`}
                          >
                            <div className={`${colors.iconBg} rounded p-1.5`}>
                              <IconComponent className={`w-4 h-4 ${colors.text}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-medium text-slate-800 truncate">{item.label}</div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-3">
                      {layer.items.slice(4).map((item, itemIndex) => {
                        const IconComponent = item.icon;
                        return (
                          <motion.div
                            key={itemIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.45 + layerIndex * 0.08 + (itemIndex + 4) * 0.03, duration: 0.2 }}
                            className={`flex-1 flex items-center gap-2 px-4 py-2 rounded-lg ${colors.bg} border ${colors.border}`}
                          >
                            <div className={`${colors.iconBg} rounded p-1.5`}>
                              <IconComponent className={`w-4 h-4 ${colors.text}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-medium text-slate-800 truncate">{item.label}</div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center gap-3">
                    {layer.items.map((item, itemIndex) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.45 + layerIndex * 0.08 + itemIndex * 0.03, duration: 0.2 }}
                          className={`flex-1 flex items-center gap-2 px-4 py-2.5 rounded-lg ${colors.bg} border ${colors.border}`}
                        >
                          <div className={`${colors.iconBg} rounded p-1.5`}>
                            <IconComponent className={`w-4 h-4 ${colors.text}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-slate-800 truncate">{item.label}</div>
                            {item.value && (
                              <div className={`text-xs font-semibold ${colors.text}`}>{item.value}</div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-6 flex items-center justify-center"
        >
          <p className="text-sm text-slate-500 italic">
            "Manufacturer → <span className="font-semibold text-teal-600">Commercial Platform</span>"
          </p>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
