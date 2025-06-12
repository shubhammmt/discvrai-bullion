
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, TrendingUp } from 'lucide-react';

interface CryptoNewsItem {
  symbol: string;
  published_date: string;
  publisher: string;
  title: string;
  image: string;
  site: string;
  text: string;
  url: string;
  metadata: {
    last_updated: string;
    fetch_timestamp: string;
    last_migrated: string;
    source: string;
  };
}

interface CryptoNewsCardsProps {
  newsData: CryptoNewsItem[];
}

const CryptoNewsCards = ({ newsData }: CryptoNewsCardsProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSymbolColor = (symbol: string) => {
    const colors = {
      'BTCUSD': 'bg-orange-100 text-orange-800',
      'SOLUSD': 'bg-purple-100 text-purple-800',
      'XLMUSD': 'bg-blue-100 text-blue-800',
      'ETHUSD': 'bg-gray-100 text-gray-800'
    };
    return colors[symbol as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Latest Crypto News</h2>
      </div>
      
      {newsData.map((news, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="flex">
            {/* Image Section */}
            <div className="w-64 h-48 flex-shrink-0">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
            
            {/* Content Section */}
            <div className="flex-1 flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSymbolColor(news.symbol)}`}>
                    {news.symbol}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(news.published_date)}
                  </div>
                </div>
                <CardTitle className="text-xl leading-tight line-clamp-2">
                  {news.title}
                </CardTitle>
                <div className="text-sm text-gray-600">
                  by {news.publisher} • {news.site}
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col justify-between pt-0">
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-4">
                  {news.text}
                </p>
                
                <div className="flex justify-end">
                  <Button
                    onClick={() => window.open(news.url, '_blank', 'noopener,noreferrer')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Read Full Article
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
      
      {newsData.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No crypto news available at the moment.</p>
        </Card>
      )}
    </div>
  );
};

export default CryptoNewsCards;
