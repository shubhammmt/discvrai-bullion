
import React from 'react';
import { Building2, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CompanyOverview = () => {
  const metrics = [
    { label: 'Market Cap', value: '$2.8T', subtext: 'Large Cap' },
    { label: 'P/E Ratio', value: '28.5', subtext: 'vs Industry 24.2', trend: 'up' as const },
    { label: 'Volume', value: '89.2M', subtext: 'vs Avg 67.8M', trend: 'up' as const },
    { label: '52W High', value: '$182.94', subtext: '-11.2% from high', trend: 'down' as const },
    { label: '52W Low', value: '$162.80', subtext: '+31.1% from low', trend: 'up' as const },
    { label: 'Dividend Yield', value: '0.43%', subtext: 'Annual: $0.70' }
  ];

  const trendColor = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <Collapsible>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Key Metrics & Company Info</h2>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-4">
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-3">Key Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {metrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
                    <div className="text-md font-bold text-gray-900">{metric.value}</div>
                    {metric.subtext && (
                      <div className={`text-xs ${trendColor[metric.trend || 'neutral']}`}>
                        {metric.subtext}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Company Details */}
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-3">Company Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">CEO</span>
                    <span className="font-medium">Tim Cook</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Founded</span>
                    <span className="font-medium">1976</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Employees</span>
                    <span className="font-medium">164,000</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Headquarters</span>
                    <span className="font-medium">Cupertino, CA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Industry</span>
                    <span className="font-medium">Technology</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Website</span>
                    <span className="font-medium text-blue-600">apple.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CompanyOverview;
