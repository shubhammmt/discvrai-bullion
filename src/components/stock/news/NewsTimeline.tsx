
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
  const [showAll, setShowAll] = useState(false);

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

  // Sort by latest (lowest daysAgo first) and limit to 3 by default
  const sortedNews = filteredNews.sort((a, b) => a.daysAgo - b.daysAgo);
  const displayedNews = showAll ? sortedNews : sortedNews.slice(0, 3);

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
    <Card className="p-4 sm:p-6">
      {/* Mobile-first responsive header */}
      <div className="space-y-4 mb-6">
        {/* Title */}
        <div>
          <h2 className="text-lg font-semibold mb-1">News & Events</h2>
          <p className="text-sm text-muted-foreground">Latest news, events, and market updates</p>
        </div>

        {/* Sentiment Summary - Mobile responsive */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
            <span className="text-xs sm:text-sm text-green-600 font-medium">
              {NEWS_SENTIMENT_SUMMARY.positive} Positive
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
              {NEWS_SENTIMENT_SUMMARY.neutral} Neutral
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
            <span className="text-xs sm:text-sm text-red-600 font-medium">
              {NEWS_SENTIMENT_SUMMARY.negative} Negative
            </span>
          </div>
        </div>

        {/* Filters - Mobile responsive */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-40">
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
            <SelectTrigger className="w-full sm:w-32">
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
      </div>

      {/* News Timeline - Mobile responsive */}
      <div className="space-y-4">
        {displayedNews.map((item) => (
          <div key={item.id} className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Timeline dot */}
              <div className="flex flex-col items-center mt-1 flex-shrink-0">
                <div className={`p-1.5 sm:p-2 rounded-full border ${getSentimentColor(item.sentiment)}`}>
                  {getCategoryIcon(item.category)}
                </div>
                {item !== displayedNews[displayedNews.length - 1] && (
                  <div className="w-px h-12 sm:h-16 bg-border mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <Badge variant="outline" className="text-xs">
                      {NEWS_CATEGORIES.find(c => c.value === item.category)?.label}
                    </Badge>
                    <Badge className={`text-xs ${getSentimentColor(item.sentiment)}`}>
                      {getSentimentIcon(item.sentiment)}
                      <span className="ml-1 capitalize">{item.sentiment}</span>
                    </Badge>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                    {item.daysAgo === 0 ? 'Today' : `${item.daysAgo}d ago`}
                  </div>
                </div>

                <h3 className="font-semibold text-sm sm:text-lg mb-2 hover:text-primary cursor-pointer leading-tight">
                  {item.headline}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground mb-3 leading-relaxed">
                  {item.summary}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <img 
                      src={item.sourceIcon} 
                      alt={item.source}
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded flex-shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-medium truncate">{item.source}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">• {item.timestamp}</span>
                  </div>
                  
                  {item.url && (
                    <Button variant="ghost" size="sm" className="p-1 h-auto self-start sm:self-center">
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {!showAll && sortedNews.length > 3 && (
        <div className="text-center mt-6">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(true)}
            className="px-4 sm:px-6 text-sm"
          >
            View More ({sortedNews.length - 3} more articles)
          </Button>
        </div>
      )}

      {/* Show Less Button */}
      {showAll && sortedNews.length > 3 && (
        <div className="text-center mt-6">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(false)}
            className="px-4 sm:px-6 text-sm"
          >
            Show Less
          </Button>
        </div>
      )}

      {filteredNews.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No news found for the selected filters.</p>
        </div>
      )}
    </Card>
  );
};

export default NewsTimeline;
