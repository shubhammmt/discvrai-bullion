import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { 
  ExternalLink, 
  TrendingUp, 
  Clock, 
  Filter,
  Newspaper,
  Brain,
  BarChart3
} from 'lucide-react';

interface NewsItem {
  id: string;
  headline: string;
  timeAgo: string;
  category: 'Market News' | 'Fund Updates' | 'AI Insights';
  excerpt: string;
  url: string;
  trending?: boolean;
  readTime: string;
}

const NewsCarousel = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const newsItems: NewsItem[] = [
    {
      id: '1',
      headline: 'AI Identifies Top-Performing ESG Funds Based on Macro Analysis',
      timeAgo: '2 hours ago',
      category: 'AI Insights',
      excerpt: 'Our AI analysis reveals emerging opportunities in sustainable investing as macro indicators shift.',
      url: '#',
      trending: true,
      readTime: '3 min read'
    },
    {
      id: '2',
      headline: 'Market Volatility Creates Entry Opportunities in Mid-Cap Funds',
      timeAgo: '4 hours ago',
      category: 'Market News',
      excerpt: 'Recent market corrections have created attractive entry points for quality mid-cap mutual funds.',
      url: '#',
      readTime: '2 min read'
    },
    {
      id: '3',
      headline: 'Top-Rated Balanced Funds Outperform During Economic Uncertainty',
      timeAgo: '6 hours ago',
      category: 'Fund Updates',
      excerpt: 'Community analysis shows balanced funds providing stability in current market conditions.',
      url: '#',
      readTime: '4 min read'
    },
    {
      id: '4',
      headline: 'AI Algorithm Predicts Sector Rotation into Technology Funds',
      timeAgo: '8 hours ago',
      category: 'AI Insights',
      excerpt: 'Machine learning models indicate potential shift from defensive to growth sectors.',
      url: '#',
      trending: true,
      readTime: '5 min read'
    },
    {
      id: '5',
      headline: 'Community Research: Hidden Gems in Small-Cap Fund Universe',
      timeAgo: '12 hours ago',
      category: 'Fund Updates',
      excerpt: 'User-contributed research highlights undervalued opportunities in small-cap segment.',
      url: '#',
      readTime: '3 min read'
    }
  ];

  const filters = ['All', 'Market News', 'Fund Updates', 'AI Insights'];

  const filteredNews = activeFilter === 'All' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeFilter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Market News':
        return <Newspaper className="w-4 h-4" />;
      case 'Fund Updates':
        return <BarChart3 className="w-4 h-4" />;
      case 'AI Insights':
        return <Brain className="w-4 h-4" />;
      default:
        return <Newspaper className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Market News':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Fund Updates':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'AI Insights':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Latest Market Intelligence</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Real-time analysis and insights powered by AI and community research
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="flex items-center gap-2"
              >
                {filter !== 'All' && getCategoryIcon(filter)}
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* News Carousel */}
        <Carousel className="w-full max-w-7xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {filteredNews.map((item) => (
              <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge 
                        variant="outline" 
                        className={`flex items-center gap-1 ${getCategoryColor(item.category)}`}
                      >
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-2">
                        {item.trending && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Clock className="w-4 h-4" />
                      <span>{item.timeAgo}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>
                    
                    <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                      {item.headline}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between group-hover:bg-primary/10 transition-colors"
                      onClick={() => window.open(item.url, '_blank')}
                    >
                      Read Full Article
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View All News & Insights
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;