import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NewsItem {
  id: string;
  headline: string;
  publishedAt: Date;
  content: string;
  category: string;
}

interface NewsFeedCardProps {
  item: NewsItem;
  categoryColor: string;
}

const NewsFeedCard: React.FC<NewsFeedCardProps> = ({ item, categoryColor }) => {
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Open external link
    window.open('#', '_blank');
  };

  return (
    <Card className="group cursor-pointer overflow-hidden border border-border/50 bg-card hover:shadow-lg transition-all duration-300 rounded-lg min-w-[320px] max-w-[320px] flex-shrink-0">
      <CardContent className="p-6 space-y-4">
        {/* Headline */}
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {item.headline}
        </h3>
        
        {/* Freshness and Link */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{formatDistanceToNow(item.publishedAt, { addSuffix: true })}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-accent/20"
            onClick={handleLinkClick}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="space-y-3">
          {item.content.split('\n\n').slice(0, 3).map((paragraph, index) => (
            <p key={index} className="text-sm text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Category indicator */}
        <div 
          className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: categoryColor }}
        />
      </CardContent>
    </Card>
  );
};

export default NewsFeedCard;