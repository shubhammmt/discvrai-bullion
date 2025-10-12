import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ProblemOpportunitySlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    problem: {
      investors: {
        title: string;
        stats: string[];
      };
      currentSolutions: {
        title: string;
        stats: string[];
      };
    };
    opportunity: {
      marketSize: string;
      growth: string;
      enabler: string;
      model: string;
    };
  };
}

export const ProblemOpportunitySlide: React.FC<ProblemOpportunitySlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
        <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Side */}
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                {slide.problem.investors.title}
              </h3>
              <ul className="space-y-2">
                {slide.problem.investors.stats.map((stat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                    <span className="text-foreground/80">{stat}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                {slide.problem.currentSolutions.title}
              </h3>
              <ul className="space-y-2">
                {slide.problem.currentSolutions.stats.map((stat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gray-600 dark:text-gray-400 mt-1">•</span>
                    <span className="text-foreground/80">{stat}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Opportunity Side */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800 h-full">
          <CardContent className="p-6 flex flex-col justify-center h-full">
            <h3 className="text-2xl font-bold mb-6 text-green-800 dark:text-green-300 flex items-center gap-2">
              <span className="text-3xl">🚀</span>
              The Opportunity
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">🌍</span>
                <div>
                  <p className="font-semibold text-lg">{slide.opportunity.marketSize}</p>
                  <p className="text-sm text-muted-foreground">Global Market</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">📈</span>
                <div>
                  <p className="font-semibold text-lg">{slide.opportunity.growth}</p>
                  <p className="text-sm text-muted-foreground">Annual Growth</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">🤖</span>
                <div>
                  <p className="font-semibold text-lg">{slide.opportunity.enabler}</p>
                  <p className="text-sm text-muted-foreground">Technology Enabler</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">💡</span>
                <div>
                  <p className="font-semibold text-lg">{slide.opportunity.model}</p>
                  <p className="text-sm text-muted-foreground">Business Approach</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
