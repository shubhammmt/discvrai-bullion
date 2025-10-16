import { NewsArticle } from '@/types/news';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  article: NewsArticle;
  featured?: boolean;
}

export const ArticleCard = ({ article, featured = false }: ArticleCardProps) => {
  return (
    <Link to={`/news/article/${article.slug}`}>
      <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${featured ? 'md:flex' : ''}`}>
        <div className={`relative ${featured ? 'md:w-1/2' : 'w-full'}`}>
          <img
            src={article.imageUrl}
            alt={article.headline}
            className="w-full h-48 md:h-64 object-cover"
            loading="lazy"
          />
          {article.featured && (
            <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
              <TrendingUp className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>

        <div className={`p-6 ${featured ? 'md:w-1/2' : ''}`}>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">{article.category}</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime} min read
            </span>
          </div>

          <h3 className={`font-semibold mb-2 line-clamp-2 ${featured ? 'text-2xl' : 'text-lg'}`}>
            {article.headline}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {article.summary}
          </p>

          <div className="flex items-center justify-between">
            <Link 
              to={`/news/author/${article.author.id}`}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={article.author.avatar} alt={article.author.name} />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-xs">
                <p className="font-medium">{article.author.name}</p>
                <p className="text-muted-foreground">{article.author.credentials}</p>
              </div>
            </Link>

            <time className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </time>
          </div>

          {article.tags.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {article.tags.slice(0, 3).map(tag => (
                <Link key={tag} to={`/news/tag/${tag}`} onClick={(e) => e.stopPropagation()}>
                  <Badge variant="outline" className="text-xs hover:bg-secondary">
                    #{tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};
