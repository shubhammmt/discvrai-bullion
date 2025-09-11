import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface NewsItem {
  id: string;
  headline: string;
  timeAgo: string;
  category: string;
  excerpt: string;
  url: string;
}

const NewsCarousel = () => {
  const newsItems: NewsItem[] = [
    {
      id: '1',
      headline: 'SBI Mutual Fund Launches New Sectoral Fund',
      timeAgo: '2 hours ago',
      category: 'Fund Launch',
      excerpt: 'State Bank of India Mutual Fund announced the launch of its new technology sectoral fund...',
      url: '#'
    },
    {
      id: '2',
      headline: 'SEBI Issues New Guidelines for ESG Funds',
      timeAgo: '4 hours ago',
      category: 'Regulation',
      excerpt: 'Market regulator SEBI has issued comprehensive guidelines for Environmental, Social...',
      url: '#'
    },
    {
      id: '3',
      headline: 'Mutual Fund Assets Cross ₹50 Lakh Crores',
      timeAgo: '6 hours ago',
      category: 'Market',
      excerpt: 'The Indian mutual fund industry has achieved a significant milestone with total assets...',
      url: '#'
    },
    {
      id: '4',
      headline: 'Top 5 Performing Funds This Quarter',
      timeAgo: '8 hours ago',
      category: 'Performance',
      excerpt: 'Several equity mutual funds have delivered exceptional returns in the current quarter...',
      url: '#'
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Latest News</h3>
        <Button variant="ghost" size="sm" className="text-xs">
          View All
        </Button>
      </div>
      
      <Carousel orientation="vertical" className="w-full">
        <CarouselContent className="-mt-1 h-[400px]">
          {newsItems.map((item) => (
            <CarouselItem key={item.id} className="pt-1 basis-1/3">
              <Card className="border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.timeAgo}</span>
                  </div>
                  
                  <h4 className="font-medium text-sm mb-2 line-clamp-2 text-foreground">
                    {item.headline}
                  </h4>
                  
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {item.excerpt}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full h-8 text-xs"
                    onClick={() => window.open(item.url, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="h-6 w-6" />
        <CarouselNext className="h-6 w-6" />
      </Carousel>
    </div>
  );
};

export default NewsCarousel;