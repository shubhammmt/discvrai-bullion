
import React from 'react';
import { Building2, Globe, MapPin } from 'lucide-react';

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
    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
      <div className="text-xs sm:text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-sm sm:text-lg font-bold text-gray-900">{value}</div>
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
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 h-fit">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Key Metrics & Company Info</h2>
      
      {/* Company Information Section */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-sm">Company Details</span>
        </div>
        <div className="space-y-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3 text-gray-500" />
            <span className="text-gray-600">Technology & Consumer Electronics</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-gray-500" />
            <span className="text-gray-600">Cupertino, California</span>
          </div>
          <div className="text-gray-700">
            <span className="font-medium">CEO:</span> Tim Cook
          </div>
          <div className="text-gray-700">
            <span className="font-medium">Employees:</span> 164,000+
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default KeyMetrics;
