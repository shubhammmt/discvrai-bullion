import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Trophy, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockQuizzes } from '@/data/mockEngagementData';

export const LatestQuizzes = () => {
  // Get latest 4 quizzes
  const latestQuizzes = mockQuizzes.slice(0, 4);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'expert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-secondary" />
          <h2 className="text-2xl font-bold">Latest Quizzes</h2>
        </div>
        <Link to="/quizzes" className="text-sm text-primary hover:underline">
          View All Quizzes →
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {latestQuizzes.map((quiz) => (
          <Link key={quiz.id} to={`/quizzes#${quiz.slug}`}>
            <Card className="p-4 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Badge className={`${getDifficultyColor(quiz.difficulty)} text-white text-xs`}>
                  {quiz.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs">{quiz.category}</Badge>
              </div>
              
              <h3 className="font-semibold text-sm mb-3 line-clamp-2 flex-grow">
                {quiz.title}
              </h3>

              <div className="space-y-2 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>{quiz.questions.length} questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-3 h-3" />
                  <span>Up to {quiz.pointsReward} points</span>
                </div>
              </div>

              <Button size="sm" className="w-full" variant="secondary">
                Start Quiz
              </Button>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
