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
      label: 'Outcomes',
      colorClass: 'amber',
      items: [
        { icon: TrendingUp, label: 'Revenue', value: '₹320–530 Cr' },
        { icon: TrendingDown, label: 'Savings', value: '₹340–650 Cr' },
        { icon: Zap, label: 'Speed', value: '80% ↑' },
        { icon: Users, label: 'Retention', value: '25% ↑' }
      ]
    },
    {
      label: 'Channels',
      colorClass: 'teal',
      items: [
        { icon: Smartphone, label: 'SUVIDHA 2.0' },
        { icon: Monitor, label: 'SM@RT-D' },
        { icon: MessageCircle, label: 'WhatsApp' },
        { icon: Globe, label: 'Dealer Portal' }
      ]
    },
    {
      label: 'Workflows',
      colorClass: 'purple',
      items: [
        { icon: DollarSign, label: 'Pricing' },
        { icon: UserCheck, label: 'Sales' },
        { icon: Megaphone, label: 'Marketing' },
        { icon: FileCheck, label: 'O2C' }
      ]
    },
    {
      label: 'Intelligence',
      colorClass: 'blue',
      isDiscvrLayer: true,
      items: [
        { icon: Brain, label: 'Demand' },
        { icon: AlertTriangle, label: 'Churn' },
        { icon: CreditCard, label: 'Credit' },
        { icon: Heart, label: 'Sentiment' }
      ]
    },
    {
      label: 'Data',
      colorClass: 'slate',
      items: [
        { icon: Database, label: 'SAP' },
        { icon: ShoppingCart, label: 'SUVIDHA' },
        { icon: Award, label: 'Loyalty' },
        { icon: Cloud, label: 'External' }
      ]
    }
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', iconBg: 'bg-amber-100' },
    teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', iconBg: 'bg-teal-100' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', iconBg: 'bg-purple-100' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', iconBg: 'bg-blue-100' },
    slate: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', iconBg: 'bg-slate-100' }
  };

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0 px-6 py-2">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">
              Vision & Architecture
            </span>
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              {slide.headline}
            </h2>
          </div>
          
          {/* Value Callout - Compact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-amber-50 border border-amber-300 rounded-lg px-4 py-2"
          >
            <div className="flex items-center gap-4">
              <div>
                <div className="text-xs text-amber-600">Total Opportunity</div>
                <div className="text-lg font-bold text-amber-700">₹870–1,720 Cr</div>
              </div>
              <div className="h-8 w-px bg-amber-200" />
              <div className="text-center">
                <div className="text-xs text-slate-600">ROI</div>
                <div className="text-sm font-bold text-amber-600">8–10×</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* From → To Bridge - Horizontal Compact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center justify-center gap-4 mb-2"
        >
          <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5">
            <span className="text-[10px] font-medium text-slate-500">TODAY:</span>
            <span className="text-xs text-slate-700">Disconnected Tools, Data and Insights</span>
          </div>
          <ArrowRight className="w-5 h-5 text-teal-500" />
          <div className="flex items-center gap-2 bg-teal-50 border border-teal-300 rounded-lg px-3 py-1.5">
            <span className="text-[10px] font-medium text-teal-600">TOMORROW:</span>
            <span className="text-xs font-semibold text-teal-700">Unified AI Platform</span>
          </div>
        </motion.div>

        {/* Horizontal Stack - Wide Layout */}
        <div className="flex-1 flex flex-col justify-start gap-1.5 min-h-0 relative pl-20">
          {layers.map((layer, layerIndex) => {
            const colors = colorMap[layer.colorClass];
            return (
              <motion.div
                key={layerIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + layerIndex * 0.08, duration: 0.3 }}
                className={`flex items-center gap-3 relative ${layer.isDiscvrLayer ? 'border-2 border-dashed border-blue-400 rounded-xl p-2 -ml-2' : ''}`}
              >
                {/* Discvr AI badge for Intelligence layer */}
                {layer.isDiscvrLayer && (
                  <div className="absolute -left-16 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                      Discvr AI
                    </div>
                  </div>
                )}
                
                {/* Layer Label */}
                <div className={`w-20 text-right text-[10px] font-bold uppercase tracking-wide ${colors.text}`}>
                  {layer.label}
                </div>
                
                {/* Items Row - Full Width */}
                <div className="flex-1 flex items-center gap-2">
                  {layer.items.map((item, itemIndex) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.45 + layerIndex * 0.08 + itemIndex * 0.03, duration: 0.2 }}
                        className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <div className={`${colors.iconBg} rounded p-1`}>
                          <IconComponent className={`w-3.5 h-3.5 ${colors.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-medium text-slate-800 truncate">{item.label}</div>
                          {item.value && (
                            <div className={`text-[10px] font-semibold ${colors.text}`}>{item.value}</div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-3 flex items-center justify-between text-[10px] text-slate-500"
        >
          <p className="italic">
            "Manufacturer → <span className="font-semibold text-teal-600">Commercial Platform</span>"
          </p>
          <div className="flex items-center gap-2">
            <span>Deep Dives:</span>
            {['Data (17)', 'Sales (18)', 'Supply (19)', 'Trust (20)', 'Margin (21)'].map((item, i) => (
              <React.Fragment key={i}>
                <span className="text-slate-600">{item}</span>
                {i < 4 && <span className="text-slate-300">|</span>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
