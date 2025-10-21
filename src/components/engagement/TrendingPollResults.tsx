import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockPolls } from '@/data/mockEngagementData';

export const TrendingPollResults = () => {
  // Get top 3 polls by total votes
  const trendingPolls = [...mockPolls]
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, 3);

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Trending Opinions</h2>
        </div>
        <Link to="/polls" className="text-sm text-primary hover:underline">
          View All Polls →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {trendingPolls.map((poll) => {
          const topOption = [...poll.options].sort((a, b) => b.percentage - a.percentage)[0];
          
          return (
            <Link key={poll.id} to={`/polls#${poll.slug}`}>
              <Card className="p-5 hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-primary/50 h-full">
                <Badge variant="outline" className="mb-3 text-xs">
                  {poll.category}
                </Badge>
                
                <h3 className="font-semibold text-sm mb-4 line-clamp-2">
                  {poll.question}
                </h3>

                <div className="bg-primary/10 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">Top Choice:</span>
                    <span className="text-lg font-bold text-primary">{topOption.percentage}%</span>
                  </div>
                  <p className="text-sm font-medium">{topOption.text}</p>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="w-3 h-3" />
                  {poll.totalVotes.toLocaleString()} votes
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
