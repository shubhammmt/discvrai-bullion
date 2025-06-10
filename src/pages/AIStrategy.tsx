
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Target, Users, TrendingUp, MessageCircle, BarChart3, Shield, Zap, CreditCard, Building, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIStrategy = () => {
  const navigate = useNavigate();

  const currentPages = [
    {
      page: 'Index (Landing)',
      status: 'Needs Enhancement',
      changes: [
        'Add AI-first messaging with DiscvrAI branding',
        'Emphasize conversational discovery',
        'Update value proposition to highlight AI capabilities',
        'Add trust indicators for AI recommendations'
      ],
      priority: 'Medium'
    },
    {
      page: 'Feed (Phase 1 - Current)',
      status: 'Enhanced',
      changes: [
        '✅ AI-chat interface with DiscvrAI branding',
        '✅ Conversational result cards with reasoning',
        '✅ Profile enrichment prompts',
        '✅ Added bonds, FDs, and debt instruments',
        '✅ Simplified first viewport CTAs',
        '✅ Enhanced desktop sidebar'
      ],
      priority: 'Complete'
    },
    {
      page: 'Feed (Phase 2 - Existing User)',
      status: 'Needs Creation',
      changes: [
        'Create /dashboard or /feed/dashboard route',
        'Personal portfolio overview cards',
        'Payment reminders (EMI, CC bills)',
        'Bank account integration interface',
        'Portfolio upload functionality',
        'Smart rebalancing suggestions',
        'Goal-based tracking'
      ],
      priority: 'High'
    },
    {
      page: 'Research Hub',
      status: 'Context Integration',
      changes: [
        'Add journey context from Feed',
        'Show "based on your recent searches"',
        'Integrate DiscvrAI copilot for guidance',
        'Cross-product intelligent suggestions'
      ],
      priority: 'High'
    },
    {
      page: 'Stock Research',
      status: 'AI Enhancement',
      changes: [
        'Contextual DiscvrAI copilot with Feed memory',
        'Journey-aware explanations',
        'Risk-aligned recommendations',
        'Smart transition messaging',
        'Conversion-focused CTAs'
      ],
      priority: 'High'
    }
  ];

  const integrationFeatures = [
    {
      category: 'Bank Account Integration',
      features: [
        'Connect multiple bank accounts via API',
        'Real-time balance and transaction tracking',
        'Automated expense categorization',
        'Cash flow analysis and projections',
        'Smart savings recommendations'
      ]
    },
    {
      category: 'Demat Account Integration',
      features: [
        'Portfolio sync from multiple brokers',
        'Real-time P&L tracking',
        'Consolidated holdings view',
        'Dividend and corporate action tracking',
        'Tax harvesting suggestions'
      ]
    },
    {
      category: 'Credit Management',
      features: [
        'Credit card bill reminders and tracking',
        'EMI payment schedules and alerts',
        'Credit utilization optimization',
        'Loan refinancing opportunities',
        'Credit score monitoring'
      ]
    },
    {
      category: 'Portfolio Management',
      features: [
        'Upload existing portfolios (CSV/PDF)',
        'Asset allocation analysis',
        'Rebalancing recommendations',
        'Risk assessment and alerts',
        'Goal-based portfolio tracking'
      ]
    }
  ];

  const aiModels = [
    {
      category: 'Core Intelligence',
      models: [
        'Large Language Model (GPT-4/Claude) - DiscvrAI conversational interface',
        'Financial Data Analysis - Market insights and portfolio analysis',
        'Risk Profiling - Behavioral analysis and risk assessment',
        'Recommendation Engine - Hybrid filtering across all asset classes'
      ]
    },
    {
      category: 'Financial Integration AI',
      models: [
        'Transaction Categorization - Automated expense classification',
        'Cash Flow Prediction - Income and expense forecasting',
        'Portfolio Optimization - Asset allocation and rebalancing',
        'Credit Risk Assessment - Loan and payment analysis'
      ]
    },
    {
      category: 'Advanced Analytics',
      models: [
        'Natural Language Query Parser - English to investment criteria',
        'Explanation Generation - Why/how reasoning for all recommendations',
        'Similar User Clustering - Behavioral patterns and peer analysis',
        'Market Regime Detection - Bull/bear identification across asset classes'
      ]
    },
    {
      category: 'Real-time Intelligence',
      models: [
        'News Impact Analyzer - Event-driven insights',
        'Payment Alert System - EMI and bill reminder intelligence',
        'Dynamic Rebalancing - Real-time portfolio optimization',
        'Fraud Detection - Transaction and investment risk identification'
      ]
    }
  ];

  const implementationPhases = [
    {
      phase: 'Phase 1: AI-First Feed (Completed)',
      timeline: 'Completed',
      scope: [
        '✅ DiscvrAI conversational interface',
        '✅ AI reasoning cards with explanations',
        '✅ Profile enrichment system',
        '✅ Expanded asset classes (bonds, FDs)',
        '✅ Simplified UI and desktop sidebar'
      ]
    },
    {
      phase: 'Phase 2: Existing User Dashboard',
      timeline: '2-3 weeks',
      scope: [
        'Create /dashboard route for existing users',
        'Bank account connection interface',
        'Portfolio upload and sync functionality',
        'Payment reminders and EMI tracking',
        'Personal financial overview cards'
      ]
    },
    {
      phase: 'Phase 3: Financial Integration',
      timeline: '4-6 weeks',
      scope: [
        'Live bank account API integration',
        'Demat account portfolio sync',
        'Credit card and loan management',
        'Automated transaction categorization',
        'Real-time portfolio tracking'
      ]
    },
    {
      phase: 'Phase 4: Advanced Intelligence',
      timeline: '6-8 weeks',
      scope: [
        'Predictive financial planning',
        'Goal-based investment tracking',
        'Smart rebalancing automation',
        'Cross-product recommendation engine',
        'Advanced risk management'
      ]
    }
  ];

  const differentiators = [
    {
      feature: 'Conversational Discovery',
      description: 'Natural language investment queries replace complex filters',
      icon: MessageCircle,
      moat: 'User behavior data + NLP expertise'
    },
    {
      feature: 'Holistic Financial View',
      description: 'Complete financial picture: bank accounts, investments, credit, loans',
      icon: Building,
      moat: 'Data aggregation network effects'
    },
    {
      feature: 'Persistent AI Memory',
      description: 'Context flows across all platform pages and financial data',
      icon: Brain,
      moat: 'Switching costs through personalized intelligence'
    },
    {
      feature: 'Explanation-First Approach',
      description: 'Every recommendation includes clear reasoning',
      icon: Target,
      moat: 'Trust through transparency'
    },
    {
      feature: 'Portfolio Integration',
      description: 'Upload and sync portfolios from multiple sources',
      icon: Upload,
      moat: 'Data lock-in and comprehensive tracking'
    },
    {
      feature: 'Payment Intelligence',
      description: 'Smart EMI, credit card, and bill management',
      icon: CreditCard,
      moat: 'Daily engagement through payment reminders'
    }
  ];

  const userJourneyNew = [
    'Landing → DiscvrAI Query',
    'Personalized Results',
    'Research Deep-dive',
    'Decision Support',
    'Account Integration',
    'Portfolio Action'
  ];

  const userJourneyExisting = [
    'Dashboard Login',
    'Portfolio Overview',
    'Payment Reminders',
    'DiscvrAI Suggestions',
    'Smart Rebalancing',
    'Goal Tracking'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DiscvrAI-First Platform Strategy
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive financial platform with AI-driven investment discovery and portfolio management
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-6"
          >
            ← Back to Home
          </Button>
        </div>

        {/* Vision Statement */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Enhanced Vision Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-center text-gray-700 italic mb-4">
              "Transform financial management from fragmented tools to unified intelligence, 
              where DiscvrAI acts as a persistent financial advisor understanding complete financial context - 
              from bank accounts and investments to credit and loan management."
            </p>
            <div className="text-center">
              <strong>Core Differentiator:</strong> Complete financial picture + AI-driven personalization
            </div>
          </CardContent>
        </Card>

        {/* Integration Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Financial Integration Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {integrationFeatures.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="font-semibold text-lg text-blue-600">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Pages Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Current Pages Analysis & Required Changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentPages.map((page, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold">{page.page}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      page.priority === 'High' ? 'bg-red-100 text-red-700' :
                      page.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      page.priority === 'Complete' ? 'bg-green-100 text-green-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {page.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Status: {page.status}</p>
                  <div>
                    <h4 className="font-medium mb-2">Changes:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {page.changes.map((change, idx) => (
                        <li key={idx}>{change}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced AI Models Stack */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Enhanced AI Models Stack for Financial Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {aiModels.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="font-semibold text-lg text-blue-600">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.models.map((model, idx) => (
                      <li key={idx} className="text-sm text-gray-700 leading-relaxed">
                        {model}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Differentiators */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Enhanced Competitive Differentiators & Moats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {differentiators.map((diff, index) => {
                const IconComponent = diff.icon;
                return (
                  <div key={index} className="flex gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{diff.feature}</h3>
                      <p className="text-sm text-gray-700 mb-2">{diff.description}</p>
                      <p className="text-xs text-blue-600 font-medium">Moat: {diff.moat}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Implementation Phases */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Enhanced Implementation Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {implementationPhases.map((phase, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold">{phase.phase}</h3>
                    <span className="text-sm text-gray-600">{phase.timeline}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {phase.scope.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Journey Flows */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enhanced User Journey Flows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">New User Journey:</h3>
                <div className="flex flex-wrap items-center gap-4 text-center">
                  {userJourneyNew.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
                        {step}
                      </div>
                      {index < userJourneyNew.length - 1 && <div className="mx-2 text-gray-400">→</div>}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Existing User Journey:</h3>
                <div className="flex flex-wrap items-center gap-4 text-center">
                  {userJourneyExisting.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                        {step}
                      </div>
                      {index < userJourneyExisting.length - 1 && <div className="mx-2 text-gray-400">→</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Immediate Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                <span>Phase 1 completed: AI-first Feed with DiscvrAI branding and expanded assets</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span>Create existing user dashboard with portfolio integration and payment tracking</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span>Implement bank account and demat account integration APIs</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <span>Build comprehensive financial intelligence and automation features</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIStrategy;
