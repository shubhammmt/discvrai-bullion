import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PollCard } from './PollCard';
import { QuizCard } from './QuizCard';
import { mockPolls, mockQuizzes } from '@/data/mockEngagementData';
import { Zap, Brain, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryEngagementFilterProps {
  category: string;
}

export const CategoryEngagementFilter = ({ category }: CategoryEngagementFilterProps) => {
  // Filter polls and quizzes by category
  const categoryPolls = mockPolls.filter(poll => 
    poll.category.toLowerCase() === category.toLowerCase() || 
    poll.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
  );

  const categoryQuizzes = mockQuizzes.filter(quiz => 
    quiz.category.toLowerCase() === category.toLowerCase() ||
    quiz.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
  );

  if (categoryPolls.length === 0 && categoryQuizzes.length === 0) {
    return null;
  }

  return (
    <section className="py-8 border-t">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-bold">Join the {category} Conversation</h2>
      </div>

      <Tabs defaultValue="polls" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="polls" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Polls ({categoryPolls.length})
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Quizzes ({categoryQuizzes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="polls" className="space-y-4">
          {categoryPolls.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                {categoryPolls.slice(0, 4).map(poll => (
                  <PollCard key={poll.id} poll={poll} compact />
                ))}
              </div>
              {categoryPolls.length > 4 && (
                <div className="text-center pt-4">
                  <Link to="/polls">
                    <Button variant="outline">
                      View All {category} Polls ({categoryPolls.length})
                    </Button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No polls available in this category yet.</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4">
          {categoryQuizzes.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                {categoryQuizzes.slice(0, 4).map(quiz => (
                  <QuizCard key={quiz.id} quiz={quiz} compact />
                ))}
              </div>
              {categoryQuizzes.length > 4 && (
                <div className="text-center pt-4">
                  <Link to="/quizzes">
                    <Button variant="outline">
                      View All {category} Quizzes ({categoryQuizzes.length})
                    </Button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No quizzes available in this category yet.</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};
