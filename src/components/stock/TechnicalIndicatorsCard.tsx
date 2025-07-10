
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Brain } from 'lucide-react';

interface TechnicalIndicatorsCardProps {
  stockData: any;
  aiAnalysis: any;
}

const TechnicalIndicatorsCard = ({ stockData, aiAnalysis }: TechnicalIndicatorsCardProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Technical Indicators
          <Badge variant="secondary">Optional</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">58</div>
              <div className="text-xs text-gray-600">RSI</div>
              <div className="text-xs text-blue-600">Neutral</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">Bullish</div>
              <div className="text-xs text-gray-600">MACD</div>
              <div className="text-xs text-green-600">Signal</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-600">₹2,750</div>
              <div className="text-xs text-gray-600">Support</div>
              <div className="text-xs text-orange-600">Strong</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">₹2,950</div>
              <div className="text-xs text-gray-600">Resistance</div>
              <div className="text-xs text-purple-600">Key Level</div>
            </div>
          </div>

          {showAdvanced && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-bold text-gray-600">50-Day MA</div>
                <div className="text-xs text-gray-600">₹2,689</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-bold text-gray-600">200-Day MA</div>
                <div className="text-xs text-gray-600">₹2,456</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-bold text-gray-600">Bollinger Bands</div>
                <div className="text-xs text-gray-600">Upper: ₹2,890</div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)}>
              {showAdvanced ? 'Hide Advanced' : 'Show Advanced Indicators'}
            </Button>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Brain size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-purple-800 mb-1">AI Technical Summary:</p>
                <p className="text-sm text-purple-700">
                  Stock shows upward momentum with bullish MACD crossover. RSI in neutral zone suggests room for further upside. 
                  Recent breakout above 200-day MA indicates strength.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalIndicatorsCard;
