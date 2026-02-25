import React, { useState } from 'react';
import { PlayCircle, FileText, Download, ExternalLink, CheckCircle2, BookOpen } from 'lucide-react';

interface MaterialItem {
  title: string;
  type: 'video' | 'pdf' | 'exercise';
  duration?: string;
  url: string;
}

interface CatchUpMaterialCardProps {
  sessionTitle: string;
  sessionNumber: number;
  materials: MaterialItem[];
}

const typeIcon = {
  video: PlayCircle,
  pdf: FileText,
  exercise: BookOpen,
};

const typeColor = {
  video: 'text-red-500 bg-red-50',
  pdf: 'text-blue-500 bg-blue-50',
  exercise: 'text-green-500 bg-green-50',
};

const CatchUpMaterialCard: React.FC<CatchUpMaterialCardProps> = ({ sessionTitle, sessionNumber, materials }) => {
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const toggleComplete = (idx: number) => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm animate-fade-in bg-card">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-white" />
        <span className="text-white font-semibold text-sm">Catch-Up: Session {sessionNumber}</span>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm font-medium text-foreground">{sessionTitle}</p>
        <div className="space-y-2">
          {materials.map((m, i) => {
            const Icon = typeIcon[m.type];
            const colors = typeColor[m.type];
            const done = completed.has(i);
            return (
              <div
                key={i}
                className={`flex items-center gap-3 p-2.5 rounded-lg border transition-colors cursor-pointer hover:bg-muted/50 ${done ? 'bg-green-50/50 border-green-200' : 'border-border'}`}
                onClick={() => toggleComplete(i)}
              >
                <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${done ? 'bg-green-100 text-green-600' : colors}`}>
                  {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{m.title}</p>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span className="capitalize">{m.type}</span>
                    {m.duration && <span>• {m.duration}</span>}
                  </div>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              </div>
            );
          })}
        </div>
        <div className="text-xs text-muted-foreground text-center">
          {completed.size}/{materials.length} completed • Tap to mark as done
        </div>
      </div>
    </div>
  );
};

export default CatchUpMaterialCard;
