import React from 'react';
import { Card } from '@/components/ui/card';
import { OVERVIEW_CARDS } from '@/data/stockMockData';
import { Sparkles } from 'lucide-react';

const CompanyOverviewCards: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">Overview</h2>
        <span className="text-sm text-primary cursor-pointer hover:underline">
          Detailed Summary
        </span>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {OVERVIEW_CARDS.map((card, index) => (
          <Card 
            key={index}
            className="p-4 transition-all duration-200 hover:shadow-md hover-scale group cursor-pointer"
          >
            <div className="space-y-3">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 text-2xl group-hover:scale-110 transition-transform duration-200">
                  {card.icon}
                </div>
              </div>
              
              {/* Title */}
              <div className="text-center">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
              </div>
              
              {/* Content */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.content}
                </p>
              </div>

              {/* AI Enhancement Indicator */}
              <div className="flex justify-center">
                <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Sparkles className="h-3 w-3" />
                  <span>AI Enhanced</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompanyOverviewCards;