import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock, Share2 } from 'lucide-react';
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
    window.open('#', '_blank');
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: item.headline,
        text: item.content.split('\n\n')[0],
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Card className="group cursor-pointer overflow-hidden border border-[#334155] bg-[#1e293b] hover:shadow-lg hover:border-[#00d4aa]/50 transition-all duration-300 rounded-lg min-w-[320px] max-w-[320px] flex-shrink-0">
      <CardContent className="p-6 space-y-4">
        {/* Headline */}
        <h3 className="text-lg font-bold text-white group-hover:text-[#00d4aa] transition-colors line-clamp-2">
          {item.headline}
        </h3>
        
        {/* Freshness and Icons */}
        <div className="flex items-center justify-between text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{formatDistanceToNow(item.publishedAt, { addSuffix: true })}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-[#334155] text-slate-400 hover:text-[#00d4aa]"
              onClick={handleShareClick}
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-[#334155] text-slate-400 hover:text-[#00d4aa]"
              onClick={handleLinkClick}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="space-y-3">
          {item.content.split('\n\n').slice(0, 3).map((paragraph, index) => (
            <p key={index} className="text-sm text-slate-300 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Category indicator */}
        <div 
          className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: '#00d4aa' }}
        />
      </CardContent>
    </Card>
  );
};

export default NewsFeedCard;