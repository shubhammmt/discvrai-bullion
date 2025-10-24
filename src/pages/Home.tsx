import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import GlobalFooter from '@/components/GlobalFooter';
import { QuickPollWidget } from '@/components/engagement/QuickPollWidget';
import { TrendingPollResults } from '@/components/engagement/TrendingPollResults';
import NewsCarousel from '@/components/mutualfunds/NewsCarousel';
import { ProductFeatureCard } from '@/components/news/ProductFeatureCard';
import FundThemes from '@/components/mutualfunds/FundThemes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MUTUAL_FUND_FEATURES } from '@/data/productFeatures';
import { mockPolls } from '@/data/mockEngagementData';
import { TrendingUp, Users } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';

const Home = () => {
  const navigate = useNavigate();

  // Get top 3 active polls
  const topPolls = mockPolls
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, 3);

  const handleExploreTheme = (themeId: string) => {
    navigate(`/mutual-fund-research?theme=${themeId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="DiscvrAI - Discover Smart Investments with AI"
        description="Your intelligent companion for mutual funds, stocks, and financial insights. Get personalized recommendations, real-time news, and community-driven polls."
        canonical="https://www.discvr.ai/home"
      />
      
      <Header />
      
      {/* Hero Intro */}
      <section className="container mx-auto px-4 py-12 text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Your AI-Powered Financial Companion
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Discover smarter investments with AI research, real-time market insights, and a community of informed investors. 
          From mutual funds to stocks, get personalized recommendations that match your goals.
        </p>
      </section>
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Polls Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Users className="h-8 w-8 text-primary" />
                Top Community Polls
              </h2>
              <p className="text-muted-foreground mt-2">
                See what the community thinks and share your opinion
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/polls')}
            >
              View All Polls
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interactive Poll */}
            <div className="space-y-4">
              {topPolls[0] && <QuickPollWidget poll={topPolls[0]} />}
            </div>

            {/* Trending Results */}
            <div className="space-y-4">
              <div className="grid gap-4">
                {topPolls.slice(1, 3).map((poll) => {
                  const topOption = [...poll.options].sort((a, b) => b.percentage - a.percentage)[0];
                  
                  return (
                    <Card key={poll.id} className="p-4 border-l-4 border-l-primary/50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">{poll.question}</h3>
                        <span className="text-lg font-bold text-primary">{topOption.percentage}%</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{topOption.text}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {poll.totalVotes.toLocaleString()} votes
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* News Carousel */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Latest Market News</h2>
              <p className="text-muted-foreground mt-2">
                Stay updated with real-time financial news and insights
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/news')}
            >
              View All News
            </Button>
          </div>
          
          <NewsCarousel />
        </section>

        {/* Product Features */}
        <section className="space-y-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">Discover Our Platform</h2>
            <p className="text-muted-foreground mt-2">
              AI-powered tools to help you make smarter investment decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MUTUAL_FUND_FEATURES.map((feature) => (
              <ProductFeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </section>

        {/* Mutual Funds Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Explore Mutual Funds</h2>
              <p className="text-muted-foreground mt-2">
                Curated themes and trending funds personalized for you
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/mutual-fund-research')}
            >
              View All Funds
            </Button>
          </div>

          <FundThemes onExploreTheme={handleExploreTheme} />
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default Home;
