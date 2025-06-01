
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const MetricCard = ({ label, value, subtext, trend }: MetricCardProps) => {
  const trendColor = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  }[trend || 'neutral'];

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-lg font-bold text-gray-900">{value}</div>
      {subtext && <div className={`text-xs ${trendColor}`}>{subtext}</div>}
    </div>
  );
};

const KeyMetrics = () => {
  const metrics = [
    { label: 'Market Cap', value: '$2.8T', subtext: 'Large Cap' },
    { label: 'P/E Ratio', value: '28.5', subtext: 'vs Industry 24.2', trend: 'up' as const },
    { label: 'Volume', value: '89.2M', subtext: 'vs Avg 67.8M', trend: 'up' as const },
    { label: '52W High', value: '$182.94', subtext: '-11.2% from high', trend: 'down' as const },
    { label: '52W Low', value: '$162.80', subtext: '+31.1% from low', trend: 'up' as const },
    { label: 'Dividend Yield', value: '0.43%', subtext: 'Annual: $0.70' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Key Metrics</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default KeyMetrics;
