import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Shield, 
  Globe, 
  Zap,
  ArrowRight,
  Crown,
  Target,
  DollarSign,
  BarChart3
} from 'lucide-react';

interface FundTheme {
  id: string;
  title: string;
  description: string;
  category: 'Growth' | 'Stability' | 'Innovation' | 'Global';
  return3M: number;
  returnLabel: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  minInvestment: string;
  expenseRatio: number;
  icon: React.ElementType;
  bgGradient: string;
  featured?: boolean;
  tags: string[];
}

interface FundThemesProps {
  onExploreTheme: (themeId: string) => void;
}

const FundThemes = ({ onExploreTheme }: FundThemesProps) => {
  const themes: FundTheme[] = [
    {
      id: 'gst-edge',
      title: 'GST Edge Fund',
      description: 'Captures growth in GST-beneficiary sectors boosting demand and profitability',
      category: 'Growth',
      return3M: 5.58,
      returnLabel: '3M',
      riskLevel: 'Medium',
      minInvestment: '₹1,000',
      expenseRatio: 0.75,
      icon: TrendingUp,
      bgGradient: 'from-blue-500/10 to-blue-600/5',
      featured: true,
      tags: ['Policy-Driven', 'High Growth']
    },
    {
      id: 'monsoon-momentum',
      title: 'Monsoon Momentum Fund',
      description: 'Capitalizes on India\'s rural consumption boom fueled by strong rainfall',
      category: 'Growth',
      return3M: 4.43,
      returnLabel: '3M',
      riskLevel: 'Medium',
      minInvestment: '₹1,000',
      expenseRatio: 0.68,
      icon: Zap,
      bgGradient: 'from-green-500/10 to-green-600/5',
      tags: ['Policy-Driven', 'Seasonal']
    },
    {
      id: 'tariff-resilient',
      title: 'Tariff-Resilient India',
      description: 'Focused on sectors resilient to global trade tensions, providing a safe haven',
      category: 'Stability',
      return3M: 0.78,
      returnLabel: '3M',
      riskLevel: 'Low',
      minInvestment: '₹1,000',
      expenseRatio: 0.72,
      icon: Shield,
      bgGradient: 'from-purple-500/10 to-purple-600/5',
      tags: ['Defensive', 'Global Shield']
    },
    {
      id: 'us-tariff-vulnerable',
      title: 'US Tariff Vulnerable',
      description: 'Strategic positioning for sectors affected by US trade policies',
      category: 'Global',
      return3M: 5.79,
      returnLabel: '3M',
      riskLevel: 'High',
      minInvestment: '₹1,000',
      expenseRatio: 0.85,
      icon: Globe,
      bgGradient: 'from-orange-500/10 to-orange-600/5',
      tags: ['Expert', 'International']
    },
    {
      id: 'india-uk-trade',
      title: 'India-UK Trade Winners',
      description: 'Benefits from expanding India-UK trade relationships and agreements',
      category: 'Global',
      return3M: 2.98,
      returnLabel: '3M',
      riskLevel: 'Medium',
      minInvestment: '₹1,000',
      expenseRatio: 0.78,
      icon: Crown,
      bgGradient: 'from-indigo-500/10 to-indigo-600/5',
      tags: ['Trade Focus', 'Bilateral']
    },
    {
      id: 'cost-cutters',
      title: 'Cost Cutters',
      description: 'Low-cost index funds with minimal expense ratios for maximum returns',
      category: 'Stability',
      return3M: 11.61,
      returnLabel: '3M',
      riskLevel: 'Low',
      minInvestment: '₹500',
      expenseRatio: 0.15,
      icon: DollarSign,
      bgGradient: 'from-green-500/10 to-green-600/5',
      featured: true,
      tags: ['Basic', 'Low Cost']
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      case 'High': return 'bg-red-500/10 text-red-600 border-red-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Growth': return 'bg-blue-500/10 text-blue-600';
      case 'Stability': return 'bg-green-500/10 text-green-600';
      case 'Innovation': return 'bg-purple-500/10 text-purple-600';
      case 'Global': return 'bg-orange-500/10 text-orange-600';
      default: return 'bg-gray-500/10 text-gray-600';
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <BarChart3 className="w-4 h-4 mr-2" />
            AI-Curated Themes
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Investment Themes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover funds by investment style and strategy. Our AI analyzes market trends to surface the most relevant opportunities.
          </p>
        </div>

        {/* Themes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {themes.map((theme) => (
            <Card 
              key={theme.id} 
              className={`
                relative overflow-hidden border-border/50 hover:border-primary/20 
                transition-all duration-300 hover:shadow-lg group cursor-pointer
                ${theme.featured ? 'ring-2 ring-primary/20' : ''}
              `}
              onClick={() => onExploreTheme(theme.id)}
            >
              {theme.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient} opacity-50`}></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-card rounded-xl border border-border/50">
                        <theme.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                          {theme.title}
                        </h3>
                        <Badge variant="outline" className={getCategoryColor(theme.category)}>
                          {theme.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-green-600 font-bold">
                          +{theme.return3M}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{theme.returnLabel}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {theme.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {theme.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
                    <div>
                      <p className="text-muted-foreground">Risk Level</p>
                      <Badge variant="outline" className={`${getRiskColor(theme.riskLevel)} text-xs`}>
                        {theme.riskLevel}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Min. Investment</p>
                      <p className="font-semibold">{theme.minInvestment}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expense Ratio</p>
                      <p className="font-semibold">{theme.expenseRatio}%</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      onExploreTheme(theme.id);
                    }}
                  >
                    Explore
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-muted/30 rounded-2xl p-8 border border-border/50">
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Don't See Your Style?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our AI can create personalized fund recommendations based on your specific goals, risk tolerance, and investment timeline.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90">
              <Target className="w-5 h-5 mr-2" />
              Get Personalized Recommendations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundThemes;