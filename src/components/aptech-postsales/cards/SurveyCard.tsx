import React, { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SurveyCardProps {
  question: string;
  onSubmit?: (rating: number, feedback: string) => void;
}

const SurveyCard: React.FC<SurveyCardProps> = ({ question, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
    onSubmit?.(rating, feedback);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center animate-fade-in">
        <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
        <p className="text-sm font-semibold text-green-700">Survey Submitted!</p>
        <p className="text-xs text-green-600 mt-1">You rated <strong>{rating}/5</strong>. Thanks for your feedback!</p>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-3 animate-fade-in">
      <p className="text-sm font-medium text-foreground">{question}</p>
      
      {/* Star rating */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-7 w-7 transition-colors ${
                star <= (hover || rating)
                  ? 'text-orange-400 fill-orange-400'
                  : 'text-muted-foreground/30'
              }`}
            />
          </button>
        ))}
        {rating > 0 && <span className="text-xs text-muted-foreground ml-2">{rating}/5</span>}
      </div>

      {/* Optional text feedback */}
      <textarea
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        placeholder="Any additional feedback? (optional)"
        className="w-full text-xs rounded-lg border border-orange-200 bg-white p-2 h-16 resize-none focus:outline-none focus:ring-1 focus:ring-orange-400"
      />

      <Button
        onClick={handleSubmit}
        disabled={rating === 0}
        size="sm"
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs h-8"
      >
        Submit Feedback
      </Button>
    </div>
  );
};

export default SurveyCard;
