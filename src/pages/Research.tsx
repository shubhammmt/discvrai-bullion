
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Building, CreditCard, Shield, Zap, Banknote, Layers, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Research = () => {
  const navigate = useNavigate();

  const researchCategories = [
    {
      id: 'stocks',
      title: 'Stocks',
      description: 'Research individual stocks with AI-powered insights',
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      popular: ['AAPL', 'MSFT', 'GOOGL', 'TSLA'],
      route: '/feed?filter=stocks'
    },
    {
      id: 'mutual-funds',
      title: 'Mutual Funds',
      description: 'Diversified investment options with expert management',
      icon: Building,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      popular: ['HDFC Top 100', 'SBI Bluechip', 'ICICI Prudential'],
      route: '/feed?filter=mutual-funds'
    },
    {
      id: 'ipo',
      title: 'IPOs',
      description: 'New listing opportunities and detailed IPO analysis',
      icon: Zap,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      popular: ['TechCorp IPO', 'GreenEnergy IPO', 'FinTech IPO'],
      route: '/feed?filter=ipo'
    },
    {
      id: 'smallcase',
      title: 'Smallcase',
      description: 'Thematic portfolios for smart investing',
      icon: Layers,
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
      popular: ['Electric Mobility', 'Digital India', 'Clean Energy'],
      route: '/feed?filter=smallcase'
    },
    {
      id: 'credit',
      title: 'Credit Products',
      description: 'Micro loans, credit cards, and financial services',
      icon: Banknote,
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
      popular: ['Personal Loan', 'Business Loan', 'Gold Loan'],
      route: '/feed?filter=credit'
    },
    {
      id: 'credit-cards',
      title: 'Credit Cards',
      description: 'Compare and choose the best credit cards',
      icon: CreditCard,
      color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
      popular: ['HDFC Regalia', 'SBI Prime', 'ICICI Amazon'],
      route: '/feed?filter=credit-cards'
    },
    {
      id: 'insurance',
      title: 'Insurance',
      description: 'Protect your investments and secure your future',
      icon: Shield,
      color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
      popular: ['Term Life', 'Health Insurance', 'ULIP'],
      route: '/feed?filter=insurance'
    }
  ];

  const handleCategoryExplore = (category: any) => {
    navigate(category.route);
  };

  const handlePopularItemClick = (category: any, item: string) => {
    switch (category.id) {
      case 'stocks':
        navigate(`/research/stock/${item.toLowerCase()}`);
        break;
      case 'mutual-funds':
        const fundSlug = item.toLowerCase().replace(/\s+/g, '-');
        navigate(`/research/mutual-fund/${fundSlug}`);
        break;
      case 'ipo':
        const ipoSlug = item.toLowerCase().replace(/\s+/g, '-');
        navigate(`/research/ipo/${ipoSlug}`);
        break;
      case 'smallcase':
        const smallcaseSlug = item.toLowerCase().replace(/\s+/g, '-');
        navigate(`/research/smallcase/${smallcaseSlug}`);
        break;
      case 'credit':
        const creditSlug = item.toLowerCase().replace(/\s+/g, '-');
        navigate(`/research/credit/${creditSlug}`);
        break;
      case 'credit-cards':
        const cardSlug = item.toLowerCase().replace(/\s+/g, '-');
        navigate(`/research/credit-card/${cardSlug}`);
        break;
      case 'insurance':
        const insuranceSlug = item.toLowerCase().replace(/\s+/g, '-');
        navigate(`/research/insurance/${insuranceSlug}`);
        break;
      default:
        navigate('/feed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Research Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered research across all financial instruments
          </p>
        </div>

        {/* Research Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="hover:shadow-lg transition-shadow bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-xl dark:text-white">{category.title}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{category.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Popular Options:</p>
                      <div className="flex flex-wrap gap-2">
                        {category.popular.map((item, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handlePopularItemClick(category, item)}
                            className="text-xs"
                          >
                            {item}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleCategoryExplore(category)}
                    >
                      Explore {category.title}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Access */}
        <Card className="mt-8 bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
          <CardHeader>
            <CardTitle className="dark:text-white">Quick Research</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/research/stock/aapl')}
                className="justify-start"
              >
                <TrendingUp size={16} className="mr-2" />
                Apple Inc. (AAPL)
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/research/mutual-fund/hdfc-top-100')}
                className="justify-start"
              >
                <Building size={16} className="mr-2" />
                HDFC Top 100 Fund
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/research/smallcase/electric-mobility')}
                className="justify-start"
              >
                <Layers size={16} className="mr-2" />
                Electric Mobility Smallcase
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Research;
