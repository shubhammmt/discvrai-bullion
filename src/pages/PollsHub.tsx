import { useState } from 'react';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import GlobalFooter from '@/components/GlobalFooter';
import { PollCard } from '@/components/engagement/PollCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Zap, TrendingUp, Clock, Calendar } from 'lucide-react';
import { newsCategories } from '@/data/newsCategories';
import { mockPolls } from '@/data/mockEngagementData';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';

export const PollsHub = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'trending' | 'recent'>('trending');

  const filteredPolls = mockPolls.filter(poll => {
    const matchesCategory = activeCategory === 'all' || poll.category.toLowerCase() === activeCategory;
    const matchesSearch = poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         poll.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedPolls = [...filteredPolls].sort((a, b) => {
    if (sortBy === 'trending') {
      return b.totalVotes - a.totalVotes;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Financial Polls - Vote & Share Your Opinion | DISCVR"
        description="Participate in financial polls on stocks, IPOs, crypto, and market trends. Vote, see live results, and earn points. Join the DISCVR community."
        keywords={['financial polls', 'market polls', 'stock market opinion', 'investment polls', 'crypto polls', 'IPO predictions']}
      />

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Polls' }
        ]}
      />

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Financial Polls
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vote on market trends, share your predictions, and see what the community thinks
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-semibold">{mockPolls.reduce((acc, p) => acc + p.totalVotes, 0).toLocaleString()} votes</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-secondary" />
                <span className="font-semibold">Earn +5 points per vote</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search polls..."
              className="pl-12 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Button
                variant={activeCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveCategory('all')}
                size="sm"
              >
                All Polls
              </Button>
              {newsCategories.map((category) => (
                <Button
                  key={category.slug}
                  variant={activeCategory === category.slug ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(category.slug)}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as 'trending' | 'recent')} className="w-auto">
              <TabsList>
                <TabsTrigger value="trending" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="recent" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Polls Grid */}
      <main className="container mx-auto max-w-7xl px-4 py-8">
        {sortedPolls.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPolls.map((poll) => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Zap className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No polls found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
          </div>
        )}
      </main>

      <GlobalFooter />
      <MobileBottomNav />
    </div>
  );
};
