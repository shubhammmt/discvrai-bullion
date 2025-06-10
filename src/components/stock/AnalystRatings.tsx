
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Star, TrendingUp } from 'lucide-react';

const AnalystRatings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-orange-600" />
          Analyst Ratings & Price Targets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Rating Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">₹3,500</div>
              <div className="text-sm text-gray-600">Average Target</div>
              <div className="text-xs text-green-600 mt-1">+8.7% upside</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">₹3,800</div>
              <div className="text-sm text-gray-600">High Target</div>
              <div className="text-xs text-blue-600 mt-1">+18.0% upside</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">₹3,200</div>
              <div className="text-sm text-gray-600">Low Target</div>
              <div className="text-xs text-red-600 mt-1">-0.6% downside</div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Rating Distribution (18 Analysts)</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="w-16 text-sm text-gray-600">Buy</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '66.7%'}}></div>
                </div>
                <span className="text-sm font-medium">12</span>
              </div>
              <div className="flex items-center">
                <span className="w-16 text-sm text-gray-600">Hold</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '27.8%'}}></div>
                </div>
                <span className="text-sm font-medium">5</span>
              </div>
              <div className="flex items-center">
                <span className="w-16 text-sm text-gray-600">Sell</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                  <div className="bg-red-500 h-2 rounded-full" style={{width: '5.5%'}}></div>
                </div>
                <span className="text-sm font-medium">1</span>
              </div>
            </div>
          </div>

          {/* Recent Analyst Updates */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Recent Analyst Updates</h4>
            <div className="space-y-3">
              {[
                { firm: 'Motilal Oswal', rating: 'Buy', target: '₹3,750', date: '2 days ago', change: 'Raised' },
                { firm: 'Kotak Securities', rating: 'Buy', target: '₹3,600', date: '1 week ago', change: 'Maintained' },
                { firm: 'ICICI Securities', rating: 'Hold', target: '₹3,300', date: '2 weeks ago', change: 'Downgraded' },
                { firm: 'HDFC Securities', rating: 'Buy', target: '₹3,500', date: '3 weeks ago', change: 'Maintained' }
              ].map((analyst, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="font-medium text-gray-900">{analyst.firm}</span>
                      <div className="text-xs text-gray-600">{analyst.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      analyst.rating === 'Buy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {analyst.rating}
                    </span>
                    <span className="font-bold text-gray-900">{analyst.target}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      analyst.change === 'Raised' ? 'bg-green-100 text-green-700' :
                      analyst.change === 'Downgraded' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {analyst.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consensus Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-800">Analyst Consensus</h4>
            </div>
            <p className="text-sm text-blue-700">
              Strong Buy consensus with 67% of analysts recommending Buy. Average 12-month target of ₹3,500 
              suggests 8.7% upside potential. Recent upgrades driven by strong Q3 performance and AI growth prospects.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalystRatings;
