
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExternalLink, TrendingUp, TrendingDown, Minus, Clock, Building, FileText, DollarSign, Users } from 'lucide-react';
import { NEWS_MOCK_DATA, NEWS_CATEGORIES, NEWS_TIME_PERIODS, NEWS_SENTIMENT_SUMMARY } from '@/data/newsMockData';

const NewsTimeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const filteredNews = NEWS_MOCK_DATA.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const periodMatch = selectedPeriod === 'all' || (() => {
      const period = NEWS_TIME_PERIODS.find(p => p.value === selectedPeriod);
      if (!period) return true;
      
      if (selectedPeriod === '1d') return item.daysAgo <= 1;
      if (selectedPeriod === '7d') return item.daysAgo <= 7;
      if (selectedPeriod === '30d') return item.daysAgo <= 30;
      if (selectedPeriod === '90d') return item.daysAgo <= 90;
      return true;
    })();
    
    return categoryMatch && periodMatch;
  });

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'negative': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 border-green-200';
      case 'negative': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'earnings': return <DollarSign className="h-4 w-4" />;
      case 'acquisition': return <Building className="h-4 w-4" />;
      case 'regulatory': return <FileText className="h-4 w-4" />;
      case 'analyst': return <Users className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card className="p-6">
      {/* Sentiment Summary */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-600 font-medium">{NEWS_SENTIMENT_SUMMARY.positive} Positive</span>
        </div>
        <div className="flex items-center gap-2">
          <Minus className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">{NEWS_SENTIMENT_SUMMARY.neutral} Neutral</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-red-500" />
          <span className="text-sm text-red-600 font-medium">{NEWS_SENTIMENT_SUMMARY.negative} Negative</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {NEWS_CATEGORIES.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            {NEWS_TIME_PERIODS.map((period) => (
              <SelectItem key={period.value} value={period.value} disabled={period.premium}>
                {period.label} {period.premium && '(Premium)'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* News Timeline */}
      <div className="space-y-4">
        {filteredNews.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              {/* Timeline dot */}
              <div className="flex flex-col items-center mt-1">
                <div className={`p-2 rounded-full border ${getSentimentColor(item.sentiment)}`}>
                  {getCategoryIcon(item.category)}
                </div>
                {item !== filteredNews[filteredNews.length - 1] && (
                  <div className="w-px h-16 bg-border mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {NEWS_CATEGORIES.find(c => c.value === item.category)?.label}
                    </Badge>
                    <Badge className={`text-xs ${getSentimentColor(item.sentiment)}`}>
                      {getSentimentIcon(item.sentiment)}
                      <span className="ml-1 capitalize">{item.sentiment}</span>
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.daysAgo === 0 ? 'Today' : `${item.daysAgo}d ago`}
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-2 hover:text-primary cursor-pointer">
                  {item.headline}
                </h3>

                <p className="text-muted-foreground mb-3">
                  {item.summary}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={item.sourceIcon} 
                      alt={item.source}
                      className="w-5 h-5 rounded"
                    />
                    <span className="text-sm font-medium">{item.source}</span>
                    <span className="text-sm text-muted-foreground">• {item.timestamp}</span>
                  </div>
                  
                  {item.url && (
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No news found for the selected filters.
        </div>
      )}
    </Card>
  );
};

export default NewsTimeline;
