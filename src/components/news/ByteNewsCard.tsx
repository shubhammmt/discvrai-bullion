import { ByteNews } from '@/types/news';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { TrendingUp, TrendingDown, Minus, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ByteNewsCardProps {
  news: ByteNews;
}

export const ByteNewsCard = ({ news }: ByteNewsCardProps) => {
  const getSentimentIcon = () => {
    switch (news.sentiment) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSentimentColor = () => {
    switch (news.sentiment) {
      case 'positive':
        return 'border-l-green-500';
      case 'negative':
        return 'border-l-red-500';
      default:
        return 'border-l-muted';
    }
  };

  return (
    <Card className={`p-4 border-l-4 ${getSentimentColor()} hover:shadow-md transition-all`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {news.category}
            </Badge>
            {news.sentiment && getSentimentIcon()}
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(news.timestamp), { addSuffix: true })}
            </span>
          </div>

          <h4 className="font-medium text-sm mb-1 line-clamp-2">
            {news.headline}
          </h4>

          <p className="text-xs text-muted-foreground">
            Source: {news.source}
          </p>
        </div>

        {news.relatedArticle && (
          <Link 
            to={`/news/article/${news.relatedArticle}`}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
          >
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </Link>
        )}
      </div>
    </Card>
  );
};
