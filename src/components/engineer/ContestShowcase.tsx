import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Code, Zap, Target, Brain, Rocket } from 'lucide-react';

interface Contest {
  id: string;
  title: string;
  description: string;
  type: 'algorithm' | 'analysis' | 'prediction' | 'optimization';
  difficulty: 'easy' | 'medium' | 'hard';
  reward: string;
  participants: number;
  timeLeft: string;
  examples: string[];
  techStack: string[];
}

const contests: Contest[] = [
  {
    id: '1',
    title: 'AI-Powered Portfolio Rebalancing',
    description: 'Create an algorithm that automatically rebalances portfolios based on market conditions and user risk profiles.',
    type: 'algorithm',
    difficulty: 'hard',
    reward: '₹50,000 + Feature Spotlight',
    participants: 23,
    timeLeft: '12 days',
    examples: ['Risk-adjusted returns', 'Dynamic allocation', 'Tax optimization'],
    techStack: ['Python', 'TensorFlow', 'Pandas', 'API Integration']
  },
  {
    id: '2',
    title: 'Mutual Fund Theme Generator',
    description: 'Build an AI system that creates investment themes by analyzing market trends and user preferences.',
    type: 'algorithm',
    difficulty: 'medium',
    reward: '₹25,000 + Algorithm Credit',
    participants: 45,
    timeLeft: '8 days',
    examples: ['ESG themes', 'Sectoral rotation', 'Momentum themes'],
    techStack: ['Machine Learning', 'NLP', 'React', 'Chart.js']
  },
  {
    id: '3',
    title: 'Smart Stock Screener',
    description: 'Develop an intelligent stock screening algorithm that finds opportunities based on fundamental and technical analysis.',
    type: 'analysis',
    difficulty: 'medium',
    reward: '₹30,000 + Public Recognition',
    participants: 38,
    timeLeft: '15 days',
    examples: ['Value picks', 'Growth momentum', 'Undervalued gems'],
    techStack: ['Python', 'Scikit-learn', 'APIs', 'Data Visualization']
  },
  {
    id: '4',
    title: 'Market Sentiment Predictor',
    description: 'Create an AI model that predicts market sentiment from news, social media, and economic indicators.',
    type: 'prediction',
    difficulty: 'hard',
    reward: '₹40,000 + Mentorship Program',
    participants: 19,
    timeLeft: '20 days',
    examples: ['News analysis', 'Social sentiment', 'Economic indicators'],
    techStack: ['NLP', 'Sentiment Analysis', 'Time Series', 'Deep Learning']
  }
];

const ContestShowcase: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'algorithm': return <Code className="w-5 h-5" />;
      case 'analysis': return <Target className="w-5 h-5" />;
      case 'prediction': return <Brain className="w-5 h-5" />;
      case 'optimization': return <Zap className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Engineer Contests</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Build AI-powered financial features and win exciting rewards
        </p>
        <div className="flex justify-center gap-4">
          <Button className="flex items-center gap-2">
            <Rocket className="w-4 h-4" />
            Join Community
          </Button>
          <Button variant="outline">
            View Leaderboard
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {contests.map((contest) => (
          <Card key={contest.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getIcon(contest.type)}
                  <CardTitle className="text-lg">{contest.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getDifficultyColor(contest.difficulty)}`} />
                  <span className="text-sm font-medium capitalize">{contest.difficulty}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{contest.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2">Example Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {contest.examples.map((example, index) => (
                      <Badge key={index} variant="secondary">{example}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {contest.techStack.map((tech, index) => (
                      <Badge key={index} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <div className="font-semibold text-primary">{contest.reward}</div>
                  <div className="text-sm text-muted-foreground">
                    {contest.participants} participants • {contest.timeLeft} left
                  </div>
                </div>
                <Button className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Join Contest
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">Ready to Build the Future of Finance?</h3>
          <p className="text-muted-foreground mb-4">
            Join 500+ engineers already contributing to our AI-powered platform
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Start Your First Contest</Button>
            <Button variant="outline" size="lg">View Documentation</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContestShowcase;