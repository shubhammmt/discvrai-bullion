
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Target, Clock, TrendingUp } from 'lucide-react';

interface PersonalizedSectionProps {
  userProfile: any;
}

const PersonalizedSection = ({ userProfile }: PersonalizedSectionProps) => {
  const recentlyViewed = [
    { name: 'Tesla Inc.', symbol: 'TSLA', change: '+2.4%' },
    { name: 'Microsoft', symbol: 'MSFT', change: '+1.2%' },
    { name: 'HDFC Bank', symbol: 'HDFCBANK', change: '-0.8%' }
  ];

  const watchlist = [
    { name: 'Apple Inc.', symbol: 'AAPL', price: '₹162.80', change: '+2.04%' },
    { name: 'Reliance', symbol: 'RELIANCE', price: '₹2,847', change: '+1.2%' }
  ];

  return (
    <div className="space-y-6">
      {/* User Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm">
            <span className="text-gray-600">Risk Tolerance:</span>
            <span className="ml-2 font-medium">{userProfile.riskTolerance || 'Not set'}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Investment Horizon:</span>
            <span className="ml-2 font-medium">{userProfile.investmentHorizon || 'Not set'}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Preferred Instruments:</span>
            <div className="mt-1">
              {userProfile.preferredInstruments?.map((instrument: string, index: number) => (
                <span key={index} className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                  {instrument}
                </span>
              )) || <span className="text-gray-500">None selected</span>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Watchlist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Your Watchlist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {watchlist.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600">{item.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">{item.price}</p>
                  <p className="text-xs text-green-600">{item.change}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recently Viewed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            Recently Viewed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentlyViewed.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div>
                  <span className="font-medium">{item.symbol}</span>
                  <span className="text-gray-600 ml-2">{item.name}</span>
                </div>
                <span className={`${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            Market Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-green-50 rounded border-l-4 border-green-400">
              <p className="font-medium text-green-800">AAPL Target Hit</p>
              <p className="text-green-600">Reached your target price of ₹160</p>
            </div>
            <div className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
              <p className="font-medium text-blue-800">Earnings Alert</p>
              <p className="text-blue-600">Tesla reports earnings tomorrow</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedSection;
