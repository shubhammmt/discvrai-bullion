
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Brain } from 'lucide-react';

interface EarningsResultsCardProps {
  symbol: string;
}

const EarningsResultsCard = ({ symbol }: EarningsResultsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Earnings & Financial Results
          <Badge variant="secondary">AI Summary</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Q3 FY24 Results (Latest)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="font-bold text-green-700">₹15,647 Cr</p>
                <p className="text-xs text-green-600">+12% YoY</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Profit</p>
                <p className="font-bold text-green-700">₹2,876 Cr</p>
                <p className="text-xs text-green-600">+8% YoY</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">EPS</p>
                <p className="font-bold text-green-700">₹43.2</p>
                <p className="text-xs text-green-600">Beat Est.</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">EBITDA</p>
                <p className="font-bold text-green-700">₹4,523 Cr</p>
                <p className="text-xs text-green-600">+15% YoY</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Brain size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">AI Earnings Summary:</p>
                <p className="text-sm text-blue-700">
                  Strong quarterly performance with revenue growth driven by core business expansion. 
                  Management guidance remains positive for upcoming quarters with sustained growth trajectory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsResultsCard;
