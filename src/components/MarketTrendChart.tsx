
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const marketData = [
  { sector: 'Tech', return: 15.2, color: '#10b981' },
  { sector: 'Banking', return: 12.8, color: '#3b82f6' },
  { sector: 'Pharma', return: 8.5, color: '#8b5cf6' },
  { sector: 'Auto', return: -2.1, color: '#ef4444' },
  { sector: 'Energy', return: 6.7, color: '#f59e0b' },
];

interface MarketTrendChartProps {
  isEnglish: boolean;
}

const MarketTrendChart = ({ isEnglish }: MarketTrendChartProps) => {
  const labels = {
    hindi: {
      title: "मार्केट का हाल",
      subtitle: "सेक्टर के अनुसार रिटर्न",
      tech: "टेक",
      banking: "बैंक",
      pharma: "दवा",
      auto: "गाड़ी",
      energy: "एनर्जी"
    },
    english: {
      title: "Market Trends",
      subtitle: "Sector-wise Returns",
      tech: "Tech",
      banking: "Banking", 
      pharma: "Pharma",
      auto: "Auto",
      energy: "Energy"
    }
  };

  const content = isEnglish ? labels.english : labels.hindi;

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          {content.title}
        </CardTitle>
        <p className="text-sm text-gray-600">{content.subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marketData}>
              <XAxis 
                dataKey="sector" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis hide />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Return']}
                labelStyle={{ color: '#374151' }}
              />
              <Bar 
                dataKey="return" 
                radius={[4, 4, 0, 0]}
                fill={(entry) => entry.color}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Top Performers */}
        <div className="mt-4 flex justify-between text-sm">
          <div className="flex items-center gap-1 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>{isEnglish ? 'Tech' : 'टेक'}: +15.2%</span>
          </div>
          <div className="flex items-center gap-1 text-red-600">
            <TrendingDown className="w-4 h-4" />
            <span>{isEnglish ? 'Auto' : 'गाड़ी'}: -2.1%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketTrendChart;
