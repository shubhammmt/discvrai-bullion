
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Target, Users, TrendingUp, MessageCircle, BarChart3, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIStrategy = () => {
  const navigate = useNavigate();

  const currentPages = [
    {
      page: 'Index (Landing)',
      status: 'Needs Enhancement',
      changes: [
        'Add AI-first messaging',
        'Emphasize conversational discovery',
        'Update value proposition to highlight AI capabilities',
        'Add trust indicators for AI recommendations'
      ],
      priority: 'Medium'
    },
    {
      page: 'Feed',
      status: 'Major Overhaul',
      changes: [
        'Replace filter-first with AI-chat interface',
        'Add conversational result cards',
        'Implement profile enrichment prompts',
        'Add contextual reasoning for recommendations',
        'Integrate social proof ("similar users")',
        'Dynamic suggestion evolution'
      ],
      priority: 'High'
    },
    {
      page: 'Research Hub',
      status: 'Context Integration',
      changes: [
        'Add journey context from Feed',
        'Show "based on your recent searches"',
        'Integrate AI copilot for guidance',
        'Cross-product intelligent suggestions'
      ],
      priority: 'High'
    },
    {
      page: 'Stock Research',
      status: 'AI Enhancement',
      changes: [
        'Contextual AI copilot with Feed memory',
        'Journey-aware explanations',
        'Risk-aligned recommendations',
        'Smart transition messaging',
        'Conversion-focused CTAs'
      ],
      priority: 'High'
    },
    {
      page: 'Other Research Pages',
      status: 'Contextual Continuity',
      changes: [
        'Unified AI copilot experience',
        'Cross-page memory integration',
        'Consistent explanation framework',
        'Smart product connections'
      ],
      priority: 'Medium'
    }
  ];

  const aiModels = [
    {
      category: 'Core Intelligence',
      models: [
        'Large Language Model (GPT-4/Claude) - Conversational interface',
        'Financial Data Analysis - Market insights',
        'Risk Profiling - Behavioral analysis',
        'Recommendation Engine - Hybrid filtering'
      ]
    },
    {
      category: 'Advanced Analytics',
      models: [
        'Natural Language Query Parser - English to investment criteria',
        'Explanation Generation - Why/how reasoning',
        'Similar User Clustering - Behavioral patterns',
        'Market Regime Detection - Bull/bear identification'
      ]
    },
    {
      category: 'Real-time Intelligence',
      models: [
        'News Impact Analyzer - Event-driven insights',
        'Social Proof Engine - User behavior aggregation',
        'Dynamic Rebalancing - Portfolio optimization',
        'Fraud Detection - Risk identification'
      ]
    }
  ];

  const implementationPhases = [
    {
      phase: 'Phase 1: AI-First Feed',
      timeline: '2-3 weeks',
      scope: [
        'Conversational search interface',
        'AI reasoning cards',
        'Profile enrichment system',
        'Basic contextual memory'
      ]
    },
    {
      phase: 'Phase 2: Cross-Page Continuity',
      timeline: '3-4 weeks',
      scope: [
        'Unified AI context store',
        'Journey-aware recommendations',
        'Cross-page memory integration',
        'Smart transition messaging'
      ]
    },
    {
      phase: 'Phase 3: Advanced AI Models',
      timeline: '4-6 weeks',
      scope: [
        'Specialized model integration',
        'Real-time personalization',
        'Predictive recommendations',
        'Social intelligence features'
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
      feature: 'Persistent AI Memory',
      description: 'Context flows across all platform pages',
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
      feature: 'Social Intelligence',
      description: 'Leverage similar user patterns and behaviors',
      icon: Users,
      moat: 'Network effects in recommendation quality'
    }
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
                AI-First Platform Strategy
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive documentation and implementation roadmap
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
            <CardTitle className="text-2xl text-center">Vision Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-center text-gray-700 italic">
              "Transform investment discovery from filter-based search to conversational intelligence, 
              where AI acts as a persistent financial advisor understanding user context, goals, and behavioral patterns."
            </p>
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
                      'bg-green-100 text-green-700'
                    }`}>
                      {page.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Status: {page.status}</p>
                  <div>
                    <h4 className="font-medium mb-2">Required Changes:</h4>
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

        {/* AI Models Stack */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              AI Models Stack for Competitive Moat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
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

        {/* Key Differentiators */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Competitive Differentiators & Moats
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

        {/* Implementation Phases */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Implementation Roadmap
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

        {/* User Journey Flow */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ideal User Journey Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4 text-center">
              {[
                'Landing → AI Query',
                'Contextualized Results',
                'Research Deep-dive',
                'Decision Support',
                'Portfolio Action'
              ].map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
                    {step}
                  </div>
                  {index < 4 && <div className="mx-2 text-gray-400">→</div>}
                </div>
              ))}
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
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span>Start with Feed page AI-first transformation</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span>Implement contextual AI copilot across research pages</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span>Build unified context store for cross-page memory</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIStrategy;
