import { useState } from 'react';
import { Poll, PollOption } from '@/types/engagement';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Sparkles, TrendingUp, ExternalLink, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface PollCardProps {
  poll: Poll;
  compact?: boolean;
}

export const PollCard = ({ poll, compact = false }: PollCardProps) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [localResults, setLocalResults] = useState(poll.options);
  const { toast } = useToast();

  const handleVote = () => {
    if (!selectedOption) {
      toast({
        title: "Please select an option",
        description: "Choose an option to submit your vote",
        variant: "destructive"
      });
      return;
    }

    // Update vote count
    const updatedResults = localResults.map(option => {
      if (option.id === selectedOption) {
        const newVotes = option.votes + 1;
        const newTotal = poll.totalVotes + 1;
        return {
          ...option,
          votes: newVotes,
          percentage: Math.round((newVotes / newTotal) * 100)
        };
      }
      const newTotal = poll.totalVotes + 1;
      return {
        ...option,
        percentage: Math.round((option.votes / newTotal) * 100)
      };
    });

    setLocalResults(updatedResults);
    setHasVoted(true);

    // Award points
    toast({
      title: "🎉 Vote recorded!",
      description: "+5 points earned",
    });

    // TODO: Send to backend
    console.log('Poll vote:', { pollId: poll.id, option: selectedOption });
  };

  const handleShare = () => {
    const shareText = `I voted in this poll on DISCVR: "${poll.question}"`;
    const shareUrl = `${window.location.origin}/polls/${poll.slug}`;
    
    if (navigator.share) {
      navigator.share({ title: poll.question, text: shareText, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link copied!", description: "Share this poll with your friends" });
    }
  };

  return (
    <Card className="p-6 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-primary">Quick Poll</h3>
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        {poll.sponsored && (
          <Badge variant="outline" className="text-xs">
            Sponsored by {poll.sponsored.by}
          </Badge>
        )}
      </div>

      {/* Question */}
      <h4 className="text-lg font-semibold mb-4">{poll.question}</h4>

      {/* Options */}
      <div className="space-y-3 mb-4">
        {!hasVoted ? (
          // Voting view
          localResults.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                selectedOption === option.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50 hover:bg-accent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === option.id ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`}>
                  {selectedOption === option.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="font-medium">{option.text}</span>
              </div>
            </button>
          ))
        ) : (
          // Results view
          localResults.map((option) => (
            <div key={option.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className={`font-medium ${option.id === selectedOption ? 'text-primary' : ''}`}>
                  {option.text}
                  {option.id === selectedOption && ' ✓'}
                </span>
                <span className="font-bold">{option.percentage}%</span>
              </div>
              <Progress value={option.percentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {option.votes.toLocaleString()} votes
              </p>
            </div>
          ))
        )}
      </div>

      {/* Vote Button */}
      {!hasVoted ? (
        <Button 
          onClick={handleVote} 
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
          size="lg"
        >
          <Zap className="w-4 h-4 mr-2" />
          Submit Vote
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <div className="space-y-3">
          {/* Total votes */}
          <p className="text-center text-sm text-muted-foreground">
            {(poll.totalVotes + 1).toLocaleString()} total votes
          </p>

          {/* CTA */}
          {poll.cta && (
            <Link to={poll.cta.link}>
              <Button variant="secondary" className="w-full" size="lg">
                <TrendingUp className="w-4 h-4 mr-2" />
                {poll.cta.text}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}

          {/* Share */}
          <Button onClick={handleShare} variant="outline" className="w-full">
            <Share2 className="w-4 h-4 mr-2" />
            Share Poll
          </Button>

          {/* Related content */}
          {poll.relatedArticles && poll.relatedArticles.length > 0 && (
            <div className="pt-3 border-t">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Related Articles
              </p>
              {poll.relatedArticles.slice(0, 2).map((articleSlug) => (
                <Link 
                  key={articleSlug}
                  to={`/news/article/${articleSlug}`}
                  className="block text-sm text-primary hover:underline mb-1"
                >
                  Read more →
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {!compact && poll.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
          {poll.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
};
