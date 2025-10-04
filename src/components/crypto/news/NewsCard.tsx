import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { NewsArticle } from "@/hooks/useCryptoNews";

interface NewsCardProps {
  article: NewsArticle;
  onClick: () => void;
}

export const NewsCard = ({ article, onClick }: NewsCardProps) => {
  const getSentimentIcon = () => {
    if (article.sentiment === "Bullish") return <TrendingUp className="w-4 h-4" />;
    if (article.sentiment === "Bearish") return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getSentimentColor = () => {
    if (article.sentiment === "Bullish") return "bg-green-500/10 text-green-500 border-green-500/20";
    if (article.sentiment === "Bearish") return "bg-destructive/10 text-destructive border-destructive/20";
    return "bg-blue-500/10 text-blue-500 border-blue-500/20";
  };

  const getCategoryColor = () => {
    const colors = {
      "Breaking": "bg-red-500/10 text-red-500 border-red-500/20",
      "Market Analysis": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "Regulatory": "bg-amber-500/10 text-amber-500 border-amber-500/20",
      "Technology": "bg-purple-500/10 text-purple-500 border-purple-500/20",
      "Adoption": "bg-green-500/10 text-green-500 border-green-500/20",
    };
    return colors[article.category];
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <Card 
      className="p-6 hover:shadow-lg transition-all cursor-pointer group hover:border-primary/50"
      onClick={onClick}
    >
      {/* Header Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge className={getCategoryColor()}>
          {article.category === "Breaking" && "🔥"} {article.category}
        </Badge>
        <Badge className={getSentimentColor()}>
          {getSentimentIcon()} {article.sentiment}
        </Badge>
        <Badge variant="outline" className="text-muted-foreground">
          <Clock className="w-3 h-3 mr-1" />
          {article.readTime} sec read
        </Badge>
      </div>

      {/* Headline */}
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {article.headline}
      </h3>

      {/* Summary */}
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {article.summary}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/40">
        <div className="flex gap-2">
          {article.symbols.map((symbol) => (
            <Badge key={symbol} variant="secondary" className="text-xs">
              {symbol}
            </Badge>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          {getRelativeTime(article.publishedAt)}
        </div>
      </div>
    </Card>
  );
};
