import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Bookmark, Share2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  published_at: Date;
  likes: number;
  saves: number;
  category: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

const mockNewsData: Record<string, NewsItem[]> = {
  FINANCE: [
    {
      id: '1',
      title: 'Global Markets Rally as Inflation Concerns Ease',
      description: 'Stock markets worldwide surge as central banks hint at slowing rate increases, providing relief to investors.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop',
      published_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 1247,
      saves: 892,
      category: 'FINANCE'
    },
    {
      id: '2',
      title: 'Cryptocurrency Market Shows Signs of Recovery',
      description: 'Bitcoin and major altcoins gain momentum as institutional adoption continues to grow.',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&h=300&fit=crop',
      published_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 923,
      saves: 654,
      category: 'FINANCE'
    },
    {
      id: '3',
      title: 'Federal Reserve Announces New Economic Measures',
      description: 'The central bank introduces innovative policies to support economic growth while maintaining price stability.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&h=300&fit=crop',
      published_at: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 1567,
      saves: 1123,
      category: 'FINANCE'
    }
  ],
  TECHNOLOGY: [
    {
      id: '4',
      title: 'AI Revolution: New Breakthrough in Machine Learning',
      description: 'Researchers achieve unprecedented accuracy in natural language processing, marking a new era in AI development.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop',
      published_at: new Date(Date.now() - 1 * 60 * 60 * 1000),
      likes: 2134,
      saves: 1876,
      category: 'TECHNOLOGY'
    },
    {
      id: '5',
      title: 'Quantum Computing Makes Commercial Debut',
      description: 'First commercial quantum computer launches, promising to revolutionize complex problem-solving across industries.',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop',
      published_at: new Date(Date.now() - 3 * 60 * 60 * 1000),
      likes: 1789,
      saves: 1234,
      category: 'TECHNOLOGY'
    }
  ],
  POLITICS: [
    {
      id: '6',
      title: 'International Climate Summit Reaches Historic Agreement',
      description: 'World leaders unite on ambitious new climate targets, setting the stage for global environmental action.',
      image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=500&h=300&fit=crop',
      published_at: new Date(Date.now() - 5 * 60 * 60 * 1000),
      likes: 3456,
      saves: 2789,
      category: 'POLITICS'
    },
    {
      id: '7',
      title: 'New Trade Agreements Reshape Global Commerce',
      description: 'Bilateral trade deals between major economies promise to boost international business and economic cooperation.',
      image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=500&h=300&fit=crop',
      published_at: new Date(Date.now() - 8 * 60 * 60 * 1000),
      likes: 987,
      saves: 765,
      category: 'POLITICS'
    }
  ],
  SPORTS: [
    {
      id: '8',
      title: 'Championship Finals Set as Underdogs Advance',
      description: 'Surprising victories in semifinals create an unexpected but thrilling championship matchup for sports fans.',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&h=300&fit=crop',
      published_at: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      likes: 4567,
      saves: 3214,
      category: 'SPORTS'
    },
    {
      id: '9',
      title: 'Olympic Records Shattered in Swimming Events',
      description: 'Athletes break multiple world records in spectacular fashion, showcasing the evolution of competitive swimming.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop',
      published_at: new Date(Date.now() - 7 * 60 * 60 * 1000),
      likes: 2876,
      saves: 1987,
      category: 'SPORTS'
    }
  ],
  ENTERTAINMENT: [
    {
      id: '10',
      title: 'Blockbuster Film Breaks Opening Weekend Records',
      description: 'Latest superhero movie shatters box office expectations, proving the enduring appeal of the genre.',
      image: 'https://images.unsplash.com/photo-1489599904472-65fcce2e1ce4?w=500&h=300&fit=crop',
      published_at: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
      likes: 5432,
      saves: 4123,
      category: 'ENTERTAINMENT'
    },
    {
      id: '11',
      title: 'Music Festival Announces Star-Studded Lineup',
      description: 'Major artists confirm appearances at summer music festival, promising an unforgettable entertainment experience.',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
      published_at: new Date(Date.now() - 9 * 60 * 60 * 1000),
      likes: 3789,
      saves: 2654,
      category: 'ENTERTAINMENT'
    }
  ]
};

const NewsHub = () => {
  const [activeTab, setActiveTab] = useState('FINANCE');
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

  const handleLike = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedItems = new Set(likedItems);
    if (likedItems.has(itemId)) {
      newLikedItems.delete(itemId);
    } else {
      newLikedItems.add(itemId);
    }
    setLikedItems(newLikedItems);
  };

  const handleSave = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSavedItems = new Set(savedItems);
    if (savedItems.has(itemId)) {
      newSavedItems.delete(itemId);
    } else {
      newSavedItems.add(itemId);
    }
    setSavedItems(newSavedItems);
  };

  const handleShare = (item: NewsItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleCardClick = (item: NewsItem) => {
    console.log('Navigating to article:', item.id);
    // Add navigation logic here
  };

  const formatLikes = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const categories = ['FINANCE', 'TECHNOLOGY', 'POLITICS', 'SPORTS', 'ENTERTAINMENT'];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">News Hub</h1>
          <p className="text-muted-foreground text-lg">Stay updated with the latest news across all categories</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 h-12">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="text-xs sm:text-sm font-medium"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockNewsData[category]?.map((item) => (
                  <Card
                    key={item.id}
                    className="group cursor-pointer hover:shadow-lg transition-all duration-300 border border-border bg-card overflow-hidden"
                    onClick={() => handleCardClick(item)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge
                        variant="secondary"
                        className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm"
                      >
                        {item.category}
                      </Badge>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatDistanceToNow(item.published_at, { addSuffix: true })}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`p-1 h-auto ${likedItems.has(item.id) ? 'text-red-500' : 'text-muted-foreground'}`}
                            onClick={(e) => handleLike(item.id, e)}
                          >
                            <Heart className={`w-4 h-4 ${likedItems.has(item.id) ? 'fill-current' : ''}`} />
                            <span className="ml-1 text-xs">
                              {formatLikes(item.likes + (likedItems.has(item.id) ? 1 : 0))}
                            </span>
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`p-1 h-auto ${savedItems.has(item.id) ? 'text-blue-500' : 'text-muted-foreground'}`}
                            onClick={(e) => handleSave(item.id, e)}
                          >
                            <Bookmark className={`w-4 h-4 ${savedItems.has(item.id) ? 'fill-current' : ''}`} />
                            <span className="ml-1 text-xs">
                              {formatLikes(item.saves + (savedItems.has(item.id) ? 1 : 0))}
                            </span>
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto text-muted-foreground hover:text-foreground"
                            onClick={(e) => handleShare(item, e)}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {(!mockNewsData[category] || mockNewsData[category].length === 0) && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No news available for this category yet.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default NewsHub;