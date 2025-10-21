import { useState } from 'react';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import GlobalFooter from '@/components/GlobalFooter';
import { ArticleCard } from '@/components/news/ArticleCard';
import { EnhancedByteNewsCard } from '@/components/news/EnhancedByteNewsCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Newspaper, Zap, TrendingUp } from 'lucide-react';
import { newsCategories } from '@/data/newsCategories';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import { mockNewsArticles, mockByteNews } from '@/data/mockNewsData';
import { mockPolls, mockQuizzes } from '@/data/mockEngagementData';
import { PollCard } from '@/components/engagement/PollCard';
import { QuizCard } from '@/components/engagement/QuizCard';
import { CategoryEngagementFilter } from '@/components/engagement/CategoryEngagementFilter';

export const NewsHubPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = mockNewsArticles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category.toLowerCase() === activeCategory;
    const matchesSearch = article.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredByteNews = mockByteNews.filter(news => {
    const matchesCategory = activeCategory === 'all' || news.category.toLowerCase() === activeCategory;
    return matchesCategory;
  });

  const featuredArticle = mockNewsArticles.find(a => a.featured);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Financial News & Market Updates"
        description="Stay updated with the latest news on stocks, IPOs, mutual funds, crypto, and financial markets. Expert analysis and breaking news from DISCVR."
        keywords={['financial news', 'stock market news', 'IPO news', 'crypto news', 'mutual funds', 'market updates']}
      />

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'News' }
        ]}
      />

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Financial News Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your trusted source for financial news, market analysis, and investment insights
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search news articles..."
              className="pl-12 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b bg-card">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('all')}
              className="whitespace-nowrap"
            >
              All News
            </Button>
            {newsCategories.map((category) => (
              <Button
                key={category.slug}
                variant={activeCategory === category.slug ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.slug)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <Tabs defaultValue="articles" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              Full Articles
            </TabsTrigger>
            <TabsTrigger value="bytes" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Byte News
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-8">
            {/* Featured Article */}
            {featuredArticle && activeCategory === 'all' && !searchQuery && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Featured Story
                </h2>
                <ArticleCard article={featuredArticle} featured />
              </div>
            )}

            {/* Articles Grid with Polls & Quizzes */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {activeCategory === 'all' ? 'Latest Articles' : `${newsCategories.find(c => c.slug === activeCategory)?.name} News`}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => {
                  const components = [];
                  
                  // Add article
                  components.push(
                    <ArticleCard key={article.id} article={article} />
                  );
                  
                  // Add poll after every 2 articles
                  if ((index + 1) % 2 === 0 && mockPolls[Math.floor(index / 2) % mockPolls.length]) {
                    const poll = mockPolls[Math.floor(index / 2) % mockPolls.length];
                    components.push(
                      <div key={`poll-${index}`} className="md:col-span-2 lg:col-span-1">
                        <PollCard poll={poll} compact />
                      </div>
                    );
                  }
                  
                  // Add quiz after every 4 articles
                  if ((index + 1) % 4 === 0 && mockQuizzes[Math.floor(index / 4) % mockQuizzes.length]) {
                    const quiz = mockQuizzes[Math.floor(index / 4) % mockQuizzes.length];
                    components.push(
                      <div key={`quiz-${index}`} className="md:col-span-2 lg:col-span-1">
                        <QuizCard quiz={quiz} compact />
                      </div>
                    );
                  }
                  
                  return components;
                })}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found matching your criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="bytes" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Byte-Sized News Updates
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredByteNews.map((news, index) => {
                  const components = [];
                  
                  // Add byte news
                  components.push(
                    <EnhancedByteNewsCard key={news.id} news={news} type="news" />
                  );
                  
                  // Add poll after every 3 byte news
                  if ((index + 1) % 3 === 0 && mockPolls[Math.floor(index / 3) % mockPolls.length]) {
                    const poll = mockPolls[Math.floor(index / 3) % mockPolls.length];
                    components.push(
                      <EnhancedByteNewsCard 
                        key={`poll-byte-${index}`}
                        poll={poll}
                        type="poll"
                      />
                    );
                  }

                  // Add quiz after every 6 byte news
                  if ((index + 1) % 6 === 0 && mockQuizzes[Math.floor(index / 6) % mockQuizzes.length]) {
                    const quiz = mockQuizzes[Math.floor(index / 6) % mockQuizzes.length];
                    components.push(
                      <EnhancedByteNewsCard 
                        key={`quiz-byte-${index}`}
                        quiz={quiz}
                        type="quiz"
                      />
                    );
                  }
                  
                  return components;
                })}
              </div>

              {filteredByteNews.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No byte news found for this category.</p>
                </div>
              )}
            </div>

            {/* Category-specific engagement section */}
            {activeCategory !== 'all' && (
              <CategoryEngagementFilter category={activeCategory} />
            )}
          </TabsContent>
        </Tabs>
      </main>

      <GlobalFooter />
      <MobileBottomNav />
    </div>
  );
};
