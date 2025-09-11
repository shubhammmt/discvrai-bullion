import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Search, 
  Eye, 
  Users, 
  FileText, 
  BarChart3,
  ArrowRight,
  Bot,
  Target,
  TrendingUp
} from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Quick Setup',
      description: 'Just basic info to get started - no lengthy forms or personal financial details required.',
      icon: User,
      color: 'bg-blue-500/10 text-blue-600',
      features: ['Basic profile only', 'No risk assessment', 'Skip the boring stuff']
    },
    {
      id: 2,
      title: 'Research & Discovery',
      description: 'Use our AI-powered tools and community insights to discover and analyze mutual funds.',
      icon: Search,
      color: 'bg-purple-500/10 text-purple-600',
      features: ['AI screening', 'Filter-based search', 'Community insights', 'Entry point analysis']
    },
    {
      id: 3,
      title: 'Detailed Analysis',
      description: 'Access comprehensive fund details, analytics, and community perspectives for informed decisions.',
      icon: Eye,
      color: 'bg-green-500/10 text-green-600',
      features: ['Fund details', 'Entry point analysis', 'Tools & metrics', 'Performance data']
    },
    {
      id: 4,
      title: 'Community Engagement',
      description: 'Share insights, participate in discussions, and learn from AI-human collaborative research.',
      icon: Users,
      color: 'bg-orange-500/10 text-orange-600',
      features: ['Share POV', 'AI-Human insights', 'Discussion forums', 'Learning community']
    },
    {
      id: 5,
      title: 'Publish Research',
      description: 'Create and share your own research findings with the community to help others learn.',
      icon: FileText,
      color: 'bg-red-500/10 text-red-600',
      features: ['Research creation', 'Community sharing', 'Peer review', 'Knowledge building']
    },
    {
      id: 6,
      title: 'Portfolio Tracking',
      description: 'Analyze your virtual portfolio with advanced tools and track performance over time.',
      icon: BarChart3,
      color: 'bg-indigo-500/10 text-indigo-600',
      features: ['Virtual portfolio', 'Performance tracking', 'Analytics dashboard', 'Progress monitoring']
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Target className="w-4 h-4 mr-2" />
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Journey to Smart Investing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Simple steps to start your investment journey - no complicated forms or personal details needed upfront
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card 
                key={step.id}
                className="relative border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
              >
                <CardContent className="p-6">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {step.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Arrow for flow indication (except last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-muted-foreground/50" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-border/50">
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Investment Journey?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of investors using our AI-powered platform for smarter mutual fund research and community-driven insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;