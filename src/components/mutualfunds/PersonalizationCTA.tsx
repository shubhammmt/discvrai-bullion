import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Target, 
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';

interface PersonalizationCTAProps {
  onStartAssessment: () => void;
}

const PersonalizationCTA = ({ onStartAssessment }: PersonalizationCTAProps) => {
  const assessmentSteps = [
    {
      step: 1,
      title: "Personal Profile",
      description: "Age, income, financial goals",
      icon: Users,
      duration: "2 min"
    },
    {
      step: 2,
      title: "Risk Assessment", 
      description: "Investment preferences and comfort",
      icon: Shield,
      duration: "3 min"
    },
    {
      step: 3,
      title: "AI Analysis",
      description: "Personalized fund recommendations",
      icon: Brain,
      duration: "Instant"
    }
  ];

  const benefits = [
    "Funds matched to your risk profile",
    "Goal-based investment strategy",
    "Optimal asset allocation mix",
    "Regular rebalancing alerts",
    "Performance tracking dashboard"
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Target className="w-4 h-4 mr-2" />
                Personalized Experience
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold">
                Get Your Perfect 
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                  Investment Match
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Take our 5-minute AI-powered assessment to receive personalized mutual fund recommendations tailored specifically to your financial goals and risk profile.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-1 bg-green-500/10 rounded-full">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={onStartAssessment}
              >
                <Target className="w-5 h-5 mr-2" />
                Start Free Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                No registration required • Results in 5 minutes
              </p>
            </div>

            {/* Trust Indicator */}
            <div className="flex items-center gap-6 pt-6 border-t border-border/50">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">22% Avg. Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">50K+ Assessments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">98% Accuracy</span>
              </div>
            </div>
          </div>

          {/* Right Column - Assessment Steps */}
          <div className="space-y-6">
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="p-4 bg-primary/10 rounded-full inline-flex mb-4">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">How It Works</h3>
                  <p className="text-muted-foreground">Simple 3-step process to your perfect portfolio</p>
                </div>

                <div className="space-y-6">
                  {assessmentSteps.map((step, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-4">
                        {/* Step Number */}
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                            {step.step}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{step.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {step.duration}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        
                        {/* Icon */}
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <step.icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      
                      {/* Connector Line */}
                      {index < assessmentSteps.length - 1 && (
                        <div className="absolute left-5 top-10 w-px h-6 bg-border"></div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Join thousands who've found their perfect investment match
                    </p>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-accent"
                      onClick={onStartAssessment}
                    >
                      Begin Assessment Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizationCTA;