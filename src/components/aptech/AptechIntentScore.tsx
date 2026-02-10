import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { IntentScore } from '@/utils/aptechCounsellorEngine';

interface AptechIntentScoreProps {
  score: IntentScore;
}

const AptechIntentScore = ({ score }: AptechIntentScoreProps) => {
  const level = score.total >= 70 ? 'High' : score.total >= 50 ? 'Medium' : 'Low';
  const color = score.total >= 70 ? 'text-green-600' : score.total >= 50 ? 'text-yellow-600' : 'text-red-500';
  const barColor = score.total >= 70 ? 'bg-green-500' : score.total >= 50 ? 'bg-yellow-500' : 'bg-red-400';

  const segments = [
    { label: 'Budget Match', value: score.budgetMatch, max: 25 },
    { label: 'Urgency', value: score.urgency, max: 25 },
    { label: 'Engagement', value: score.engagement, max: 25 },
    { label: 'Course Fit', value: score.courseFit, max: 25 },
  ];

  return (
    <Card className="border-border/60 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center justify-between">
          <span>📊 Intent Score</span>
          <span className={`text-lg font-bold ${color}`}>{score.total}/100 — {level}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Main bar */}
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${score.total}%` }} />
        </div>
        {/* Segments */}
        <div className="grid grid-cols-2 gap-2">
          {segments.map(s => (
            <div key={s.label} className="space-y-0.5">
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>{s.label}</span>
                <span>{s.value}/{s.max}</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full">
                <div className={`h-full ${barColor} rounded-full`} style={{ width: `${(s.value / s.max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AptechIntentScore;
