
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target } from 'lucide-react';

interface AnalystRatingsCardProps {
  symbol: string;
}

const AnalystRatingsCard = ({ symbol }: AnalystRatingsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Analyst Ratings & Research
          <Badge variant="secondary">12 Analysts</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-xs text-gray-600">Buy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <div className="text-xs text-gray-600">Hold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">1</div>
                <div className="text-xs text-gray-600">Sell</div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <Target size={16} className="text-blue-600" />
                <span className="text-sm text-gray-600">Avg Target</span>
              </div>
              <div className="text-xl font-bold text-blue-600">₹3,120</div>
              <div className="text-xs text-green-600">+9.6% upside</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recent Analyst Updates:</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <span className="text-sm font-medium">Morgan Stanley</span>
                  <span className="text-xs text-gray-600 ml-2">2 days ago</span>
                </div>
                <Badge className="bg-green-100 text-green-700">Buy ₹3,200</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <span className="text-sm font-medium">Goldman Sachs</span>
                  <span className="text-xs text-gray-600 ml-2">1 week ago</span>
                </div>
                <Badge variant="secondary">Hold ₹2,950</Badge>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 bg-yellow-50 border border-yellow-200 rounded p-2">
            <strong>Disclaimer:</strong> This is informational data and not investment advice. 
            Please consult with financial advisors before making investment decisions.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalystRatingsCard;
