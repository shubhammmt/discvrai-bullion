
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Building, CreditCard, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Research = () => {
  const navigate = useNavigate();

  const researchCategories = [
    {
      id: 'stocks',
      title: 'Stocks',
      description: 'Research individual stocks with AI-powered insights',
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-600',
      popular: ['AAPL', 'MSFT', 'GOOGL', 'TSLA']
    },
    {
      id: 'mutual-funds',
      title: 'Mutual Funds',
      description: 'Diversified investment options with expert management',
      icon: Building,
      color: 'bg-green-100 text-green-600',
      popular: ['HDFC Top 100', 'SBI Bluechip', 'ICICI Prudential']
    },
    {
      id: 'credit',
      title: 'Credit Products',
      description: 'Micro loans, credit cards, and financial services',
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-600',
      popular: ['Personal Loan', 'Credit Cards', 'Business Loan']
    },
    {
      id: 'insurance',
      title: 'Insurance',
      description: 'Protect your investments and secure your future',
      icon: Shield,
      color: 'bg-orange-100 text-orange-600',
      popular: ['Term Life', 'Health Insurance', 'ULIP']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Research Center
          </h1>
          <p className="text-gray-600">
            AI-powered research across all financial instruments
          </p>
        </div>

        {/* Research Categories */}
        <div className="grid md:grid-cols-2 gap-6">
          {researchCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Popular Options:</p>
                      <div className="flex flex-wrap gap-2">
                        {category.popular.map((item, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (category.id === 'stocks') {
                                navigate(`/research/stock/${item.toLowerCase()}`);
                              }
                              // Add navigation for other categories later
                            }}
                            className="text-xs"
                          >
                            {item}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        if (category.id === 'stocks') {
                          navigate('/research/stock/aapl');
                        }
                        // Add navigation for other categories later
                      }}
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
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Research</CardTitle>
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
                onClick={() => navigate('/research/stock/tsla')}
                className="justify-start"
              >
                <TrendingUp size={16} className="mr-2" />
                Tesla Inc. (TSLA)
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/research/stock/msft')}
                className="justify-start"
              >
                <TrendingUp size={16} className="mr-2" />
                Microsoft Corp. (MSFT)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Research;
