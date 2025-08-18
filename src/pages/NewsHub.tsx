import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Bookmark, Share2, Clock, TrendingUp, Eye } from 'lucide-react';
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

  const categories = [
    { name: 'FINANCE', color: 'hsl(var(--finance-accent))' },
    { name: 'TECHNOLOGY', color: 'hsl(var(--tech-accent))' },
    { name: 'POLITICS', color: 'hsl(var(--politics-accent))' },
    { name: 'SPORTS', color: 'hsl(var(--sports-accent))' },
    { name: 'ENTERTAINMENT', color: 'hsl(var(--entertainment-accent))' }
  ];

  const getFeaturedStory = (categoryData: NewsItem[]) => {
    return categoryData?.[0];
  };

  const getRegularStories = (categoryData: NewsItem[]) => {
    return categoryData?.slice(1) || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--news-hero-bg))] via-background to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[hsl(var(--news-gradient-start))] to-[hsl(var(--news-gradient-end))]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
              News <span className="text-accent">Hub</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80 animate-fade-in-up [animation-delay:200ms]">
              Discover stories that shape the world
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
        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-12 h-14 bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg">
            {categories.map((category) => (
              <TabsTrigger
                key={category.name}
                value={category.name}
                className="text-sm font-medium relative overflow-hidden data-[state=active]:text-white"
                style={{
                  '--category-color': category.color
                } as React.CSSProperties}
              >
                <span className="relative z-10">{category.name}</span>
                <div 
                  className="absolute inset-0 opacity-0 data-[state=active]:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: category.color }}
                />
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => {
            const categoryData = mockNewsData[category.name];
            const featuredStory = getFeaturedStory(categoryData);
            const regularStories = getRegularStories(categoryData);

            return (
              <TabsContent key={category.name} value={category.name} className="space-y-8 animate-fade-in-up">
                {featuredStory && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
                      <div 
                        className="w-1 h-8 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      Featured Story
                    </h2>
                    
                    {/* Featured Story Card */}
                    <Card 
                      className="group cursor-pointer overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-card to-card/50 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2"
                      onClick={() => handleCardClick(featuredStory)}
                    >
                      <div className="md:flex">
                        <div className="md:w-1/2 relative overflow-hidden">
                          <img
                            src={featuredStory.image}
                            alt={featuredStory.title}
                            className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <Badge
                            className="absolute top-4 left-4 text-white border-0 font-semibold px-3 py-1"
                            style={{ backgroundColor: category.color }}
                          >
                            {featuredStory.category}
                          </Badge>
                        </div>
                        
                        <div className="md:w-1/2 p-8 flex flex-col justify-center">
                          <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-3">
                            {featuredStory.title}
                          </h3>
                          <p className="text-muted-foreground text-lg mb-6 line-clamp-4">
                            {featuredStory.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {formatDistanceToNow(featuredStory.published_at, { addSuffix: true })}
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`${likedItems.has(featuredStory.id) ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
                                onClick={(e) => handleLike(featuredStory.id, e)}
                              >
                                <Heart className={`w-5 h-5 ${likedItems.has(featuredStory.id) ? 'fill-current' : ''}`} />
                                <span className="ml-2 font-medium">
                                  {formatLikes(featuredStory.likes + (likedItems.has(featuredStory.id) ? 1 : 0))}
                                </span>
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`${savedItems.has(featuredStory.id) ? 'text-blue-500' : 'text-muted-foreground'} hover:text-blue-500`}
                                onClick={(e) => handleSave(featuredStory.id, e)}
                              >
                                <Bookmark className={`w-5 h-5 ${savedItems.has(featuredStory.id) ? 'fill-current' : ''}`} />
                                <span className="ml-2 font-medium">
                                  {formatLikes(featuredStory.saves + (savedItems.has(featuredStory.id) ? 1 : 0))}
                                </span>
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground"
                                onClick={(e) => handleShare(featuredStory, e)}
                              >
                                <Share2 className="w-5 h-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {regularStories.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
                      <div 
                        className="w-1 h-8 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      More Stories
                    </h2>
                    
                    {/* Masonry Grid */}
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                      {regularStories.map((item, index) => (
                        <Card
                          key={item.id}
                          className={`group cursor-pointer break-inside-avoid mb-6 overflow-hidden border border-border/50 bg-card hover:shadow-xl transition-all duration-300 hover:border-[var(--category-color)] animate-scale-in`}
                          style={{
                            '--category-color': category.color,
                            animationDelay: `${index * 100}ms`
                          } as React.CSSProperties}
                          onClick={() => handleCardClick(item)}
                        >
                          <div className="relative overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <Badge
                              variant="secondary"
                              className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground border-0"
                            >
                              {item.category}
                            </Badge>
                          </div>
                          
                          <CardHeader className="pb-3">
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-[var(--category-color)] transition-colors line-clamp-2 leading-tight">
                              {item.title}
                            </h3>
                          </CardHeader>
                          
                          <CardContent className="pt-0">
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
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
                                  className={`p-1 h-auto transition-colors ${likedItems.has(item.id) ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
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
                                  className={`p-1 h-auto transition-colors ${savedItems.has(item.id) ? 'text-blue-500' : 'text-muted-foreground hover:text-blue-500'}`}
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
                                  className="p-1 h-auto text-muted-foreground hover:text-foreground transition-colors"
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
                  </div>
                )}
                
                {(!categoryData || categoryData.length === 0) && (
                  <div className="text-center py-20">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                      <Eye className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No stories yet</h3>
                    <p className="text-muted-foreground">Check back soon for the latest {category.name.toLowerCase()} news.</p>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default NewsHub;