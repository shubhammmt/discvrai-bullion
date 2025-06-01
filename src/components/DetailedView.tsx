
import React from 'react';
import { Building2, TrendingUp, FileText, Users } from 'lucide-react';

const DetailedView = () => {
  return (
    <div className="space-y-6">
      {/* Company Information */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Company Overview</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">About</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, 
              wearables, and accessories worldwide. The company serves consumers, small and mid-sized 
              businesses, education, and enterprise customers.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">CEO</span>
              <span className="font-medium">Tim Cook</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Founded</span>
              <span className="font-medium">1976</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Employees</span>
              <span className="font-medium">164,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Headquarters</span>
              <span className="font-medium">Cupertino, CA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Business Segments */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-bold text-gray-900">Business Segments</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { segment: 'iPhone', revenue: '52%', growth: '+3.2%' },
            { segment: 'Services', revenue: '22%', growth: '+16.9%' },
            { segment: 'Mac', revenue: '11%', growth: '-27.1%' },
            { segment: 'iPad', revenue: '8%', growth: '-13.4%' },
            { segment: 'Wearables', revenue: '7%', growth: '-3.3%' }
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">{item.segment}</span>
                <span className={`text-sm font-medium ${
                  item.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.growth}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{item.revenue}</div>
              <div className="text-xs text-gray-600">of total revenue</div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Statements */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">Financial Statements</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-900">Metric</th>
                <th className="text-right py-3 px-2 font-medium text-gray-900">2023</th>
                <th className="text-right py-3 px-2 font-medium text-gray-900">2022</th>
                <th className="text-right py-3 px-2 font-medium text-gray-900">2021</th>
                <th className="text-right py-3 px-2 font-medium text-gray-900">YoY Growth</th>
              </tr>
            </thead>
            <tbody className="space-y-1">
              <tr className="border-b border-gray-100">
                <td className="py-3 px-2 text-gray-700">Revenue (B)</td>
                <td className="py-3 px-2 text-right font-medium">$383.3</td>
                <td className="py-3 px-2 text-right">$394.3</td>
                <td className="py-3 px-2 text-right">$365.8</td>
                <td className="py-3 px-2 text-right text-red-600">-2.8%</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-2 text-gray-700">Net Income (B)</td>
                <td className="py-3 px-2 text-right font-medium">$97.0</td>
                <td className="py-3 px-2 text-right">$99.8</td>
                <td className="py-3 px-2 text-right">$94.7</td>
                <td className="py-3 px-2 text-right text-red-600">-2.8%</td>
              </tr>
              <tr>
                <td className="py-3 px-2 text-gray-700">EPS</td>
                <td className="py-3 px-2 text-right font-medium">$6.16</td>
                <td className="py-3 px-2 text-right">$6.15</td>
                <td className="py-3 px-2 text-right">$5.67</td>
                <td className="py-3 px-2 text-right text-green-600">+0.2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Analyst Price Targets */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-orange-600" />
          <h2 className="text-xl font-bold text-gray-900">Analyst Price Targets</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">$195</div>
            <div className="text-sm text-gray-600">Average Target</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">$220</div>
            <div className="text-sm text-gray-600">High Target</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">$170</div>
            <div className="text-sm text-gray-600">Low Target</div>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { firm: 'Morgan Stanley', rating: 'Buy', target: '$220', date: '2 days ago' },
            { firm: 'Goldman Sachs', rating: 'Hold', target: '$185', date: '1 week ago' },
            { firm: 'JP Morgan', rating: 'Buy', target: '$210', date: '2 weeks ago' }
          ].map((analyst, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium text-gray-900">{analyst.firm}</span>
                <span className="ml-3 text-sm text-gray-600">{analyst.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  analyst.rating === 'Buy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {analyst.rating}
                </span>
                <span className="font-bold text-gray-900">{analyst.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
