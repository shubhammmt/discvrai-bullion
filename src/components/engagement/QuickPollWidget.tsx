import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Poll } from '@/types/engagement';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuickPollWidgetProps {
  poll: Poll;
  compact?: boolean;
}

export const QuickPollWidget = ({ poll, compact = false }: QuickPollWidgetProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [hasVoted, setHasVoted] = useState(false);
  const [results, setResults] = useState(poll.options);
  const { toast } = useToast();

  const handleVote = () => {
    if (!selectedOption) return;

    // Update vote counts
    const updatedResults = results.map(option => {
      if (option.id === selectedOption) {
        return {
          ...option,
          votes: option.votes + 1
        };
      }
      return option;
    });

    const totalVotes = updatedResults.reduce((sum, opt) => sum + opt.votes, 0);
    const resultsWithPercentage = updatedResults.map(opt => ({
      ...opt,
      percentage: Math.round((opt.votes / totalVotes) * 100)
    }));

    setResults(resultsWithPercentage);
    setHasVoted(true);

    toast({
      title: "Vote Recorded! 🎉",
      description: "+5 points earned",
    });
  };

  if (hasVoted) {
    return (
      <Card className="p-4 bg-gradient-to-br from-primary/5 to-background">
        <Badge variant="outline" className="mb-2 text-xs">{poll.category}</Badge>
        <p className="font-medium text-sm mb-3">{poll.question}</p>
        
        <div className="space-y-2">
          {results.map((option) => (
            <div key={option.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className={option.id === selectedOption ? 'font-semibold' : ''}>
                  {option.text}
                  {option.id === selectedOption && <Check className="w-3 h-3 inline ml-1 text-primary" />}
                </span>
                <span className="font-bold">{option.percentage}%</span>
              </div>
              <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    option.id === selectedOption ? 'bg-primary' : 'bg-secondary'
                  }`}
                  style={{ width: `${option.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          {results.reduce((sum, opt) => sum + opt.votes, 0).toLocaleString()} total votes
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-gradient-to-br from-primary/5 to-background">
      <Badge variant="outline" className="mb-2 text-xs">{poll.category}</Badge>
      <p className="font-medium text-sm mb-3">{poll.question}</p>

      <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
        <div className="space-y-2">
          {poll.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={`${poll.id}-${option.id}`} />
              <Label
                htmlFor={`${poll.id}-${option.id}`}
                className="text-sm cursor-pointer flex-grow"
              >
                {option.text}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      <Button
        onClick={handleVote}
        disabled={!selectedOption}
        className="w-full mt-4"
        size="sm"
      >
        Vote & See Results
      </Button>
    </Card>
  );
};
