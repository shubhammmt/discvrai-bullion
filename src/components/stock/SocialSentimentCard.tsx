
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MessageCircle, Brain } from 'lucide-react';

interface SocialSentimentCardProps {
  symbol: string;
}

const SocialSentimentCard = ({ symbol }: SocialSentimentCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Social & Sentiment
          <Badge variant="secondary">AI Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Sentiment</span>
              <Badge className="bg-green-100 text-green-700">Positive</Badge>
            </div>
            <Progress value={75} className="h-2" />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Bearish</span>
              <span>Bullish</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">245</div>
              <div className="text-xs text-gray-600">Twitter Mentions</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">18</div>
              <div className="text-xs text-gray-600">Reddit Posts</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">72%</div>
              <div className="text-xs text-gray-600">Positive</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Trending Topics:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">#earnings</Badge>
              <Badge variant="outline" className="text-xs">#growth</Badge>
              <Badge variant="outline" className="text-xs">#expansion</Badge>
              <Badge variant="outline" className="text-xs">#results</Badge>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Brain size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">AI Sentiment Analysis:</p>
                <p className="text-sm text-blue-700">
                  Social sentiment shows 72% positive mentions. Key themes: strong quarterly results, optimistic outlook. 
                  Retail investor confidence appears high.
                </p>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 bg-yellow-50 border border-yellow-200 rounded p-2">
            <strong>Note:</strong> Social sentiment is informational and should not be used as the sole basis for investment decisions.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialSentimentCard;
