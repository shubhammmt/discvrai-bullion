import { useState } from 'react';
import { Quiz } from '@/types/engagement';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Award, CheckCircle2, XCircle, TrendingUp, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface QuizCardProps {
  quiz: Quiz;
  compact?: boolean;
}

export const QuizCard = ({ quiz, compact = false }: QuizCardProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;

  const handleAnswer = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        variant: "destructive"
      });
      return;
    }

    const isCorrect = selectedAnswer === question.correctAnswer;
    if (isCorrect) {
      setScore(score + question.points);
    }

    setAnswers([...answers, selectedAnswer]);
    setShowExplanation(true);

    toast({
      title: isCorrect ? "✓ Correct!" : "✗ Incorrect",
      description: isCorrect ? `+${question.points} points` : "Better luck next time",
      variant: isCorrect ? "default" : "destructive"
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Complete quiz
      setQuizCompleted(true);
      const totalPoints = score + 5; // +5 bonus for completion
      toast({
        title: "🎉 Quiz Completed!",
        description: `Total score: ${totalPoints} points`,
      });
      // TODO: Send to backend
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleShare = () => {
    const shareText = `I scored ${score}/${quiz.pointsReward} on "${quiz.title}" quiz on DISCVR!`;
    const shareUrl = `${window.location.origin}/quizzes/${quiz.slug}`;
    
    if (navigator.share) {
      navigator.share({ title: quiz.title, text: shareText, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link copied!" });
    }
  };

  const getDifficultyColor = () => {
    switch (quiz.difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'expert': return 'bg-red-500';
    }
  };

  if (quizCompleted) {
    const percentage = Math.round((score / quiz.pointsReward) * 100);
    
    return (
      <Card className="p-6 border-l-4 border-l-secondary bg-gradient-to-br from-secondary/10 via-background to-accent/10">
        <div className="text-center space-y-4">
          <Award className="w-16 h-16 mx-auto text-secondary" />
          <h3 className="text-2xl font-bold">Quiz Completed!</h3>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-primary">{score + 5}</p>
            <p className="text-muted-foreground">points earned</p>
            <p className="text-sm">Accuracy: {percentage}%</p>
          </div>

          {/* CTA */}
          {quiz.cta && (
            <Link to={quiz.cta.link}>
              <Button variant="default" className="w-full" size="lg">
                <TrendingUp className="w-4 h-4 mr-2" />
                {quiz.cta.text}
              </Button>
            </Link>
          )}

          {/* Share */}
          <Button onClick={handleShare} variant="outline" className="w-full">
            <Share2 className="w-4 h-4 mr-2" />
            Share Your Score
          </Button>

          {/* Related articles */}
          {quiz.relatedArticles && quiz.relatedArticles.length > 0 && (
            <div className="pt-4 border-t text-left">
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                Learn More
              </p>
              {quiz.relatedArticles.map((articleSlug) => (
                <Link 
                  key={articleSlug}
                  to={`/news/article/${articleSlug}`}
                  className="block text-sm text-primary hover:underline mb-1"
                >
                  Read related article →
                </Link>
              ))}
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-l-4 border-l-secondary bg-gradient-to-br from-secondary/5 via-background to-accent/5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-secondary" />
          <h3 className="font-bold text-secondary">Quick Quiz</h3>
          <Badge className={`${getDifficultyColor()} text-white text-xs`}>
            {quiz.difficulty}
          </Badge>
        </div>
        {quiz.sponsored && (
          <Badge variant="outline" className="text-xs">
            by {quiz.sponsored.by}
          </Badge>
        )}
      </div>

      {/* Title */}
      <h4 className="text-lg font-semibold mb-4">{quiz.title}</h4>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
          <span className="font-medium">
            {score} / {quiz.pointsReward} pts
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="space-y-4">
        <h5 className="font-semibold">{question.question}</h5>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = showExplanation && isCorrect;
            const showIncorrect = showExplanation && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => !showExplanation && setSelectedAnswer(index)}
                disabled={showExplanation}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                  showCorrect 
                    ? 'border-green-500 bg-green-500/10'
                    : showIncorrect 
                    ? 'border-red-500 bg-red-500/10'
                    : isSelected
                    ? 'border-secondary bg-secondary/10'
                    : 'border-border hover:border-secondary/50 hover:bg-accent'
                } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  {showIncorrect && <XCircle className="w-5 h-5 text-red-500" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="p-4 rounded-lg bg-accent border border-border">
            <p className="text-sm font-semibold mb-1">Explanation:</p>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}

        {/* Action Button */}
        {!showExplanation ? (
          <Button 
            onClick={handleAnswer}
            className="w-full bg-gradient-to-r from-secondary to-accent hover:opacity-90"
            size="lg"
          >
            Submit Answer
          </Button>
        ) : (
          <Button 
            onClick={handleNext}
            className="w-full"
            size="lg"
          >
            {isLastQuestion ? 'See Results' : 'Next Question'}
          </Button>
        )}
      </div>

      {/* Footer stats */}
      {!compact && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t text-xs text-muted-foreground">
          <span>{quiz.completionCount.toLocaleString()} completed</span>
          <span>Avg: {quiz.averageScore}%</span>
        </div>
      )}
    </Card>
  );
};
