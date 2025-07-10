import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrendIndicatorProps {
  value: number;
  showIcon?: boolean;
  showValue?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const TrendIndicator: React.FC<TrendIndicatorProps> = ({ 
  value, 
  showIcon = true, 
  showValue = true, 
  className,
  size = 'md'
}) => {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  
  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const getIcon = () => {
    if (isNeutral) return <Minus className={iconSizes[size]} />;
    return isPositive ? <ArrowUp className={iconSizes[size]} /> : <ArrowDown className={iconSizes[size]} />;
  };

  const getColorClass = () => {
    if (isNeutral) return 'text-muted-foreground';
    return isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  return (
    <span className={cn('flex items-center gap-1 font-medium', getColorClass(), className)}>
      {showIcon && getIcon()}
      {showValue && (
        <span>
          {isPositive ? '+' : ''}{value.toLocaleString('en-IN', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}
        </span>
      )}
    </span>
  );
};

export default TrendIndicator;