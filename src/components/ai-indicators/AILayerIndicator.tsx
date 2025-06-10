
import React from 'react';
import { Brain, Target, Search, MessageCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AILayerIndicatorProps {
  layer: 1 | 2 | 3 | 4;
  type: 'learning' | 'match' | 'powered' | 'contextual';
  confidence?: number;
  reason?: string;
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const layerConfig = {
  1: { 
    icon: Brain, 
    color: 'from-orange-500 to-orange-600',
    label: 'Personalization',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700'
  },
  2: { 
    icon: Target, 
    color: 'from-green-500 to-green-600',
    label: 'Risk & Goal',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700'
  },
  3: { 
    icon: Search, 
    color: 'from-blue-500 to-blue-600',
    label: 'Product Intelligence',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700'
  },
  4: { 
    icon: MessageCircle, 
    color: 'from-purple-500 to-purple-600',
    label: 'Conversational',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700'
  }
};

const sizeConfig = {
  sm: { iconSize: 12, padding: 'px-2 py-1', text: 'text-xs' },
  md: { iconSize: 16, padding: 'px-3 py-1.5', text: 'text-sm' },
  lg: { iconSize: 20, padding: 'px-4 py-2', text: 'text-base' }
};

export const AILayerIndicator: React.FC<AILayerIndicatorProps> = ({
  layer,
  type,
  confidence,
  reason,
  isActive = true,
  size = 'md',
  className
}) => {
  const config = layerConfig[layer];
  const sizeConf = sizeConfig[size];
  const IconComponent = config.icon;

  const renderContent = () => {
    switch (type) {
      case 'learning':
        return (
          <div className={cn(
            "flex items-center gap-1.5 rounded-full border",
            config.bgColor,
            config.textColor,
            sizeConf.padding,
            sizeConf.text,
            "border-current/20",
            isActive && "animate-pulse",
            className
          )}>
            <Sparkles size={sizeConf.iconSize} />
            <span className="font-medium">AI Learning</span>
          </div>
        );

      case 'match':
        return (
          <div className={cn(
            "flex items-center gap-1.5 rounded-lg border",
            config.bgColor,
            config.textColor,
            sizeConf.padding,
            sizeConf.text,
            "border-current/20",
            className
          )}>
            <IconComponent size={sizeConf.iconSize} />
            <span className="font-semibold">{confidence}% match</span>
            {reason && size !== 'sm' && (
              <span className="text-xs opacity-75 ml-1">• {reason}</span>
            )}
          </div>
        );

      case 'powered':
        return (
          <div className={cn(
            "flex items-center gap-1.5 rounded-md",
            `bg-gradient-to-r ${config.color}`,
            "text-white",
            sizeConf.padding,
            sizeConf.text,
            "font-medium shadow-sm",
            className
          )}>
            <IconComponent size={sizeConf.iconSize} />
            <span>AI-Powered</span>
          </div>
        );

      case 'contextual':
        return (
          <div className={cn(
            "flex items-center gap-1.5 rounded-lg border-2 border-dashed",
            config.textColor,
            "border-current/30 bg-white/50",
            sizeConf.padding,
            sizeConf.text,
            className
          )}>
            <IconComponent size={sizeConf.iconSize} />
            <span className="font-medium">Context Active</span>
          </div>
        );

      default:
        return null;
    }
  };

  return renderContent();
};
