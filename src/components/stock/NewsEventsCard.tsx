
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, ChevronRight, Info } from 'lucide-react';

interface NewsEventsCardProps {
  symbol: string;
}

const NewsEventsCard = ({ symbol }: NewsEventsCardProps) => {
  const newsData = [
    {
      id: 1,
      title: `${symbol} Q3 results beat estimates, strong segment growth reported`,
      source: "Economic Times",
      time: "2 hours ago",
      sentiment: "positive",
      isBreaking: true
    },
    {
      id: 2,
      title: `${symbol} announces new strategic partnership with tech leader`,
      source: "Business Standard",
      time: "5 hours ago",
      sentiment: "positive",
      isBreaking: false
    },
    {
      id: 3,
      title: "Market volatility impacts sector performance across indices",
      source: "Livemint",
      time: "1 day ago",
      sentiment: "neutral",
      isBreaking: false
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Latest News & Events
          <Badge variant="secondary">AI Curated</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsData.map((news) => (
            <div key={news.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
              {news.isBreaking && (
                <Badge variant="destructive" className="text-xs">BREAKING</Badge>
              )}
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{news.title}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{news.source}</span>
                  <span>•</span>
                  <span>{news.time}</span>
                  <Badge 
                    variant={news.sentiment === 'positive' ? 'default' : 'secondary'}
                    className={news.sentiment === 'positive' ? 'bg-green-100 text-green-700' : ''}
                  >
                    {news.sentiment}
                  </Badge>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Info size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-800 mb-1">AI News Sentiment:</p>
              <p className="text-sm text-yellow-700">
                Recent news shows 75% positive sentiment. Key themes: strong financial results, strategic partnerships.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsEventsCard;
