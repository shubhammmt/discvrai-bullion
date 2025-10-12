import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Target, TrendingUp } from 'lucide-react';

interface AskSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
  investment: {
    amount: string;
    structure: string;
    discount: string;
    interest: string;
    maturity: string;
    minimum: string;
    close: string;
    qualifiedFinancing?: string;
  };
    convertibleNoteExplanation?: {
      title: string;
      description: string;
      example: string[];
    };
    benefits: string[];
    returns: Array<{
      scenario: string;
      seriesAValuation: string;
      effectiveValuation: string;
      exitValuation: string;
      investment: string;
      returns: string;
      multiple: string;
    }>;
    exitScenarios?: {
      title: string;
      scenarios: Array<{
        title: string;
        description: string;
        timeline: string;
        method: string;
        likelihood: string;
      }>;
      note: string;
    };
    useOfFunds: Array<{
      category: string;
      percentage: number;
      amount: string;
    }>;
    milestones: Array<{
      month: string;
      goal: string;
    }>;
  };
}

export const AskSlide: React.FC<AskSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
        <p className="text-xl text-muted-foreground mb-4">{slide.subtitle}</p>
        
        <Card className="max-w-3xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <p className="text-4xl font-bold text-green-700 dark:text-green-300 mb-4">
              {slide.investment.amount}
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm mb-4">
              <div>
                <p className="text-muted-foreground">Structure</p>
                <p className="font-semibold">{slide.investment.structure}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Discount Rate</p>
                <p className="font-semibold">{slide.investment.discount}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Interest Rate</p>
                <p className="font-semibold">{slide.investment.interest}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Maturity</p>
                <p className="font-semibold">{slide.investment.maturity}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Minimum Check</p>
                <p className="font-semibold">{slide.investment.minimum}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Target Close</p>
                <p className="font-semibold">{slide.investment.close}</p>
              </div>
            </div>
            {slide.investment.qualifiedFinancing && (
              <div className="pt-3 border-t border-green-300 dark:border-green-700">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-green-900 dark:text-green-100">Note:</span> {slide.investment.qualifiedFinancing}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Convertible Note Explanation */}
      {slide.convertibleNoteExplanation && (
        <Card className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-2 text-blue-900 dark:text-blue-100">
              {slide.convertibleNoteExplanation.title}
            </h3>
            <p className="text-sm mb-4 text-muted-foreground">
              {slide.convertibleNoteExplanation.description}
            </p>
            <div className="bg-background/50 rounded-lg p-4">
              <p className="font-semibold text-sm mb-2">Example:</p>
              <ul className="space-y-1 text-sm">
                {slide.convertibleNoteExplanation.example.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* What You Get */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              What You Get
            </h3>
            <ul className="space-y-2">
              {slide.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 dark:text-green-400 flex-shrink-0">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Expected Returns */}
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Expected Returns (5Y) - <span className="text-xs text-muted-foreground font-normal">Includes 25% discount bonus</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-semibold">Scenario</th>
                    <th className="text-left p-2 font-semibold">Series A Val.</th>
                    <th className="text-left p-2 font-semibold">Your Eff. Val.</th>
                    <th className="text-left p-2 font-semibold">Exit Val.</th>
                    <th className="text-right p-2 font-semibold">₹10L →</th>
                    <th className="text-right p-2 font-semibold">Return</th>
                  </tr>
                </thead>
                <tbody>
                  {slide.returns.map((scenario, idx) => (
                    <tr key={idx} className={`${
                      scenario.scenario === 'Base' 
                        ? 'bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500'
                        : ''
                    }`}>
                      <td className="p-2 font-semibold">{scenario.scenario}</td>
                      <td className="p-2">{scenario.seriesAValuation}</td>
                      <td className="p-2 text-green-600 dark:text-green-400 font-medium">{scenario.effectiveValuation}</td>
                      <td className="p-2">{scenario.exitValuation}</td>
                      <td className="p-2 text-right font-bold text-green-700 dark:text-green-300">{scenario.returns}</td>
                      <td className="p-2 text-right font-bold text-lg text-green-700 dark:text-green-300">{scenario.multiple}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Use of Funds */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Use of Funds
            </h3>
            <div className="space-y-2">
              {slide.useOfFunds.map((fund, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium">{fund.category}</span>
                    <span className="text-muted-foreground">{fund.amount}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all" 
                      style={{ width: `${fund.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exit Scenarios */}
      {slide.exitScenarios && (
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 text-amber-900 dark:text-amber-100">
              {slide.exitScenarios.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {slide.exitScenarios.scenarios.map((scenario, idx) => (
                <div key={idx} className="bg-background/60 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                  <h4 className="font-bold text-sm mb-2 text-amber-900 dark:text-amber-100">{scenario.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{scenario.description}</p>
                  <div className="space-y-1 text-xs">
                    <p><span className="font-semibold">Timeline:</span> {scenario.timeline}</p>
                    <p><span className="font-semibold">Method:</span> {scenario.method}</p>
                    <p className="text-amber-700 dark:text-amber-400 font-medium">{scenario.likelihood}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-background/60 rounded-lg p-3 border border-amber-300 dark:border-amber-700">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-amber-900 dark:text-amber-100">Note:</span> {slide.exitScenarios.note}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Milestones */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-xl">🎯</span>
            Key Milestones with This Capital
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {slide.milestones.map((milestone, idx) => (
              <div key={idx} className="bg-background/50 rounded-lg p-3">
                <p className="font-bold text-purple-600 dark:text-purple-400 mb-1">{milestone.month}</p>
                <p className="text-sm">{milestone.goal}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
