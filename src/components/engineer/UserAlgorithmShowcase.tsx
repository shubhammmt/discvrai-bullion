import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp, Star, Users, Eye, ThumbsUp, Code2 } from 'lucide-react';

interface UserAlgorithm {
  id: string;
  name: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
    title: string;
    company: string;
  };
  performance: {
    returns: string;
    accuracy: string;
    users: number;
  };
  stats: {
    views: number;
    likes: number;
    forks: number;
    rating: number;
  };
  tags: string[];
  lastUpdated: string;
  isLive: boolean;
}

const algorithms: UserAlgorithm[] = [
  {
    id: '1',
    name: 'ESG Momentum Theme',
    description: 'Identifies high-growth ESG stocks using sustainability scores and momentum indicators. Perfect for conscious investors.',
    creator: {
      name: 'Priya Sharma',
      avatar: '/api/placeholder/40/40',
      title: 'Quant Developer',
      company: 'Goldman Sachs'
    },
    performance: {
      returns: '+23.4%',
      accuracy: '87%',
      users: 1250
    },
    stats: {
      views: 15420,
      likes: 892,
      forks: 127,
      rating: 4.8
    },
    tags: ['ESG', 'Momentum', 'Sustainable Investing'],
    lastUpdated: '2 days ago',
    isLive: true
  },
  {
    id: '2',
    name: 'Value Hunter Pro',
    description: 'Advanced value screening algorithm that finds undervalued gems using multiple financial ratios and market inefficiencies.',
    creator: {
      name: 'Raj Patel',
      avatar: '/api/placeholder/40/40',
      title: 'Senior Engineer',
      company: 'Zerodha'
    },
    performance: {
      returns: '+31.7%',
      accuracy: '91%',
      users: 2340
    },
    stats: {
      views: 28750,
      likes: 1456,
      forks: 203,
      rating: 4.9
    },
    tags: ['Value Investing', 'Fundamental Analysis', 'Long-term'],
    lastUpdated: '1 week ago',
    isLive: true
  },
  {
    id: '3',
    name: 'Sector Rotation Master',
    description: 'AI-driven sector rotation strategy that adapts to economic cycles and market conditions for optimal allocation.',
    creator: {
      name: 'Arjun Kumar',
      avatar: '/api/placeholder/40/40',
      title: 'ML Engineer',
      company: 'Paytm Money'
    },
    performance: {
      returns: '+18.9%',
      accuracy: '84%',
      users: 875
    },
    stats: {
      views: 12300,
      likes: 634,
      forks: 89,
      rating: 4.6
    },
    tags: ['Sector Rotation', 'Economic Cycles', 'Adaptive'],
    lastUpdated: '3 days ago',
    isLive: true
  }
];

const UserAlgorithmShowcase: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Community-Powered Algorithms</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Investment strategies created by our engineering community
        </p>
        <Badge className="text-lg px-4 py-2">
          <Users className="w-4 h-4 mr-2" />
          500+ Engineers Contributing
        </Badge>
      </div>

      <div className="space-y-6">
        {algorithms.map((algorithm) => (
          <Card key={algorithm.id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{algorithm.name}</CardTitle>
                    {algorithm.isLive && (
                      <Badge className="bg-green-500">
                        <div className="w-2 h-2 bg-white rounded-full mr-2" />
                        Live
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-lg">{algorithm.description}</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  View Code
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Creator Info */}
              <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={algorithm.creator.avatar} alt={algorithm.creator.name} />
                  <AvatarFallback>{algorithm.creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{algorithm.creator.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {algorithm.creator.title} at {algorithm.creator.company}
                  </p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{algorithm.performance.returns}</div>
                  <div className="text-sm text-muted-foreground">1Y Returns</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{algorithm.performance.accuracy}</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{algorithm.performance.users.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {algorithm.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>

              {/* Stats and Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {algorithm.stats.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {algorithm.stats.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {algorithm.stats.rating}
                  </span>
                  <span>Updated {algorithm.lastUpdated}</span>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    Fork Algorithm
                  </Button>
                  <Button className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Use in Portfolio
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardContent className="p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Create Your Own Algorithm</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Join our community and build the next generation of investment strategies
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="text-lg px-8">
              Start Building
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              View All Algorithms
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAlgorithmShowcase;