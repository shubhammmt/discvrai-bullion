import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Eye } from 'lucide-react';
import NewsFeedCard from '@/components/NewsFeedCard';

interface NewsItem {
  id: string;
  headline: string;
  publishedAt: Date;
  content: string;
  category: string;
}

const mockNewsData: Record<string, NewsItem[]> = {
  'Category 1': [
    {
      id: '1',
      headline: 'Global Markets Rally as Inflation Concerns Ease',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      content: 'Stock markets worldwide surge as central banks hint at slowing rate increases.\n\nThis development provides significant relief to investors who have been navigating uncertain economic conditions.\n\nAnalysts suggest this trend could continue through the quarter.',
      category: 'Category 1'
    },
    {
      id: '2',
      headline: 'Federal Reserve Announces New Economic Measures',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      content: 'The central bank introduces innovative policies to support economic growth.\n\nThese measures aim to maintain price stability while fostering business investment.\n\nMarket participants are closely watching implementation details.',
      category: 'Category 1'
    }
  ],
  'Category 2': [
    {
      id: '3',
      headline: 'AI Revolution: New Breakthrough in Machine Learning',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      content: 'Researchers achieve unprecedented accuracy in natural language processing.\n\nThis breakthrough marks a new era in AI development capabilities.\n\nCommercial applications are expected to emerge within months.',
      category: 'Category 2'
    },
    {
      id: '4',
      headline: 'Quantum Computing Makes Commercial Debut',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      content: 'First commercial quantum computer launches with revolutionary capabilities.\n\nThe system promises to solve complex problems across industries.\n\nEarly adopters report significant performance improvements.',
      category: 'Category 2'
    }
  ],
  'Category 3': [
    {
      id: '5',
      headline: 'International Climate Summit Reaches Historic Agreement',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      content: 'World leaders unite on ambitious new climate targets for the decade.\n\nThe agreement sets the stage for coordinated global environmental action.\n\nImplementation timelines are more aggressive than previous commitments.',
      category: 'Category 3'
    },
    {
      id: '6',
      headline: 'New Trade Agreements Reshape Global Commerce',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      content: 'Bilateral trade deals between major economies boost international business.\n\nThe agreements promise enhanced economic cooperation and reduced barriers.\n\nSMEs are expected to benefit significantly from new provisions.',
      category: 'Category 3'
    }
  ],
  'Category 4': [
    {
      id: '7',
      headline: 'Championship Finals Set as Underdogs Advance',
      publishedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      content: 'Surprising victories in semifinals create thrilling championship matchups.\n\nFans are energized by the unexpected turn of events.\n\nTicket demand has reached unprecedented levels for the finals.',
      category: 'Category 4'
    },
    {
      id: '8',
      headline: 'Olympic Records Shattered in Swimming Events',
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000),
      content: 'Athletes break multiple world records in spectacular fashion.\n\nThe performances showcase the evolution of competitive swimming.\n\nTraining methods and technology continue to push boundaries.',
      category: 'Category 4'
    }
  ],
  'Category 5': [
    {
      id: '9',
      headline: 'Blockbuster Film Breaks Opening Weekend Records',
      publishedAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
      content: 'Latest superhero movie shatters box office expectations worldwide.\n\nThe film proves the enduring appeal of the genre among audiences.\n\nSequels and spin-offs are already in development.',
      category: 'Category 5'
    },
    {
      id: '10',
      headline: 'Music Festival Announces Star-Studded Lineup',
      publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000),
      content: 'Major artists confirm appearances at the highly anticipated summer festival.\n\nThe lineup promises an unforgettable entertainment experience.\n\nTickets are selling faster than any previous year.',
      category: 'Category 5'
    }
  ]
};

const NewsHub = () => {
  const [activeCategory, setActiveCategory] = useState('Category 1');

  const categories = [
    { name: 'Category 1', color: 'hsl(var(--finance-accent))' },
    { name: 'Category 2', color: 'hsl(var(--tech-accent))' },
    { name: 'Category 3', color: 'hsl(var(--politics-accent))' },
    { name: 'Category 4', color: 'hsl(var(--sports-accent))' },
    { name: 'Category 5', color: 'hsl(var(--entertainment-accent))' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[hsl(var(--news-gradient-start))] to-[hsl(var(--news-gradient-end))]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
              News <span className="text-accent">Feed</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80 animate-fade-in-up [animation-delay:200ms]">
              Stay updated with the latest stories
            </p>
            <div className="flex items-center justify-center gap-4 text-white/60 animate-fade-in-up [animation-delay:400ms]">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>Trending Now</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>Live Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-8 relative z-20">
        {/* Filter Buttons */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={activeCategory === category.name ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap transition-all duration-300 ${
                activeCategory === category.name 
                  ? 'text-white shadow-lg' 
                  : 'hover:border-primary/50'
              }`}
              style={
                activeCategory === category.name 
                  ? { backgroundColor: category.color }
                  : {}
              }
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Horizontal Scrolling News Cards */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {mockNewsData[activeCategory]?.map((item) => {
              const currentCategory = categories.find(cat => cat.name === activeCategory);
              return (
                <NewsFeedCard
                  key={item.id}
                  item={item}
                  categoryColor={currentCategory?.color || 'hsl(var(--primary))'}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsHub;