import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface StackItem {
  icon: LucideIcon;
  label: string;
  description?: string;
}

export interface StackLayer {
  label: string;
  items: StackItem[];
  colorScheme?: 'amber' | 'blue' | 'purple' | 'teal' | 'slate' | 'emerald';
}

interface ExecutionStackDiagramProps {
  layers: StackLayer[];
  animate?: boolean;
  compact?: boolean;
}

const colorSchemes = {
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-600',
    labelText: 'text-amber-700',
    connector: 'bg-amber-300'
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-600',
    labelText: 'text-blue-700',
    connector: 'bg-blue-300'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    iconBg: 'bg-purple-100',
    iconText: 'text-purple-600',
    labelText: 'text-purple-700',
    connector: 'bg-purple-300'
  },
  teal: {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    iconBg: 'bg-teal-100',
    iconText: 'text-teal-600',
    labelText: 'text-teal-700',
    connector: 'bg-teal-300'
  },
  slate: {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    iconBg: 'bg-slate-100',
    iconText: 'text-slate-600',
    labelText: 'text-slate-700',
    connector: 'bg-slate-300'
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-600',
    labelText: 'text-emerald-700',
    connector: 'bg-emerald-300'
  }
};

export const ExecutionStackDiagram: React.FC<ExecutionStackDiagramProps> = ({
  layers,
  animate = true,
  compact = false
}) => {
  const getDelay = (layerIndex: number) => animate ? 0.15 + layerIndex * 0.12 : 0;
  const itemPadding = compact ? 'px-2 py-1.5' : 'px-3 py-2';
  const iconSize = compact ? 'w-4 h-4' : 'w-5 h-5';
  const labelSize = compact ? 'text-[10px]' : 'text-xs';
  const headerSize = compact ? 'text-[9px]' : 'text-[10px]';
  const gap = compact ? 'gap-1.5' : 'gap-2';
  const layerGap = compact ? 'space-y-2' : 'space-y-3';

  return (
    <div className={`flex flex-col ${layerGap} w-full max-w-4xl mx-auto`}>
      {layers.map((layer, layerIndex) => {
        const colors = colorSchemes[layer.colorScheme || 'slate'];
        const isLast = layerIndex === layers.length - 1;

        return (
          <React.Fragment key={layerIndex}>
            <motion.div
              initial={animate ? { opacity: 0, y: 20 } : undefined}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: getDelay(layerIndex), duration: 0.4 }}
              className="flex flex-col items-center"
            >
              {/* Layer Header */}
              <div className={`${headerSize} font-bold uppercase tracking-widest ${colors.labelText} mb-2`}>
                {layer.label}
              </div>

              {/* Items Row */}
              <div className={`flex flex-wrap justify-center ${gap}`}>
                {layer.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={itemIndex}
                      initial={animate ? { opacity: 0, scale: 0.9 } : undefined}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: getDelay(layerIndex) + itemIndex * 0.05, duration: 0.3 }}
                      className={`flex items-center ${gap} ${itemPadding} rounded-lg ${colors.bg} border ${colors.border}`}
                    >
                      <div className={`${colors.iconBg} rounded-md p-1.5`}>
                        <IconComponent className={`${iconSize} ${colors.iconText}`} />
                      </div>
                      <div className="flex flex-col">
                        <span className={`${labelSize} font-semibold text-slate-800 whitespace-nowrap`}>
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="text-[9px] text-slate-500">{item.description}</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Vertical Connector */}
            {!isLast && (
              <motion.div
                initial={animate ? { scaleY: 0 } : undefined}
                animate={{ scaleY: 1 }}
                transition={{ delay: getDelay(layerIndex) + 0.2, duration: 0.3 }}
                className="flex justify-center"
                style={{ originY: 0 }}
              >
                <div className={`w-0.5 h-4 ${colors.connector} rounded-full`} />
              </motion.div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
