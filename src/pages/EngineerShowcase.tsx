import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EngineerProfile from '@/components/engineer/EngineerProfile';
import ContestShowcase from '@/components/engineer/ContestShowcase';
import UserAlgorithmShowcase from '@/components/engineer/UserAlgorithmShowcase';

const mockEngineer = {
  id: '1',
  name: 'Arjun Mehta',
  avatar: '/api/placeholder/150/150',
  title: 'Senior ML Engineer',
  company: 'Paytm Money',
  reputation: 4.8,
  totalContributions: 47,
  algorithmsCreated: 12,
  contestsWon: 8,
  totalVotes: 2340,
  totalLikes: 1876,
  specialties: ['Machine Learning', 'Quantitative Finance', 'Risk Modeling', 'NLP'],
  recentWork: [
    {
      title: 'ESG Momentum Theme Generator',
      type: 'algorithm' as const,
      votes: 342,
      likes: 187,
      performance: '+23.4% YTD returns'
    },
    {
      title: 'Sector Rotation Strategy',
      type: 'algorithm' as const,
      votes: 256,
      likes: 134,
      performance: '+18.9% annual returns'
    },
    {
      title: 'Risk-Adjusted Portfolio Optimizer',
      type: 'analysis' as const,
      votes: 189,
      likes: 98
    },
    {
      title: 'Smart MF Theme: Tech Innovation',
      type: 'theme' as const,
      votes: 423,
      likes: 267,
      performance: '+31.2% since launch'
    }
  ],
  achievements: [
    {
      title: 'Algorithm Virtuoso',
      description: 'Created 10+ algorithms with 85%+ accuracy',
      icon: '🏆',
      rarity: 'legendary' as const
    },
    {
      title: 'Community Champion',
      description: 'Top 1% contributor this quarter',
      icon: '⭐',
      rarity: 'rare' as const
    },
    {
      title: 'Innovation Pioneer',
      description: 'First to implement ESG momentum tracking',
      icon: '🚀',
      rarity: 'rare' as const
    },
    {
      title: 'Consistent Performer',
      description: 'Maintained 80%+ accuracy for 6 months',
      icon: '📈',
      rarity: 'common' as const
    }
  ]
};

const EngineerShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">Engineer Profile</TabsTrigger>
            <TabsTrigger value="contests">Active Contests</TabsTrigger>
            <TabsTrigger value="algorithms">Community Algorithms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <EngineerProfile engineer={mockEngineer} />
          </TabsContent>
          
          <TabsContent value="contests" className="space-y-6">
            <ContestShowcase />
          </TabsContent>
          
          <TabsContent value="algorithms" className="space-y-6">
            <UserAlgorithmShowcase />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EngineerShowcase;