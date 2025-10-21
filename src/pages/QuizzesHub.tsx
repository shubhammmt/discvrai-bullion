import { useState } from 'react';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import GlobalFooter from '@/components/GlobalFooter';
import { QuizCard } from '@/components/engagement/QuizCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Brain, TrendingUp, Clock, Award } from 'lucide-react';
import { newsCategories } from '@/data/newsCategories';
import { mockQuizzes } from '@/data/mockEngagementData';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';

export const QuizzesHub = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'recent'>('popular');

  const filteredQuizzes = mockQuizzes.filter(quiz => {
    const matchesCategory = activeCategory === 'all' || quiz.category.toLowerCase() === activeCategory;
    const matchesDifficulty = activeDifficulty === 'all' || quiz.difficulty === activeDifficulty;
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.completionCount - a.completionCount;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Financial Knowledge Quizzes - Test Your Expertise | DISCVR"
        description="Take financial quizzes on mutual funds, stocks, IPOs, and cryptocurrency. Learn while earning points and badges. Challenge yourself with DISCVR quizzes."
        keywords={['financial quiz', 'investment quiz', 'stock market quiz', 'mutual funds quiz', 'crypto quiz', 'financial knowledge test']}
      />

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Quizzes' }
        ]}
      />

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary/10 via-background to-accent/10 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="w-12 h-12 text-secondary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Financial Quizzes
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Test your financial knowledge, learn new concepts, and compete on the leaderboard
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-secondary" />
                <span className="font-semibold">{mockQuizzes.reduce((acc, q) => acc + q.completionCount, 0).toLocaleString()} completions</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <span className="font-semibold">Earn up to 75 points</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search quizzes..."
              className="pl-12 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto max-w-7xl px-4 py-4 space-y-3">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('all')}
              size="sm"
            >
              All Categories
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

          {/* Difficulty & Sort */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={activeDifficulty === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveDifficulty('all')}
                size="sm"
              >
                All Levels
              </Button>
              <Button
                variant={activeDifficulty === 'beginner' ? 'default' : 'outline'}
                onClick={() => setActiveDifficulty('beginner')}
                size="sm"
              >
                Beginner
              </Button>
              <Button
                variant={activeDifficulty === 'intermediate' ? 'default' : 'outline'}
                onClick={() => setActiveDifficulty('intermediate')}
                size="sm"
              >
                Intermediate
              </Button>
              <Button
                variant={activeDifficulty === 'expert' ? 'default' : 'outline'}
                onClick={() => setActiveDifficulty('expert')}
                size="sm"
              >
                Expert
              </Button>
            </div>

            <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as 'popular' | 'recent')} className="w-auto">
              <TabsList>
                <TabsTrigger value="popular" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Popular
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

      {/* Quizzes Grid */}
      <main className="container mx-auto max-w-7xl px-4 py-8">
        {sortedQuizzes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Brain className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No quizzes found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
          </div>
        )}
      </main>

      <GlobalFooter />
      <MobileBottomNav />
    </div>
  );
};
