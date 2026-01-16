import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ExpoSlideLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  section?: 'core' | 'amc' | 'manufacturing' | 'healthcare' | 'closing';
  className?: string;
}

const sectionColors = {
  core: {
    accent: 'from-blue-600 to-blue-700',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  amc: {
    accent: 'from-emerald-600 to-teal-600',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600'
  },
  manufacturing: {
    accent: 'from-orange-500 to-amber-500',
    badge: 'bg-orange-50 text-orange-700 border-orange-200',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  healthcare: {
    accent: 'from-rose-500 to-pink-500',
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600'
  },
  closing: {
    accent: 'from-violet-600 to-purple-600',
    badge: 'bg-violet-50 text-violet-700 border-violet-200',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600'
  }
};

const sectionLabels = {
  core: 'Core',
  amc: 'Financial Services',
  manufacturing: 'Manufacturing',
  healthcare: 'Healthcare',
  closing: 'Closing'
};

export const ExpoSlideLayout: React.FC<ExpoSlideLayoutProps> = ({
  children,
  title,
  subtitle,
  icon: Icon,
  section = 'core',
  className = ''
}) => {
  const colors = sectionColors[section];

  return (
    <div className={`h-full w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex flex-col p-10 ${className}`}>
      {/* Section Badge */}
      {section !== 'core' && section !== 'closing' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-6 right-8"
        >
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors.badge}`}>
            {sectionLabels[section]}
          </span>
        </motion.div>
      )}
      
      {/* Header */}
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-3">
            {Icon && (
              <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${colors.iconColor}`} />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-semibold text-slate-800 tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xl text-slate-500 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          <div className={`h-1 w-24 rounded-full bg-gradient-to-r ${colors.accent}`} />
        </motion.div>
      )}
      
      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};
