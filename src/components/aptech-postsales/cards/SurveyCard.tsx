import React, { useState } from 'react';
import { Star, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface SurveyQuestion {
  id: string;
  question: string;
  type: 'stars' | 'radio' | 'text';
  options?: string[];
}

interface SurveyCardProps {
  question?: string; // legacy single-question support
  questions?: SurveyQuestion[];
  onSubmit?: (answers: Record<string, string | number>) => void;
}

const defaultQuestions: SurveyQuestion[] = [
  { id: 'overall', question: 'How would you rate your overall experience so far?', type: 'stars' },
  { id: 'faculty', question: 'How satisfied are you with the faculty?', type: 'stars' },
  { id: 'pace', question: 'How do you find the course pace?', type: 'radio', options: ['Too slow', 'Just right', 'Too fast'] },
  { id: 'recommend', question: 'Would you recommend Aptech to a friend?', type: 'radio', options: ['Definitely', 'Maybe', 'Not sure'] },
  { id: 'feedback', question: 'Any suggestions or feedback for us?', type: 'text' },
];

const SurveyCard: React.FC<SurveyCardProps> = ({ question, questions, onSubmit }) => {
  const surveyQuestions = questions || (question ? [{ id: 'q1', question, type: 'stars' as const }] : defaultQuestions);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const current = surveyQuestions[currentIdx];
  const total = surveyQuestions.length;
  const isLast = currentIdx === total - 1;
  const canProceed = current.type === 'text' || answers[current.id] !== undefined;

  const handleNext = () => {
    if (isLast) {
      setSubmitted(true);
      onSubmit?.(answers);
    } else {
      setCurrentIdx(prev => prev + 1);
      setHover(0);
    }
  };

  if (submitted) {
    const starAnswers = surveyQuestions.filter(q => q.type === 'stars' && answers[q.id]);
    const avgRating = starAnswers.length
      ? (starAnswers.reduce((s, q) => s + (answers[q.id] as number), 0) / starAnswers.length).toFixed(1)
      : null;

    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center animate-fade-in">
        <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
        <p className="text-sm font-semibold text-green-700">Survey Submitted!</p>
        {avgRating && <p className="text-xs text-green-600 mt-1">Average rating: <strong>{avgRating}/5</strong></p>}
        <p className="text-xs text-green-600 mt-1">Thanks for your feedback — it helps us improve! 🙏</p>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-3 animate-fade-in">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-orange-600 font-semibold">Question {currentIdx + 1} of {total}</span>
        <div className="flex gap-0.5">
          {surveyQuestions.map((_, i) => (
            <div key={i} className={`h-1.5 w-5 rounded-full transition-colors ${i <= currentIdx ? 'bg-orange-400' : 'bg-orange-200'}`} />
          ))}
        </div>
      </div>

      <p className="text-sm font-medium text-foreground">{current.question}</p>

      {/* Star rating */}
      {current.type === 'stars' && (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => setAnswers(prev => ({ ...prev, [current.id]: star }))}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-7 w-7 transition-colors ${
                  star <= (hover || (answers[current.id] as number) || 0)
                    ? 'text-orange-400 fill-orange-400'
                    : 'text-muted-foreground/30'
                }`}
              />
            </button>
          ))}
          {answers[current.id] && <span className="text-xs text-muted-foreground ml-2">{answers[current.id]}/5</span>}
        </div>
      )}

      {/* Radio options */}
      {current.type === 'radio' && current.options && (
        <div className="space-y-1.5">
          {current.options.map(opt => (
            <button
              key={opt}
              onClick={() => setAnswers(prev => ({ ...prev, [current.id]: opt }))}
              className={`w-full text-left text-xs px-3 py-2.5 rounded-lg border transition-colors ${
                answers[current.id] === opt
                  ? 'border-orange-400 bg-orange-100 text-orange-700 font-medium'
                  : 'border-orange-200 bg-white hover:bg-orange-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Text input */}
      {current.type === 'text' && (
        <textarea
          value={(answers[current.id] as string) || ''}
          onChange={e => setAnswers(prev => ({ ...prev, [current.id]: e.target.value }))}
          placeholder="Type your answer here... (optional)"
          className="w-full text-xs rounded-lg border border-orange-200 bg-white p-2 h-16 resize-none focus:outline-none focus:ring-1 focus:ring-orange-400"
        />
      )}

      {/* Navigation */}
      <div className="flex gap-2">
        {currentIdx > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setCurrentIdx(prev => prev - 1); setHover(0); }}
            className="text-xs h-8 border-orange-300"
          >
            <ChevronLeft className="h-3 w-3 mr-1" /> Back
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          size="sm"
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs h-8"
        >
          {isLast ? 'Submit Survey' : 'Next'} {!isLast && <ChevronRight className="h-3 w-3 ml-1" />}
        </Button>
      </div>
    </div>
  );
};

export default SurveyCard;
