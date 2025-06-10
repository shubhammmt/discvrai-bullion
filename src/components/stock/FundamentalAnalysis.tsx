
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Building2, Calculator, DollarSign } from 'lucide-react';

const FundamentalAnalysis = () => {
  return (
    <div className="space-y-6">
      {/* Key Financial Ratios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            Key Financial Ratios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { metric: 'P/E Ratio', value: '28.4', benchmark: 'Industry: 24.2', status: 'premium' },
              { metric: 'ROE', value: '42.5%', benchmark: 'Industry: 18.2%', status: 'superior' },
              { metric: 'Debt/Equity', value: '0.23', benchmark: 'Industry: 0.45', status: 'healthy' },
              { metric: 'Current Ratio', value: '2.8', benchmark: 'Industry: 1.9', status: 'strong' }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{item.metric}</div>
                <div className="text-xl font-bold text-gray-900 mb-1">{item.value}</div>
                <div className="text-xs text-gray-500 mb-1">{item.benchmark}</div>
                <div className={`text-xs font-medium ${
                  item.status === 'superior' || item.status === 'strong' ? 'text-green-600' :
                  item.status === 'healthy' ? 'text-blue-600' : 'text-orange-600'
                }`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue & Profit Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            5-Year Financial Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-900">Year</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-900">Revenue (₹Cr)</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-900">Net Profit (₹Cr)</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-900">EPS (₹)</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-900">Growth %</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 text-gray-700">2024</td>
                  <td className="py-3 px-2 text-right font-medium">₹64,406</td>
                  <td className="py-3 px-2 text-right">₹18,448</td>
                  <td className="py-3 px-2 text-right">₹118.2</td>
                  <td className="py-3 px-2 text-right text-green-600">+12.8%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 text-gray-700">2023</td>
                  <td className="py-3 px-2 text-right font-medium">₹57,085</td>
                  <td className="py-3 px-2 text-right">₹16,351</td>
                  <td className="py-3 px-2 text-right">₹104.7</td>
                  <td className="py-3 px-2 text-right text-green-600">+15.2%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 text-gray-700">2022</td>
                  <td className="py-3 px-2 text-right font-medium">₹49,531</td>
                  <td className="py-3 px-2 text-right">₹14,194</td>
                  <td className="py-3 px-2 text-right">₹90.9</td>
                  <td className="py-3 px-2 text-right text-green-600">+18.4%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Business Segments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-600" />
            Revenue Breakdown by Segment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { segment: 'IT Services', revenue: '68%', amount: '₹43,796 Cr', growth: '+14.2%' },
              { segment: 'Consulting', revenue: '18%', amount: '₹11,593 Cr', growth: '+8.7%' },
              { segment: 'Digital Transformation', revenue: '14%', amount: '₹9,017 Cr', growth: '+22.1%' }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{item.segment}</span>
                  <span className="text-sm font-medium text-green-600">{item.growth}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Share:</span>
                    <div className="font-medium">{item.revenue}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Amount:</span>
                    <div className="font-medium">{item.amount}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundamentalAnalysis;
