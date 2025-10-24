import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ByteNews, ProductFeature } from '@/types/news';
import { Poll, Quiz } from '@/types/engagement';
import { QuickPollWidget } from '@/components/engagement/QuickPollWidget';
import { QuizCard } from '@/components/engagement/QuizCard';
import { ProductFeatureCard } from './ProductFeatureCard';

interface EnhancedByteNewsCardProps {
  news?: ByteNews;
  poll?: Poll;
  quiz?: Quiz;
  productFeature?: ProductFeature;
  type: 'news' | 'poll' | 'quiz' | 'product-feature';
}

export const EnhancedByteNewsCard = ({ news, poll, quiz, productFeature, type }: EnhancedByteNewsCardProps) => {
  if (type === 'poll' && poll) {
    return <QuickPollWidget poll={poll} compact />;
  }

  if (type === 'quiz' && quiz) {
    return <QuizCard quiz={quiz} compact />;
  }

  if (type === 'product-feature' && productFeature) {
    return <ProductFeatureCard feature={productFeature} />;
  }

  if (type === 'news' && news) {
    const getSentimentIcon = () => {
      switch (news.sentiment) {
        case 'positive':
          return <TrendingUp className="w-4 h-4 text-green-500" />;
        case 'negative':
          return <TrendingDown className="w-4 h-4 text-red-500" />;
        default:
          return <Minus className="w-4 h-4 text-gray-500" />;
      }
    };

    const getSentimentColor = () => {
      switch (news.sentiment) {
        case 'positive':
          return 'border-l-green-500';
        case 'negative':
          return 'border-l-red-500';
        default:
          return 'border-l-gray-300';
      }
    };

    return (
      <Card className={`p-4 hover:shadow-md transition-shadow border-l-4 ${getSentimentColor()}`}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <Badge variant="secondary" className="text-xs">
            {news.category}
          </Badge>
          {getSentimentIcon()}
        </div>

        <p className="text-xs text-muted-foreground mb-2">
          {formatDistanceToNow(new Date(news.timestamp), { addSuffix: true })}
        </p>

        <h3 className="font-semibold text-sm mb-3 line-clamp-3">
          {news.headline}
        </h3>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{news.source}</span>
          {news.relatedArticle && (
            <Link
              to={`/news/article/${news.relatedArticle}`}
              className="flex items-center gap-1 text-primary hover:underline"
            >
              Read more
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      </Card>
    );
  }

  return null;
};
