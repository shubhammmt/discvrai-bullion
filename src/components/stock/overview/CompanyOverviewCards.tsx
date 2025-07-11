
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
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {OVERVIEW_CARDS.map((card, index) => (
            <div key={index} className="space-y-3">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 text-2xl">
                  {card.icon}
                </div>
              </div>
              
              {/* Title */}
              <div className="text-center">
                <h4 className="font-semibold text-foreground mb-2">
                  {card.title}
                </h4>
              </div>
              
              {/* Content */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CompanyOverviewCards;
