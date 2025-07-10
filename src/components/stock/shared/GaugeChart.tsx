import React from 'react';

interface GaugeChartProps {
  value: number; // 0-100
  signal: 'bullish' | 'bearish' | 'neutral';
  size?: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, signal, size = 120 }) => {
  const radius = size / 2 - 10;
  const strokeWidth = 8;
  const normalizedValue = Math.max(0, Math.min(100, value));
  
  // Calculate angle (180 degrees total, from -90 to +90)
  const angle = -90 + (normalizedValue / 100) * 180;
  const radians = (angle * Math.PI) / 180;
  
  // Calculate needle endpoint
  const needleLength = radius - strokeWidth;
  const needleX = size / 2 + needleLength * Math.cos(radians);
  const needleY = size / 2 + needleLength * Math.sin(radians);
  
  // Arc path for background
  const startAngle = -90;
  const endAngle = 90;
  const startX = size / 2 + radius * Math.cos((startAngle * Math.PI) / 180);
  const startY = size / 2 + radius * Math.sin((startAngle * Math.PI) / 180);
  const endX = size / 2 + radius * Math.cos((endAngle * Math.PI) / 180);
  const endY = size / 2 + radius * Math.sin((endAngle * Math.PI) / 180);
  
  const getSignalColor = () => {
    switch (signal) {
      case 'bullish':
        return '#22c55e'; // green
      case 'bearish':
        return '#ef4444'; // red
      default:
        return '#eab308'; // yellow
    }
  };

  const getSignalLabel = () => {
    switch (signal) {
      case 'bullish':
        return 'Bullish';
      case 'bearish':
        return 'Bearish';
      default:
        return 'Neutral';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size * 0.7} className="overflow-visible">
        {/* Background arc */}
        <path
          d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Colored segments */}
        {/* Bearish (red) - left third */}
        <path
          d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${size / 2 + radius * Math.cos((-30 * Math.PI) / 180)} ${size / 2 + radius * Math.sin((-30 * Math.PI) / 180)}`}
          fill="none"
          stroke="#ef4444"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={0.3}
        />
        
        {/* Neutral (yellow) - middle third */}
        <path
          d={`M ${size / 2 + radius * Math.cos((-30 * Math.PI) / 180)} ${size / 2 + radius * Math.sin((-30 * Math.PI) / 180)} A ${radius} ${radius} 0 0 1 ${size / 2 + radius * Math.cos((30 * Math.PI) / 180)} ${size / 2 + radius * Math.sin((30 * Math.PI) / 180)}`}
          fill="none"
          stroke="#eab308"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={0.3}
        />
        
        {/* Bullish (green) - right third */}
        <path
          d={`M ${size / 2 + radius * Math.cos((30 * Math.PI) / 180)} ${size / 2 + radius * Math.sin((30 * Math.PI) / 180)} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
          fill="none"
          stroke="#22c55e"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={0.3}
        />
        
        {/* Needle */}
        <line
          x1={size / 2}
          y1={size / 2}
          x2={needleX}
          y2={needleY}
          stroke={getSignalColor()}
          strokeWidth={3}
          strokeLinecap="round"
        />
        
        {/* Center dot */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={6}
          fill={getSignalColor()}
        />
        
        {/* Value text */}
        <text
          x={size / 2}
          y={size / 2 + 25}
          textAnchor="middle"
          className="text-sm font-bold fill-current"
        >
          {getSignalLabel()}
        </text>
      </svg>
    </div>
  );
};

export default GaugeChart;