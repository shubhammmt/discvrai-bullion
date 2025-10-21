import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Brain, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockPolls, mockQuizzes } from '@/data/mockEngagementData';

export const EngagementWidget = () => {
  // Get featured poll and quiz
  const featuredPoll = mockPolls[0];
  const featuredQuiz = mockQuizzes[0];

  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Join the Conversation</h2>
          <p className="text-muted-foreground">Vote, quiz, and earn points while staying informed</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Poll of the Day */}
          <Card className="p-6 border-l-4 border-l-primary bg-gradient-to-br from-primary/10 to-background">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-primary" />
              <Badge variant="default">Poll of the Day</Badge>
            </div>
            
            <h3 className="font-bold text-lg mb-3 line-clamp-2">
              {featuredPoll.question}
            </h3>
            
            <div className="space-y-2 mb-4">
              {featuredPoll.options.slice(0, 2).map((option) => (
                <div key={option.id} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{option.text}</span>
                  <span className="font-semibold">{option.percentage}%</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <span>{featuredPoll.totalVotes.toLocaleString()} votes</span>
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                +5 points
              </span>
            </div>

            <Link to="/polls">
              <Button className="w-full" variant="default">
                Vote Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>

          {/* Featured Quiz */}
          <Card className="p-6 border-l-4 border-l-secondary bg-gradient-to-br from-secondary/10 to-background">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-secondary" />
              <Badge variant="secondary">Featured Quiz</Badge>
            </div>
            
            <h3 className="font-bold text-lg mb-2">
              {featuredQuiz.title}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {featuredQuiz.description}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <Badge className="bg-green-500 text-white text-xs">
                {featuredQuiz.difficulty}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {featuredQuiz.questions.length} questions
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Up to {featuredQuiz.pointsReward} pts
              </span>
            </div>

            <div className="text-sm text-muted-foreground mb-4">
              {featuredQuiz.completionCount.toLocaleString()} people completed • Avg: {featuredQuiz.averageScore}%
            </div>

            <Link to="/quizzes">
              <Button className="w-full" variant="secondary">
                Take Quiz
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 max-w-2xl mx-auto">
          <Link to="/polls">
            <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="font-bold text-2xl">{mockPolls.length}</p>
              <p className="text-xs text-muted-foreground">Active Polls</p>
            </Card>
          </Link>
          
          <Link to="/quizzes">
            <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <Brain className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <p className="font-bold text-2xl">{mockQuizzes.length}</p>
              <p className="text-xs text-muted-foreground">Quizzes</p>
            </Card>
          </Link>
          
          <Link to="/leaderboard">
            <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-accent" />
              <p className="font-bold text-2xl">10K+</p>
              <p className="text-xs text-muted-foreground">Participants</p>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
};
