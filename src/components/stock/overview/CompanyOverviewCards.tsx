
import React from 'react';
import { Card } from '@/components/ui/card';
import { OVERVIEW_CARDS } from '@/data/stockMockData';
import { Sparkles, Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CompanyOverviewCards: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">AI Insights</h2>
        <span className="text-sm text-primary cursor-pointer hover:underline">
          Detailed Summary
        </span>
      </div>
      
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="h-6 w-6 text-purple-600" />
          <h3 className="text-lg font-semibold">Comprehensive Analysis</h3>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Enhanced
          </Badge>
        </div>
        
        <div className="space-y-4">
          {OVERVIEW_CARDS.map((card, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.content}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CompanyOverviewCards;
